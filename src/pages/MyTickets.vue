<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-8 py-24">
      <h1 class="text-3xl font-light mb-8" style="font-family: 'Cinzel', serif;">My <span class="text-blue-500">Tickets</span></h1>
      
      <div v-if="tickets.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No tickets yet</h3>
        <p class="text-gray-500 mb-4">Book your first event ticket</p>
        <router-link to="/events" class="inline-block bg-[#0a0f2e] text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition">
          Browse Events
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div v-for="ticket in tickets" :key="ticket.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div class="flex gap-4">
            <img :src="ticket.image" class="w-24 h-24 rounded-xl object-cover">
            <div class="flex-1">
              <h3 class="font-bold">{{ ticket.eventTitle }}</h3>
              <p class="text-sm text-gray-500">{{ ticket.date }} · {{ ticket.location }}</p>
              <p class="text-sm text-gray-500">Ticket Type: <span class="font-semibold">{{ ticket.type }}</span></p>
              <p class="text-sm font-bold text-blue-600 mt-2">{{ ticket.price }}</p>
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
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const tickets = ref([])

onMounted(() => {
  const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
  tickets.value = bookings
})
</script>