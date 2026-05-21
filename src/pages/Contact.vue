<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <!-- Simple Header -->
    <div class="bg-white border-b border-gray-100 pt-32 pb-8">
      <div class="max-w-7xl mx-auto px-8">
        <h1 class="text-3xl font-light text-gray-900" style="font-family: 'Cinzel', serif;">
          Contact <span class="text-blue-500">Us</span>
        </h1>
        <p class="text-gray-500 mt-2">We're here to help. Reach out anytime.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Contact Info Cards -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Phone Card -->
          <div class="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Phone</h3>
            <a href="tel:+212500000000" class="text-blue-500 text-sm hover:underline">+212 5 00 00 00 00</a>
            <p class="text-gray-400 text-xs mt-2">Mon-Fri: 9am - 6pm</p>
          </div>

          <!-- Email Card -->
          <div class="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
            <a href="mailto:support@eventaura.com" class="text-blue-500 text-sm hover:underline">support@eventaura.com</a>
            <p class="text-gray-400 text-xs mt-2">Commercial</p>
            <a href="mailto:commercial@eventaura.com" class="text-blue-500 text-sm hover:underline">commercial@eventaura.com</a>
          </div>

          <!-- Address Card -->
          <div class="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Address</h3>
            <p class="text-gray-500 text-sm">
              123 Avenue Mohammed V<br />
              Casablanca, Morocco<br />
              20000
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-1">Send us a message</h2>
            <p class="text-gray-500 text-sm mb-5">We'll get back to you as soon as possible</p>
            
            <form @submit.prevent="submitContactForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input 
                    v-model="form.firstName"
                    type="text" 
                    required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input 
                    v-model="form.lastName"
                    type="text" 
                    required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select 
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General question</option>
                  <option value="event">Event organization</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical support</option>
                  <option value="billing">Billing</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="4"
                  required
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Describe your request in detail..."
                ></textarea>
              </div>

              <div class="flex items-center">
                <input type="checkbox" v-model="form.newsletter" id="newsletter" class="w-4 h-4 text-blue-500 rounded border-gray-300">
                <label for="newsletter" class="ml-2 text-sm text-gray-500">
                  I want to receive newsletter and special offers
                </label>
              </div>

              <Button 
                type="submit"
                variant="primary"
                :disabled="isLoading"
                class="w-full justify-center"
              >
                {{ isLoading ? 'Sending...' : 'Send message' }}
                <template #icon-right>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </template>
              </Button>
            </form>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-10">
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div class="h-80 w-full bg-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.590123456789!2d-7.589843!3d33.573110!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa13b7%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-900 text-center mb-6">Frequently asked questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-xl p-5 border border-gray-100">
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
import Button from '../components/Button.vue'

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
    question: 'How can I book an event?',
    answer: 'You can book an event by clicking the "Book" button on the event page. Follow the instructions to complete your booking.'
  },
  {
    question: 'How to become a service provider on EventAura?',
    answer: 'To become a provider, create an account and select "Provider" as your role. Our team will contact you to validate your registration.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards (Visa, MasterCard), PayPal, and bank transfers.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel your booking up to 48 hours before the event. Check our terms and conditions for more details.'
  }
]

function submitContactForm() {
  isLoading.value = true
  
  setTimeout(() => {
    console.log('Form submitted:', form.value)
    alert('Thank you for your message! We will get back to you soon.')
    
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