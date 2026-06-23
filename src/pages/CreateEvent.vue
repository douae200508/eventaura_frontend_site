<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      
      <!-- Progress Steps -->
      <div class="mb-10">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="index" class="flex-1 relative">
            <div class="flex flex-col items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                :class="currentStep > index ? 'bg-green-500 text-white' : (currentStep === index ? 'bg-[#0a0f2e] text-white' : 'bg-gray-200 text-gray-500')"
              >
                <span v-if="currentStep > index">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <p class="text-xs mt-2 font-medium" :class="currentStep === index ? 'text-[#0a0f2e]' : 'text-gray-400'">
                {{ step }}
              </p>
            </div>
            <div v-if="index < steps.length - 1" 
              class="absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2"
              :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'">
            </div>
          </div>
        </div>
      </div>

      <!-- Step 1: Event Info -->
      <div v-if="currentStep === 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Event Information</h2>
        
        <!-- TOGGLE SWITCHES AT THE TOP -->
        <div class="bg-gray-50 rounded-xl p-5 mb-6">
          <p class="text-sm font-medium text-gray-700 mb-4">Additional options for your event</p>
          <div class="flex flex-col gap-4">
            <!-- Services Toggle -->
            <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
              <div>
                <span class="text-sm font-semibold text-gray-900">Add Services</span>
                <p class="text-xs text-gray-400">Catering, AV, media, entertainment, etc.</p>
              </div>
              <button 
                @click="enableServices = !enableServices"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                :class="enableServices ? 'bg-blue-600' : 'bg-gray-300'"
              >
                <span
                  :class="enableServices ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </button>
            </div>

            <!-- Venues Toggle -->
            <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
              <div>
                <span class="text-sm font-semibold text-gray-900">Select from Existing Venues</span>
                <p class="text-xs text-gray-400">Choose a venue from our list</p>
              </div>
              <button 
                @click="enableVenues = !enableVenues"
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                :class="enableVenues ? 'bg-blue-600' : 'bg-gray-300'"
              >
                <span
                  :class="enableVenues ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        <form @submit.prevent="nextStep" class="space-y-5">
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
              <input v-model="eventForm.title" type="text" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
                placeholder="e.g., International Tech Conference">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select v-model="eventForm.type" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
                <option value="">Select type</option>
                <option>Conference</option><option>Workshop</option><option>Networking</option>
                <option>Summit</option><option>Bootcamp</option><option>Webinar</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input v-model="eventForm.city" type="text" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
              placeholder="e.g., Casablanca">
          </div>

          <!-- VENUE FIELD -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Venue
              <span v-if="!enableVenues" class="text-xs text-gray-400 font-normal ml-2">(your own venue)</span>
              <span v-else class="text-xs text-blue-500 font-normal ml-2">(select from our list below)</span>
            </label>
            <div class="flex gap-3">
              <input 
                v-model="eventForm.venue" 
                type="text"
                :disabled="enableVenues"
                :placeholder="enableVenues ? 'Venue will be selected from our list' : 'Enter your venue name'"
                :class="enableVenues ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'"
                class="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
              <button 
                v-if="enableVenues"
                type="button"
                @click="openVenueSelector"
                class="px-4 py-2.5 bg-[#0a0f2e] text-white rounded-xl hover:bg-blue-700 transition whitespace-nowrap">
                Browse Venues
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input v-model="eventForm.date" type="date" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
              <input v-model="eventForm.startTime" type="time" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <input v-model="eventForm.duration" type="number" min="1" max="48"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="8">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input v-model="eventForm.price" type="text" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="0 DH">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
              <input v-model="eventForm.capacity" type="number" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="500">
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Event Photo *</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors cursor-pointer"
              @click="triggerFileInput">
              <div class="space-y-1 text-center">
                <svg v-if="!eventForm.imagePreview" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2"/>
                </svg>
                <img v-else :src="eventForm.imagePreview" class="mx-auto h-32 w-auto object-cover rounded-lg">
                <div class="flex text-sm text-gray-600">
                  <span class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    Upload a file
                    <input ref="fileInput" type="file" class="sr-only" accept="image/*" @change="onFileChange">
                  </span>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea v-model="eventForm.description" rows="4" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 resize-none"
              placeholder="Describe your event..."></textarea>
          </div>

          <div class="flex justify-end pt-4">
            <button type="submit" class="bg-[#0a0f2e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
              Continue →
            </button>
          </div>
        </form>
      </div>

      <!-- Step 2: Add Services -->
      <div v-if="currentStep === 1" class="space-y-6">
        
        <div v-if="enableServices" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Add Services</h2>
              <p class="text-sm text-gray-400">Select services from our providers</p>
            </div>
            <button @click="showServiceModal = true" 
              class="flex items-center gap-2 bg-[#0a0f2e] text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add Service
            </button>
          </div>

          <div v-if="selectedServices.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 0v5.625m0-5.625v5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"/>
              </svg>
            </div>
            <p class="text-gray-500">No services added yet</p>
            <p class="text-sm text-gray-400">Click "Add Service" to select from our providers</p>
          </div>

          <div v-else class="space-y-3">
            <div v-for="(service, index) in selectedServices" :key="service.id" 
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <img :src="service.image" class="w-12 h-12 rounded-lg object-cover">
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ service.name }}</h4>
                    <p class="text-xs text-gray-500">{{ service.categoryLabel }} · {{ service.location }}</p>
                    <p class="text-xs text-gray-500">Price: {{ service.price }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm font-bold text-blue-600">{{ service.price }}</span>
                <button @click="removeService(index)" class="text-red-400 hover:text-red-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between gap-4 mt-6">
          <button @click="currentStep = 0" class="px-6 py-2.5 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition">
            ← Back
          </button>
          <button @click="submitEvent" class="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition">
            Publish Event →
          </button>
        </div>
      </div>

      <!-- Step 3: Success Message -->
      <div v-if="currentStep === 2" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Event Published Successfully!</h2>
        <p class="text-gray-500 mb-6">{{ successMessage }}</p>
        <div class="flex gap-4 justify-center">
          <button @click="viewEvents" class="bg-[#0a0f2e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
            View Events
          </button>
          <button @click="createAnother" class="border border-gray-200 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">
            Create Another
          </button>
        </div>
      </div>
    </div>

    <!-- Venue Selection Modal -->
    <div v-if="showVenueModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeVenueModal">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-xl font-bold">Select a Venue</h2>
          <button @click="closeVenueModal" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6">
          <div class="flex gap-4 mb-6">
            <div class="flex-1 relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <input v-model="venueSearch" type="text" placeholder="Search venues..." class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl">
            </div>
            <select v-model="venueCity" class="px-4 py-2 border border-gray-200 rounded-xl">
              <option value="">All Cities</option>
              <option v-for="city in moroccanCities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="venue in filteredVenues" :key="venue.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              @click="selectVenue(venue)">
              <div class="flex gap-3">
                <img :src="venue.image" class="w-20 h-20 rounded-lg object-cover">
                <div class="flex-1">
                  <h4 class="font-semibold">{{ venue.name }}</h4>
                  <p class="text-xs text-gray-500">{{ venue.location }}, {{ venue.city }}</p>
                  <p class="text-xs text-gray-500">Capacity: {{ venue.capacity }} persons</p>
                  <p class="text-sm font-bold text-blue-600 mt-1">{{ venue.price }} DH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Selection Modal -->
    <div v-if="showServiceModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showServiceModal = false">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-xl font-bold">Select Services</h2>
          <button @click="showServiceModal = false" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6">
          <div class="flex gap-4 mb-6">
            <div class="flex-1 relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <input v-model="serviceSearch" type="text" placeholder="Search services..." class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl">
            </div>
            <select v-model="serviceCategory" class="px-4 py-2 border border-gray-200 rounded-xl">
              <option value="">All Categories</option>
              <option value="catering">Catering</option>
              <option value="av">AV & Technical</option>
              <option value="media">Media</option>
              <option value="entertainment">Entertainment</option>
              <option value="design">Design</option>
              <option value="reception">Reception</option>
              <option value="security">Security</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="service in filteredAvailableServices" :key="service.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div class="flex gap-3">
                <img :src="service.image" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                  <h4 class="font-semibold">{{ service.name }}</h4>
                  <p class="text-xs text-gray-500">{{ service.categoryLabel }} · {{ service.location }}</p>
                  <p class="text-sm font-bold text-blue-600 mt-1">{{ service.price }}</p>
                </div>
                <button @click="addServiceToEvent(service)" 
                  :disabled="isServiceAdded(service.id)"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition"
                  :class="isServiceAdded(service.id) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0a0f2e] text-white hover:bg-blue-700'">
                  {{ isServiceAdded(service.id) ? 'Added ✓' : 'Add' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const currentStep = ref(0)
const enableServices = ref(false)
const enableVenues = ref(false)
const showVenueModal = ref(false)
const showServiceModal = ref(false)
const venueSearch = ref('')
const venueCity = ref('')
const serviceSearch = ref('')
const serviceCategory = ref('')
const successMessage = ref('')

const steps = ['Event Info', 'Add Services', 'Publish']

// Récupérer l'utilisateur connecté
const currentUser = ref(null)

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  } else {
    router.push('/auth')
  }
})

