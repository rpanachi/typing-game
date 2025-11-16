// Translations for all UI text in the game
export const translations = {
  en: {
    // Game component
    congratulations: 'Congratulations!',
    youGuessedRight: 'You guessed it right!',
    typeLetters: 'Type the letters to guess the word!',
    loadingGame: 'Loading game...',
    
    // MainMenu component
    newGame: 'New Game',
    howToPlay: 'How to Play',
    language: 'Language:',
    difficulty: 'Difficulty:',
    difficultyAny: 'Any',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    
    // HowToPlay component
    instructionsTitle: 'How to Play',
    instruction1: 'Look at the picture and type the letters one by one!',
    instruction2: 'The highlighted box shows which letter to type next.',
    instruction3: 'Type all the letters correctly to complete the word!',
    instruction4: 'Have fun learning to type! 🎉',
    
    // Common
    backToMenu: '← Back to Menu',
    noVerifiedWords: 'No verified words available. Please run the image verification script first.'
  },
  pt: {
    // Game component
    congratulations: 'Parabéns!',
    youGuessedRight: 'Você acertou!',
    typeLetters: 'Digite as letras para adivinhar a palavra!',
    loadingGame: 'Carregando jogo...',
    
    // MainMenu component
    newGame: 'Novo Jogo',
    howToPlay: 'Como Jogar',
    language: 'Idioma:',
    difficulty: 'Dificuldade:',
    difficultyAny: 'Qualquer',
    difficultyEasy: 'Fácil',
    difficultyMedium: 'Médio',
    difficultyHard: 'Difícil',
    
    // HowToPlay component
    instructionsTitle: 'Como Jogar',
    instruction1: 'Olhe a imagem e digite as letras uma por uma!',
    instruction2: 'A caixa destacada mostra qual letra digitar em seguida.',
    instruction3: 'Digite todas as letras corretamente para completar a palavra!',
    instruction4: 'Divirta-se aprendendo a digitar! 🎉',
    
    // Common
    backToMenu: '← Voltar ao Menu',
    noVerifiedWords: 'Nenhuma palavra verificada disponível. Por favor, execute o script de verificação de imagens primeiro.'
  }
}

/**
 * Get a translated string for the given key and language
 * @param {string} key - Translation key
 * @param {string} locale - Language code (en or pt)
 * @returns {string} Translated text
 */
export function t(key, locale = 'en') {
  return translations[locale]?.[key] || translations.en[key] || key
}

