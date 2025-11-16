<template>
  <div class="game-container" @keydown="handleKeyPress" tabindex="0">
    <button class="back-button" @click="$emit('back-to-menu')">
      {{ t('backToMenu') }}
    </button>
    
    <div v-if="showCongratulations" class="congratulations-overlay">
      <div class="fireworks-container">
        <div class="firework" v-for="n in 8" :key="n" :style="getFireworkStyle(n - 1)">
          <div class="spark" v-for="m in 20" :key="m" :style="getSparkStyle(n - 1, m - 1)"></div>
        </div>
      </div>
      <div class="congratulations">
        <h2>🎉 {{ t('congratulations') }} 🎉</h2>
        <p>{{ t('youGuessedRight') }}</p>
      </div>
    </div>
    
    <div class="game-content">
      <div v-if="currentWord" class="game-area">
        <div class="image-container">
          <img 
            :src="currentWord.image" 
            :alt="currentWord.word"
            class="game-image"
            @error="handleImageError"
          />
        </div>
        
        <div class="letters-container">
          <div 
            v-for="(letter, index) in currentWord.word" 
            :key="index"
            :class="['letter-box', { 
              'current-letter': index === currentPosition && !isWordComplete,
              'revealed': isLetterRevealed(index)
            }]"
          >
            <span v-if="isLetterRevealed(index)" class="letter">
              {{ letter }}
            </span>
            <span v-else class="placeholder">_</span>
          </div>
        </div>
      </div>
      
      <div v-else class="loading">
        <p>{{ t('loadingGame') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomWord } from '../data/gameData.js'
import { t as translate } from '../utils/translations.js'

export default {
  name: 'Game',
  props: {
    language: {
      type: String,
      default: 'en'
    }
  },
  emits: ['back-to-menu'],
  data() {
    return {
      currentWord: null,
      currentPosition: 0, // Track the next position to reveal (letter-by-letter)
      showCongratulations: false,
      isWordComplete: false, // Explicit flag for word completion
      usedWordIndices: [] // Track indices of words that have been shown in this game session
    }
  },
  watch: {
    language() {
      // Reset history and restart game when language changes
      this.usedWordIndices = []
      this.startNewRound()
    }
  },
  mounted() {
    this.startNewRound()
    this.createFireworkAnimations()
    // Focus the container to receive keyboard events
    this.$nextTick(() => {
      if (this.$el) {
        this.$el.focus()
      }
    })
  },
  computed: {
    allLettersRevealed() {
      return this.currentWord && this.currentPosition >= this.currentWord.word.length
    }
  },
  methods: {
    t(key) {
      return translate(key, this.language)
    },
    isLetterRevealed(index) {
      // Show letter if it's been typed OR if word is complete
      if (this.isWordComplete) {
        return true
      }
      return index < this.currentPosition
    },
    startNewRound() {
      try {
        // Get a new word that hasn't been used yet
        const newWord = getRandomWord(this.language, this.usedWordIndices)
        
        // Add the word's index to the history
        if (newWord.index !== undefined) {
          this.usedWordIndices.push(newWord.index)
        }
        
        this.currentWord = newWord
        this.currentPosition = 0
        this.showCongratulations = false
        this.isWordComplete = false
        
        // Reset image error fallback flag for the new image
        this.$nextTick(() => {
          const img = this.$el?.querySelector('.game-image')
          if (img) {
            img.dataset.fallbackUsed = 'false'
            img.style.display = ''
          }
          if (this.$el) {
            this.$el.focus()
          }
        })
      } catch (error) {
        // Handle case where no verified words are available
        console.error('Error starting new round:', error)
        this.currentWord = null
        // Show error message to user
        alert(this.t('noVerifiedWords') || 'No verified words available. Please run the image verification script first.')
      }
    },
    handleKeyPress(event) {
      // Ignore if word is already complete
      if (this.isWordComplete || this.showCongratulations) {
        return
      }
      
      // Handle letter keys (A-Z and Portuguese accented characters)
      // Normalize the key to handle both accented and non-accented versions
      const key = this.normalizeKey(event.key)
      if (!key) {
        return
      }
      
      // Check if we have a current word and haven't completed it
      if (!this.currentWord || !this.currentWord.word) {
        return
      }
      
      // Check if we've already completed the word
      if (this.currentPosition >= this.currentWord.word.length) {
        return
      }
      
      // Normalize the word for comparison (remove accents)
      const normalizedWord = this.normalizeString(this.currentWord.word)
      const currentLetter = normalizedWord[this.currentPosition]
      
      // Check if the typed letter matches the current position's letter
      if (key === currentLetter) {
        // Move to the next position
        this.currentPosition++
        
        // Check if all letters have been typed
        const wordLength = this.currentWord.word.length
        if (this.currentPosition >= wordLength) {
          // Mark word as complete first
          this.isWordComplete = true
          
          // Show congratulations immediately
          this.showCongratulations = true
          
          // After 5 seconds, start a new round
          setTimeout(() => {
            this.startNewRound()
          }, 5000)
        }
      }
      // Wrong letters are ignored as per requirements
    },
    normalizeKey(key) {
      // Convert to uppercase and normalize accented characters
      const normalized = this.normalizeString(key.toUpperCase())
      // Only return if it's a single letter (A-Z after normalization)
      if (normalized.length === 1 && /^[A-Z]$/.test(normalized)) {
        return normalized
      }
      return null
    },
    normalizeString(str) {
      // Remove accents and convert to uppercase for comparison
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    },
    handleImageError(event) {
      // Prevent infinite loop by checking if we've already tried to set a placeholder
      if (event.target.dataset.fallbackUsed) {
        // If placeholder also failed, hide the image
        event.target.style.display = 'none'
        return
      }
      
      // Mark that we've tried a fallback
      event.target.dataset.fallbackUsed = 'true'
      
      // Use a data URI as a simple colored placeholder (no network request needed)
      // This is a 1x1 transparent pixel, we'll let CSS handle the sizing
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4='
    },
    getFireworkStyle(index) {
      // Position fireworks at different locations on screen
      const positions = [
        { left: '20%', top: '20%' },
        { left: '80%', top: '20%' },
        { left: '20%', top: '80%' },
        { left: '80%', top: '80%' },
        { left: '50%', top: '15%' },
        { left: '15%', top: '50%' },
        { left: '85%', top: '50%' },
        { left: '50%', top: '85%' }
      ]
      
      // Ensure index is within bounds
      const safeIndex = Math.max(0, Math.min(index, positions.length - 1))
      const delay = safeIndex * 0.3
      
      return {
        left: positions[safeIndex].left,
        top: positions[safeIndex].top,
        animationDelay: `${delay}s`
      }
    },
    createFireworkAnimations() {
      // Create dynamic keyframe animations for each spark
      if (typeof document === 'undefined') return
      
      const styleSheet = document.createElement('style')
      document.head.appendChild(styleSheet)
      
      // Generate animations for all possible spark combinations
      for (let f = 0; f < 8; f++) {
        for (let s = 0; s < 20; s++) {
          const angle = (s / 20) * 360
          const distance = 80 + Math.random() * 40
          const radian = (angle * Math.PI) / 180
          const x = Math.cos(radian) * distance
          const y = Math.sin(radian) * distance
          
          const keyframes = `
            @keyframes sparkExplode${f}${s} {
              0% {
                transform: translate(0, 0) scale(0);
                opacity: 1;
              }
              50% {
                opacity: 1;
              }
              100% {
                transform: translate(${x}px, ${y}px) scale(1);
                opacity: 0;
              }
            }
          `
          styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length)
        }
      }
    },
    getSparkStyle(fireworkIndex, sparkIndex) {
      // Generate sparks that explode outward from the firework center
      const colors = ['#f5576c', '#4facfe', '#00f2fe', '#f093fb', '#667eea', '#764ba2', '#ffd700', '#ff6b6b', '#51cf66', '#ffa94d']
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = 4 + Math.random() * 4
      
      return {
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: `sparkExplode${fireworkIndex}${sparkIndex} 1.5s ease-out forwards`,
        animationDelay: `${fireworkIndex * 0.3}s`
      }
    }
  }
}
</script>

