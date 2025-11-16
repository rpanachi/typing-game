<template>
  <div id="app">
    <MainMenu 
      v-if="currentView === 'menu'" 
      :current-language="currentLanguage"
      @start-game="startGame"
      @show-instructions="showInstructions"
      @change-language="changeLanguage"
    />
    <Game 
      v-else-if="currentView === 'game'"
      :language="currentLanguage"
      @back-to-menu="backToMenu"
    />
    <HowToPlay 
      v-else-if="currentView === 'instructions'"
      :language="currentLanguage"
      @back-to-menu="backToMenu"
    />
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import Game from './components/Game.vue'
import HowToPlay from './components/HowToPlay.vue'
import { getCurrentLanguage, saveLanguagePreference } from './utils/language.js'

export default {
  name: 'App',
  components: {
    MainMenu,
    Game,
    HowToPlay
  },
  data() {
    return {
      currentView: 'menu',
      currentLanguage: getCurrentLanguage()
    }
  },
  methods: {
    startGame() {
      this.currentView = 'game'
    },
    showInstructions() {
      this.currentView = 'instructions'
    },
    backToMenu() {
      this.currentView = 'menu'
    },
    changeLanguage(langCode) {
      this.currentLanguage = langCode
      saveLanguagePreference(langCode)
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  width: 100%;
}
</style>

