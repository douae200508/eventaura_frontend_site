<template>
  <div class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-500 flex flex-col">

    <!-- Image -->
    <div class="relative h-48 overflow-hidden flex-shrink-0">
      <img :src="event.image" :alt="event.titre" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

      <!-- Favorite button -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-10"
        :class="isFavorited ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'"
      >
        <svg class="w-4 h-4" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>
      </button>

      <!-- Promoted Badge -->
      <div v-if="event.isPromoted" class="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
        <span class="text-xs font-bold text-white flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
          </svg>
          Promoted
        </span>
      </div>

      <!-- Price -->
      <div v-else class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
        <span class="text-xs font-bold text-[#0a0f2e]">{{ formatPrice(event.prix_ticket) }}</span>
      </div>

      <!-- Bottom: type + rating -->
      <div class="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
        <div class="bg-[#0a0f2e]/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span class="text-white text-[10px] tracking-widest uppercase font-medium">{{ event.type }}</span>
        </div>
        <div v-if="event.avgRating > 0" class="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-[10px] font-bold text-gray-800">{{ event.avgRating.toFixed(1) }}</span>
          <span class="text-[10px] text-gray-400">({{ event.avisCount || 0 }})</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">
      <h3 class="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-2 line-clamp-2">
        {{ event.titre }}
      </h3>

      <div class="flex items-center gap-1.5 text-gray-400 text-xs mb-1.5">
        <svg class="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
        </svg>
        <span>{{ event.ville }} · {{ event.lieu }}</span>
      </div>

      <div class="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
        <svg class="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
        </svg>
        <span>{{ formatDate(event.date_debut) }}</span>
      </div>

      <p class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{{ event.description }}</p>

      <!-- Stats grid -->
      <div class="grid grid-cols-3 mb-3 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        <div class="text-center py-2.5 px-1">
          <p class="text-sm font-bold text-gray-900">{{ event.capacite_max || 'Unlimited' }}</p>
          <p class="text-[10px] text-gray-400 mt-0.5">Capacity</p>
        </div>
        <div class="text-center py-2.5 px-1 border-x border-gray-100">
          <p class="text-sm font-bold text-gray-900">{{ event.spotsLeft || event.capacite_max || 'N/A' }}</p>
          <p class="text-[10px] text-gray-400 mt-0.5">Spots Left</p>
        </div>
        <div class="text-center py-2.5 px-1">
          <p class="text-sm font-bold text-[#0a0f2e]">{{ formatPrice(event.prix_ticket) }}</p>
          <p class="text-[10px] text-gray-400 mt-0.5">From</p>
        </div>
      </div>

      <!-- Reviews preview -->
      <div v-if="event.reviews && event.reviews.length > 0" class="mb-3">
        <div class="flex items-center gap-2">
          <div class="flex -space-x-2">
            <img v-for="(review, i) in event.reviews.slice(0, 3)" :key="i"
              :src="review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}&background=random&size=24`" 
              :alt="review.userName"
              class="w-6 h-6 rounded-full border-2 border-white object-cover"/>
          </div>
          <span class="text-[11px] text-gray-400">
            {{ event.reviews[0].userName }}
            <span v-if="event.reviews.length > 1"> +{{ event.reviews.length - 1 }} reviews</span>
          </span>
        </div>
      </div>

      <!-- ACTIONS - BOOK & PROMOTE BUTTONS -->
      <div class="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
        
        <!-- BOOK TICKETS BUTTON - For clients only -->
        <button 
          v-if="userRole === 'client'"
          @click="$emit('book', event)"
          class="flex-1 bg-[#0a0f2e] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-blue-700 transition-colors duration-300"
        >
          Book Tickets
        </button>
        
        <!-- PROMOTE BUTTON - For organizers who own this event -->
        <button 
          v-if="userRole === 'organizer' && isEventOwner"
          @click="$emit('promote', event)"
          class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-full text-xs font-semibold tracking-wide hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-1"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
          </svg>
          Promote
        </button>
        
        <!-- DISABLED PROMOTE - For organizers who don't own the event -->
        <div 
          v-else-if="userRole === 'organizer' && !isEventOwner"
          class="flex-1 bg-gray-100 text-gray-400 py-2.5 rounded-full text-xs font-semibold tracking-wide text-center cursor-not-allowed"
          title="You can only promote your own events"
        >
          Promote
        </div>
        
        <!-- PROVIDER ROLE - Cannot book -->
        <div 
          v-else-if="userRole === 'provider'"
          class="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-full text-xs font-semibold tracking-wide text-center cursor-not-allowed"
          title="Only clients can book tickets"
        >
          Book Tickets
        </div>
        
        <!-- NOT LOGGED IN -->
        <div 
          v-else-if="!userRole"
          class="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-full text-xs font-semibold tracking-wide text-center cursor-pointer hover:bg-gray-200 transition-colors"
          @click="$emit('book', event)"
        >
          Sign in to book
        </div>
        
        <!-- PREVIEW BUTTON (Eye) - For everyone -->
        <button 
          @click="$emit('preview', event)"
          class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0a0f2e] hover:text-[#0a0f2e] transition-all duration-300 flex-shrink-0"
        >
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
import { ref, computed, onMounted } from 'vue'

const props = defineProps({ 
  event: { 
    type: Object, 
    required: true 
  } 
})

const emit = defineEmits(['book', 'preview', 'favorite-updated', 'promote'])

const isFavorited = ref(false)
const currentUser = ref(null)
const userRole = ref(null)

// Check if current user is the owner of this event
const isEventOwner = computed(() => {
  if (!currentUser.value || !props.event.organisateur_id) return false
  return currentUser.value.id === props.event.organisateur_id
})

function formatPrice(price) {
  if (!price || price === 0) return 'Free'
  return `${price} DH`
}

function formatDate(dateString) {
  if (!dateString) return 'Date TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function checkIfFavorited() {
  if (!currentUser.value?.id) return false
  const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]')
  return favorites.some(f => f.user_id === currentUser.value.id && f.evenement_id === props.event.id)
}

function toggleFavorite() {
  if (!currentUser.value?.id) {
    alert('Please sign in first')
    return
  }
  
  let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]')
  
  if (isFavorited.value) {
    favorites = favorites.filter(f => !(f.user_id === currentUser.value.id && f.evenement_id === props.event.id))
    localStorage.setItem('userFavorites', JSON.stringify(favorites))
    emit('favorite-updated', { eventId: props.event.id, favorited: false })
  } else {
    const newFavorite = {
      id: Date.now(),
      user_id: currentUser.value.id,
      evenement_id: props.event.id,
      date_ajout: new Date().toISOString()
    }
    favorites.push(newFavorite)
    localStorage.setItem('userFavorites', JSON.stringify(favorites))
    emit('favorite-updated', { eventId: props.event.id, favorited: true })
  }
  
  isFavorited.value = !isFavorited.value
}

onMounted(() => {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    userRole.value = currentUser.value.role
    isFavorited.value = checkIfFavorited()
  }
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