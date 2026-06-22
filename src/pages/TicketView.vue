<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div v-if="isLoading" class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else-if="ticket" class="max-w-md w-full">
      <!-- Ticket Card -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#0a0f2e] to-[#1a2560] px-6 py-6 text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
            <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
            </svg>
            <span class="text-white/70 text-xs tracking-wide">Valid Ticket</span>
          </div>
          <h1 class="text-xl font-bold text-white">{{ ticket.eventTitle }}</h1>
          <p class="text-white/60 text-sm mt-1">Ticket #{{ ticket.id }}</p>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-4">
          <div class="space-y-3">
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-gray-500 text-sm">Event</span>
              <span class="font-medium text-gray-900">{{ ticket.eventTitle }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-gray-500 text-sm">Location</span>
              <span class="font-medium text-gray-900">{{ ticket.location }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-gray-500 text-sm">Date</span>
              <span class="font-medium text-gray-900">{{ ticket.date }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-gray-500 text-sm">Ticket Type</span>
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                {{ ticket.ticketType }}
              </span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-gray-500 text-sm">Attendee</span>
              <span class="font-medium text-gray-900">{{ ticket.attendeeName || 'N/A' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 text-sm">Status</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="ticket.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'">
                {{ ticket.status || 'Active' }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-100 text-center">
            <div class="bg-gray-50 rounded-xl p-4 inline-block mx-auto">
              <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="w-32 h-32"/>
            </div>
            <p class="text-xs text-gray-400 mt-2">Show this ticket at the entrance</p>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-400">EventAura · Professional Event Management</p>
        </div>
      </div>
      
      <div class="text-center mt-4">
        <router-link to="/" class="text-sm text-blue-500 hover:text-blue-700 transition">
          ← Back to Home
        </router-link>
      </div>
    </div>
    
    <div v-else class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
      </svg>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Ticket Not Found</h2>
      <p class="text-gray-400 text-sm mb-4">The ticket you're looking for doesn't exist.</p>
      <router-link to="/" class="inline-block bg-[#0a0f2e] text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition">
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'

const route = useRoute()
const router = useRouter()
const ticket = ref(null)
const qrCodeUrl = ref(null)
const isLoading = ref(true)

const NGROK_URL = 'https://boastful-blaming-crushing.ngrok-free.dev'

async function loadTicket() {
  isLoading.value = true
  
  try {
    const ticketId = route.params.id
    
    const myTickets = JSON.parse(localStorage.getItem('myTickets') || '[]')
    const foundTicket = myTickets.find(t => t.id === ticketId)
    
    if (foundTicket) {
      ticket.value = foundTicket
      const ticketUrl = `${NGROK_URL}/ticket/${ticketId}`
      qrCodeUrl.value = await QRCode.toDataURL(ticketUrl, {
        width: 150,
        margin: 2,
        color: { dark: '#0a0f2e', light: '#ffffff' }
      })
    }
  } catch (error) {
    console.error('Error loading ticket:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTicket()
})
</script>