<style scoped>
.game-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  outline: none;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding-top: 60px;
}

.game-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  width: 100%;
}

.image-container {
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: bounceIn 0.5s ease;
}

.game-image {
  width: 400px;
  height: 400px;
  object-fit: contain;
  border-radius: 15px;
}

.letters-container {
  display: flex;
  gap: 15px;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  width: 100%;
  padding: 10px;
  animation: fadeIn 0.5s ease;
  -webkit-overflow-scrolling: touch;
}

.letters-container::-webkit-scrollbar {
  height: 8px;
}

.letters-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.letters-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.letters-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.letter-box {
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-size: 4rem;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
}

.letter-box.current-letter {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
  animation: pulse 1.5s ease-in-out infinite;
}

.letter-box.revealed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.letter-box:hover {
  transform: scale(1.05);
}

.letter {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: popIn 0.3s ease;
}

.placeholder {
  color: #ccc;
  font-size: 4rem;
}

.hint-text {
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s ease;
}

.congratulations-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4) !important;
  z-index: 9999 !important;
  animation: fadeIn 0.5s ease;
  overflow: hidden;
  pointer-events: auto;
}

.fireworks-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  transform: translate(-50%, -50%);
}

.spark {
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  opacity: 0;
}

.congratulations {
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.5s ease, bounce 2s ease-in-out infinite;
  position: relative;
  z-index: 1001;
}

.congratulations h2 {
  font-size: 3rem;
  color: #f5576c;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.congratulations p {
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
}


@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.02);
  }
}

.loading {
  text-align: center;
  color: white;
  font-size: 1.5rem;
  padding: 40px;
}

@media (max-width: 600px) {
  .game-image {
    width: 300px;
    height: 300px;
  }
  
  .letter-box {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }
  
  .placeholder {
    font-size: 3rem;
  }
  
  .hint-text {
    font-size: 1.1rem;
  }
  
  .congratulations h2 {
    font-size: 2rem;
  }
  
  .congratulations p {
    font-size: 1.2rem;
  }
}
</style>

