<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-8 py-24">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">My <span class="text-blue-500">Events</span></h1>
        <router-link to="/create-event" class="bg-[#0a0f2e] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition">
          + New Event
        </router-link>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-gray-900">{{ myEvents.length }}</p>
          <p class="text-sm text-gray-500">Total Events</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-green-600">{{ approvedEvents.length }}</p>
          <p class="text-sm text-gray-500">Approved</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-yellow-600">{{ pendingEvents.length }}</p>
          <p class="text-sm text-gray-500">Pending</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-blue-600">{{ totalBookings }}</p>
          <p class="text-sm text-gray-500">Total Bookings</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Events List -->
      <div v-else-if="myEvents.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No events yet</h3>
        <p class="text-gray-500 mb-4">Create your first event to get started</p>
        <router-link to="/create-event" class="inline-block bg-[#0a0f2e] text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition">
          Create Event
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div v-for="event in myEvents" :key="event.id" 
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div class="flex flex-col md:flex-row">
            <!-- Image -->
            <div class="md:w-48 h-48 bg-gray-100 relative">
              <img :src="event.image || event.imagePreview" :alt="event.titre || event.title" class="w-full h-full object-cover">
              <!-- Promoted Badge -->
              <div v-if="event.isPromoted" class="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-2 py-0.5 shadow-sm">
                <span class="text-[10px] font-bold text-white flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                  </svg>
                  Promoted
                </span>
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 p-5">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-lg font-bold text-gray-900">{{ event.titre || event.title }}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full" 
                      :class="getStatusClass(event.status)">
                      {{ getStatusLabel(event.status) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">{{ event.type }}</p>
                  <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    <span>{{ event.ville || event.city }}, {{ event.lieu || event.venue || event.location || 'TBD' }}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                    </svg>
                    <span>{{ formatDate(event.date_debut || event.date) }} · {{ event.startTime || event.time || 'TBD' }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-blue-600">{{ formatPrice(event.prix_ticket || event.price) }}</p>
                  <p class="text-xs text-gray-400">Capacity: {{ event.capacite_max || event.capacity }}</p>
                </div>
              </div>
              
              <p class="text-gray-600 text-sm mt-3 line-clamp-2">{{ event.description }}</p>
              
              <!-- Services preview -->
              <div v-if="event.services && event.services.length > 0" class="mt-3">
                <div class="flex flex-wrap gap-2">
                  <span v-for="service in event.services.slice(0,3)" :key="service.id"
                    class="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {{ service.name }}
                  </span>
                  <span v-if="event.services.length > 3" class="text-[10px] text-gray-400">
                    +{{ event.services.length - 3 }} more
                  </span>
                </div>
              </div>
              
              <!-- Actions -->
              <div class="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                <button @click="viewEventDetails(event)" class="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  View Details
                </button>
                
                <button v-if="isEventPending(event)" @click="checkApprovalStatus(event)" class="text-yellow-500 hover:text-yellow-700 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                  </svg>
                  Check Status
                </button>
                
                <!-- PROMOTE BUTTON -->
                <button 
                  @click="handlePromoteEvent(event)"
                  class="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                  </svg>
                  Promote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Promote Modal -->
    <PromoteEventModal
      v-model="showPromoteModal"
      :event="selectedEvent"
      @ad-created="onAdCreated"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PromoteEventModal from '../components/PromoteEventModal.vue'

const router = useRouter()
const myEvents = ref([])
const currentUser = ref(null)
const isLoading = ref(true)

// Promote Modal states
const showPromoteModal = ref(false)
const selectedEvent = ref(null)

// Computed properties for stats
const approvedEvents = computed(() => myEvents.value.filter(e => e.status === 'approved' || e.status === 'published'))
const pendingEvents = computed(() => myEvents.value.filter(e => e.status === 'pending_admin' || e.status === 'pending' || !e.status))
const totalBookings = computed(() => myEvents.value.reduce((sum, e) => sum + (e.bookings || 0), 0))

function formatPrice(price) {
  if (!price || price === 0) return 'Free'
  return `${price} DH`
}

function formatDate(date) {
  if (!date) return 'Date TBD'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getStatusClass(status) {
  if (status === 'approved' || status === 'published') {
    return 'bg-green-100 text-green-700'
  }
  if (status === 'pending_admin' || status === 'pending' || !status) {
    return 'bg-yellow-100 text-yellow-700'
  }
  return 'bg-gray-100 text-gray-700'
}

function getStatusLabel(status) {
  if (status === 'approved' || status === 'published') {
    return 'Approved'
  }
  if (status === 'pending_admin' || status === 'pending' || !status) {
    return 'Pending Approval'
  }
  return status || 'Unknown'
}

function isEventPending(event) {
  return event.status === 'pending_admin' || event.status === 'pending' || !event.status
}

function loadMyEvents() {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  } else {
    router.push('/auth')
    isLoading.value = false
    return
  }
  
  isLoading.value = true
  
  try {
    const pendingEventsList = JSON.parse(localStorage.getItem('pendingEvents') || '[]')
    const approvedEventsList = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
    const allUserEvents = [...pendingEventsList, ...approvedEventsList]
    
    myEvents.value = allUserEvents.filter(e => {
      const organizerId = e.organisateur_id || e.organizerId
      return organizerId === currentUser.value?.id
    })
    
    myEvents.value.sort((a, b) => {
      const dateA = a.created_at || a.createdAt
      const dateB = b.created_at || b.createdAt
      if (!dateA) return 1
      if (!dateB) return -1
      return new Date(dateB) - new Date(dateA)
    })
  } catch (error) {
    console.error('Error loading events:', error)
    myEvents.value = []
  } finally {
    isLoading.value = false
  }
}

function viewEventDetails(event) {
  localStorage.setItem('currentEvent', JSON.stringify(event))
  router.push(`/events/${event.id}`)
}

function checkApprovalStatus(event) {
  alert(`Event "${event.titre || event.title}" is still pending approval.`)
}

// Promote Event Handler
function handlePromoteEvent(event) {
  selectedEvent.value = event
  showPromoteModal.value = true
}

function onAdCreated() {
  loadMyEvents()
  alert('Your event is now being promoted!')
}

onMounted(() => {
  loadMyEvents()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>