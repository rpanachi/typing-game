import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainMenu from '../src/components/MainMenu.vue'

describe('MainMenu.vue', () => {
  it('renders the game title', () => {
    const wrapper = mount(MainMenu)
    expect(wrapper.text()).toContain('Kids Typing Game')
  })

  it('renders New Game button', () => {
    const wrapper = mount(MainMenu)
    const newGameButton = wrapper.find('.new-game')
    expect(newGameButton.exists()).toBe(true)
    expect(newGameButton.text()).toBe('New Game')
  })

  it('renders How to Play button', () => {
    const wrapper = mount(MainMenu)
    const howToPlayButton = wrapper.find('.how-to-play')
    expect(howToPlayButton.exists()).toBe(true)
    expect(howToPlayButton.text()).toBe('How to Play')
  })

  it('emits start-game event when New Game button is clicked', async () => {
    const wrapper = mount(MainMenu)
    const newGameButton = wrapper.find('.new-game')
    
    await newGameButton.trigger('click')
    
    expect(wrapper.emitted('start-game')).toBeTruthy()
    expect(wrapper.emitted('start-game').length).toBe(1)
  })

  it('emits show-instructions event when How to Play button is clicked', async () => {
    const wrapper = mount(MainMenu)
    const howToPlayButton = wrapper.find('.how-to-play')
    
    await howToPlayButton.trigger('click')
    
    expect(wrapper.emitted('show-instructions')).toBeTruthy()
    expect(wrapper.emitted('show-instructions').length).toBe(1)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(MainMenu)
    expect(wrapper.find('.main-menu').exists()).toBe(true)
    expect(wrapper.find('.menu-container').exists()).toBe(true)
    expect(wrapper.find('.button-container').exists()).toBe(true)
  })
})

