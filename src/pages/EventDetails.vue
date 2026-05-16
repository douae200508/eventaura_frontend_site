<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      <div v-if="!event" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Image Header -->
        <div class="relative h-96">
          <img :src="event.image" :alt="event.titre" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
          <button @click="router.back()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
          </button>
          <div class="absolute bottom-6 left-6">
            <span class="text-xs text-white/80 uppercase tracking-wider">{{ event.type }}</span>
            <h1 class="text-3xl font-bold text-white mt-1">{{ event.titre }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span class="text-white/80 text-sm">{{ event.ville }}, {{ event.lieu }}</span>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-8">
          <!-- Date & Time -->
          <div class="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Date</p>
                <p class="font-semibold">{{ formatDate(event.date_debut) }}</p>
              </div>
            </div>
            <div class="w-px h-8 bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Time</p>
                <p class="font-semibold">{{ formatTime(event.date_debut) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ event.capacite_max || 'Unlimited' }}</p>
              <p class="text-xs text-gray-400">Capacity</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ event.spotsLeft || event.capacite_max || 'N/A' }}</p>
              <p class="text-xs text-gray-400">Spots Left</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-blue-600">{{ formatPrice(event.prix_ticket) }}</p>
              <p class="text-xs text-gray-400">Price</p>
            </div>
          </div>
          
          <!-- Description -->
          <h3 class="font-semibold text-gray-900 mb-2">About This Event</h3>
          <p class="text-gray-600 leading-relaxed mb-6">{{ event.description }}</p>
          
          <!-- Reviews Section -->
          <div class="border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-gray-900">Reviews ({{ event.reviews?.length || 0 }})</h3>
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
            
            <div v-if="event.reviews && event.reviews.length > 0" class="space-y-3">
              <div v-for="review in event.reviews" :key="review.id" class="flex gap-3 p-3 bg-gray-50 rounded-xl">
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
              <p class="text-xs text-gray-400 mt-1">Be the first to review this event</p>
            </div>
          </div>
          
          <!-- Book Button -->
          <div class="mt-6 pt-6 border-t">
            <button 
              v-if="userRole === 'client'"
              @click="goToTickets"
              class="w-full bg-[#0a0f2e] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Tickets
            </button>
            <div v-else-if="userRole && userRole !== 'client'" class="text-center p-4 bg-gray-100 rounded-xl">
              <p class="text-gray-500">Only registered clients can book tickets</p>
              <p class="text-sm text-gray-400 mt-1">Please sign in with a client account</p>
            </div>
            <div v-else class="text-center p-4 bg-gray-100 rounded-xl">
              <p class="text-gray-500">Please sign in to book tickets</p>
              <button @click="router.push('/auth')" class="mt-2 text-blue-500 hover:underline">Sign in</button>
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
const event = ref(null)
const userRole = ref(null)
const currentUser = ref(null)
const showReviewModal = ref(false)
const reviewRating = ref(0)
const reviewComment = ref('')

function formatPrice(price) {
  if (!price || price === 0) return 'Free'
  return `$${price}`
}

function formatDate(dateString) {
  if (!dateString) return 'Date TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(dateString) {
  if (!dateString) return 'TBD'
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function goToTickets() {
  router.push({
    path: `/tickets/${event.value.id}`,
    query: { event: JSON.stringify(event.value) }
  })
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
    commentaire: reviewComment.value || "Great event!",
    date_avis: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    userName: `${currentUser.value.prenom} ${currentUser.value.nom}`,
    userAvatar: `https://ui-avatars.com/api/?name=${currentUser.value.prenom}+${currentUser.value.nom}&background=random&size=40`
  }
  
  const reviews = JSON.parse(localStorage.getItem('eventReviews') || '[]')
  reviews.push({ ...newReview, evenement_id: event.value.id })
  localStorage.setItem('eventReviews', JSON.stringify(reviews))
  
  alert('Review submitted successfully!')
  closeReviewModal()
}

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    userRole.value = currentUser.value.role
  }
  
  // Récupérer l'événement depuis localStorage ou route
  const savedEvent = localStorage.getItem('currentEvent')
  if (savedEvent) {
    event.value = JSON.parse(savedEvent)
    localStorage.removeItem('currentEvent')
  } else {
    const eventId = parseInt(route.params.id)
    const approvedEvents = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
    const found = approvedEvents.find(e => e.id === eventId)
    if (found) {
      // Ajouter les reviews
      const reviews = JSON.parse(localStorage.getItem('eventReviews') || '[]')
      event.value = { ...found, reviews: reviews.filter(r => r.evenement_id === eventId) }
    }
  }
})
</script>