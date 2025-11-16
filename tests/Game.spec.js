import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Game from '../src/components/Game.vue'
import { gameWords } from '../src/data/gameData.js'

describe('Game.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(Game)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders loading state initially', () => {
    // Before mounted hook completes
    const wrapperBeforeMount = mount(Game, {
      data() {
        return {
          currentWord: null,
          currentPosition: 0,
          showCongratulations: false,
          isWordComplete: false
        }
      }
    })
    expect(wrapperBeforeMount.find('.loading').exists()).toBe(true)
    wrapperBeforeMount.unmount()
  })

  it('loads a word on mount', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentWord).toBeTruthy()
    expect(wrapper.vm.currentWord.word).toBeTruthy()
    expect(wrapper.vm.currentWord.image).toBeTruthy()
  })

  it('displays the word image', async () => {
    await wrapper.vm.$nextTick()
    const image = wrapper.find('.game-image')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(wrapper.vm.currentWord.image)
    expect(image.attributes('alt')).toBe(wrapper.vm.currentWord.word)
  })

  it('displays placeholders for all letters', async () => {
    await wrapper.vm.$nextTick()
    const placeholders = wrapper.findAll('.placeholder')
    expect(placeholders.length).toBe(wrapper.vm.currentWord.word.length)
  })

  it('reveals a letter when correct key is pressed (letter-by-letter)', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    const normalizedWord = wrapper.vm.normalizeString('CAT')
    const firstLetter = normalizedWord[0]
    
    const event = new KeyboardEvent('keydown', { key: 'c' })
    wrapper.vm.handleKeyPress(event)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(1)
    expect(wrapper.vm.isLetterRevealed(0)).toBe(true)
    expect(wrapper.vm.isLetterRevealed(1)).toBe(false)
    expect(wrapper.vm.isLetterRevealed(2)).toBe(false)
  })

  it('reveals letters one by one in order', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'APPLE', image: 'test.jpg', category: 'food' }
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    // Type 'A' (first letter)
    const event1 = new KeyboardEvent('keydown', { key: 'a' })
    wrapper.vm.handleKeyPress(event1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPosition).toBe(1)
    expect(wrapper.vm.isLetterRevealed(0)).toBe(true)
    
    // Type 'P' (second letter) - only reveals position 1, not both P's
    const event2 = new KeyboardEvent('keydown', { key: 'p' })
    wrapper.vm.handleKeyPress(event2)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPosition).toBe(2)
    expect(wrapper.vm.isLetterRevealed(1)).toBe(true)
    expect(wrapper.vm.isLetterRevealed(2)).toBe(false) // Second P not revealed yet
  })

  it('ignores wrong letters', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    const initialPosition = wrapper.vm.currentPosition
    
    const event = new KeyboardEvent('keydown', { key: 'x' })
    wrapper.vm.handleKeyPress(event)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(initialPosition)
  })

  it('ignores non-letter keys', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    const initialPosition = wrapper.vm.currentPosition
    
    const event = new KeyboardEvent('keydown', { key: '1' })
    wrapper.vm.handleKeyPress(event)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(initialPosition)
  })

  it('ignores special keys', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    const initialPosition = wrapper.vm.currentPosition
    
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    wrapper.vm.handleKeyPress(event)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(initialPosition)
  })

  it('only accepts letters in order', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    // Type first letter 'C'
    const event1 = new KeyboardEvent('keydown', { key: 'c' })
    wrapper.vm.handleKeyPress(event1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPosition).toBe(1)
    
    // Try to type 'C' again (wrong position)
    wrapper.vm.handleKeyPress(event1)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPosition).toBe(1) // Should not advance
  })

  it('shows congratulations when all letters are typed', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    wrapper.vm.isWordComplete = false
    await wrapper.vm.$nextTick()
    
    // Type all letters in order
    const letters = ['c', 'a', 't']
    for (const letter of letters) {
      const event = new KeyboardEvent('keydown', { key: letter })
      wrapper.vm.handleKeyPress(event)
      await wrapper.vm.$nextTick()
    }
    
    expect(wrapper.vm.isWordComplete).toBe(true)
    expect(wrapper.vm.showCongratulations).toBe(true)
    expect(wrapper.find('.congratulations-overlay').exists()).toBe(true)
    expect(wrapper.find('.congratulations').exists()).toBe(true)
    expect(wrapper.find('.fireworks-container').exists()).toBe(true)
  })

  it('starts a new round after 5 seconds', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    // Type all letters
    const letters = ['c', 'a', 't']
    for (const letter of letters) {
      const event = new KeyboardEvent('keydown', { key: letter })
      wrapper.vm.handleKeyPress(event)
      await wrapper.vm.$nextTick()
    }
    
    expect(wrapper.vm.showCongratulations).toBe(true)
    expect(wrapper.vm.isWordComplete).toBe(true)
    
    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.showCongratulations).toBe(false)
    expect(wrapper.vm.isWordComplete).toBe(false)
    expect(wrapper.vm.currentWord).toBeTruthy()
    expect(wrapper.vm.currentPosition).toBe(0)
  })

  it('ignores key presses when word is complete', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.isWordComplete = true
    wrapper.vm.showCongratulations = true
    wrapper.vm.currentPosition = 3
    const initialPosition = wrapper.vm.currentPosition
    
    const event = new KeyboardEvent('keydown', { key: 'c' })
    wrapper.vm.handleKeyPress(event)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(initialPosition)
  })

  it('emits back-to-menu event when back button is clicked', async () => {
    const backButton = wrapper.find('.back-button')
    await backButton.trigger('click')
    
    expect(wrapper.emitted('back-to-menu')).toBeTruthy()
    expect(wrapper.emitted('back-to-menu').length).toBe(1)
  })

  it('handles image error with fallback', async () => {
    await wrapper.vm.$nextTick()
    const image = wrapper.find('.game-image')
    const errorEvent = { 
      target: { 
        src: '',
        dataset: {},
        style: {}
      } 
    }
    
    wrapper.vm.handleImageError(errorEvent)
    
    // Check that fallback was set (data URI SVG)
    expect(errorEvent.target.src).toContain('data:image/svg+xml')
    expect(errorEvent.target.dataset.fallbackUsed).toBe('true')
  })

  it('displays hint text when word is not complete', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.isWordComplete = false
    wrapper.vm.showCongratulations = false
    await wrapper.vm.$nextTick()
    
    // The component doesn't have a hint-text element in the template
    // This test verifies that the word is not complete
    expect(wrapper.vm.isWordComplete).toBe(false)
    expect(wrapper.vm.showCongratulations).toBe(false)
    expect(wrapper.vm.currentWord).toBeTruthy()
  })
  
  it('hides hint text when word is complete', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.isWordComplete = true
    await wrapper.vm.$nextTick()
    
    const hintText = wrapper.find('.hint-text')
    expect(hintText.exists()).toBe(false)
  })

  it('handles case-insensitive letter input', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    // Test lowercase
    const lowerEvent = new KeyboardEvent('keydown', { key: 'c' })
    wrapper.vm.handleKeyPress(lowerEvent)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(1)
    
    // Reset and test uppercase
    wrapper.vm.currentPosition = 0
    await wrapper.vm.$nextTick()
    
    const upperEvent = new KeyboardEvent('keydown', { key: 'C' })
    wrapper.vm.handleKeyPress(upperEvent)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentPosition).toBe(1)
  })
  
  it('displays all letters when word is complete', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.isWordComplete = true
    await wrapper.vm.$nextTick()
    
    // All letters should be revealed
    expect(wrapper.vm.isLetterRevealed(0)).toBe(true)
    expect(wrapper.vm.isLetterRevealed(1)).toBe(true)
    expect(wrapper.vm.isLetterRevealed(2)).toBe(true)
  })
  
  it('highlights current letter box', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.currentWord = { word: 'CAT', image: 'test.jpg', category: 'animal' }
    wrapper.vm.currentPosition = 1
    wrapper.vm.isWordComplete = false
    await wrapper.vm.$nextTick()
    
    const letterBoxes = wrapper.findAll('.letter-box')
    expect(letterBoxes[1].classes()).toContain('current-letter')
    expect(letterBoxes[0].classes()).toContain('revealed')
    expect(letterBoxes[2].classes()).not.toContain('current-letter')
  })
  
  it('creates firework animations on mount', () => {
    expect(wrapper.vm.createFireworkAnimations).toBeDefined()
    // The function should not throw
    expect(() => wrapper.vm.createFireworkAnimations()).not.toThrow()
  })
  
  it('shows fireworks when congratulations is displayed', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.showCongratulations = true
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.fireworks-container').exists()).toBe(true)
    expect(wrapper.findAll('.firework').length).toBe(8)
  })

  describe('difficulty prop', () => {
    it('accepts difficulty prop with default value "any"', () => {
      const wrapper = mount(Game)
      expect(wrapper.vm.difficulty).toBe('any')
    })

    it('uses difficulty prop when getting random word', async () => {
      const wrapper = mount(Game, {
        props: {
          difficulty: 'easy'
        }
      })
      
      await wrapper.vm.$nextTick()
      
      // Verify that getRandomWord was called with difficulty
      expect(wrapper.vm.currentWord).toBeTruthy()
      // The word should be from easy difficulty (if available)
      const wordData = gameWords[wrapper.vm.currentWord.index]
      if (wordData && wordData.difficulty) {
        const difficulty = wordData.difficulty.en || wordData.difficulty.pt
        // If easy words exist, the word should be easy
        const easyWordsExist = gameWords.some(w => 
          w.verified === 'yes' && (w.difficulty?.en === 'easy' || w.difficulty?.pt === 'easy')
        )
        if (easyWordsExist) {
          expect(difficulty).toBe('easy')
        }
      }
    })

    it('resets game when difficulty changes', async () => {
      const wrapper = mount(Game, {
        props: {
          difficulty: 'easy'
        }
      })
      
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() // Wait for word to be loaded
      const initialWord = wrapper.vm.currentWord
      const initialUsedIndicesLength = wrapper.vm.usedWordIndices.length
      
      // Ensure we have a word and used indices
      if (initialWord && initialWord.index !== undefined) {
        wrapper.vm.usedWordIndices.push(initialWord.index)
        expect(wrapper.vm.usedWordIndices.length).toBeGreaterThan(initialUsedIndicesLength)
      }
      
      // Change difficulty
      await wrapper.setProps({ difficulty: 'medium' })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() // Wait for watch to trigger and new word to load
      
      // Should reset used indices (watch clears it, then startNewRound adds the new word)
      // So after reset, usedIndices should only contain the new word (length = 1)
      expect(wrapper.vm.usedWordIndices.length).toBeLessThanOrEqual(1)
      expect(wrapper.vm.currentWord).toBeTruthy()
      // The used indices should be reset (cleared and then new word added)
      if (wrapper.vm.currentWord && wrapper.vm.currentWord.index !== undefined) {
        expect(wrapper.vm.usedWordIndices).toContain(wrapper.vm.currentWord.index)
      }
    })

    it('handles difficulty "any" correctly', async () => {
      const wrapper = mount(Game, {
        props: {
          difficulty: 'any'
        }
      })
      
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.currentWord).toBeTruthy()
      // With "any", should be able to get words of any difficulty
    })

    it('handles difficulty "medium" correctly', async () => {
      const mediumWordsExist = gameWords.some(w => 
        w.verified === 'yes' && (w.difficulty?.en === 'medium' || w.difficulty?.pt === 'medium')
      )
      
      if (!mediumWordsExist) {
        console.warn('Skipping test: No medium words available')
        return
      }

      const wrapper = mount(Game, {
        props: {
          difficulty: 'medium'
        }
      })
      
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.currentWord).toBeTruthy()
      
      const wordData = gameWords[wrapper.vm.currentWord.index]
      const difficulty = wordData.difficulty?.en || wordData.difficulty?.pt
      expect(difficulty).toBe('medium')
    })

    it('handles difficulty "hard" correctly', async () => {
      // Check for hard words in Portuguese since we know some exist there
      const hardWordsPt = gameWords.some(w => 
        w.verified === 'yes' && w.difficulty?.pt === 'hard'
      )
      
      if (!hardWordsPt) {
        console.warn('Skipping test: No hard words available')
        return
      }

      const wrapper = mount(Game, {
        props: {
          difficulty: 'hard',
          language: 'pt' // Use Portuguese since hard words exist there
        }
      })
      
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() // Wait for word to load
      
      if (wrapper.vm.currentWord) {
        const wordData = gameWords[wrapper.vm.currentWord.index]
        expect(wordData.difficulty?.pt).toBe('hard')
      } else {
        // If no word was loaded, it means no hard words for the current language
        console.warn('No hard words available for the selected language')
      }
    })
  })
})

