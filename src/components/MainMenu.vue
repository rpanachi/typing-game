<template>
  <div class="main-menu">
    <div class="menu-container">
      <h1 class="game-title">TYPING GAME</h1>
      <h2 class="game-title">⌨️ ⌨️ ⌨️ ⌨️ ⌨️</h2>
      
      <div class="language-selector">
        <label for="language-select" class="language-label">🌐 {{ t('language') }}</label>
        <select 
          id="language-select" 
          class="language-select"
          :value="currentLanguage"
          @change="handleLanguageChange"
        >
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>
      
      <div class="difficulty-selector">
        <label for="difficulty-select" class="difficulty-label">⚡ {{ t('difficulty') }}</label>
        <select 
          id="difficulty-select" 
          class="difficulty-select"
          :value="selectedDifficulty"
          @change="handleDifficultyChange"
        >
          <option value="any">{{ t('difficultyAny') }}</option>
          <option value="easy">{{ t('difficultyEasy') }}</option>
          <option value="medium">{{ t('difficultyMedium') }}</option>
          <option value="hard">{{ t('difficultyHard') }}</option>
        </select>
      </div>
      
      <div class="button-container">
        <button class="menu-button new-game" @click="$emit('start-game')">
          {{ t('newGame') }}
        </button>
        <button class="menu-button how-to-play" @click="$emit('show-instructions')">
          {{ t('howToPlay') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { t as translate } from '../utils/translations.js'

export default {
  name: 'MainMenu',
  props: {
    currentLanguage: {
      type: String,
      default: 'en'
    },
    selectedDifficulty: {
      type: String,
      default: 'any'
    }
  },
  emits: ['start-game', 'show-instructions', 'change-language', 'change-difficulty'],
  methods: {
    t(key) {
      return translate(key, this.currentLanguage)
    },
    handleLanguageChange(event) {
      this.$emit('change-language', event.target.value)
    },
    handleDifficultyChange(event) {
      this.$emit('change-difficulty', event.target.value)
    }
  }
}
</script>

<style scoped>
.main-menu {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.menu-container {
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.game-title {
  font-size: 3rem;
  color: #667eea;
  margin: 0 0 30px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.language-selector,
.difficulty-selector {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.language-label,
.difficulty-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.language-select,
.difficulty-select {
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid #667eea;
  border-radius: 10px;
  background: white;
  color: #667eea;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  min-width: 150px;
}

.language-select:hover,
.difficulty-select:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.language-select:focus,
.difficulty-select:focus {
  outline: none;
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-button {
  padding: 20px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.menu-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.menu-button:active {
  transform: translateY(-1px);
}

.new-game {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.how-to-play {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

@media (max-width: 600px) {
  .game-title {
    font-size: 2rem;
  }
  
  .menu-button {
    font-size: 1.2rem;
    padding: 15px 30px;
  }
}
</style>

