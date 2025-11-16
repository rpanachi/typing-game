#!/usr/bin/env node

/**
 * Generate Images Script using HuggingFace Inference API
 * 
 * This script generates images using HuggingFace's image generation models
 * for entries marked as 'invalid', saves them to the public/images directory,
 * and updates gameData.js with the file paths (/images/filename.jpg).
 * 
 * Setup:
 * 1. Get your HuggingFace API token from https://huggingface.co/settings/tokens
 *    Make sure it has "Make calls to Inference Providers" permission
 * 2. Create a .env file in the project root with: HUGGINGFACE_API_TOKEN=your_token_here
 * 3. Optionally set HUGGINGFACE_MODEL_ID (default: stabilityai/stable-diffusion-xl-base-1.0)
 *    Note: Not all models are available via Inference API. Check model availability.
 * 4. Run: npm run images:generate
 * 
 * Note: Uses the router endpoint: https://router.huggingface.co/hf-inference/models/{model_id}
 * Documentation: https://huggingface.co/docs/api-inference/index
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

// Load environment variables
dotenv.config();

// Check for debug flag
const DEBUG = process.argv.includes('--debug') || process.argv.includes('-d');

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for API token
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
// Default model - Use stabilityai/stable-diffusion-xl-base-1.0
// You can override with HUGGINGFACE_MODEL_ID in .env
// Model page: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
const HUGGINGFACE_MODEL_ID = process.env.HUGGINGFACE_MODEL_ID || 'stabilityai/stable-diffusion-xl-base-1.0';

if (!HUGGINGFACE_API_TOKEN) {
  console.error('❌ Error: HUGGINGFACE_API_TOKEN not found in .env file');
  console.error('   Please create a .env file with: HUGGINGFACE_API_TOKEN=your_token_here');
  console.error('   Get your API token from: https://huggingface.co/settings/tokens');
  process.exit(1);
}

const GAME_DATA_PATH = path.join(__dirname, '../src/data/gameData.js');
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(__dirname, '../public/images');
// Use the router endpoint: https://router.huggingface.co/hf-inference/models/{model_id}
const HUGGINGFACE_API_URL = 'router.huggingface.co';
const HUGGINGFACE_API_PATH = `/hf-inference/models/${HUGGINGFACE_MODEL_ID}`;

// Ensure public/images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`📁 Created images directory: ${IMAGES_DIR}`);
}

// Read gameData.js file
function readGameData() {
  const content = fs.readFileSync(GAME_DATA_PATH, 'utf-8');
  return content;
}

// Parse gameWords array from the file using dynamic import
async function parseGameWords() {
  // Import the gameData module dynamically
  const gameDataModule = await import('../src/data/gameData.js');
  return gameDataModule.gameWords;
}

// Generate image using HuggingFace Inference API
async function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    // Create a kid-friendly prompt
    const enhancedPrompt = `realistic image of a single ${prompt.toLowerCase()}, from distance, full body, entirely visible on frame, minimalistic, blurred background`;
    
    // Router API format: model ID in path, inputs in body
    const postData = JSON.stringify({
      inputs: enhancedPrompt,
      parameters: {
        num_inference_steps: 30,
        guidance_scale: 7.5
      }
    });
    
    const options = {
      hostname: HUGGINGFACE_API_URL,
      path: HUGGINGFACE_API_PATH,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    debugLog(`  [DEBUG] Generating image for: ${prompt}`);
    debugLog(`  [DEBUG] Enhanced prompt: ${enhancedPrompt}`);
    debugLog(`  [DEBUG] API URL: https://${HUGGINGFACE_API_URL}${HUGGINGFACE_API_PATH}`);
    
    const req = https.request(options, (res) => {
      let data = Buffer.alloc(0);
      
      res.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            // Check if response is an image (PNG/JPEG) or JSON
            const contentType = res.headers['content-type'] || '';
            
            if (contentType.startsWith('image/')) {
              // Response is an image - return the raw buffer
              debugLog(`  [DEBUG] Generated image (${data.length} bytes, ${contentType})`);
              // Return the image buffer and content type
              resolve({ buffer: data, contentType: contentType });
            } else {
              // Try to parse as JSON (might be an error or status)
              const result = JSON.parse(data.toString());
              
              if (result.error) {
                reject(new Error(`HuggingFace API error: ${result.error}`));
              } else if (result.generated_image) {
                // Some models return a URL (not an image buffer)
                // In this case, we'd need to download it, but for now reject
                reject(new Error('Model returned a URL instead of image data. This is not supported in file-saving mode.'));
              } else {
                reject(new Error(`Unexpected API response format: ${JSON.stringify(result)}`));
              }
            }
          } catch (error) {
            // If parsing fails, check if it's an image
            const contentType = res.headers['content-type'] || '';
            if (contentType.startsWith('image/')) {
              debugLog(`  [DEBUG] Generated image (${data.length} bytes, ${contentType})`);
              resolve({ buffer: data, contentType: contentType });
            } else {
              reject(new Error(`Failed to parse API response: ${error.message}`));
            }
          }
        } else if (res.statusCode === 503) {
          // Model is loading
          const errorData = data.toString();
          try {
            const error = JSON.parse(errorData);
            if (error.estimated_time) {
              reject(new Error(`Model is loading. Estimated time: ${error.estimated_time}s. Please wait and try again.`));
            } else {
              reject(new Error(`Model is loading. Please wait and try again.`));
            }
          } catch {
            reject(new Error(`Model is loading. Please wait and try again.`));
          }
        } else if (res.statusCode === 404) {
          const errorData = data.toString();
          let errorMessage = `Model not found (404).`;
          try {
            const error = JSON.parse(errorData);
            errorMessage += ` ${error.error || error.message || errorData}`;
          } catch {
            errorMessage += ` ${errorData}`;
          }
          errorMessage += `\n  Model: ${HUGGINGFACE_MODEL_ID}`;
          errorMessage += `\n  URL: https://${HUGGINGFACE_API_URL}${HUGGINGFACE_API_PATH}`;
          errorMessage += `\n  Note: The model might not be available on the new Inference Providers system.`;
          errorMessage += `\n  Check the model page at https://huggingface.co/${HUGGINGFACE_MODEL_ID} to see if it's deployed.`;
          errorMessage += `\n  Look for "Inference Providers" section - if it says "This model isn't deployed", it's not available via API.`;
          errorMessage += `\n  Try a different model that shows "Text-to-Image" under Inference Providers.`;
          errorMessage += `\n  Some alternatives: runwayml/stable-diffusion-v1-5, CompVis/stable-diffusion-v1-4`;
          reject(new Error(errorMessage));
        } else {
          const errorData = data.toString();
          try {
            const error = JSON.parse(errorData);
            reject(new Error(`API error (${res.statusCode}): ${error.error || error.message || errorData}`));
          } catch {
            reject(new Error(`API error (${res.statusCode}): ${errorData}`));
          }
        }
      });
      
      res.on('error', (error) => {
        reject(new Error(`Response error: ${error.message}`));
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('Request timeout (60s)'));
    });
    
    req.write(postData);
    req.end();
  });
}

// Save image buffer to file in public directory
function saveImageToFile(buffer, contentType, wordEn) {
  // Determine file extension from content type
  let extension = 'jpg';
  if (contentType.includes('png')) {
    extension = 'png';
  } else if (contentType.includes('jpeg') || contentType.includes('jpg')) {
    extension = 'jpg';
  } else if (contentType.includes('webp')) {
    extension = 'webp';
  }
  
  // Generate filename: lowercase word with underscores, sanitized
  const sanitizedWord = wordEn.toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  
  const filename = `${sanitizedWord}.${extension}`;
  const filePath = path.join(IMAGES_DIR, filename);
  
  // Write file
  fs.writeFileSync(filePath, buffer);
  
  // Return the public URL path
  return `/images/${filename}`;
}

// Update image URL in gameData.js using regex
function updateImageUrl(content, wordEn, newImagePath) {
  // Create a regex pattern that matches the specific entry for this word
  const wordPattern = wordEn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern 1: Entry with image attribute already - just update the value
  const patternWithImage = new RegExp(
    `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?url:\\s*['"][^'"]+['"][\\s\\S]*?)(image:\\s*['"])([^'"]+)(['"][\\s\\S]*?)(category:|verified:)`,
    's'
  );
  
  const matchWithImage = content.match(patternWithImage);
  if (matchWithImage) {
    return content.replace(patternWithImage, `$1$2${newImagePath}$4$5`);
  }
  
  // Pattern 2: Entry without image attribute - add it after url
  // Match: url line (with trailing comma), then any whitespace/newlines, then category or verified
  const patternWithoutImage = new RegExp(
    `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?url:\\s*['"])([^'"]+)(['"]\\s*,)([\\s\\S]*?)(category:|verified:)`,
    's'
  );
  
  const matchWithoutImage = content.match(patternWithoutImage);
  if (matchWithoutImage) {
    // Clean up any standalone comma lines in the whitespace section
    const cleanedWhitespace = matchWithoutImage[4].replace(/^\s*,\s*$/gm, '').trim();
    // Add image attribute with proper formatting (url already has comma, so just add newline and image)
    return content.replace(patternWithoutImage, `$1$2$3\n    image: '${newImagePath}',\n    ${cleanedWhitespace ? cleanedWhitespace + '\n    ' : ''}$5`);
  }
  
  // Pattern 2b: url without trailing comma
  const patternWithoutImageNoComma = new RegExp(
    `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?url:\\s*['"])([^'"]+)(['"]\\s*)([\\s\\S]*?)(category:|verified:)`,
    's'
  );
  
  const matchWithoutImageNoComma = content.match(patternWithoutImageNoComma);
  if (matchWithoutImageNoComma && !matchWithoutImageNoComma[3].includes(',')) {
    // Clean up any standalone comma lines
    const cleanedWhitespace = matchWithoutImageNoComma[4].replace(/^\s*,\s*$/gm, '').trim();
    // Add comma after url and image attribute
    return content.replace(patternWithoutImageNoComma, `$1$2$3,\n    image: '${newImagePath}',\n    ${cleanedWhitespace ? cleanedWhitespace + '\n    ' : ''}$5`);
  }
  
  // Fallback: try pattern that matches up to verified field
  const fallbackPattern = new RegExp(
    `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?url:\\s*['"])([^'"]+)(['"]\\s*,?\\s*)([\\s\\S]*?verified:\\s*['"][^'"]+['"])`,
    's'
  );
  
  const fallbackMatch = content.match(fallbackPattern);
  if (fallbackMatch) {
    // Check if image attribute exists in the matched content
    if (fallbackMatch[0].includes("image:")) {
      const imagePattern = new RegExp(
        `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?url:\\s*['"][^'"]+['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"][\\s\\S]*?verified:\\s*['"][^'"]+['"])`,
        's'
      );
      return content.replace(imagePattern, `$1${newImagePath}$3`);
    } else {
      // Clean up any standalone comma lines
      const cleanedWhitespace = fallbackMatch[4].replace(/^\s*,\s*$/gm, '').trim();
      const verifiedValue = fallbackMatch[0].match(/verified:\s*'([^']+)'/)?.[1] || 'yes';
      return content.replace(fallbackPattern, `$1$2$3\n    image: '${newImagePath}',\n    ${cleanedWhitespace ? cleanedWhitespace.replace(/verified:.*$/, '').trim() + '\n    ' : ''}verified: '${verifiedValue}'`);
    }
  }
  
  throw new Error(`Could not find entry for word: ${wordEn}`);
}

// Main function
async function generateInvalidImages() {
  console.log('🎨 Generating images for invalid entries using HuggingFace...\n');
  console.log(`📦 Using model: ${HUGGINGFACE_MODEL_ID}\n`);
  
  // Read gameData.js
  let content = readGameData();
  
  // Parse gameWords to find invalid entries
  const gameWords = await parseGameWords();
  const invalidEntries = gameWords
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.verified === 'invalid')
    .map(({ entry, index }) => ({
      index,
      word: entry.word.en,
      oldImage: entry.url
    }));
  
  if (invalidEntries.length === 0) {
    console.log('✅ No invalid images found. All images are verified!');
    return;
  }
  
  const totalInvalid = invalidEntries.length;
  let entriesToProcess = invalidEntries;
  
  if (BATCH_SIZE && BATCH_SIZE < totalInvalid) {
    entriesToProcess = invalidEntries.slice(0, BATCH_SIZE);
    console.log(`Found ${totalInvalid} invalid image(s), processing first ${BATCH_SIZE} (batch mode):\n`);
  } else {
    console.log(`Found ${totalInvalid} invalid image(s) to generate:\n`);
  }
  
  entriesToProcess.forEach(entry => {
    console.log(`  - ${entry.word} (index: ${entry.index})`);
  });
  console.log('');
  
  let generatedCount = 0;
  let errorCount = 0;
  
  // Process each invalid entry
  for (let i = 0; i < entriesToProcess.length; i++) {
    const entry = entriesToProcess[i];
    console.log(`[${i + 1}/${entriesToProcess.length}] Generating image for ${entry.word}...`);
    
    try {
      // Generate image using HuggingFace
      const imageResult = await generateImage(entry.word);
      const imageBuffer = imageResult.buffer;
      const contentType = imageResult.contentType;
      
      // Save image to file in public directory
      const imagePath = saveImageToFile(imageBuffer, contentType, entry.word);
      console.log(`  ✅ Generated and saved image: ${imagePath}`);
      console.log(`  📁 File size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
      
      // Update gameData.js with the new image path
      content = updateImageUrl(content, entry.word, imagePath);
      
      // Update verified status to 'pending' for verification
      const wordPattern = entry.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const verifiedPattern = new RegExp(
        `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?verified:\\s*['"])invalid(['"])`,
        's'
      );
      content = content.replace(verifiedPattern, `$1pending$2`);
      
      generatedCount++;
      
      // Add delay between requests to avoid rate limiting
      if (i < entriesToProcess.length - 1) {
        console.log('  ⏳ Waiting 2 seconds before next generation...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`  ❌ Error generating image: ${error.message}`);
      errorCount++;
      
      // If model is loading, wait longer
      if (error.message.includes('Model is loading')) {
        const estimatedTime = error.message.match(/(\d+)s/);
        if (estimatedTime) {
          const waitTime = parseInt(estimatedTime[1]) * 1000 + 5000; // Add 5s buffer
          console.log(`  ⏳ Waiting ${waitTime / 1000} seconds for model to load...\n`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          // Retry this entry
          i--;
          continue;
        }
      }
      
      // Continue with next entry
      if (i < entriesToProcess.length - 1) {
        console.log('  ⏳ Waiting 2 seconds before next generation...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  // Write updated content back to file
  if (generatedCount > 0) {
    fs.writeFileSync(GAME_DATA_PATH, content, 'utf-8');
    console.log(`\n✅ Successfully generated ${generatedCount} image(s)`);
    console.log(`❌ ${errorCount} error(s) occurred`);
    console.log(`\n📝 Updated ${GAME_DATA_PATH}`);
    console.log(`\n💡 Note: Generated images are saved in the public/images directory.`);
    console.log(`   Images are referenced as /images/filename.jpg in gameData.js`);
  } else {
    console.log(`\n❌ No images were generated. ${errorCount} error(s) occurred.`);
  }
  
  process.exit(0);
}

// Run the script
generateInvalidImages().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

