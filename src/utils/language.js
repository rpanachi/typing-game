// Language utility functions
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  pt: 'Português'
}

export const DEFAULT_LANGUAGE = 'en'

/**
 * Detects browser language and returns supported locale
 * @returns {string} Language code (en or pt)
 */
export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  // Get browser language
  const browserLang = navigator.language || navigator.userLanguage
  
  // Extract language code (e.g., 'pt-BR' -> 'pt', 'en-US' -> 'en')
  const langCode = browserLang.split('-')[0].toLowerCase()
  
  // Check if it's a supported language
  if (langCode === 'pt') {
    return 'pt'
  }
  
  // Default to English
  return DEFAULT_LANGUAGE
}

/**
 * Gets the current language from localStorage or detects from browser
 * @returns {string} Language code
 */
export function getCurrentLanguage() {
  if (typeof localStorage === 'undefined') {
    return detectBrowserLanguage()
  }

  const stored = localStorage.getItem('typing-game-language')
  if (stored && (stored === 'en' || stored === 'pt')) {
    return stored
  }

  return detectBrowserLanguage()
}

/**
 * Saves language preference to localStorage
 * @param {string} langCode - Language code to save
 */
export function saveLanguagePreference(langCode) {
  if (typeof localStorage === 'undefined') {
    return
  }

  if (langCode === 'en' || langCode === 'pt') {
    localStorage.setItem('typing-game-language', langCode)
  }
}

