import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('Integration Tests', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(App)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('complete flow: menu -> game -> type word letter-by-letter -> congratulations -> new round', async () => {
    // Start at menu
    expect(wrapper.find('.main-menu').exists()).toBe(true)
    
    // Click New Game
    const newGameButton = wrapper.find('.new-game')
    await newGameButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Should be in game view
    const game = wrapper.findComponent({ name: 'Game' })
    expect(game.exists()).toBe(true)
    
    // Wait for game to load
    await wrapper.vm.$nextTick()
    await game.vm.$nextTick()
    
    // Get the current word
    const currentWord = game.vm.currentWord
    expect(currentWord).toBeTruthy()
    
    // Type all letters one by one in order
    const normalizedWord = game.vm.normalizeString(currentWord.word)
    for (let i = 0; i < normalizedWord.length; i++) {
      const letter = normalizedWord[i]
      const event = new KeyboardEvent('keydown', { key: letter.toLowerCase() })
      game.vm.handleKeyPress(event)
      await game.vm.$nextTick()
      
      // Verify position advanced
      expect(game.vm.currentPosition).toBe(i + 1)
    }
    
    // Should show congratulations
    expect(game.vm.isWordComplete).toBe(true)
    expect(game.vm.showCongratulations).toBe(true)
    expect(game.find('.congratulations-overlay').exists()).toBe(true)
    expect(game.find('.congratulations').exists()).toBe(true)
    expect(game.find('.fireworks-container').exists()).toBe(true)
    
    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000)
    await game.vm.$nextTick()
    
    // Should start new round
    expect(game.vm.showCongratulations).toBe(false)
    expect(game.vm.isWordComplete).toBe(false)
    expect(game.vm.currentWord).toBeTruthy()
    expect(game.vm.currentPosition).toBe(0)
  })

  it('complete flow: menu -> instructions -> back to menu', async () => {
    // Start at menu
    expect(wrapper.find('.main-menu').exists()).toBe(true)
    
    // Click How to Play
    const howToPlayButton = wrapper.find('.how-to-play')
    await howToPlayButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Should be in instructions view
    const howToPlay = wrapper.findComponent({ name: 'HowToPlay' })
    expect(howToPlay.exists()).toBe(true)
    
    // Click back button
    const backButton = howToPlay.find('.back-button')
    await backButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Should be back at menu
    expect(wrapper.find('.main-menu').exists()).toBe(true)
  })

  it('complete flow: menu -> game -> back to menu', async () => {
    // Start at menu
    expect(wrapper.find('.main-menu').exists()).toBe(true)
    
    // Click New Game
    const newGameButton = wrapper.find('.new-game')
    await newGameButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Should be in game view
    const game = wrapper.findComponent({ name: 'Game' })
    expect(game.exists()).toBe(true)
    
    // Click back button
    const backButton = game.find('.back-button')
    await backButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Should be back at menu
    expect(wrapper.find('.main-menu').exists()).toBe(true)
  })

  it('handles multiple game rounds correctly', async () => {
    // Start game
    const newGameButton = wrapper.find('.new-game')
    await newGameButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    const game = wrapper.findComponent({ name: 'Game' })
    await game.vm.$nextTick()
    
    // Play first round - type letters one by one
    let currentWord = game.vm.currentWord
    const normalizedWord1 = game.vm.normalizeString(currentWord.word)
    for (let i = 0; i < normalizedWord1.length; i++) {
      const letter = normalizedWord1[i]
      const event = new KeyboardEvent('keydown', { key: letter.toLowerCase() })
      game.vm.handleKeyPress(event)
      await game.vm.$nextTick()
    }
    
    expect(game.vm.isWordComplete).toBe(true)
    expect(game.vm.showCongratulations).toBe(true)
    
    // Fast-forward to next round (5 seconds)
    vi.advanceTimersByTime(5000)
    await game.vm.$nextTick()
    
    // Play second round
    currentWord = game.vm.currentWord
    const normalizedWord2 = game.vm.normalizeString(currentWord.word)
    for (let i = 0; i < normalizedWord2.length; i++) {
      const letter = normalizedWord2[i]
      const event = new KeyboardEvent('keydown', { key: letter.toLowerCase() })
      game.vm.handleKeyPress(event)
      await game.vm.$nextTick()
    }
    
    expect(game.vm.isWordComplete).toBe(true)
    expect(game.vm.showCongratulations).toBe(true)
  })
})

