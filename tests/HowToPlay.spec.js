import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HowToPlay from '../src/components/HowToPlay.vue'

describe('HowToPlay.vue', () => {
  it('renders the instructions title', () => {
    const wrapper = mount(HowToPlay)
    expect(wrapper.text()).toContain('How to Play')
  })

  it('renders instruction text', () => {
    const wrapper = mount(HowToPlay)
    // Check that actual instructions are rendered (not placeholder)
    expect(wrapper.text()).toContain('How to Play')
    expect(wrapper.find('.instructions-content').exists()).toBe(true)
    expect(wrapper.find('.instruction-text').exists()).toBe(true)
  })

  it('renders back button', () => {
    const wrapper = mount(HowToPlay)
    const backButton = wrapper.find('.back-button')
    expect(backButton.exists()).toBe(true)
    expect(backButton.text()).toContain('Back to Menu')
  })

  it('emits back-to-menu event when back button is clicked', async () => {
    const wrapper = mount(HowToPlay)
    const backButton = wrapper.find('.back-button')
    
    await backButton.trigger('click')
    
    expect(wrapper.emitted('back-to-menu')).toBeTruthy()
    expect(wrapper.emitted('back-to-menu').length).toBe(1)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(HowToPlay)
    expect(wrapper.find('.how-to-play').exists()).toBe(true)
    expect(wrapper.find('.instructions-container').exists()).toBe(true)
    expect(wrapper.find('.instructions-title').exists()).toBe(true)
  })
})