// Event Form
const eventForm = ref({
  title: '', type: '', city: '', venue: '', date: '', startTime: '',
  duration: '', price: '', capacity: '', description: '', imagePreview: '', imageFile: null
})

// Selected Services
const selectedServices = ref([])
const selectedVenueData = ref(null)

const fileInput = ref(null)

function triggerFileInput() { fileInput.value?.click() }

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    eventForm.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => { eventForm.value.imagePreview = e.target.result }
    reader.readAsDataURL(file)
  }
}

function openVenueSelector() { showVenueModal.value = true }
function closeVenueModal() { showVenueModal.value = false }

function selectVenue(venue) {
  eventForm.value.venue = venue.name
  selectedVenueData.value = venue
  showVenueModal.value = false
}

function addServiceToEvent(service) {
  if (!isServiceAdded(service.id)) {
    selectedServices.value.push({ ...service, status: 'pending' })
  }
}

function isServiceAdded(serviceId) {
  return selectedServices.value.some(s => s.id === serviceId)
}

function removeService(index) {
  selectedServices.value.splice(index, 1)
}

function nextStep() {
  if (eventForm.value.title && eventForm.value.city && eventForm.value.date) {
    currentStep.value = 1
  } else {
    alert('Please fill in all required fields')
  }
}

function formatPriceToDH(price) {
  if (!price) return '0 DH'
  if (price.toString().includes('DH')) return price
  return `${price} DH`
}

