<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Simple Header - Clean like Contact page -->
    <div class="bg-white border-b border-gray-100 pt-32 pb-8">
      <div class="max-w-7xl mx-auto px-8">
        <h1 class="text-3xl font-light text-gray-900" style="font-family: 'Cinzel', serif;">
          Find the perfect <span class="text-blue-500">venue for your event</span>
        </h1>
        <p class="text-gray-500 mt-2">Discover Morocco's finest venues — from conference halls to luxury reception spaces.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="flex gap-8">

        <!-- Sidebar Filters -->
        <aside class="w-64 flex-shrink-0 hidden lg:block">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 tracking-wide">Filters</h3>
              <button @click="resetFilters" class="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">Reset</button>
            </div>
            
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">City</p>
              <select v-model="filters.city" class="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="">All cities</option>
                <option v-for="city in moroccanCities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
            
            <div class="border-t border-gray-100"/>
            
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Capacity</p>
              <select v-model="filters.capacity" class="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="">Any capacity</option>
                <option value="100">Up to 100</option>
                <option value="200">Up to 200</option>
                <option value="300">Up to 300</option>
                <option value="500">Up to 500</option>
                <option value="1000">500+</option>
              </select>
            </div>
            
            <div class="border-t border-gray-100"/>
            
            <div>
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Price</p>
                <span class="text-xs font-bold text-blue-600">{{ filters.maxPrice.toLocaleString() }} DH</span>
              </div>
              <input type="range" v-model="filters.maxPrice" min="0" max="50000" step="1000" class="w-full accent-blue-600 h-1.5"/>
            </div>
            
            <div class="border-t border-gray-100"/>
            
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Min Rating</p>
              <div class="flex gap-1.5">
                <button v-for="r in ratingOptions" :key="r.value" @click="filters.minRating = r.value"
                  class="flex-1 text-xs py-2 rounded-xl border font-medium transition-all"
                  :class="filters.minRating === r.value ? 'bg-[#0a0f2e] text-white border-[#0a0f2e]' : 'border-gray-200 text-gray-500 hover:border-gray-400'">
                  {{ r.label }}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p class="text-sm text-gray-500">
              <span class="font-bold text-gray-900">{{ filteredVenues.length }}</span> venues found
            </p>
            <div class="flex items-center gap-3">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <input v-model="filters.search" type="text" placeholder="Search venues..." class="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 w-52 transition-colors"/>
              </div>
              <select v-model="sortBy" class="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="capacity_desc">Capacity: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <!-- Venues Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="venue in filteredVenues" :key="venue.id" 
              class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-500 flex flex-col">

              <!-- Image -->
              <div class="relative h-52 overflow-hidden flex-shrink-0">
                <img :src="venue.photo" :alt="venue.nom" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

                <!-- Favorite button -->
                <button
                  @click.stop="toggleFavorite(venue)"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-10"
                  :class="venue.isFavorited ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'"
                >
                  <svg class="w-4 h-4" :fill="venue.isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                  </svg>
                </button>

                <!-- Rating stars -->
                <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-xs font-bold text-gray-800">{{ venue.avgRating || 'New' }}</span>
                  <span class="text-[10px] text-gray-400">({{ venue.avisCount || 0 }})</span>
                </div>

                <!-- Bottom overlay: price -->
                <div class="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                  <div class="bg-[#0a0f2e]/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <span class="text-white text-[10px] tracking-widest uppercase font-medium">Venue</span>
                  </div>
                  <div class="text-right">
                    <span class="text-white font-bold text-sm leading-none">{{ formatPrice(venue.prix) }}</span>
                    <span class="text-white/50 text-[10px] block">/ day</span>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5 flex flex-col flex-1">

                <div class="mb-3">
                  <h3 class="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-1.5">
                    {{ venue.nom }}
                  </h3>
                  <div class="flex items-center gap-1.5 text-gray-400 text-xs">
                    <svg class="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    <span>{{ venue.ville }}, Morocco</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                    <svg class="w-3 h-3 flex-shrink-0 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5M3.75 9v7.5M21 9v7.5M3.75 9L12 3l8.25 6"/>
                    </svg>
                    <span class="text-[11px]">{{ venue.adresse }}</span>
                  </div>
                </div>

                <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{{ venue.description || 'A beautiful venue for your special events.' }}</p>

                <!-- Stats -->
                <div class="grid grid-cols-3 mb-4 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <div class="text-center py-2.5 px-1">
                    <p class="text-sm font-bold text-gray-900">{{ venue.capacite }}</p>
                    <p class="text-[10px] text-gray-400 mt-0.5">Capacity</p>
                  </div>
                  <div class="text-center py-2.5 px-1 border-x border-gray-100">
                    <p class="text-sm font-bold text-gray-900">{{ venue.avisCount || 0 }}</p>
                    <p class="text-[10px] text-gray-400 mt-0.5">Reviews</p>
                  </div>
                  <div class="text-center py-2.5 px-1">
                    <p class="text-sm font-bold text-gray-900">{{ formatPrice(venue.prix) }}</p>
                    <p class="text-[10px] text-gray-400 mt-0.5">Price</p>
                  </div>
                </div>

                <!-- Reviews preview -->
                <div v-if="venue.reviews && venue.reviews.length > 0" class="mb-3">
                  <div class="flex items-center gap-2">
                    <div class="flex -space-x-2">
                      <img v-for="(review, i) in venue.reviews.slice(0, 3)" :key="i"
                        :src="review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}&background=random&size=24`" 
                        :alt="review.userName"
                        class="w-6 h-6 rounded-full border-2 border-white object-cover"/>
                    </div>
                    <span class="text-[11px] text-gray-400">
                      {{ venue.reviews[0].userName }}
                      <span v-if="venue.reviews.length > 1"> +{{ venue.reviews.length - 1 }} reviews</span>
                    </span>
                  </div>
                </div>

                <!-- Actions - View Details Button -->
                <div class="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                  <button 
                    @click="viewVenueDetails(venue)"
                    class="w-full bg-[#0a0f2e] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-1"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    View Details
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filteredVenues.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
            <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">No venues found</h3>
            <p class="text-gray-400 text-sm mb-4">Try adjusting your filters or search term</p>
            <button @click="resetFilters" class="text-sm text-blue-600 border border-blue-200 px-5 py-2 rounded-full hover:bg-blue-50 transition-colors font-medium">Reset all filters</button>
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
const currentUser = ref(null)

// ONE TEST VENUE based on your database
const venues = ref([
  {
    id: 1,
    nom: "Salle Luxe",
    capacite: 200,
    ville: "Tanger",
    prix: 5000,
    adresse: "Centre ville, Tanger",
    photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    description: "Grande salle pour événements prestigieux. Équipée de sonorisation, éclairage professionnel et climatisation. Idéal pour mariages, conférences et galas.",
    created_at: "2026-04-21 15:32:24",
    updated_at: "2026-04-21 15:32:24",
    avgRating: 4.8,
    reviews: [
      {
        id: 1,
        note: 5,
        commentaire: "Magnifique salle, très bien équipée. Le personnel est professionnel et à l'écoute.",
        date_avis: "2026-04-15",
        userName: "Ahmed B.",
        userAvatar: "https://i.pravatar.cc/40?img=3"
      },
      {
        id: 2,
        note: 4,
        commentaire: "Très bel espace, bien situé. Je recommande!",
        date_avis: "2026-03-20",
        userName: "Sara M.",
        userAvatar: "https://i.pravatar.cc/40?img=1"
      },
      {
        id: 3,
        note: 5,
        commentaire: "Salle parfaite pour notre conférence. Tout était impeccable.",
        date_avis: "2026-02-10",
        userName: "Karim L.",
        userAvatar: "https://i.pravatar.cc/40?img=8"
      }
    ],
    isFavorited: false
  }
])

const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tetouan']

const ratingOptions = [
  { value: 0, label: 'All' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
]

const filters = ref({ city: '', capacity: '', maxPrice: 50000, minRating: 0, search: '' })
const sortBy = ref('price_asc')

function formatPrice(price) {
  if (!price) return '0 DH'
  return `${price.toLocaleString()} DH`
}

function resetFilters() {
  filters.value = { city: '', capacity: '', maxPrice: 50000, minRating: 0, search: '' }
  sortBy.value = 'price_asc'
}

function toggleFavorite(venue) {
  if (!currentUser.value?.id) {
    alert('Please sign in to add favorites')
    return
  }
  venue.isFavorited = !venue.isFavorited
}

function viewVenueDetails(venue) {
  localStorage.setItem('currentVenue', JSON.stringify(venue))
  router.push(`/venue/${venue.id}`)
}

// Calculer la moyenne des notes pour chaque venue
function loadVenuesWithRatings() {
  venues.value = venues.value.map(venue => {
    const reviews = venue.reviews || []
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.note, 0) / reviews.length : 0
    return { ...venue, avgRating: avgRating.toFixed(1), avisCount: reviews.length }
  })
}

const filteredVenues = computed(() => {
  let result = venues.value.filter(venue => {
    if (filters.value.city && venue.ville !== filters.value.city) return false
    if (filters.value.capacity && venue.capacite > parseInt(filters.value.capacity)) return false
    if (venue.prix > filters.value.maxPrice) return false
    if (filters.value.minRating > 0 && (venue.avgRating || 0) < filters.value.minRating) return false
    if (filters.value.search && !venue.nom.toLowerCase().includes(filters.value.search.toLowerCase())) return false
    return true
  })
  
  if (sortBy.value === 'price_asc') result.sort((a, b) => a.prix - b.prix)
  else if (sortBy.value === 'price_desc') result.sort((a, b) => b.prix - a.prix)
  else if (sortBy.value === 'capacity_desc') result.sort((a, b) => b.capacite - a.capacite)
  else if (sortBy.value === 'rating') result.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
  
  return result
})

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  }
  loadVenuesWithRatings()
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