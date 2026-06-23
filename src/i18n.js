import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'
import ar from './locales/ar.json'

// Récupérer la langue sauvegardée ou utiliser le navigateur
const savedLocale = localStorage.getItem('selectedLang') || 'fr'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'fr',
  messages: {
    fr,
    en,
    ar
  },
  missing: (locale, key) => {
    console.warn(`Missing translation: ${key} in ${locale}`)
    return key
  }
})

export default i18n