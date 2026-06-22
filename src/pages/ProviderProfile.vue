<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-6xl mx-auto px-6 py-24">
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <div v-else-if="!provider.id" class="text-center py-20">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>
        <h2 class="text-2xl font-semibold text-gray-700">Provider not found</h2>
        <router-link to="/" class="inline-block mt-6 text-blue-500 hover:text-blue-700">Go back home</router-link>
      </div>

      <div v-else>
        <!-- Header -->
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div class="relative h-48 bg-gradient-to-r from-[#0a0f2e] via-[#1a2560] to-[#0a0f2e]">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute -bottom-16 left-8 flex gap-4">
              <img 
                :src="provider.photo_profil || `https://ui-avatars.com/api/?name=${provider.prenom}+${provider.nom}&background=1a2560&color=fff&size=120&bold=true`" 
                class="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div class="flex flex-col justify-end pb-2">
                <h1 class="text-2xl font-bold text-gray-900">{{ provider.prenom }} {{ provider.nom }}</h1>
                <div class="flex items-center gap-2 mt-1">
                  <span class="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Service Provider
                  </span>
                  <span class="text-gray-300">|</span>
                  <span class="text-sm text-gray-500">{{ provider.email }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-20 pb-6 px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-400">Location</p>
                  <p class="text-sm text-gray-700">{{ provider.ville || 'Morocco' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-400">Member Since</p>
                  <p class="text-sm text-gray-700">{{ memberSince }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-400">Avg Rating</p>
                  <p class="text-sm text-gray-700">{{ stats.avgRating || 'N/A' }} ⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p class="text-3xl font-bold text-blue-600">{{ stats.totalServices }}</p>
            <p class="text-sm text-gray-500 mt-1">Total Services</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p class="text-3xl font-bold text-green-600">{{ stats.totalProjects }}</p>
            <p class="text-sm text-gray-500 mt-1">Total Projects</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p class="text-3xl font-bold text-yellow-600">{{ stats.avgRating || 'N/A' }}</p>
            <p class="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
        </div>

        <!-- Services -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Services by {{ provider.prenom }}</h2>
          </div>
          
          <div v-if="providerServices.length === 0" class="p-12 text-center">
            <p class="text-gray-500">No services yet</p>
          </div>
          
          <div v-else class="divide-y divide-gray-100">
            <div v-for="service in providerServices" :key="service.id" class="p-6 hover:bg-gray-50 transition cursor-pointer" @click="viewService(service)">
              <div class="flex gap-4">
                <img :src="service.image" :alt="service.name" class="w-24 h-24 rounded-xl object-cover"/>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{{ service.name }}</h3>
                  <p class="text-sm text-gray-500">{{ service.categoryLabel }}</p>
                  <p class="text-sm text-gray-500">{{ service.price }}</p>
                </div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const provider = ref({})
const providerServices = ref([])
const stats = ref({ totalServices: 0, totalProjects: 0, avgRating: 0 })
const memberSince = ref('')

function loadProvider() {
  const users = JSON.parse(localStorage.getItem('eventaura_users') || '[]')
  const found = users.find(u => u.id === parseInt(route.params.id) && u.role === 'provider')
  
  if (found) {
    provider.value = found
    memberSince.value = found.createdAt ? new Date(found.createdAt).getFullYear() : '2024'
    loadProviderServices()
  }
  isLoading.value = false
}

function loadProviderServices() {
  const services = JSON.parse(localStorage.getItem('services') || '[]')
  providerServices.value = services.filter(s => s.provider_id === provider.value.id || s.userId === provider.value.id)
  stats.value.totalServices = providerServices.value.length
  stats.value.totalProjects = providerServices.value.reduce((sum, s) => sum + (s.projects || 0), 0)
}

function viewService(service) {
  localStorage.setItem('currentService', JSON.stringify(service))
  router.push(`/service/${service.id}`)
}

onMounted(loadProvider)
</script>