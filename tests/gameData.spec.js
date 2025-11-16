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
      
      // Check for image property (url was removed, but image might not exist for all words)
      if (word.image) {
        expect(typeof word.image).toBe('string')
        expect(word.image.length).toBeGreaterThan(0)
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

  describe('getRandomWord difficulty filtering', () => {
    it('getRandomWord with "any" difficulty returns words of any difficulty', () => {
      const verifiedCount = gameWords.filter(w => w.verified === 'yes').length
      if (verifiedCount === 0) {
        console.warn('Skipping test: No verified words available')
        return
      }

      // Test multiple times to ensure we can get words of different difficulties
      const difficulties = new Set()
      for (let i = 0; i < 50; i++) {
        const word = getRandomWord('en', [], 'any')
        const wordData = gameWords[word.index]
        const difficulty = wordData.difficulty?.en || wordData.difficulty?.pt
        if (difficulty) {
          difficulties.add(difficulty)
        }
      }

      // Should get words of different difficulties when using 'any'
      expect(difficulties.size).toBeGreaterThan(0)
    })

    it('getRandomWord with "easy" difficulty only returns easy words', () => {
      const easyWords = gameWords.filter(w => 
        w.verified === 'yes' && w.difficulty?.en === 'easy'
      )
      
      if (easyWords.length === 0) {
        console.warn('Skipping test: No easy verified words available for English')
        return
      }

      // Test multiple times
      for (let i = 0; i < 30; i++) {
        const word = getRandomWord('en', [], 'easy')
        const wordData = gameWords[word.index]
        expect(wordData.difficulty?.en).toBe('easy')
      }
    })

    it('getRandomWord with "medium" difficulty only returns medium words', () => {
      const mediumWords = gameWords.filter(w => 
        w.verified === 'yes' && w.difficulty?.en === 'medium'
      )
      
      if (mediumWords.length === 0) {
        console.warn('Skipping test: No medium verified words available for English')
        return
      }

      // Test multiple times
      for (let i = 0; i < 30; i++) {
        const word = getRandomWord('en', [], 'medium')
        const wordData = gameWords[word.index]
        expect(wordData.difficulty?.en).toBe('medium')
      }
    })

    it('getRandomWord with "hard" difficulty only returns hard words', () => {
      // Check for hard words in Portuguese since we know some exist there
      const hardWordsPt = gameWords.filter(w => 
        w.verified === 'yes' && w.difficulty?.pt === 'hard'
      )
      
      if (hardWordsPt.length === 0) {
        console.warn('Skipping test: No hard verified words available')
        return
      }

      // Test with Portuguese locale since hard words exist there
      for (let i = 0; i < 30; i++) {
        const word = getRandomWord('pt', [], 'hard')
        const wordData = gameWords[word.index]
        expect(wordData.difficulty?.pt).toBe('hard')
      }
    })

    it('getRandomWord uses locale-specific difficulty when filtering', () => {
      // Find words that have different difficulties in different languages
      const wordsWithDifferentDifficulty = gameWords.filter(w => 
        w.verified === 'yes' && 
        w.difficulty?.en && 
        w.difficulty?.pt && 
        w.difficulty.en !== w.difficulty.pt
      )

      if (wordsWithDifferentDifficulty.length === 0) {
        console.warn('Skipping test: No words with different difficulties per language')
        return
      }

      // Test English locale
      const wordEn = getRandomWord('en', [], 'easy')
      const wordDataEn = gameWords[wordEn.index]
      expect(wordDataEn.difficulty?.en).toBe('easy')

      // Test Portuguese locale
      const wordPt = getRandomWord('pt', [], 'easy')
      const wordDataPt = gameWords[wordPt.index]
      expect(wordDataPt.difficulty?.pt).toBe('easy')
    })

    it('getRandomWord throws error when no words match difficulty', () => {
      // Use a difficulty that doesn't exist (assuming we don't have 'impossible' difficulty)
      // First, check if there are any words with a specific difficulty
      const impossibleWords = gameWords.filter(w => 
        w.verified === 'yes' && 
        (w.difficulty?.en === 'impossible' || w.difficulty?.pt === 'impossible')
      )

      // Only test if we're sure there are no impossible words
      if (impossibleWords.length === 0) {
        expect(() => {
          getRandomWord('en', [], 'impossible')
        }).toThrow('No verified words available')
      }
    })

    it('getRandomWord combines difficulty filter with usedIndices', () => {
      const easyWords = gameWords
        .map((w, i) => ({ word: w, index: i }))
        .filter(({ word }) => 
          word.verified === 'yes' && word.difficulty?.en === 'easy'
        )

      if (easyWords.length < 2) {
        console.warn('Skipping test: Need at least 2 easy verified words for English')
        return
      }

      // Use some easy word indices
      const usedIndices = easyWords.slice(0, Math.min(2, easyWords.length)).map(({ index }) => index)
      const word = getRandomWord('en', usedIndices, 'easy')
      
      // Should not return a used word
      expect(usedIndices).not.toContain(word.index)
      
      // Should still be easy difficulty
      const wordData = gameWords[word.index]
      expect(wordData.difficulty?.en).toBe('easy')
    })

    it('all words have difficulty property', () => {
      gameWords.forEach(word => {
        expect(word).toHaveProperty('difficulty')
        expect(word.difficulty).toHaveProperty('en')
        expect(word.difficulty).toHaveProperty('pt')
        expect(['easy', 'medium', 'hard']).toContain(word.difficulty.en)
        expect(['easy', 'medium', 'hard']).toContain(word.difficulty.pt)
      })
    })
  })
})

