<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Simple Header -->
    <div class="bg-white border-b border-gray-100 pt-32 pb-8">
      <div class="max-w-7xl mx-auto px-8">
        <h1 class="text-3xl font-light text-gray-900" style="font-family: 'Cinzel', serif;">
          Find your perfect <span class="text-blue-500">event partner</span>
        </h1>
        <p class="text-gray-500 mt-2">Browse Morocco's top event professionals — from venues and catering to AV, media, security and more.</p>
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
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <div class="space-y-0.5">
                <label v-for="cat in categories" :key="cat.id"
                  class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.category === cat.id ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" :value="cat.id" v-model="filters.category" class="hidden"/>
                    <span class="text-xs font-medium">{{ cat.name }}</span>
                  </div>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    :class="filters.category === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'">
                    {{ getCategoryCount(cat.id) }}
                  </span>
                </label>
              </div>
            </div>
            <div class="border-t border-gray-100"/>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">City</p>
              <select v-model="filters.city" class="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="">All cities</option>
                <option v-for="city in moroccanCities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
            <div class="border-t border-gray-100"/>
            <div>
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Price</p>
                <span class="text-xs font-bold text-blue-600">{{ filters.maxPrice.toLocaleString() }} DH</span>
              </div>
              <input type="range" v-model="filters.maxPrice" min="0" max="20000" step="500" class="w-full accent-blue-600 h-1.5"/>
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
              <span class="font-bold text-gray-900">{{ filteredServices.length }}</span> providers found
            </p>
            <div class="flex items-center gap-3">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <input v-model="filters.search" type="text" placeholder="Search providers..." class="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 w-52 transition-colors"/>
              </div>
              <select v-model="sortBy" class="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 bg-white text-gray-700">
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-5">
            <span v-if="filters.category !== 'all'" class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ categories.find(c => c.id === filters.category)?.name }}
              <button @click="filters.category = 'all'"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </span>
            <span v-if="filters.city" class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ filters.city }}
              <button @click="filters.city = ''"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </span>
          </div>

          <!-- Service Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in filteredServices"
              :key="service.id"
              :service="service"
              @preview="goToServiceDetails"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="showReviewModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeReviewModal">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Leave a Review</h2>
          <button @click="closeReviewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <p class="text-sm text-gray-600 mb-2">Rating</p>
          <div class="flex gap-2">
            <button v-for="i in 5" :key="i" @click="reviewRating = i" class="focus:outline-none">
              <svg class="w-8 h-8" :class="i <= reviewRating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Comment (optional)</label>
          <textarea v-model="reviewComment" rows="3" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="Share your experience..."></textarea>
        </div>
        
        <button @click="submitReview" class="w-full bg-[#0a0f2e] text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
          Submit Review
        </button>
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
import ServiceCard from '../components/ServiceCard.vue'

const router = useRouter()

// Current user and role
const currentUser = ref(null)
const userRole = ref(null)
const showReviewModal = ref(false)
const reviewRating = ref(0)
const reviewComment = ref('')

// SERVICES FROM LOCAL STORAGE
const services = ref([])

// Load services from localStorage
function loadServices() {
  const storedServices = JSON.parse(localStorage.getItem('services') || '[]')
  
  // If no services, create a default one with provider info
  if (storedServices.length === 0) {
    const currentUserData = JSON.parse(localStorage.getItem('eventaura_currentUser') || '{}')
    
    const defaultService = {
      id: 2001,
      name: "Gourmet Events Pro",
      category: "catering",
      categoryLabel: "Traiteur",
      city: "Casablanca",
      location: "83, Boulevard Mohammed V, Maarif",
      price: "350 DH/personne",
      description: "Service de traiteur haut de gamme spécialisé dans les événements professionnels. Buffets raffinés, cocktail dinatoire, service à table.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
      available: true,
      rating: 4.8,
      isFavorited: false,
      experience: "15 ans",
      projects: 320,
      responseTime: "< 2h",
      tags: ["Traiteur", "Buffet", "Cocktail", "Service à table"],
      provider_id: currentUserData.id || 1,
      provider_nom: currentUserData.nom || 'Provider',
      provider_prenom: currentUserData.prenom || 'Service',
      reviews: [
        {
          id: 2001,
          note: 5,
          commentaire: "Excellent service! The food was delicious and the presentation was beautiful.",
          date_avis: "Apr 15, 2026",
          userName: "Ahmed B.",
          userAvatar: "https://i.pravatar.cc/40?img=3"
        },
        {
          id: 2002,
          note: 4,
          commentaire: "Good quality of food, great experience overall.",
          date_avis: "Mar 20, 2026",
          userName: "Nadia K.",
          userAvatar: "https://i.pravatar.cc/40?img=6"
        },
        {
          id: 2003,
          note: 5,
          commentaire: "Best caterer in town! Highly recommended.",
          date_avis: "Feb 10, 2026",
          userName: "Omar S.",
          userAvatar: "https://i.pravatar.cc/40?img=9"
        }
      ]
    }
    
    storedServices.push(defaultService)
    localStorage.setItem('services', JSON.stringify(storedServices))
  }
  
  services.value = storedServices
}

