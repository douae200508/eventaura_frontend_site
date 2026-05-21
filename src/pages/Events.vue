<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Simple Header - Clean like Contact page -->
    <div class="bg-white border-b border-gray-100 pt-32 pb-8">
      <div class="max-w-7xl mx-auto px-8">
        <h1 class="text-3xl font-light text-gray-900" style="font-family: 'Cinzel', serif;">
          Discover & <span class="text-blue-500">Join</span>
        </h1>
        <p class="text-gray-500 mt-2">Explore upcoming events and connect with industry leaders.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="flex gap-8">

        <!-- ── SIDEBAR ── -->
        <aside class="w-64 flex-shrink-0 hidden lg:block">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 tracking-wide">Filters</h3>
              <button @click="clearFilters" class="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">Reset</button>
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <div class="space-y-0.5">
                <label v-for="cat in categories" :key="cat.id"
                  class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.category === cat.id ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'">
                  <input type="radio" :value="cat.id" v-model="filters.category" class="hidden"/>
                  <span class="text-xs font-medium">{{ cat.name }}</span>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    :class="filters.category === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'">
                    {{ getCategoryCount(cat.id) }}
                  </span>
                </label>
              </div>
            </div>
            <div class="border-t border-gray-100"/>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
              <div class="space-y-0.5">
                <label v-for="opt in priceOptions" :key="opt.value"
                  class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.priceRange === opt.value ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'">
                  <input type="radio" :value="opt.value" v-model="filters.priceRange" class="hidden"/>
                  <span class="text-xs font-medium">{{ opt.label }}</span>
                </label>
              </div>
            </div>
            <div class="border-t border-gray-100"/>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">When</p>
              <div class="space-y-0.5">
                <label v-for="opt in dateOptions" :key="opt.value"
                  class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.date === opt.value ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'">
                  <input type="radio" :value="opt.value" v-model="filters.date" class="hidden"/>
                  <span class="text-xs font-medium">{{ opt.label }}</span>
                </label>
              </div>
            </div>
            <div class="border-t border-gray-100"/>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Min Rating</p>
              <div class="flex gap-1.5">
                <button v-for="r in ratingOptions" :key="r.value" @click="filters.rating = r.value"
                  class="flex-1 text-xs py-2 rounded-xl border font-medium transition-all"
                  :class="filters.rating === r.value ? 'bg-[#0a0f2e] text-white border-[#0a0f2e]' : 'border-gray-200 text-gray-500 hover:border-gray-400'">
                  {{ r.label }}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- ── MAIN CONTENT ── -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p class="text-sm text-gray-500">
              <span class="font-bold text-gray-900">{{ filteredEvents.length }}</span> events found
            </p>
            <div class="flex items-center gap-3">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <input v-model="filters.search" type="text" placeholder="Search events..."
                  class="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 w-52 transition-colors"/>
              </div>
              <select v-model="sortBy"
                class="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="date">Soonest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <!-- Active filter chips -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-5">
            <span v-if="filters.category !== 'all'"
              class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ categories.find(c => c.id === filters.category)?.name }}
              <button @click="filters.category = 'all'"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </span>
            <span v-if="filters.priceRange"
              class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ priceOptions.find(p => p.value === filters.priceRange)?.label }}
              <button @click="filters.priceRange = ''"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </span>
            <span v-if="filters.date"
              class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ dateOptions.find(d => d.value === filters.date)?.label }}
              <button @click="filters.date = ''"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </span>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>

          <!-- Grid -->
          <div v-else-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <EventCard
              v-for="event in filteredEvents"
              :key="event.id"
              :event="event"
              @book="goToTickets"
              @preview="openEventDetails"
              @favorite-updated="handleFavoriteUpdated"
              @promote="handlePromoteEvent"
            />
          </div>

          <!-- Empty state -->
          <div v-else class="flex flex-col items-center justify-center py-24 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">No events found</h3>
            <p class="text-gray-400 text-sm mb-4">Be the first to create an event!</p>
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
import EventCard from '../components/EventCard.vue'
import PromoteEventModal from '../components/PromoteEventModal.vue'

const router = useRouter()

// États
const isLoading = ref(false)
const allEvents = ref([])
const currentUser = ref(null)
const userRole = ref(null)
const isOrganizer = ref(false)

// Promote Modal states
const showPromoteModal = ref(false)
const selectedEvent = ref(null)

// DONNÉES DE TEST INTÉGRÉES DIRECTEMENT
const testEvents = [
  {
    id: 1001,
    titre: "International Tech Conference 2026",
    type: "Conference",
    category: "Conference",
    ville: "Casablanca",
    lieu: "Casablanca Convention Center",
    date_debut: "2026-05-15T09:00:00",
    date_fin: "2026-05-17T18:00:00",
    prix_ticket: 299,
    capacite_max: 500,
    description: "Discover innovative ideas, connect with industry leaders, and explore the latest trends shaping the future of technology.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    statut: "accepte",
    organisateur_id: 1,
    avgRating: 4.7,
    isPromoted: false,
    reviews: [
      {
        id: 1001,
        note: 5,
        commentaire: "Amazing conference! Learned so much from the keynote speakers.",
        date_avis: "2026-05-20",
        user_id: 2,
        userName: "Sarah M.",
        userAvatar: "https://i.pravatar.cc/40?img=1"
      },
      {
        id: 1002,
        note: 4,
        commentaire: "Great event overall!",
        date_avis: "2026-05-18",
        user_id: 3,
        userName: "Karim B.",
        userAvatar: "https://i.pravatar.cc/40?img=8"
      }
    ]
  }
]

