// Language utility functions
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  pt: 'Português'
}

export const DEFAULT_LANGUAGE = 'en'

// In-memory storage for language preference (replaces localStorage)
let currentLanguagePreference = null

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
 * Gets the current language from memory or detects from browser
 * @returns {string} Language code
 */
export function getCurrentLanguage() {
  // Return stored preference if available
  if (currentLanguagePreference && (currentLanguagePreference === 'en' || currentLanguagePreference === 'pt')) {
    return currentLanguagePreference
  }

  // Otherwise detect from browser
  return detectBrowserLanguage()
}

/**
 * Saves language preference to memory
 * @param {string} langCode - Language code to save
 */
export function saveLanguagePreference(langCode) {
  if (langCode === 'en' || langCode === 'pt') {
    currentLanguagePreference = langCode
  }
}

