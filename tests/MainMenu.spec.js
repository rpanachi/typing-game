import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainMenu from '../src/components/MainMenu.vue'

describe('MainMenu.vue', () => {
  it('renders the game title', () => {
    const wrapper = mount(MainMenu)
    expect(wrapper.text()).toContain('TYPING GAME')
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

  it('renders language selector', () => {
    const wrapper = mount(MainMenu)
    expect(wrapper.find('.language-selector').exists()).toBe(true)
    expect(wrapper.find('#language-select').exists()).toBe(true)
  })

  it('renders difficulty selector', () => {
    const wrapper = mount(MainMenu)
    expect(wrapper.find('.difficulty-selector').exists()).toBe(true)
    expect(wrapper.find('#difficulty-select').exists()).toBe(true)
  })

  it('displays difficulty options', () => {
    const wrapper = mount(MainMenu)
    const select = wrapper.find('#difficulty-select')
    const options = select.findAll('option')
    
    expect(options.length).toBe(4)
    expect(options[0].text()).toBe('Any')
    expect(options[1].text()).toBe('Easy')
    expect(options[2].text()).toBe('Medium')
    expect(options[3].text()).toBe('Hard')
  })

  it('uses selectedDifficulty prop', () => {
    const wrapper = mount(MainMenu, {
      props: {
        selectedDifficulty: 'easy'
      }
    })
    
    const select = wrapper.find('#difficulty-select')
    expect(select.element.value).toBe('easy')
  })

  it('defaults to "any" difficulty when no prop provided', () => {
    const wrapper = mount(MainMenu)
    const select = wrapper.find('#difficulty-select')
    expect(select.element.value).toBe('any')
  })

  it('emits change-difficulty event when difficulty changes', async () => {
    const wrapper = mount(MainMenu)
    const select = wrapper.find('#difficulty-select')
    
    await select.setValue('medium')
    
    expect(wrapper.emitted('change-difficulty')).toBeTruthy()
    expect(wrapper.emitted('change-difficulty').length).toBe(1)
    expect(wrapper.emitted('change-difficulty')[0]).toEqual(['medium'])
  })

  it('emits change-difficulty event for all difficulty options', async () => {
    const wrapper = mount(MainMenu)
    const select = wrapper.find('#difficulty-select')
    const difficulties = ['any', 'easy', 'medium', 'hard']
    
    for (const difficulty of difficulties) {
      await select.setValue(difficulty)
      const emitted = wrapper.emitted('change-difficulty')
      expect(emitted).toBeTruthy()
      const lastEmitted = emitted[emitted.length - 1]
      expect(lastEmitted).toEqual([difficulty])
    }
  })

  it('displays translated difficulty labels based on language', () => {
    const wrapperEn = mount(MainMenu, {
      props: {
        currentLanguage: 'en'
      }
    })
    
    const wrapperPt = mount(MainMenu, {
      props: {
        currentLanguage: 'pt'
      }
    })
    
    const selectEn = wrapperEn.find('#difficulty-select')
    const selectPt = wrapperPt.find('#difficulty-select')
    
    // English labels
    expect(selectEn.find('option[value="any"]').text()).toBe('Any')
    expect(selectEn.find('option[value="easy"]').text()).toBe('Easy')
    
    // Portuguese labels
    expect(selectPt.find('option[value="any"]').text()).toBe('Qualquer')
    expect(selectPt.find('option[value="easy"]').text()).toBe('Fácil')
  })
})

