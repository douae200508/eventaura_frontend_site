<template>
  <div v-if="show" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Promote Your Event</h2>
          <p class="text-sm text-gray-500 mt-1">{{ eventTitle }}</p>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Packages -->
      <div class="p-6 space-y-4">
        <div 
          v-for="pkg in packages" 
          :key="pkg.name"
          @click="selectPackage(pkg)"
          class="border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg"
          :class="selectedPackage?.name === pkg.name ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ pkg.name }}</h3>
                <span class="text-xs px-2 py-0.5 rounded-full" :class="pkg.badgeClass">{{ pkg.badge }}</span>
              </div>
              <p class="text-sm text-gray-500 mb-3">{{ pkg.description }}</p>
              
              <!-- Features -->
              <div class="space-y-1.5 mb-4">
                <div v-for="feature in pkg.features" :key="feature" class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="text-gray-600">{{ feature }}</span>
                </div>
              </div>
              
              <!-- Platform Selection (only for selected package) -->
              <div v-if="selectedPackage?.name === pkg.name" class="mt-4 pt-4 border-t border-gray-200">
                <label class="block text-sm font-medium text-gray-700 mb-2">Target Platform</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="platform in platforms"
                    :key="platform.value"
                    type="button"
                    @click.stop="selectedPlatform = platform.value"
                    class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                    :class="selectedPlatform === platform.value ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    {{ platform.icon }} {{ platform.label }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="text-right ml-4">
              <div class="text-2xl font-bold text-gray-900">{{ pkg.price }} DH</div>
              <div class="text-xs text-gray-400">{{ pkg.duration }} days</div>
              <div class="text-xs text-green-600 mt-1">{{ pkg.reach }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary & Payment -->
      <div v-if="selectedPackage && selectedPlatform" class="border-t border-gray-100 bg-gray-50 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-sm text-gray-600">Selected Package</p>
            <p class="font-semibold text-gray-900">{{ selectedPackage.name }}</p>
            <p class="text-xs text-gray-500">Platform: {{ getPlatformLabel(selectedPlatform) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ selectedPackage.price }} DH</p>
          </div>
        </div>
        
        <button 
          @click="processPayment"
          :disabled="processing"
          class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
        >
          <span v-if="!processing">Continue to Payment</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing...
          </span>
        </button>
        
        <p class="text-xs text-gray-400 text-center mt-3">
          Your ad will appear on the EventAura homepage carousel
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  eventId: Number,
  eventTitle: String
})

const emit = defineEmits(['close', 'success'])

const packages = [
  {
    name: 'Starter Pack',
    price: 99,
    duration: 7,
    reach: '5,000-10,000 views',
    badge: 'Basic',
    badgeClass: 'bg-gray-100 text-gray-600',
    description: 'Perfect for small events and local reach',
    features: [
      'Homepage carousel placement',
      'Basic targeting',
      'Standard support'
    ]
  },
  {
    name: 'Boost Pack',
    price: 199,
    duration: 14,
    reach: '15,000-25,000 views',
    badge: 'Popular',
    badgeClass: 'bg-blue-100 text-blue-700',
    description: 'Ideal for medium-sized events',
    features: [
      'Priority placement',
      'Social media cross-promotion',
      'Priority support'
    ]
  },
  {
    name: 'Premium Pack',
    price: 399,
    duration: 30,
    reach: '50,000-100,000 views',
    badge: 'Best Value',
    badgeClass: 'bg-purple-100 text-purple-700',
    description: 'Maximum exposure for major events',
    features: [
      'Top placement position',
      'Multi-platform promotion',
      'Dedicated account manager',
      'Analytics dashboard'
    ]
  }
]

const platforms = [
  { value: 'instagram', label: 'Instagram', icon: '📸' },
  { value: 'facebook', label: 'Facebook', icon: '📘' },
  { value: 'twitter', label: 'Twitter', icon: '🐦' },
  { value: 'youtube', label: 'YouTube', icon: '📺' },
  { value: 'autre', label: 'Other', icon: '🌐' }
]

const selectedPackage = ref(null)
const selectedPlatform = ref('instagram')
const processing = ref(false)

function selectPackage(pkg) {
  selectedPackage.value = pkg
}

function getPlatformLabel(value) {
  const platform = platforms.find(p => p.value === value)
  return platform ? `${platform.icon} ${platform.label}` : value
}

async function processPayment() {
  processing.value = true
  
  // Simulate payment processing
  setTimeout(async () => {
    try {
      // Get current user
      const user = localStorage.getItem('eventaura_currentUser')
      const currentUser = user ? JSON.parse(user) : null
      
      if (!currentUser) {
        alert('Please sign in to continue')
        processing.value = false
        return
      }
      
      const adData = {
        evenement_id: props.eventId,
        user_id: currentUser.id,
        package_nom: selectedPackage.value.name,
        plateforme: selectedPlatform.value,
        prix_total: selectedPackage.value.price,
        duree: selectedPackage.value.duration
      }
      
      // Store the ad campaign in localStorage (for demo)
      const existingAds = JSON.parse(localStorage.getItem('event_ads') || '[]')
      const newAd = {
        id: Date.now(),
        ...adData,
        date_creation: new Date().toISOString(),
        statut: 'active'
      }
      existingAds.push(newAd)
      localStorage.setItem('event_ads', JSON.stringify(existingAds))
      
      // Also mark the event as promoted
      const approvedEvents = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
      const eventIndex = approvedEvents.findIndex(e => e.id === props.eventId)
      if (eventIndex !== -1) {
        approvedEvents[eventIndex].isPromoted = true
        localStorage.setItem('approvedEvents', JSON.stringify(approvedEvents))
      }
      
      alert(`Payment successful! Your event is now being promoted for ${selectedPackage.value.duration} days.`)
      emit('success')
      close()
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      processing.value = false
    }
  }, 1500)
}

function close() {
  selectedPackage.value = null
  selectedPlatform.value = 'instagram'
  emit('close')
}
</script>