// SAVE TEST EVENT TO LOCALSTORAGE
function saveTestEventToLocalStorage() {
  const testEvent = {
    id: 1001,
    titre: "International Tech Conference 2026",
    type: "Conference",
    category: "Conference",
    ville: "Casablanca",
    lieu: "Casablanca Convention Center",
    date_debut: "2026-05-15T09:00:00",
    date_fin: "2026-05-17T18:00:00",
    prix_ticket: 299,
    capacite_max: 500,
    description: "Discover innovative ideas, connect with industry leaders, and explore the latest trends shaping the future of technology.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    status: "approved",
    organisateur_id: 1,
    isPromoted: false,
    avgRating: 4.7,
    avisCount: 3
  }
  
  const existingEvents = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
  const eventExists = existingEvents.some(e => e.id === 1001)
  
  if (!eventExists) {
    existingEvents.push(testEvent)
    localStorage.setItem('approvedEvents', JSON.stringify(existingEvents))
    console.log('✅ Test event saved to localStorage')
  }
}

// Charger tous les événements
function loadEvents() {
  isLoading.value = true
  allEvents.value = testEvents
  isLoading.value = false
}

// Naviguer vers la page de tickets
function goToTickets(event) {
  if (!currentUser.value?.id) {
    alert('Please sign in to book tickets')
    router.push('/auth')
    return
  }
  if (userRole.value !== 'client') {
    alert('Only clients can book tickets.')
    return
  }
  router.push({
    path: `/tickets/${event.id}`,
    query: { event: JSON.stringify(event) }
  })
}

// Ouvrir les détails de l'événement
function openEventDetails(event) {
  localStorage.setItem('currentEvent', JSON.stringify(event))
  router.push(`/events/${event.id}`)
}

function handleFavoriteUpdated({ eventId, favorited }) {
  const eventIndex = allEvents.value.findIndex(e => e.id === eventId)
  if (eventIndex !== -1) {
    allEvents.value[eventIndex].isFavorited = favorited
  }
}

// Promote Event Handler
function handlePromoteEvent(event) {
  selectedEvent.value = event
  showPromoteModal.value = true
}

function onAdCreated() {
  loadEvents()
  alert('Your event is now being promoted!')
}

// Filtres
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'Conference', name: 'Conference' },
  { id: 'Workshop', name: 'Workshop' },
  { id: 'Networking', name: 'Networking' },
  { id: 'Summit', name: 'Summit' },
  { id: 'Bootcamp', name: 'Bootcamp' },
  { id: 'Webinar', name: 'Webinar' },
]

const priceOptions = [
  { value: '', label: 'All Prices' },
  { value: 'free', label: 'Free' },
  { value: 'under100', label: 'Under $100' },
  { value: '100-300', label: '$100 – $300' },
  { value: '300+', label: '$300+' },
]

const dateOptions = [
  { value: '', label: 'Any time' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'upcoming', label: 'Upcoming' },
]

const ratingOptions = [
  { value: 0, label: 'All' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
  { value: 4.8, label: '4.8+' },
]

const filters = ref({ search: '', category: 'all', priceRange: '', date: '', rating: 0 })
const sortBy = ref('date')

const hasActiveFilters = computed(() =>
  filters.value.category !== 'all' || filters.value.priceRange || filters.value.date || filters.value.rating > 0
)

function clearFilters() {
  filters.value = { search: '', category: 'all', priceRange: '', date: '', rating: 0 }
  sortBy.value = 'date'
}

function getCategoryCount(catId) {
  if (catId === 'all') return allEvents.value.length
  return allEvents.value.filter(e => e.category === catId).length
}

function parsePrice(str) {
  if (!str) return 0
  if (str === 'Free') return 0
  return typeof str === 'number' ? str : parseInt(str) || 0
}

const filteredEvents = computed(() => {
  let result = allEvents.value.filter(e => {
    if (filters.value.category !== 'all' && e.category !== filters.value.category) return false
    if (filters.value.search &&
      !e.titre?.toLowerCase().includes(filters.value.search.toLowerCase()) &&
      !e.description?.toLowerCase().includes(filters.value.search.toLowerCase())) return false
    if (filters.value.rating > 0 && (e.avgRating || 0) < filters.value.rating) return false
    if (filters.value.priceRange) {
      const p = parsePrice(e.prix_ticket)
      if (filters.value.priceRange === 'free' && p !== 0) return false
      if (filters.value.priceRange === 'under100' && (p === 0 || p >= 100)) return false
      if (filters.value.priceRange === '100-300' && (p < 100 || p > 300)) return false
      if (filters.value.priceRange === '300+' && p <= 300) return false
    }
    return true
  })
  
  if (sortBy.value === 'rating') result.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
  else if (sortBy.value === 'price_asc') result.sort((a, b) => parsePrice(a.prix_ticket) - parsePrice(b.prix_ticket))
  else if (sortBy.value === 'price_desc') result.sort((a, b) => parsePrice(b.prix_ticket) - parsePrice(a.prix_ticket))
  else if (sortBy.value === 'date') {
    result.sort((a, b) => {
      if (!a.date_debut) return 1
      if (!b.date_debut) return -1
      return new Date(a.date_debut) - new Date(b.date_debut)
    })
  }
  
  return result
})

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    userRole.value = currentUser.value.role
    isOrganizer.value = userRole.value === 'organizer'
  }
  
  // SAVE THE TEST EVENT TO LOCALSTORAGE
  saveTestEventToLocalStorage()
  
  loadEvents()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');

.modal-enter-active, .modal-leave-active { 
  transition: all 0.25s ease; 
}
.modal-enter-from, .modal-leave-to { 
  opacity: 0; 
  transform: scale(0.96); 
}
</style>