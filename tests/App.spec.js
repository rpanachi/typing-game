import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import MainMenu from '../src/components/MainMenu.vue'
import Game from '../src/components/Game.vue'
import HowToPlay from '../src/components/HowToPlay.vue'

describe('App.vue', () => {
  it('renders MainMenu by default', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(MainMenu).exists()).toBe(true)
    expect(wrapper.findComponent(Game).exists()).toBe(false)
    expect(wrapper.findComponent(HowToPlay).exists()).toBe(false)
  })

  it('switches to Game view when start-game event is emitted', async () => {
    const wrapper = mount(App)
    const mainMenu = wrapper.findComponent(MainMenu)
    
    await mainMenu.vm.$emit('start-game')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent(MainMenu).exists()).toBe(false)
    expect(wrapper.findComponent(Game).exists()).toBe(true)
    expect(wrapper.findComponent(HowToPlay).exists()).toBe(false)
  })

  it('switches to HowToPlay view when show-instructions event is emitted', async () => {
    const wrapper = mount(App)
    const mainMenu = wrapper.findComponent(MainMenu)
    
    await mainMenu.vm.$emit('show-instructions')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent(MainMenu).exists()).toBe(false)
    expect(wrapper.findComponent(Game).exists()).toBe(false)
    expect(wrapper.findComponent(HowToPlay).exists()).toBe(true)
  })

  it('switches back to MainMenu from Game view', async () => {
    const wrapper = mount(App)
    
    // Start game
    await wrapper.findComponent(MainMenu).vm.$emit('start-game')
    await wrapper.vm.$nextTick()
    
    // Go back to menu
    const game = wrapper.findComponent(Game)
    await game.vm.$emit('back-to-menu')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent(MainMenu).exists()).toBe(true)
    expect(wrapper.findComponent(Game).exists()).toBe(false)
  })

  it('switches back to MainMenu from HowToPlay view', async () => {
    const wrapper = mount(App)
    
    // Show instructions
    await wrapper.findComponent(MainMenu).vm.$emit('show-instructions')
    await wrapper.vm.$nextTick()
    
    // Go back to menu
    const howToPlay = wrapper.findComponent(HowToPlay)
    await howToPlay.vm.$emit('back-to-menu')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent(MainMenu).exists()).toBe(true)
    expect(wrapper.findComponent(HowToPlay).exists()).toBe(false)
  })
})

