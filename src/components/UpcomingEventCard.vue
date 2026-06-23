<template>
  <div class="group relative flex-shrink-0 w-[300px] bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 cursor-pointer">
    
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img :src="event.image" :alt="event.titre" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
      <div class="absolute inset-0 bg-gradient-to-t from-[#060d2e] via-[#060d2e]/50 to-transparent"/>

      <!-- Promoted Badge -->
      <div v-if="event.isPromoted" class="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1">
        <span class="text-[10px] font-bold text-white flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
          </svg>
          Promoted
        </span>
      </div>

      <!-- Price -->
      <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
        <span class="text-xs font-bold text-white">{{ formatPrice(event.prix_ticket) }}</span>
      </div>

      <!-- Type -->
      <div class="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
        <span class="text-white text-[10px] tracking-widest uppercase font-medium">{{ event.type }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-white font-semibold text-base mb-2 line-clamp-1">{{ event.titre }}</h3>
      
      <!-- Location -->
      <div class="flex items-center gap-1.5 text-white/50 text-xs mb-2">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
        </svg>
        <span>{{ event.ville }}, {{ event.lieu }}</span>
      </div>

      <!-- Date -->
      <div class="flex items-center gap-1.5 text-white/50 text-xs mb-3">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
        </svg>
        <span>{{ formatDate(event.date_debut) }}</span>
      </div>

      <p class="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{{ event.description }}</p>

      <!-- Rating -->
      <div v-if="event.avgRating > 0" class="flex items-center gap-1 mb-4">
        <div class="flex items-center gap-0.5">
          <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= Math.floor(event.avgRating) ? 'text-yellow-400' : 'text-white/20'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="text-white/60 text-xs">{{ event.avgRating.toFixed(1) }} ({{ event.avisCount || 0 }})</span>
      </div>

      <!-- Button -->
      <button 
        @click="$emit('preview', event)"
        class="w-full py-2.5 rounded-full border border-white/20 text-white/80 text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
      >
        Discover Event →
      </button>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({ 
  event: { 
    type: Object, 
    required: true 
  } 
})

const emit = defineEmits(['preview'])

function formatPrice(price) {
  if (!price || price === 0) return 'Free'
  return `${price} DH`
}

function formatDate(dateString) {
  if (!dateString) return 'Date TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>