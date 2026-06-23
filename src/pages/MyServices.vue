<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-8 py-24">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">My <span class="text-blue-500">Services</span></h1>
        <router-link to="/create-service" class="bg-[#0a0f2e] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition">
          + New Service
        </router-link>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-gray-900">{{ myServices.length }}</p>
          <p class="text-sm text-gray-500">Total Services</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-green-600">{{ approvedServices.length }}</p>
          <p class="text-sm text-gray-500">Approved</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-yellow-600">{{ pendingServices.length }}</p>
          <p class="text-sm text-gray-500">Pending</p>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p class="text-2xl font-bold text-blue-600">{{ totalBookings }}</p>
          <p class="text-sm text-gray-500">Total Bookings</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Services List -->
      <div v-else-if="myServices.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 0v5.625m0-5.625v5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No services yet</h3>
        <p class="text-gray-500 mb-4">Create your first service to start offering your expertise</p>
        <router-link to="/create-service" class="inline-block bg-[#0a0f2e] text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition">
          Create Service
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div v-for="service in myServices" :key="service.id" 
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div class="flex flex-col md:flex-row">
            <!-- Image -->
            <div class="md:w-48 h-48 bg-gray-100">
              <img :src="service.image" :alt="service.name" class="w-full h-full object-cover">
            </div>
            
            <!-- Content -->
            <div class="flex-1 p-5">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-lg font-bold text-gray-900">{{ service.name }}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full" 
                      :class="getStatusClass(service.status)">
                      {{ getStatusLabel(service.status) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">{{ service.categoryLabel }}</p>
                  <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    <span>{{ service.city }}, {{ service.location }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-blue-600">{{ service.price }}</p>
                  <p class="text-xs text-gray-400">per project</p>
                </div>
              </div>
              
              <p class="text-gray-600 text-sm mt-3 line-clamp-2">{{ service.description }}</p>
              
              <!-- Actions -->
              <div class="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                <router-link :to="`/create-service?id=${service.id}`" 
                  class="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                  </svg>
                  Edit
                </router-link>
                <button @click="deleteService(service.id)" 
                  class="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                  Delete
                </button>
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
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const myServices = ref([])
const currentUser = ref(null)
const isLoading = ref(true)

const approvedServices = computed(() => myServices.value.filter(s => s.status === 'approved'))
const pendingServices = computed(() => myServices.value.filter(s => s.status === 'pending_admin' || !s.status))
const totalBookings = computed(() => myServices.value.reduce((sum, s) => sum + (s.bookings || 0), 0))

function getStatusClass(status) {
  if (status === 'approved') {
    return 'bg-green-100 text-green-700'
  }
  if (status === 'pending_admin' || !status) {
    return 'bg-yellow-100 text-yellow-700'
  }
  return 'bg-gray-100 text-gray-700'
}

function getStatusLabel(status) {
  if (status === 'approved') {
    return 'Approved'
  }
  if (status === 'pending_admin' || !status) {
    return 'Pending Approval'
  }
  return status || 'Unknown'
}

function loadMyServices() {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  } else {
    router.push('/auth')
    isLoading.value = false
    return
  }
  
  isLoading.value = true
  
  try {
    // Récupérer les services depuis localStorage
    const pendingServicesList = JSON.parse(localStorage.getItem('pendingServices') || '[]')
    const approvedServicesList = JSON.parse(localStorage.getItem('approvedServices') || '[]')
    
    // Combiner tous les services
    const allUserServices = [...pendingServicesList, ...approvedServicesList]
    
    // Filtrer par l'ID du prestataire connecté
    myServices.value = allUserServices.filter(s => s.providerId === currentUser.value?.id)
    
    console.log('Filtered myServices:', myServices.value)
  } catch (error) {
    console.error('Error loading services:', error)
    myServices.value = []
  } finally {
    isLoading.value = false
  }
}

function deleteService(serviceId) {
  if (confirm('Are you sure you want to delete this service?')) {
    let pendingServices = JSON.parse(localStorage.getItem('pendingServices') || '[]')
    let approvedServices = JSON.parse(localStorage.getItem('approvedServices') || '[]')
    
    pendingServices = pendingServices.filter(s => s.id !== serviceId)
    approvedServices = approvedServices.filter(s => s.id !== serviceId)
    
    localStorage.setItem('pendingServices', JSON.stringify(pendingServices))
    localStorage.setItem('approvedServices', JSON.stringify(approvedServices))
    
    loadMyServices()
    alert('Service deleted successfully!')
  }
}

onMounted(() => {
  loadMyServices()
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