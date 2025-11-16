#!/usr/bin/env node

/**
 * Image Verification Script using API Ninjas Object Detection
 * 
 * This script verifies images using the API Ninjas Object Detection API.
 * It automatically detects objects in images and matches them with the words.
 * 
 * Setup:
 * 1. Get your API key from https://api-ninjas.com/
 * 2. Create a .env file in the project root with: NINJAS_API_KEY=your_api_key_here
 * 3. Run: npm run images:verify
 * 
 * Documentation: https://api-ninjas.com/api/objectdetection
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { createWriteStream } from 'fs';
import FormData from 'form-data';
import sharp from 'sharp';

// Load environment variables
dotenv.config();

// Check for debug flag
const DEBUG = process.argv.includes('--debug') || process.argv.includes('-d');

// Check if we should only verify pending images
const PENDING_ONLY = process.argv.includes('--pending-only') || process.env.VERIFY_PENDING_ONLY === 'true';

// Parse batch argument (--batch=N or batch=N)
let BATCH_SIZE = null;
for (const arg of process.argv) {
  if (arg.startsWith('--batch=')) {
    BATCH_SIZE = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('batch=')) {
    BATCH_SIZE = parseInt(arg.split('=')[1], 10);
  }
}

// Debug logging function
function debugLog(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

function debugError(...args) {
  if (DEBUG) {
    console.error(...args);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for API key
const API_KEY = process.env.NINJAS_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: NINJAS_API_KEY not found in .env file');
  console.error('   Please create a .env file with: NINJAS_API_KEY=your_api_key_here');
  console.error('   Get your API key from: https://api-ninjas.com/');
  process.exit(1);
}

const API_URL = 'https://api.api-ninjas.com/v1/objectdetection';

// Cache file path
const cachePath = path.join(__dirname, '../.image-verification-cache.json');

// Load or create cache
let imageCache = {};
function loadCache() {
  if (fs.existsSync(cachePath)) {
    try {
      const cacheContent = fs.readFileSync(cachePath, 'utf8');
      imageCache = JSON.parse(cacheContent);
      debugLog(`  [DEBUG] Loaded ${Object.keys(imageCache).length} entries from cache`);
    } catch (error) {
      debugError(`  [DEBUG] Error loading cache: ${error.message}`);
      imageCache = {};
    }
  } else {
    imageCache = {};
  }
}

// Save cache to file
function saveCache() {
  try {
    fs.writeFileSync(cachePath, JSON.stringify(imageCache, null, 2), 'utf8');
    debugLog(`  [DEBUG] Saved cache with ${Object.keys(imageCache).length} entries`);
  } catch (error) {
    debugError(`  [DEBUG] Error saving cache: ${error.message}`);
  }
}

// Normalize URL by removing query parameters and fragments
// Also handles local image paths (e.g., /images/cat.jpg)
function normalizeImageUrl(imageUrl) {
  // If it's a local path (starts with /), return as-is
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  try {
    const url = new URL(imageUrl);
    // Return URL without query string and hash
    return `${url.protocol}//${url.host}${url.pathname}`;
  } catch (error) {
    // If URL parsing fails, try simple string manipulation
    const withoutQuery = imageUrl.split('?')[0].split('#')[0];
    return withoutQuery;
  }
}

// Check cache for image URL (using normalized URL as key)
function getCachedResult(imageUrl) {
  const normalizedUrl = normalizeImageUrl(imageUrl);
  return imageCache[normalizedUrl] || null;
}

// Update cache with verification result (using normalized URL as key)
function updateCache(imageUrl, result) {
  const normalizedUrl = normalizeImageUrl(imageUrl);
  imageCache[normalizedUrl] = {
    verified: result.verified,
    detected: result.detected,
    timestamp: new Date().toISOString()
  };
  saveCache();
}

// Load cache on startup
loadCache();

// Load game data
const gameDataPath = path.join(__dirname, '../src/data/gameData.js');
let gameDataContent = fs.readFileSync(gameDataPath, 'utf8');

// Extract all word entries
const entries = [];
// Updated regex to match 'yes', 'invalid', 'pending', or legacy true/false
// Made more flexible to handle line breaks and whitespace - using [\s\S] to match any character including newlines
// Also captures optional 'image' attribute
const entryRegex = /{\s*word:\s*{\s*en:\s*'([^']+)',[\s\S]*?pt:\s*'([^']+)'\s*},[\s\S]*?url:\s*'([^']+)',[\s\S]*?(?:image:\s*'([^']+)',[\s\S]*?)?category:\s*'([^']+)',[\s\S]*?verified:\s*('yes'|'invalid'|'pending'|true|false)\s*}/g;

let match;
while ((match = entryRegex.exec(gameDataContent)) !== null) {
  let verifiedStatus = match[6];
  // Convert legacy true/false to new format
  if (verifiedStatus === 'true') {
    verifiedStatus = 'yes';
  } else if (verifiedStatus === 'false') {
    verifiedStatus = 'pending';
  } else if (verifiedStatus && verifiedStatus.startsWith("'")) {
    // Remove quotes from 'yes', 'invalid', 'pending'
    verifiedStatus = verifiedStatus.replace(/'/g, '');
  }
  
  entries.push({
    en: match[1],
    pt: match[2],
    url: match[3],
    image: match[4] || null, // Optional image attribute
    category: match[5],
    verified: verifiedStatus,
    fullMatch: match[0]
  });
}

const totalEntries = entries.length;
let entriesToProcess = entries;

if (BATCH_SIZE && BATCH_SIZE < totalEntries) {
  entriesToProcess = entries.slice(0, BATCH_SIZE);
  console.log(`Found ${totalEntries} image(s) to verify, processing first ${BATCH_SIZE} (batch mode):\n`);
} else {
  console.log(`Found ${totalEntries} image(s) to verify\n`);
}

// Download image to temp file
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const httpModule = url.startsWith('https:') ? https : http;
    const file = createWriteStream(filepath);
    
    httpModule.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode === 404) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error('IMAGE_NOT_FOUND'));
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Resize image if needed (API requires < 2000x2000)
async function prepareImage(inputPath, outputPath) {
  const metadata = await sharp(inputPath).metadata();
  const { width, height } = await metadata;
  
  // If image is too large, resize it
  if (width > 2000 || height > 2000) {
    const maxDimension = Math.max(width, height);
    const scale = 2000 / maxDimension;
    const newWidth = Math.floor(width * scale);
    const newHeight = Math.floor(height * scale);
    
    await sharp(inputPath)
      .resize(newWidth, newHeight, { fit: 'inside' })
      .toFile(outputPath);
    
    return outputPath;
  }
  
  // If image is already small enough, just copy it
  fs.copyFileSync(inputPath, outputPath);
  return outputPath;
}

// Call API Ninjas Object Detection API
async function detectObjects(imagePath) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));
    
    const options = {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
        ...form.getHeaders()
      }
    };
    
    // Debug: Log request details
    debugLog(`  [DEBUG] API Request URL: ${API_URL}`);
    debugLog(`  [DEBUG] API Request Method: ${options.method}`);
    debugLog(`  [DEBUG] API Request Headers:`, JSON.stringify(options.headers, null, 2));
    debugLog(`  [DEBUG] Image Path: ${imagePath}`);
    
    const req = https.request(API_URL, options, (res) => {
      let data = '';
      
      // Debug: Log response headers
      debugLog(`  [DEBUG] API Response Status: ${res.statusCode}`);
      debugLog(`  [DEBUG] API Response Headers:`, JSON.stringify(res.headers, null, 2));
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Debug: Log raw response
        debugLog(`  [DEBUG] Raw API Response:`, data);
        
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            // Debug: Log parsed response
            debugLog(`  [DEBUG] Parsed API Response:`, JSON.stringify(result, null, 2));
            resolve(result);
          } catch (error) {
            debugError(`  [DEBUG] JSON Parse Error:`, error.message);
            debugError(`  [DEBUG] Raw data that failed to parse:`, data);
            reject(new Error(`Failed to parse API response: ${error.message}`));
          }
        } else {
          debugError(`  [DEBUG] API Error Response:`, data);
          reject(new Error(`API error (${res.statusCode}): ${data}`));
        }
      });
      
      res.on('error', (error) => {
        reject(new Error(`Response error: ${error.message}`));
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout after 30 seconds'));
    });
    
    // Pipe form data to request
    form.pipe(req);
  });
}

// Normalize word for matching
function normalizeWord(word) {
  return word.toLowerCase().trim();
}

// Check if detected objects match the word
function checkMatch(detectedObjects, word) {
  const wordLower = normalizeWord(word);
  const detectedLabels = detectedObjects.map(obj => normalizeWord(obj.label));
  
  // Direct match
  if (detectedLabels.some(label => label === wordLower || label.includes(wordLower) || wordLower.includes(label))) {
    return true;
  }
  
  // Check for plural/singular variations
  const wordSingular = wordLower.replace(/s$/, '');
  const wordPlural = wordLower + 's';
  
  if (detectedLabels.some(label => label === wordSingular || label === wordPlural)) {
    return true;
  }
  
  // Check for common variations
  const variations = {
    'cat': ['kitten', 'feline'],
    'dog': ['puppy', 'canine'],
    'bird': ['chick', 'fowl'],
    'fish': ['fish', 'fishes'],
    'apple': ['apples'],
    'banana': ['bananas'],
    'orange': ['oranges'],
    'car': ['automobile', 'vehicle'],
    'plane': ['airplane', 'aircraft'],
    'bike': ['bicycle', 'bike'],
    'flower': ['bloom', 'blossom'],
    'cake': ['dessert', 'pastry'],
    'cookie': ['biscuit'],
    'gift': ['present'],
    'candle': ['candles'],
    'crown': ['tiara'],
    'rocket': ['missile', 'spacecraft'],
    'drum': ['drum', 'drums'],
    'guitar': ['guitars'],
    'star': ['starfish'],
    'house': ['home', 'building'],
    'tree': ['trees'],
    'heart': ['hearts'],
    'moon': ['lunar'],
    'train': ['locomotive'],
    'boat': ['ship', 'vessel'],
    'sun': ['sunshine'],
    'cloud': ['clouds'],
    'rainbow': ['rainbows'],
    'umbrella': ['umbrellas'],
    'clock': ['timepiece'],
    'key': ['keys'],
    'shoe': ['shoes'],
    'hat': ['hats'],
    'glasses': ['sunglasses', 'eyeglasses'],
    'pencil': ['pencils'],
    'book': ['books'],
    'cup': ['cups'],
    'fork': ['forks'],
    'spoon': ['spoons'],
    'plate': ['plates'],
    'ball': ['balls'],
    'lion': ['lion', 'lions'],
    'tiger': ['tigers'],
    'elephant': ['elephants'],
    'bear': ['bears'],
    'rabbit': ['rabbits', 'bunny'],
    'monkey': ['monkeys'],
    'panda': ['pandas'],
    'butterfly': ['butterflies'],
    'bee': ['bees'],
    'snake': ['snakes'],
    'turtle': ['turtles'],
    'frog': ['frogs'],
    'owl': ['owls'],
    'duck': ['ducks'],
    'pig': ['pigs', 'hog'],
    'horse': ['horses'],
    'cow': ['cows', 'cattle'],
    'strawberry': ['strawberries'],
    'grape': ['grapes'],
    'watermelon': ['watermelons'],
    'carrot': ['carrots'],
    'tomato': ['tomatoes'],
    'potato': ['potatoes'],
    'corn': ['corn'],
    'pepper': ['peppers'],
    'cucumber': ['cucumbers'],
    'broccoli': ['broccoli'],
    'lettuce': ['lettuce'],
    'pizza': ['pizza'],
    'icecream': ['ice cream', 'icecream'],
    'bread': ['bread', 'loaf'],
    'cheese': ['cheese'],
    'egg': ['eggs'],
    'milk': ['milk']
  };
  
  if (variations[wordLower]) {
    for (const variation of variations[wordLower]) {
      if (detectedLabels.some(label => label === normalizeWord(variation))) {
        return true;
      }
    }
  }
  
  return false;
}

// Verify a single image
async function verifyImage(entry) {
  // Determine cache key: prefer local image path if available, otherwise use URL
  const cacheKey = (entry.image && fs.existsSync(path.join(__dirname, '../public', entry.image))) 
    ? entry.image 
    : entry.url;
  
  // Check cache first
  const cachedResult = getCachedResult(cacheKey);
  if (cachedResult) {
    const displayKey = entry.image || normalizeImageUrl(entry.url);
    console.log(`  💾 Using cached result (${cachedResult.verified}): ${displayKey}`);
    debugLog(`  [DEBUG] Cache hit for ${cacheKey}: ${cachedResult.verified}`);
    // Return cached result, but we still need to verify it matches the word
    // For invalid results, we can trust the cache completely
    if (cachedResult.verified === 'invalid') {
      return {
        verified: 'invalid',
        detected: cachedResult.detected || []
      };
    }
    // For 'yes' or 'pending', we might want to re-verify, but for now, trust cache
    // This can be optimized later if needed
    return {
      verified: cachedResult.verified,
      detected: cachedResult.detected || []
    };
  }
  
  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const tempImagePath = path.join(tempDir, `${entry.en.replace(/\s+/g, '_')}_original.jpg`);
  const processedImagePath = path.join(tempDir, `${entry.en.replace(/\s+/g, '_')}_processed.jpg`);
  
  // Check if local image exists
  let localImagePath = null;
  if (entry.image) {
    // Convert /images/filename.jpg to absolute path
    const publicDir = path.join(__dirname, '../public');
    localImagePath = path.join(publicDir, entry.image);
    
    if (fs.existsSync(localImagePath)) {
      console.log(`  📁 Using local image: ${entry.image}`);
      // Copy local image to temp path for processing
      fs.copyFileSync(localImagePath, tempImagePath);
    } else {
      console.log(`  ⚠️  Local image not found: ${entry.image}, will download from URL`);
      localImagePath = null;
    }
  }
  
  try {
    // Download image only if local image doesn't exist
    if (!localImagePath || !fs.existsSync(tempImagePath)) {
      console.log(`  Downloading image from URL...`);
      try {
        await downloadImage(entry.url, tempImagePath);
      } catch (downloadError) {
        if (downloadError.message === 'IMAGE_NOT_FOUND') {
          // Clean up temp files if they exist
          if (fs.existsSync(tempImagePath)) {
            fs.unlinkSync(tempImagePath);
          }
          if (fs.existsSync(processedImagePath)) {
            fs.unlinkSync(processedImagePath);
          }
          const invalidResult = {
            verified: 'invalid',
            detected: []
          };
          // Cache the invalid result (use local image path if available, otherwise URL)
          const cacheKey = entry.image || entry.url;
          updateCache(cacheKey, invalidResult);
          return invalidResult;
        }
        throw downloadError;
      }
    }
    
    // Prepare image (resize if needed)
    console.log(`  Preparing image...`);
    await prepareImage(tempImagePath, processedImagePath);
    
    // Call API
    console.log(`  Calling API Ninjas Object Detection...`);
    const apiResult = await detectObjects(processedImagePath);
    
    // API returns an array directly (not an object with 'objects' property)
    // Also handle case where it might be wrapped in an object
    const detectedObjects = Array.isArray(apiResult) ? apiResult : (apiResult.objects || []);
    
    // Convert confidence strings to numbers if needed
    const normalizedObjects = detectedObjects.map(obj => ({
      ...obj,
      confidence: typeof obj.confidence === 'string' ? parseFloat(obj.confidence) : obj.confidence
    }));
    
    // Check if word matches and find the best matching object with confidence >= 0.7
    // Only match against English word name
    const wordLower = normalizeWord(entry.en);
    
    // Find all objects that match the English word (regardless of confidence)
    const matchingObjects = normalizedObjects.filter(obj => {
      const labelLower = normalizeWord(obj.label);
      // Check if label matches English word (direct or partial)
      const matchesEn = labelLower === wordLower || labelLower.includes(wordLower) || wordLower.includes(labelLower);
      return matchesEn;
    });
    
    // Check if we have a match with confidence >= 0.7
    const verifiedObjects = matchingObjects.filter(obj => obj.confidence >= 0.7);
    const isVerified = verifiedObjects.length > 0;
    
    // Mark as invalid if:
    // 1. No matching object found at all, OR
    // 2. Matching object found but confidence < 70%
    const isInvalid = matchingObjects.length === 0 || (matchingObjects.length > 0 && verifiedObjects.length === 0);
    
    // Clean up temp files
    if (fs.existsSync(tempImagePath)) {
      fs.unlinkSync(tempImagePath);
    }
    if (fs.existsSync(processedImagePath)) {
      fs.unlinkSync(processedImagePath);
    }
    
    let status;
    if (isVerified) {
      status = 'yes';
    } else if (isInvalid) {
      status = 'invalid';
    } else {
      status = 'pending';
    }
    
    const result = {
      verified: status,
      detected: normalizedObjects.map(obj => `${obj.label} (${(obj.confidence * 100).toFixed(1)}%)`)
    };
    
    // Cache the result (especially invalid ones to avoid re-requesting)
    // Use local image path for cache if available, otherwise use URL
    const cacheKey = (entry.image && fs.existsSync(path.join(__dirname, '../public', entry.image))) 
      ? entry.image 
      : entry.url;
    updateCache(cacheKey, result);
    
    return result;
    
  } catch (error) {
    // Clean up on error
    if (fs.existsSync(tempImagePath)) {
      fs.unlinkSync(tempImagePath);
    }
    if (fs.existsSync(processedImagePath)) {
      fs.unlinkSync(processedImagePath);
    }
    throw error;
  }
}

// Update verified status in gameData.js
function updateVerifiedStatus(entry, status) {
  // status can be 'yes', 'invalid', or 'pending'
  // Replace any existing verified value (including legacy true/false)
  const newMatch = entry.fullMatch.replace(/verified:\s*('yes'|'invalid'|'pending'|true|false)/, `verified: '${status}'`);
  gameDataContent = gameDataContent.replace(entry.fullMatch, newMatch);
  entry.fullMatch = newMatch;
  entry.verified = status;
  
  // Save to file
  fs.writeFileSync(gameDataPath, gameDataContent, 'utf8');
}

// Main verification process
async function verifyAllImages() {
  const mode = PENDING_ONLY ? 'pending images only' : 'all unverified images';
  console.log(`🚀 Starting image verification with API Ninjas Object Detection (${mode})...\n`);
  console.log('📡 Using API: https://api-ninjas.com/api/objectdetection');
  const cacheSize = Object.keys(imageCache).length;
  if (cacheSize > 0) {
    console.log(`💾 Cache: ${cacheSize} image(s) cached (will skip API calls for cached invalid images)\n`);
  }
  if (PENDING_ONLY) {
    console.log('⏳ Mode: Only verifying images with verified: "pending" status\n');
  }
  if (DEBUG) {
    console.log('🐛 Debug mode enabled\n');
  } else {
    console.log('💡 Tip: Use --debug or -d flag to see detailed API request/response logs\n');
  }
  
  let verifiedCount = 0;
  let invalidCount = 0;
  let pendingCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < entriesToProcess.length; i++) {
    const entry = entriesToProcess[i];
    
    // Skip if already verified
    if (entry.verified === 'yes' || entry.verified === 'true' || entry.verified === true) {
      console.log(`[${i + 1}/${entriesToProcess.length}] ⏭️  Skipping ${entry.en} (${entry.category}) - already verified`);
      console.log(''); // Empty line for readability
      skippedCount++;
      continue;
    }
    
    // If pending-only mode, skip invalid images
    if (PENDING_ONLY && entry.verified === 'invalid') {
      skippedCount++;
      continue;
    }
    
    // If pending-only mode, skip if not pending
    // Also handle undefined or null verified status
    if (PENDING_ONLY) {
      if (!entry.verified || entry.verified !== 'pending') {
        skippedCount++;
        continue;
      }
    }
    
    console.log(`[${i + 1}/${entriesToProcess.length}] Verifying ${entry.en} (${entry.category})...`);
    
    try {
      const result = await verifyImage(entry);
      
      if (result.verified === 'yes') {
        console.log(`  ✅ Verified! Detected: ${result.detected.join(', ')}`);
        updateVerifiedStatus(entry, 'yes');
        verifiedCount++;
      } else if (result.verified === 'invalid') {
        const reason = result.detected.length > 0 
          ? `Detected: ${result.detected.join(', ')} (confidence < 70% or no English word match)`
          : 'No matching object found';
        console.log(`  ❌ Invalid. ${reason}`);
        updateVerifiedStatus(entry, 'invalid');
        invalidCount++;
      } else {
        console.log(`  ⏳ Pending. Detected: ${result.detected.length > 0 ? result.detected.join(', ') : 'No objects detected'}`);
        updateVerifiedStatus(entry, 'pending');
        pendingCount++;
      }
    } catch (error) {
      if (error.message === 'IMAGE_NOT_FOUND') {
        console.log(`  ❌ Invalid image (404 Not Found)`);
        updateVerifiedStatus(entry, 'invalid');
        invalidCount++;
      } else {
        console.log(`  ⚠️  Error: ${error.message}`);
        errorCount++;
        // Keep current status on error
      }
    }
    
    console.log(''); // Empty line for readability
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Clean up temp directory
  const tempDir = path.join(__dirname, '../temp');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  
  console.log('\n📊 Verification Summary:');
  console.log(`   ✅ Verified (yes): ${verifiedCount}`);
  console.log(`   ❌ Invalid (404): ${invalidCount}`);
  console.log(`   ⏳ Pending: ${pendingCount}`);
  console.log(`   ⏭️  Skipped (already verified): ${skippedCount}`);
  console.log(`   ⚠️  Errors: ${errorCount}`);
  if (BATCH_SIZE && totalEntries > BATCH_SIZE) {
    console.log(`\n📊 Remaining: ${totalEntries - BATCH_SIZE} image(s) to verify`);
  }
  console.log(`\n📁 Results saved to: ${gameDataPath}\n`);
  
  // Explicitly exit to ensure script terminates
  process.exit(0);
}

// Run verification
verifyAllImages().catch(error => {
  console.error('\n❌ Error:', error.message);
  console.error('\nMake sure you have:');
  console.error('  1. Created a .env file with: NINJAS_API_KEY=your_api_key_here');
  console.error('  2. Installed dependencies: npm install');
  console.error('  3. Get your API key from: https://api-ninjas.com/');
  process.exit(1);
});
