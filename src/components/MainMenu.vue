<template>
  <div class="main-menu">
    <div class="menu-container">
      <h1 class="game-title">🎮 Kids Typing Game 🎮</h1>
      
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
    }
  },
  emits: ['start-game', 'show-instructions', 'change-language'],
  methods: {
    t(key) {
      return translate(key, this.currentLanguage)
    },
    handleLanguageChange(event) {
      this.$emit('change-language', event.target.value)
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

.language-selector {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.language-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.language-select {
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

.language-select:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.language-select:focus {
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

