<template>
  <div v-if="ads.length > 0" class="relative mb-8">
    <!-- Carousel Container -->
    <div class="relative overflow-hidden rounded-2xl">
      <div 
        class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="ad in ads" 
          :key="ad.id" 
          class="w-full flex-shrink-0 relative cursor-pointer"
          @click="handleAdClick(ad)"
        >
          <!-- Ad Background -->
          <div class="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
            <!-- Event Image if available -->
            <img 
              v-if="ad.event_image" 
              :src="ad.event_image" 
              :alt="ad.event_title"
              class="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            
            <!-- Ad Content -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <!-- Package Badge -->
              <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
                {{ ad.package_nom }}
              </span>
              
              <!-- Event Title -->
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                {{ ad.event_title }}
              </h3>
              
              <!-- Platform -->
              <div class="flex items-center gap-2 text-white/80 text-sm mb-4">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Promoted on {{ getPlatformIcon(ad.plateforme) }} {{ ad.plateforme }}</span>
              </div>
              
              <!-- CTA Button -->
              <button class="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:scale-105 transition-transform">
                Learn More →
              </button>
            </div>
            
            <!-- Promoted Badge -->
            <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span class="text-white text-xs font-medium">📢 Sponsored</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, index) in ads"
          :key="index"
          @click="goToSlide(index)"
          class="transition-all duration-300 rounded-full"
          :class="currentIndex === index ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50'"
        ></button>
      </div>
      
      <!-- Prev/Next Buttons -->
      <button
        v-if="ads.length > 1"
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button
        v-if="ads.length > 1"
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getActiveAds } from '../services/adService'

const router = useRouter()
const ads = ref([])
const currentIndex = ref(0)
let autoPlayInterval = null

function getPlatformIcon(platform) {
  const icons = {
    instagram: '📸',
    facebook: '📘',
    twitter: '🐦',
    youtube: '📺',
    autre: '🌐'
  }
  return icons[platform.toLowerCase()] || '📢'
}

function handleAdClick(ad) {
  // Navigate to event details
  router.push(`/events/${ad.evenement_id}`)
}

function nextSlide() {
  if (ads.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % ads.value.length
  }
}

function prevSlide() {
  if (ads.value.length > 0) {
    currentIndex.value = currentIndex.value === 0 
      ? ads.value.length - 1 
      : currentIndex.value - 1
  }
}

function goToSlide(index) {
  currentIndex.value = index
  resetAutoPlay()
}

function startAutoPlay() {
  if (ads.value.length > 1) {
    autoPlayInterval = setInterval(nextSlide, 5000)
  }
}

function resetAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    startAutoPlay()
  }
}

onMounted(async () => {
  ads.value = await getActiveAds()
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})
</script>