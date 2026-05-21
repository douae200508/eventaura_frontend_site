<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-7xl mx-auto px-8 py-24">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">
          My <span class="text-blue-500">Events</span>
        </h1>
        <router-link
          to="/create-event"
          class="bg-[#0a0f2e] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          + New Event
        </router-link>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-gray-900">{{ myEvents.length }}</p>
          <p class="text-sm text-gray-500">Total Events</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-green-600">{{ approvedEvents.length }}</p>
          <p class="text-sm text-gray-500">Approved</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-yellow-600">{{ pendingEvents.length }}</p>
          <p class="text-sm text-gray-500">Pending</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-blue-600">{{ totalTickets }}</p>
          <p class="text-sm text-gray-500">Tickets Sold</p>
        </div>
      </div>

      <!-- Revenus total -->
      <div class="bg-gradient-to-r from-[#0a0f2e] to-[#1a2560] rounded-2xl p-5 mb-8 text-white flex justify-between items-center">
        <div>
          <p class="text-sm text-white/60">Total Revenue</p>
          <p class="text-3xl font-bold">{{ totalRevenus }} DH</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-white/60">Total Views</p>
          <p class="text-3xl font-bold">{{ totalVues }}</p>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-6 text-sm">
        {{ error }}
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="myEvents.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No events yet</h3>
        <p class="text-gray-500 mb-4">Create your first event to get started</p>
        <router-link
          to="/create-event"
          class="inline-block bg-[#0a0f2e] text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition"
        >
          Create Event
        </router-link>
      </div>

      <!-- Events List -->
      <div v-else class="space-y-4">
        <div
          v-for="event in myEvents"
          :key="event.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col md:flex-row">

            <!-- Image -->
         <div class="md:w-48 h-48 bg-gray-100 flex-shrink-0">
    <img
        v-if="event.photo"
        :src="getImageUrl(event.photo)"
        :alt="event.titre"
        class="w-full h-full object-cover"
        @error="event.photo = null"
    />
    <div v-else class="w-full h-full flex items-center justify-center 
                        bg-gradient-to-br from-blue-50 to-indigo-100">
        <svg class="w-12 h-12 text-blue-200" fill="none" 
             stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" 
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 
                     0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"/>
        </svg>
    </div>
</div>

            <!-- Content -->
            <div class="flex-1 p-5">
              <div class="flex justify-between items-start">
                <div>
                  <!-- Titre + statut -->
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 class="text-lg font-bold text-gray-900">{{ event.titre }}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium" :class="getStatusClass(event.statut)">
                      {{ getStatusLabel(event.statut) }}
                    </span>
                    <!-- Badge accès -->
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                      :class="event.acces === 'prive' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'">
                      {{ event.acces === 'prive' ? '🔒 Private' : '🌍 Public' }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-500 capitalize">{{ event.type }}</p>

                  <!-- Ville + lieu -->
                  <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    <span>{{ event.ville }}, {{ event.lieu }}</span>
                  </div>

                  <!-- Date -->
                  <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                    </svg>
                    <span>{{ formatDate(event.date_debut) }}</span>
                    <span v-if="event.date_fin"> → {{ formatDate(event.date_fin) }}</span>
                  </div>
                </div>

                <!-- Prix + capacité -->
                <div class="text-right flex-shrink-0">
                  <p class="text-xl font-bold text-blue-600">{{ formatPrice(event.prix_ticket) }}</p>
                  <p class="text-xs text-gray-400 mt-1">
                    🎟 {{ event.tickets_vendus || 0 }} sold
                  </p>
                  <p class="text-xs text-green-600 mt-0.5 font-medium">
                    {{ event.revenus || 0 }} DH
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    👁 {{ event.nombre_vues || 0 }} views
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-500 text-sm mt-3 line-clamp-2">{{ event.description }}</p>

              <!-- Actions -->
              <div class="flex gap-3 mt-4 pt-3 border-t border-gray-100 flex-wrap">

                <!-- View Details -->
                <button
                  @click="router.push(`/events/${event.id}`)"
                  class="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  View
                </button>

                <!-- Delete -->
                <button
                  @click="deleteEvent(event.id)"
                  class="text-red-400 hover:text-red-600 text-sm font-medium flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                  Delete
                </button>

                <!-- Status badge pour pending -->
                <span v-if="event.statut === 'en_attente'" class="text-yellow-500 text-sm flex items-center gap-1 ml-auto">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Waiting for admin approval
                </span>
              </div>
            </div>
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
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router   = useRouter()
const myEvents = ref([])
const isLoading = ref(true)
const error     = ref(null)

const API = 'http://127.0.0.1:8000/api/site'

// ✅ Stats calculées
const approvedEvents = computed(() => myEvents.value.filter(e => e.statut === 'accepte'))
const pendingEvents  = computed(() => myEvents.value.filter(e => e.statut === 'en_attente'))
const refusedEvents  = computed(() => myEvents.value.filter(e => e.statut === 'refuse'))
const totalTickets   = computed(() => myEvents.value.reduce((sum, e) => sum + (e.tickets_vendus || 0), 0))
const totalRevenus   = computed(() => myEvents.value.reduce((sum, e) => sum + (e.revenus || 0), 0))
const totalVues      = computed(() => myEvents.value.reduce((sum, e) => sum + (e.nombre_vues || 0), 0))

// ✅ Charger les événements de l'organisateur connecté
async function loadMyEvents() {
  isLoading.value = true
  error.value     = null

  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/auth')
    return
  }

  try {
    const response = await axios.get(`${API}/mes-evenements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    // ✅ API retourne directement un array
    myEvents.value = Array.isArray(response.data) ? response.data : response.data.data || []

  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Erreur lors du chargement des événements'
  } finally {
    isLoading.value = false
  }
}

// ✅ Supprimer événement
async function deleteEvent(id) {
  if (!confirm('Are you sure you want to delete this event?')) return

  const token = localStorage.getItem('token')
  try {
    await axios.delete(`${API}/evenements/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Retirer de la liste
    myEvents.value = myEvents.value.filter(e => e.id !== id)
  } catch (err) {
    alert(err.response?.data?.message || 'Error deleting event')
  }
}
// ✅ Générer URL image correcte
function getImageUrl(photo) {
    if (!photo) return null
    // Si déjà une URL complète
    if (photo.startsWith('http')) return photo
    // Sinon ajouter le chemin storage
    return `http://127.0.0.1:8000/storage/${photo}`
}
function formatPrice(price) {
  if (!price || price == 0) return 'Free'
  return `${price} DH`
}

function formatDate(date) {
  if (!date) return 'TBD'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

function getStatusClass(statut) {
  const classes = {
    'accepte':    'bg-green-100 text-green-700',
    'en_attente': 'bg-yellow-100 text-yellow-700',
    'refuse':     'bg-red-100 text-red-700',
    'annule':     'bg-gray-100 text-gray-700',
  }
  return classes[statut] || 'bg-gray-100 text-gray-700'
}

function getStatusLabel(statut) {
  const labels = {
    'accepte':    '✅ Approved',
    'en_attente': '⏳ Pending',
    'refuse':     '❌ Refused',
    'annule':     '🚫 Cancelled',
  }
  return labels[statut] || statut
}

onMounted(() => {
  loadMyEvents()
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