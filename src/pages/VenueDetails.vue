<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      <div v-if="!venue" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Image Header -->
        <div class="relative h-80">
          <img :src="venue.photo" :alt="venue.nom" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
          <button @click="router.back()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
          </button>
          <div class="absolute bottom-6 left-6">
            <span class="text-xs text-white/80 uppercase tracking-wider">Venue</span>
            <h1 class="text-3xl font-bold text-white mt-1">{{ venue.nom }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span class="text-white/80 text-sm">{{ venue.ville }}, Morocco</span>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-8">
          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ venue.capacite }}</p>
              <p class="text-xs text-gray-400">Capacity</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ venue.avisCount || 0 }}</p>
              <p class="text-xs text-gray-400">Reviews</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-blue-600">{{ formatPrice(venue.prix) }}</p>
              <p class="text-xs text-gray-400">per day</p>
            </div>
          </div>
          
          <!-- Address -->
          <div class="mb-6 p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span class="font-semibold">Address</span>
            </div>
            <p class="text-gray-600">{{ venue.adresse }}, {{ venue.ville }}</p>
          </div>
          
          <!-- Description -->
          <h3 class="font-semibold text-gray-900 mb-2">About This Venue</h3>
          <p class="text-gray-600 leading-relaxed mb-6">{{ venue.description || 'A beautiful venue for your special events.' }}</p>
          
          <!-- Info message -->
          <div class="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12z"/>
              </svg>
              <p class="text-sm text-blue-700">You can add this venue when creating your event</p>
            </div>
          </div>
          
          <!-- Reviews Section -->
          <div class="border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-gray-900">Reviews ({{ venue.reviews?.length || 0 }})</h3>
              <button 
                v-if="userRole === 'client'"
                @click="openReviewModal"
                class="text-sm text-blue-500 hover:text-blue-700">
                Write a review
              </button>
              <span v-else-if="userRole && userRole !== 'client'" class="text-sm text-gray-400">
                Only clients can review
              </span>
            </div>
            
            <div v-if="venue.reviews && venue.reviews.length > 0" class="space-y-3">
              <div v-for="review in venue.reviews" :key="review.id" class="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <img :src="review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}&background=random&size=40`" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="font-semibold text-sm">{{ review.userName }}</p>
                    <p class="text-xs text-gray-400">{{ review.date_avis }}</p>
                  </div>
                  <div class="flex items-center gap-0.5 my-1">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= review.note ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <p class="text-sm text-gray-600">{{ review.commentaire }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-6 bg-gray-50 rounded-xl">
              <p class="text-sm text-gray-400">No reviews yet</p>
              <p class="text-xs text-gray-400 mt-1">Be the first to review this venue</p>
            </div>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const route = useRoute()
const venue = ref(null)
const userRole = ref(null)
const currentUser = ref(null)
const showReviewModal = ref(false)
const reviewRating = ref(0)
const reviewComment = ref('')

function formatPrice(price) {
  if (!price) return '0 DH'
  return `${price.toLocaleString()} DH`
}

function openReviewModal() {
  if (!currentUser.value?.id) {
    alert('Please sign in to leave a review')
    return
  }
  if (userRole.value !== 'client') {
    alert('Only clients can leave reviews')
    return
  }
  reviewRating.value = 0
  reviewComment.value = ''
  showReviewModal.value = true
}

function closeReviewModal() {
  showReviewModal.value = false
}

function submitReview() {
  if (reviewRating.value === 0) {
    alert('Please select a rating')
    return
  }
  
  const newReview = {
    id: Date.now(),
    note: reviewRating.value,
    commentaire: reviewComment.value || "Great venue!",
    date_avis: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    userName: currentUser.value ? `${currentUser.value.prenom} ${currentUser.value.nom}` : "Guest User",
    userAvatar: `https://ui-avatars.com/api/?name=${currentUser.value?.prenom || 'G'}+${currentUser.value?.nom || 'U'}&background=random&size=40`
  }
  
  if (venue.value) {
    if (!venue.value.reviews) venue.value.reviews = []
    venue.value.reviews.unshift(newReview)
    const sum = venue.value.reviews.reduce((acc, r) => acc + r.note, 0)
    venue.value.avgRating = (sum / venue.value.reviews.length).toFixed(1)
    venue.value.avisCount = venue.value.reviews.length
  }
  
  alert('Review submitted successfully!')
  closeReviewModal()
}

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    userRole.value = currentUser.value.role
  }
  
  const savedVenue = localStorage.getItem('currentVenue')
  if (savedVenue) {
    venue.value = JSON.parse(savedVenue)
    localStorage.removeItem('currentVenue')
  } else {
    venue.value = {
      id: 1,
      nom: "Salle Luxe",
      capacite: 200,
      ville: "Tanger",
      prix: 5000,
      adresse: "Centre ville, Tanger",
      photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      description: "Grande salle pour événements prestigieux. Équipée de sonorisation, éclairage professionnel et climatisation.",
      reviews: [
        {
          id: 1,
          note: 5,
          commentaire: "Magnifique salle, très bien équipée. Le personnel est professionnel.",
          date_avis: "Apr 15, 2026",
          userName: "Ahmed B.",
          userAvatar: "https://i.pravatar.cc/40?img=3"
        },
        {
          id: 2,
          note: 4,
          commentaire: "Très bel espace, bien situé. Je recommande!",
          date_avis: "Mar 20, 2026",
          userName: "Sara M.",
          userAvatar: "https://i.pravatar.cc/40?img=1"
        }
      ],
      avgRating: 4.8,
      avisCount: 2
    }
  }
})
</script>