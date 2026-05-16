<template>
  <div class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-500 flex flex-col">

    <!-- Image -->
    <div class="relative h-52 overflow-hidden flex-shrink-0">
      <img :src="service.image" :alt="service.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

      <!-- Rating -->
      <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-xs font-bold text-gray-800">{{ service.rating }}</span>
        <span class="text-[10px] text-gray-400">({{ service.reviews }})</span>
      </div>

      <!-- Availability -->
      <div class="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-sm"
        :class="service.available ? 'bg-emerald-500/90 text-white' : 'bg-gray-500/80 text-white'">
        {{ service.available ? 'Available' : 'Unavailable' }}
      </div>

      <!-- Bottom overlay: category + price -->
      <div class="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
        <div class="bg-[#0a0f2e]/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span class="text-white text-[10px] tracking-widest uppercase font-medium">{{ service.categoryLabel }}</span>
        </div>
        <div class="text-right">
          <span class="text-white font-bold text-sm leading-none">{{ service.price }}</span>
          <span class="text-white/50 text-[10px] block">/ project</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">

      <div class="mb-3">
        <h3 class="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-1.5">
          {{ service.name }}
        </h3>
        <div class="flex items-center gap-1.5 text-gray-400 text-xs">
          <svg class="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
          </svg>
          <span>{{ service.location }}, Morocco</span>
        </div>
      </div>

      <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{{ service.description }}</p>

      <!-- Stats -->
      <div class="grid grid-cols-3 mb-4 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        <div class="text-center py-2.5 px-1">
          <p class="text-sm font-bold text-gray-900">{{ service.experience }}</p>
          <p class="text-[10px] text-gray-400 mt-0.5">Experience</p>
        </div>
        <div class="text-center py-2.5 px-1 border-x border-gray-100">
          <p class="text-sm font-bold text-gray-900">{{ service.projects }}+</p>
          <p class="text-[10px] text-gray-400 mt-0.5">Projects</p>
        </div>
        <div class="text-center py-2.5 px-1">
          <p class="text-sm font-bold text-gray-900">{{ service.responseTime }}</p>
          <p class="text-[10px] text-gray-400 mt-0.5">Response</p>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span v-for="tag in service.tags.slice(0,3)" :key="tag"
          class="text-[10px] bg-[#0a0f2e]/5 text-[#0a0f2e] border border-[#0a0f2e]/10 px-2.5 py-1 rounded-full font-medium">
          {{ tag }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
        <button @click="$emit('book', service)"
          class="flex-1 bg-[#0a0f2e] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-blue-700 transition-colors duration-300">
          Request Quote
        </button>
        <button @click="$emit('preview', service)"
          class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0a0f2e] hover:text-[#0a0f2e] transition-all duration-300 flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({ service: { type: Object, required: true } })
defineEmits(['book', 'preview'])
</script>