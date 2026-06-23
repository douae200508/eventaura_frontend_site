<template>
  <div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <!-- Image Section -->
    <div class="relative h-56 overflow-hidden">
      <img 
        :src="venue.image" 
        :alt="venue.nom"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <!-- Price Badge -->
      <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
        <span class="text-lg font-bold text-blue-500">{{ venue.prix }}</span>
      </div>
      
      <!-- Capacity Badge -->
      <div class="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
        <span class="text-white text-xs">Capacité: {{ venue.capacite }} pers</span>
      </div>
    </div>
    
    <!-- Content Section -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300">
        {{ venue.nom }}
      </h3>
      
      <!-- Location -->
      <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <span>{{ venue.ville }}</span>
      </div>
      
      <!-- Rating -->
      <div class="flex items-center gap-2 mb-3">
        <div class="flex items-center gap-1">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.floor(venue.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm font-medium text-gray-600 ml-1">{{ venue.rating }}</span>
        </div>
      </div>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {{ venue.description }}
      </p>
      
      <!-- Book Button -->
      <button 
        @click="$emit('book', venue)"
        class="w-full bg-[#0a0f2e] text-white py-2.5 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm font-medium"
      >
        Réserver cette salle
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  venue: {
    type: Object,
    required: true
  }
})

defineEmits(['book'])
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