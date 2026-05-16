<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-[#0a0f2e] to-[#1a1f4e] pt-32 pb-16">
      <div class="max-w-7xl mx-auto px-8">
        <h1 class="text-4xl md:text-5xl font-light text-white mb-4" style="font-family: 'Cinzel', serif;">
          Contact <span class="text-blue-400">Us</span>
        </h1>
        <p class="text-white/60 text-lg max-w-2xl">
          Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou demande.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Contact Info Cards -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Phone Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Téléphone</h3>
            <p class="text-gray-500 text-sm mb-1">Service Client</p>
            <a href="tel:+212500000000" class="text-blue-500 font-medium hover:underline">+212 5 00 00 00 00</a>
            <p class="text-gray-500 text-sm mt-2">Lun-Ven: 9h - 18h</p>
          </div>

          <!-- Email Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Email</h3>
            <p class="text-gray-500 text-sm mb-1">Support</p>
            <a href="mailto:support@eventaura.com" class="text-blue-500 font-medium hover:underline">support@eventaura.com</a>
            <p class="text-gray-500 text-sm mt-2">Commercial</p>
            <a href="mailto:commercial@eventaura.com" class="text-blue-500 font-medium hover:underline">commercial@eventaura.com</a>
          </div>

          <!-- Address Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Adresse</h3>
            <p class="text-gray-500 text-sm">
              123 Avenue Mohammed V<br />
              Casablanca, Maroc<br />
              20000
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm p-8">
            <h2 class="text-2xl font-semibold mb-2">Envoyez-nous un message</h2>
            <p class="text-gray-500 text-sm mb-6">Nous vous répondrons dans les plus brefs délais</p>
            
            <form @submit.prevent="submitContactForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <input 
                    v-model="form.firstName"
                    type="text" 
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input 
                    v-model="form.lastName"
                    type="text" 
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input 
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <select 
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="general">Question générale</option>
                  <option value="event">Organisation d'événement</option>
                  <option value="partnership">Partenariat</option>
                  <option value="support">Support technique</option>
                  <option value="billing">Facturation</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
              </div>

              <div class="flex items-center">
                <input type="checkbox" v-model="form.newsletter" id="newsletter" class="w-4 h-4 text-blue-500 rounded border-gray-300">
                <label for="newsletter" class="ml-2 text-sm text-gray-500">
                  Je souhaite recevoir la newsletter et les offres spéciales
                </label>
              </div>

              <button 
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-[#0a0f2e] to-[#1a1f4e] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-12">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="h-96 w-full bg-gray-200 relative">
            <!-- Google Maps Embed (remplacer par votre adresse) -->
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.590123456789!2d-7.589843!3d33.573110!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa13b7%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-center mb-8">Questions fréquentes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-2">{{ faq.question }}</h3>
            <p class="text-gray-500 text-sm">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const isLoading = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const faqs = [
  {
    question: 'Comment puis-je réserver un événement ?',
    answer: 'Vous pouvez réserver un événement en cliquant sur le bouton "Réserver" sur la page de l\'événement. Suivez ensuite les instructions pour finaliser votre réservation.'
  },
  {
    question: 'Comment devenir prestataire sur EventAura ?',
    answer: 'Pour devenir prestataire, créez un compte et sélectionnez "Partenaire" comme rôle. Notre équipe vous contactera pour valider votre inscription.'
  },
  {
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, MasterCard), PayPal, et les virements bancaires.'
  },
  {
    question: 'Puis-je annuler ma réservation ?',
    answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 48h avant l\'événement. Consultez nos conditions générales pour plus de détails.'
  }
]

function submitContactForm() {
  isLoading.value = true
  
  // Simulation d'envoi
  setTimeout(() => {
    console.log('Formulaire envoyé:', form.value)
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    }
    
    isLoading.value = false
  }, 1500)
}
</script>