<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-6xl mx-auto px-6 py-24">
      <!-- Profile Header -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        
        <!-- Cover Photo -->
        <div class="relative h-48 bg-gradient-to-r from-[#0a0f2e] via-[#1a2560] to-[#0a0f2e]">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="absolute -bottom-16 left-8 flex gap-4">
            <img 
              :src="organizer.photo || `https://ui-avatars.com/api/?name=${organizer.prenom}+${organizer.nom}&background=1a2560&color=fff&size=120&bold=true`" 
              class="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            <div class="flex flex-col justify-end pb-2">
              <h1 class="text-2xl font-bold text-gray-900">{{ organizer.prenom }} {{ organizer.nom }}</h1>
              <div class="flex items-center gap-2 mt-1">
                <span class="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                  Organizer
                </span>
                <span class="text-gray-300">|</span>
                <span class="text-sm text-gray-500">{{ organizer.email }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="pt-20 pb-6 px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Location</p>
                <p class="text-sm text-gray-700">{{ organizer.ville || 'Morocco' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Member Since</p>
                <p class="text-sm text-gray-700">{{ memberSince }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Avg Rating</p>
                <p class="text-sm text-gray-700">{{ avgRating }} ⭐ ({{ totalReviews }} reviews)</p>
              </div>
            </div>
          </div>
          
          <div v-if="organizer.bio" class="mt-6 pt-6 border-t border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">About</h3>
            <p class="text-gray-600 text-sm">{{ organizer.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-bold text-blue-600">{{ stats.totalEvents }}</p>
              <p class="text-sm text-gray-500 mt-1">Total Events</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-bold text-green-600">{{ stats.totalAttendees }}</p>
              <p class="text-sm text-gray-500 mt-1">Total Attendees</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-bold text-yellow-600">{{ avgRating }}</p>
              <p class="text-sm text-gray-500 mt-1">Avg Rating</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Events by this Organizer -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">Events by {{ organizer.prenom }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ stats.totalEvents }} events organized</p>
        </div>
        
        <div v-if="organizerEvents.length === 0" class="p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
          </svg>
          <p class="text-gray-500">No events yet</p>
        </div>
        
        <div v-else class="divide-y divide-gray-100">
          <div v-for="event in organizerEvents" :key="event.id" class="p-6 hover:bg-gray-50 transition cursor-pointer" @click="viewEvent(event)">
            <div class="flex gap-4">
              <img :src="event.image" :alt="event.titre" class="w-24 h-24 rounded-xl object-cover"/>
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">{{ event.titre }}</h3>
                    <div class="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                        </svg>
                        {{ formatDate(event.date_debut) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                        </svg>
                        {{ event.ville }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-blue-600">{{ formatPrice(event.prix_ticket) }}</p>
                    <p class="text-xs text-gray-400">{{ event.bookings || 0 }} bookings</p>
                  </div>
                </div>
                <p class="text-gray-500 text-sm line-clamp-2">{{ event.description }}</p>
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
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()
const organizerId = ref(route.params.id)

const organizer = ref({
  id: null,
  nom: '',
  prenom: '',
  email: '',
  ville: '',
  bio: '',
  photo: ''
})

const organizerEvents = ref([])
const stats = ref({
  totalEvents: 0,
  totalAttendees: 0
})
const avgRating = ref(0)
const totalReviews = ref(0)
const memberSince = ref('')

function formatPrice(price) {
  if (!price || price === 0) return 'Free'
  return `${price} DH`
}

function formatDate(dateString) {
  if (!dateString) return 'Date TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function loadOrganizer() {
  // Get from localStorage users
  const users = JSON.parse(localStorage.getItem('eventaura_users') || '[]')
  const foundOrganizer = users.find(u => u.id === parseInt(organizerId.value) && u.role === 'organizer')
  
  if (foundOrganizer) {
    organizer.value = foundOrganizer
    // Get member since from created date
    if (foundOrganizer.createdAt) {
      memberSince.value = new Date(foundOrganizer.createdAt).getFullYear()
    } else {
      memberSince.value = '2024'
    }
  }
}

function loadOrganizerEvents() {
  const events = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
  const pendingEvents = JSON.parse(localStorage.getItem('pendingEvents') || '[]')
  const allEvents = [...events, ...pendingEvents]
  
  organizerEvents.value = allEvents.filter(e => e.organisateur_id === parseInt(organizerId.value))
  stats.value.totalEvents = organizerEvents.value.length
  
  // Calculate total attendees (bookings)
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
  stats.value.totalAttendees = bookings.filter(b => {
    const event = organizerEvents.value.find(e => e.id === b.eventId)
    return event
  }).length
  
  // Calculate average rating from reviews on organizer's events
  const reviews = JSON.parse(localStorage.getItem('eventReviews') || '[]')
  const eventReviews = reviews.filter(r => {
    return organizerEvents.value.some(e => e.id === r.evenement_id)
  })
  
  totalReviews.value = eventReviews.length
  if (totalReviews.value > 0) {
    const totalRating = eventReviews.reduce((sum, r) => sum + r.note, 0)
    avgRating.value = (totalRating / totalReviews.value).toFixed(1)
  }
}

function viewEvent(event) {
  localStorage.setItem('currentEvent', JSON.stringify(event))
  router.push(`/events/${event.id}`)
}

onMounted(() => {
  loadOrganizer()
  loadOrganizerEvents()
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