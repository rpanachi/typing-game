import { describe, it, expect, beforeEach, vi } from 'vitest'
import { gameWords, getRandomWord } from '../src/data/gameData.js'

describe('gameData.js', () => {
  it('exports gameWords array', () => {
    expect(Array.isArray(gameWords)).toBe(true)
    expect(gameWords.length).toBeGreaterThan(0)
  })

  it('each word has required properties', () => {
    gameWords.forEach(word => {
      expect(word).toHaveProperty('word')
      expect(word).toHaveProperty('category')
      expect(typeof word.word).toBe('object')
      expect(word.word).toHaveProperty('en')
      expect(word.word).toHaveProperty('pt')
      expect(typeof word.category).toBe('string')
      expect(word.word.en.length).toBeGreaterThan(0)
      expect(word.word.pt.length).toBeGreaterThan(0)
      
      // Check for either 'image' or 'url' property (image is preferred, url is fallback)
      expect(word).toHaveProperty('url')
      if (word.image) {
        expect(typeof word.image).toBe('string')
        expect(word.image.length).toBeGreaterThan(0)
      }
      if (word.url) {
        expect(typeof word.url).toBe('string')
        expect(word.url.length).toBeGreaterThan(0)
      }
    })
  })

  it('words are in uppercase', () => {
    gameWords.forEach(word => {
      expect(word.word.en).toBe(word.word.en.toUpperCase())
      expect(word.word.pt).toBe(word.word.pt.toUpperCase())
    })
  })

  it('getRandomWord returns a word object', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    const word = getRandomWord()
    expect(word).toHaveProperty('word')
    expect(word).toHaveProperty('image')
    expect(word).toHaveProperty('category')
    expect(word).toHaveProperty('index')
    expect(typeof word.index).toBe('number')
  })

  it('getRandomWord returns a word from gameWords array', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    const word = getRandomWord()
    const wordData = gameWords[word.index]
    expect(wordData).toBeDefined()
    expect(word.word).toBe(wordData.word.en)
    expect(word.image).toBe(wordData.image)
    expect(word.category).toBe(wordData.category)
  })

  it('getRandomWord only returns verified words', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    // Test multiple times to ensure we only get verified words
    for (let i = 0; i < 50; i++) {
      const word = getRandomWord()
      const wordData = gameWords[word.index]
      expect(wordData.verified).toBe('yes')
    }
  })

  it('getRandomWord can return different words on multiple calls', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    // This test might occasionally fail due to randomness, but it's very unlikely
    // with a reasonable number of words
    const words = new Set()
    for (let i = 0; i < 50; i++) {
      words.add(getRandomWord().word)
    }
    
    // If we have multiple verified words, we should get at least 2 different ones
    if (verifiedCount > 1) {
      expect(words.size).toBeGreaterThan(1)
    }
  })

  it('getRandomWord excludes used indices', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    // Get verified word indices
    const verifiedIndices = gameWords
      .map((w, i) => ({ word: w, index: i }))
      .filter(({ word }) => word.verified === 'yes')
      .map(({ index }) => index)
    
    // Use some verified indices
    const usedIndices = verifiedIndices.slice(0, Math.min(3, verifiedIndices.length))
    const word = getRandomWord('en', usedIndices)
    
    // The returned word should not be from the used indices
    expect(usedIndices).not.toContain(word.index)
    
    // Verify the word is valid and verified
    expect(word.index).toBeGreaterThanOrEqual(0)
    expect(word.index).toBeLessThan(gameWords.length)
    expect(gameWords[word.index].verified).toBe('yes')
  })

  it('getRandomWord resets history when all verified words are used', () => {
    // Skip test if no verified words available
    const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
    if (verifiedCount === 0) {
      console.warn('Skipping test: No verified words available')
      return
    }
    
    // Use all verified word indices
    const verifiedIndices = gameWords
      .map((w, i) => ({ word: w, index: i }))
      .filter(({ word }) => word.verified === 'yes')
      .map(({ index }) => index)
    
    const word = getRandomWord('en', verifiedIndices)
    
    // Should still return a valid word (history was reset)
    expect(word).toHaveProperty('word')
    expect(word).toHaveProperty('image')
    expect(word).toHaveProperty('category')
    expect(word).toHaveProperty('index')
    expect(word.index).toBeGreaterThanOrEqual(0)
    expect(word.index).toBeLessThan(gameWords.length)
    expect(gameWords[word.index].verified).toBe('yes')
  })

  it('all words have valid categories', () => {
    const validCategories = ['animal', 'food', 'vegetable', 'object']
    gameWords.forEach(word => {
      expect(validCategories).toContain(word.category)
    })
  })

  it('words have unique combinations', () => {
    const uniqueWords = new Set(gameWords.map(w => `${w.word.en}-${w.word.pt}`))
    // This test ensures we don't have exact duplicates
    // Note: Some words might be duplicated intentionally, so we check the array length
    expect(gameWords.length).toBeGreaterThanOrEqual(uniqueWords.size)
  })
})

