#!/usr/bin/env node

/**
 * Update Images Status Script
 * 
 * This script checks if image files exist in the public/images directory
 * and updates the verified status in gameData.js accordingly:
 * - If image file exists: set verified: 'yes'
 * - If image file doesn't exist: set verified: 'pending'
 * 
 * Usage:
 * Run: npm run images:update
 * 
 * The script will:
 * 1. Read all entries from gameData.js
 * 2. For each entry, check if the image file exists in public/images/ directory
 * 3. Update the verified status based on file existence
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAME_DATA_PATH = path.join(__dirname, '../src/data/gameData.js');
const IMAGES_DIR = path.join(__dirname, '../public/images');

// Parse batch argument (--batch=N or batch=N)
let BATCH_SIZE = null;
for (const arg of process.argv) {
  if (arg.startsWith('--batch=')) {
    BATCH_SIZE = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('batch=')) {
    BATCH_SIZE = parseInt(arg.split('=')[1], 10);
  }
}

// Read gameData.js file
function readGameData() {
  const content = fs.readFileSync(GAME_DATA_PATH, 'utf-8');
  return content;
}

// Parse gameWords array from the file using dynamic import
async function parseGameWords() {
  const gameDataModule = await import('../src/data/gameData.js');
  return gameDataModule.gameWords;
}

// Check if image file exists in public/images directory
function imageFileExists(imagePath) {
  if (!imagePath) {
    return false;
  }
  
  // Only check local paths (starting with /images/)
  // Skip external URLs (starting with http:// or https://)
  if (!imagePath.startsWith('/images/')) {
    return false;
  }
  
  // Convert /images/filename.jpg to absolute path
  const filename = imagePath.replace('/images/', '');
  const filePath = path.join(IMAGES_DIR, filename);
  return fs.existsSync(filePath);
}

// Update verified status in gameData.js
function updateVerifiedStatus(content, wordEn, status) {
  const wordPattern = wordEn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern to match the verified field for this word
  // Matches: verified: 'yes'|'invalid'|'pending'|true|false
  const pattern = new RegExp(
    `(en:\\s*['"]${wordPattern}['"][\\s\\S]*?verified:\\s*['"]?)(yes|invalid|pending|true|false)(['"]?[\\s\\S]*?})`,
    's'
  );
  
  const match = content.match(pattern);
  if (match) {
    return content.replace(pattern, `$1${status}$3`);
  }
  
  throw new Error(`Could not find entry for word: ${wordEn}`);
}

// Main function
async function updateImagesStatus() {
  console.log('🔄 Updating image verification status based on file existence...\n');
  
  // Read gameData.js
  let content = readGameData();
  
  // Parse gameWords
  const gameWords = await parseGameWords();
  
  const totalEntries = gameWords.length;
  let entriesToProcess = gameWords;
  
  if (BATCH_SIZE && BATCH_SIZE < totalEntries) {
    entriesToProcess = gameWords.slice(0, BATCH_SIZE);
    console.log(`Found ${totalEntries} entry/entries, processing first ${BATCH_SIZE} (batch mode):\n`);
  } else {
    console.log(`Found ${totalEntries} entry/entries to check:\n`);
  }
  
  let updatedCount = 0;
  let yesCount = 0;
  let pendingCount = 0;
  let skippedCount = 0;
  
  // Process each entry
  for (let i = 0; i < entriesToProcess.length; i++) {
    const entry = entriesToProcess[i];
    const wordEn = entry.word.en;
    const imagePath = entry.image || entry.url;
    
    console.log(`[${i + 1}/${entriesToProcess.length}] Checking ${wordEn}...`);
    
    // Skip if no image path or if it's an external URL (not a local path)
    if (!imagePath) {
      console.log(`  ⚠️  No image path found, skipping`);
      skippedCount++;
      console.log('');
      continue;
    }
    
    // Only check local paths (starting with /images/)
    // Skip external URLs
    if (!imagePath.startsWith('/images/')) {
      console.log(`  ⏭️  External URL (not local file): ${imagePath}`);
      skippedCount++;
      console.log('');
      continue;
    }
    
    // Check if file exists
    const exists = imageFileExists(imagePath);
    const newStatus = exists ? 'yes' : 'pending';
    const currentStatus = entry.verified || 'pending';
    
    // Only update if status changed
    if (currentStatus !== newStatus) {
      content = updateVerifiedStatus(content, wordEn, newStatus);
      console.log(`  ${exists ? '✅' : '⏳'} File ${exists ? 'exists' : 'not found'}: ${imagePath}`);
      console.log(`  📝 Updated: verified: '${currentStatus}' → '${newStatus}'`);
      updatedCount++;
      if (exists) {
        yesCount++;
      } else {
        pendingCount++;
      }
    } else {
      console.log(`  ${exists ? '✅' : '⏳'} File ${exists ? 'exists' : 'not found'}: ${imagePath}`);
      console.log(`  ⏭️  Status already correct: verified: '${currentStatus}'`);
      skippedCount++;
    }
    console.log('');
  }
  
  // Write updated content back to file
  if (updatedCount > 0) {
    fs.writeFileSync(GAME_DATA_PATH, content, 'utf-8');
    console.log(`\nSummary:`);
    console.log(`✅ Updated ${updatedCount} entry/entries`);
    console.log(`   - Set to 'yes': ${yesCount}`);
    console.log(`   - Set to 'pending': ${pendingCount}`);
    console.log(`⏭️  Skipped ${skippedCount} entry/entries (already correct)`);
    if (BATCH_SIZE && totalEntries > BATCH_SIZE) {
      console.log(`📊 Remaining: ${totalEntries - BATCH_SIZE} entry/entries to process`);
    }
    console.log(`\n📝 Updated ${GAME_DATA_PATH}`);
  } else {
    console.log(`\n✅ All entries already have correct status. No updates needed.`);
    if (skippedCount > 0) {
      console.log(`⏭️  Skipped ${skippedCount} entry/entries`);
    }
  }
  
  process.exit(0);
}

// Run the script
updateImagesStatus().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