// Go to service details page
function goToServiceDetails(service) {
  localStorage.setItem('currentService', JSON.stringify(service))
  router.push(`/service/${service.id}`)
}

// Review functions
function openReviewModal(service) {
  if (!currentUser.value?.id) {
    alert('Please sign in to leave a review')
    return
  }
  if (userRole.value !== 'client') {
    alert('Only clients can leave reviews')
    return
  }
  selectedService.value = service
  reviewRating.value = 0
  reviewComment.value = ''
  showReviewModal.value = true
}

const selectedService = ref(null)

function closeReviewModal() {
  showReviewModal.value = false
  selectedService.value = null
}

function submitReview() {
  if (reviewRating.value === 0) {
    alert('Please select a rating')
    return
  }
  
  const newReview = {
    id: Date.now(),
    note: reviewRating.value,
    commentaire: reviewComment.value || "Great service!",
    date_avis: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    userName: currentUser.value ? `${currentUser.value.prenom} ${currentUser.value.nom}` : "Guest User",
    userAvatar: `https://ui-avatars.com/api/?name=${currentUser.value?.prenom || 'G'}+${currentUser.value?.nom || 'U'}&background=random&size=32`
  }
  
  if (selectedService.value) {
    selectedService.value.reviews.unshift(newReview)
    const sum = selectedService.value.reviews.reduce((acc, r) => acc + r.note, 0)
    selectedService.value.rating = (sum / selectedService.value.reviews.length).toFixed(1)
  }
  
  alert('Review submitted successfully!')
  closeReviewModal()
}

// Filters
const moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir']

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'catering', name: 'Catering' },
  { id: 'av', name: 'Audiovisual & Technical' },
  { id: 'media', name: 'Media & Content' },
  { id: 'entertainment', name: 'Entertainment' },
]

const ratingOptions = [
  { value: 0, label: 'All' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
]

const filters = ref({ category: 'all', city: '', maxPrice: 20000, minRating: 0, search: '' })
const sortBy = ref('rating')

const hasActiveFilters = computed(() =>
  filters.value.category !== 'all' || filters.value.city || filters.value.minRating > 0
)

function resetFilters() {
  filters.value = { category: 'all', city: '', maxPrice: 20000, minRating: 0, search: '' }
  sortBy.value = 'rating'
}

function getCategoryCount(catId) {
  if (catId === 'all') return services.value.length
  return services.value.filter(s => s.category === catId).length
}

function parsePriceNumber(priceStr) {
  if (!priceStr) return 0
  const numeric = parseInt(priceStr.replace(/[^0-9]/g, ''))
  return isNaN(numeric) ? 0 : numeric
}

const filteredServices = computed(() => {
  let result = services.value.filter(s => {
    if (filters.value.category !== 'all' && s.category !== filters.value.category) return false
    if (filters.value.city && s.city !== filters.value.city) return false
    if (parsePriceNumber(s.price) > filters.value.maxPrice) return false
    if (filters.value.minRating > 0 && (s.rating || 0) < filters.value.minRating) return false
    if (filters.value.search && !s.name?.toLowerCase().includes(filters.value.search.toLowerCase())) return false
    return true
  })
  return result
})

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    userRole.value = currentUser.value.role
  }
  loadServices()
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