function submitEvent() {
  // Déterminer si l'événement a besoin d'approbation
  const needsApproval = enableServices.value || enableVenues.value
  
  const newEvent = {
    id: Date.now(),
    titre: eventForm.value.title,
    type: eventForm.value.type,
    category: eventForm.value.type,
    ville: eventForm.value.city,
    lieu: eventForm.value.venue,
    date_debut: `${eventForm.value.date}T${eventForm.value.startTime}:00`,
    date_fin: `${eventForm.value.date}T${eventForm.value.startTime}:00`,
    prix_ticket: parseFloat(eventForm.value.price) || 0,
    capacite_max: parseInt(eventForm.value.capacity),
    description: eventForm.value.description,
    image: eventForm.value.imagePreview,
    organisateur_id: currentUser.value?.id,
    organisateur_nom: `${currentUser.value?.prenom} ${currentUser.value?.nom}`,
    status: needsApproval ? 'pending' : 'approved',
    created_at: new Date().toISOString(),
    venue_details: selectedVenueData.value || null,
    services: enableServices.value ? selectedServices.value : []
  }
  
  if (needsApproval) {
    // Sauvegarder dans pendingEvents pour approbation
    const pendingEvents = JSON.parse(localStorage.getItem('pendingEvents') || '[]')
    pendingEvents.push(newEvent)
    localStorage.setItem('pendingEvents', JSON.stringify(pendingEvents))
    successMessage.value = "Your event has been submitted for approval. You'll be notified once it's approved."
  } else {
    // Sauvegarder directement dans approvedEvents
    const approvedEvents = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
    approvedEvents.push(newEvent)
    localStorage.setItem('approvedEvents', JSON.stringify(approvedEvents))
    successMessage.value = "Your event has been published successfully!"
  }
  
  currentStep.value = 2
}

function viewEvents() {
  router.push('/events')
}

function createAnother() {
  currentStep.value = 0
  eventForm.value = { title: '', type: '', city: '', venue: '', date: '', startTime: '', duration: '', price: '', capacity: '', description: '', imagePreview: '', imageFile: null }
  selectedServices.value = []
  selectedVenueData.value = null
  enableServices.value = false
  enableVenues.value = false
}

const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda']

// Venues réels depuis localStorage
const availableVenues = computed(() => {
  const venues = JSON.parse(localStorage.getItem('approvedVenues') || '[]')
  return venues
})

const filteredVenues = computed(() => {
  let result = availableVenues.value
  if (venueSearch.value) result = result.filter(v => v.name?.toLowerCase().includes(venueSearch.value.toLowerCase()))
  if (venueCity.value) result = result.filter(v => v.city === venueCity.value)
  return result
})

// Services réels depuis localStorage
const availableServices = computed(() => {
  const services = JSON.parse(localStorage.getItem('approvedServices') || '[]')
  return services
})

const filteredAvailableServices = computed(() => {
  let result = availableServices.value
  if (serviceSearch.value) result = result.filter(s => s.name?.toLowerCase().includes(serviceSearch.value.toLowerCase()))
  if (serviceCategory.value) result = result.filter(s => s.category === serviceCategory.value)
  return result
})
</script>