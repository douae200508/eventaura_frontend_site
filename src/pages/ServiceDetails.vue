<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      <div v-if="!service" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Image Header -->
        <div class="relative h-80">
          <img :src="service.image" :alt="service.name" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
          <button @click="router.back()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
          </button>
          <div class="absolute bottom-6 left-6">
            <span class="text-xs text-white/80 uppercase tracking-wider">{{ service.categoryLabel }}</span>
            <h1 class="text-3xl font-bold text-white mt-1">{{ service.name }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span class="text-white/80 text-sm">{{ service.city }}, {{ service.location }}</span>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-8">
          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ service.rating || 'New' }}</p>
              <p class="text-xs text-gray-400">Rating</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-gray-900">{{ service.projects || 0 }}+</p>
              <p class="text-xs text-gray-400">Projects</p>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-xl">
              <p class="text-xl font-bold text-blue-600">{{ service.price }}</p>
              <p class="text-xs text-gray-400">Price</p>
            </div>
          </div>
          
          <!-- Description -->
          <h3 class="font-semibold text-gray-900 mb-2">About</h3>
          <p class="text-gray-600 leading-relaxed mb-6">{{ service.description }}</p>
          
          <!-- Experience & Response Time -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Experience</p>
                <p class="font-semibold">{{ service.experience || 'New' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-xs text-gray-400">Response Time</p>
                <p class="font-semibold">{{ service.responseTime || '< 24h' }}</p>
              </div>
            </div>
          </div>
          
          <!-- Tags -->
          <div v-if="service.tags && service.tags.length > 0" class="mb-6">
            <h3 class="font-semibold text-gray-900 mb-2">Services Offered</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in service.tags" :key="tag" class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Reviews Section -->
          <div class="border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-gray-900">Reviews ({{ service.reviews?.length || 0 }})</h3>
              <button 
                v-if="userRole === 'client'"
                @click="openReviewModal"
                class="text-sm text-blue-500 hover:text-blue-700">
                Write a review
              </button>
            </div>
            
            <div v-if="service.reviews && service.reviews.length > 0" class="space-y-3">
              <div v-for="review in service.reviews" :key="review.id" class="flex gap-3 p-3 bg-gray-50 rounded-xl">
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
              <p class="text-xs text-gray-400 mt-1">Be the first to review this service</p>
            </div>
          </div>
        </div>
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
const service = ref(null)
const userRole = ref(null)

onMounted(() => {
  // D'abord, essayer de récupérer le service depuis localStorage
  const savedService = localStorage.getItem('currentService')
  if (savedService) {
    service.value = JSON.parse(savedService)
    localStorage.removeItem('currentService')
  } else {
    // Sinon, chercher dans la liste des services
    const serviceId = parseInt(route.params.id)
    const approvedServices = JSON.parse(localStorage.getItem('approvedServices') || '[]')
    const found = approvedServices.find(s => s.id === serviceId)
    if (found) {
      service.value = found
    }
  }
  
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    userRole.value = JSON.parse(user).role
  }
})

function openReviewModal() {
  alert('Review feature coming soon!')
}
</script>