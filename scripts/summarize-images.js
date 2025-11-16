#!/usr/bin/env node

/**
 * Image Summary Script
 * 
 * This script summarizes the images defined in gameData.js, showing:
 * - Total images
 * - Verification status counts
 * - Difficulty distribution by language
 * 
 * Run: npm run images:summary
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse gameData.js
const gameDataPath = path.join(__dirname, '../src/data/gameData.js');
const gameDataContent = fs.readFileSync(gameDataPath, 'utf-8');

// Extract the gameWords array using a simple regex approach
// We'll look for the export const gameWords = [...] pattern
const arrayMatch = gameDataContent.match(/export const gameWords = \[([\s\S]*)\]/);
if (!arrayMatch) {
  console.error('Error: Could not find gameWords array in gameData.js');
  process.exit(1);
}

// Parse the array content - we'll use eval in a safe way by creating a module
// Actually, let's use a safer approach by importing the module
const gameDataModule = await import(`file://${gameDataPath}`);
const gameWords = gameDataModule.gameWords;

// Initialize counters
let totalImages = 0;
let verified = 0;
let invalid = 0;
let pending = 0;

// Difficulty counters by language
const difficultyCounts = {
  en: { easy: 0, medium: 0, hard: 0 },
  pt: { easy: 0, medium: 0, hard: 0 }
};

// Process each word
gameWords.forEach(word => {
  totalImages++;
  
  // Count verification status
  if (word.verified === 'yes') {
    verified++;
    
    // Count difficulties by language (only for verified images)
    if (word.difficulty) {
      if (word.difficulty.en) {
        const difficulty = word.difficulty.en.toLowerCase();
        if (difficultyCounts.en[difficulty] !== undefined) {
          difficultyCounts.en[difficulty]++;
        }
      }
      if (word.difficulty.pt) {
        const difficulty = word.difficulty.pt.toLowerCase();
        if (difficultyCounts.pt[difficulty] !== undefined) {
          difficultyCounts.pt[difficulty]++;
        }
      }
    }
  } else if (word.verified === 'invalid') {
    invalid++;
  } else if (word.verified === 'pending') {
    pending++;
  }
});

// Display summary
console.log('\n📊 Image Summary\n');
console.log(`- Total images: ${totalImages}`);
console.log(`- Verified: ${verified}`);
console.log(`- Invalid: ${invalid}`);
console.log(`- Pending: ${pending}`);
console.log('');
console.log('Difficulty counts (verified only):');
console.log(`- Easy, en: ${difficultyCounts.en.easy}, pt: ${difficultyCounts.pt.easy}`);
console.log(`- Medium, en: ${difficultyCounts.en.medium}, pt: ${difficultyCounts.pt.medium}`);
console.log(`- Hard, en: ${difficultyCounts.en.hard}, pt: ${difficultyCounts.pt.hard}`);
console.log('');

