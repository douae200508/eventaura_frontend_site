<script setup>
import AiChatbot from './components/AiChatbot.vue'

// Your real events + services data (or import from a store)
const events = [
  { title: 'Tech Conference 2026', type: 'Conference', date: 'May 15', time: '09:00', city: 'Tangier', price: '$299', spotsLeft: '156', rating: 4.8, description: '...' },
  // ... all your events
]
const services = [
  { name: 'Studio Lumiere', categoryLabel: 'Photographer', location: 'Rabat', price: '3500 DH', rating: 4.9, available: true, tags: ['Events', 'Drone'] },
  // ... all your services
]
</script>

<template>
  <div>
    <Navbar />
    <router-view />
    <!-- Chatbot floats on every page -->
    <AiChatbot :events="events" :services="services" />
  </div>
</template>