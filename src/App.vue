<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import AiChatbot from './components/AiChatbot.vue'

const route = useRoute()

// Your real events + services data (or import from a store)
const events = [
  { title: 'Tech Conference 2026', type: 'Conference', date: 'May 15', time: '09:00', city: 'Tangier', price: '$299', spotsLeft: '156', rating: 4.8, description: '...' },
  // ... all your events
]
const services = [
  { name: 'Studio Lumiere', categoryLabel: 'Photographer', location: 'Rabat', price: '3500 DH', rating: 4.9, available: true, tags: ['Events', 'Drone'] },
  // ... all your services
]

// Chatbot visibility - only when user is logged in
const showChatbot = ref(false)

// Hide navbar on auth page
const showNavbar = computed(() => {
  return route.path !== '/auth'
})

// Function to check if user is logged in
const checkUserLoggedIn = () => {
  const user = localStorage.getItem('eventaura_currentUser')
  showChatbot.value = !!user
}

const handleStorageChange = () => {
  checkUserLoggedIn()
}

onMounted(() => {
  checkUserLoggedIn()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<template>
  <div>
    <Navbar v-if="showNavbar" />
    <router-view />
    <!-- Chatbot floats on every page - ONLY when user is logged in -->
    <AiChatbot v-if="showChatbot" :events="events" :services="services" />
  </div>
</template>