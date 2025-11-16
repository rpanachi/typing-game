<template>
  <div class="how-to-play">
    <div class="instructions-container">
      <h1 class="instructions-title">📖 {{ t('instructionsTitle') }}</h1>
      <div class="instructions-content">
        <p class="instruction-text">
          {{ t('instruction1') }}
        </p>
        <p class="instruction-text">
          {{ t('instruction2') }}
        </p>
        <p class="instruction-text">
          {{ t('instruction3') }}
        </p>
        <p class="instruction-text highlight">
          {{ t('instruction4') }}
        </p>
      </div>
      <button class="back-button" @click="$emit('back-to-menu')">
        {{ t('backToMenu') }}
      </button>
    </div>
  </div>
</template>

<script>
import { t as translate } from '../utils/translations.js'

export default {
  name: 'HowToPlay',
  props: {
    language: {
      type: String,
      default: 'en'
    }
  },
  emits: ['back-to-menu'],
  methods: {
    t(key) {
      return translate(key, this.language)
    }
  }
}
</script>

<style scoped>
.how-to-play {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 20px;
}

.instructions-container {
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}

.instructions-title {
  font-size: 2.5rem;
  color: #f5576c;
  margin: 0 0 30px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.instructions-content {
  margin-bottom: 40px;
  min-height: 200px;
}

.instruction-text {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
  margin: 15px 0;
}

.instruction-text.highlight {
  color: #f5576c;
  font-weight: bold;
  font-size: 1.3rem;
  margin-top: 25px;
}

.back-button {
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.back-button:active {
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .instructions-title {
    font-size: 2rem;
  }
  
  .instruction-text {
    font-size: 1rem;
  }
  
  .instruction-text.highlight {
    font-size: 1.1rem;
  }
}
</style>

