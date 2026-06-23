<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-8 py-24">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">My <span class="text-blue-500">Tickets</span></h1>
        <span class="text-sm text-gray-500">{{ tickets.length }} tickets</span>
      </div>

      <!-- Demo Ticket Button -->
      <div class="mb-6">
        <button 
          @click="generateDemoTicket"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Generate Demo Ticket
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Tickets Grid -->
      <div v-else-if="tickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No tickets yet</h3>
        <p class="text-gray-400 text-sm mb-4">Book your first event to get a ticket!</p>
        <router-link to="/events" class="inline-block bg-[#0a0f2e] text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition">
          Browse Events
        </router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import TicketCard from '../components/TicketCard.vue'

const router = useRouter()
const isLoading = ref(false)
const tickets = ref([])

// Generate a demo ticket
function generateDemoTicket() {
  const currentUser = JSON.parse(localStorage.getItem('eventaura_currentUser') || '{}')
  
  const newTicket = {
    id: 'DEMO-' + Date.now().toString().slice(-6),
    eventId: 1001,
    userId: currentUser.id || 1,
    eventTitle: 'International Tech Conference 2026',
    location: 'Casablanca Convention Center',
    date: 'May 15, 2026 · 09:00 AM',
    price: '299 DH',
    ticketType: 'Standard',
    status: 'active',
    createdAt: new Date().toISOString(),
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    attendeeName: `${currentUser.prenom || 'John'} ${currentUser.nom || 'Doe'}`,
    attendeeEmail: currentUser.email || 'demo@example.com'
  }
  
  tickets.value.unshift(newTicket)
  
  // Save to localStorage
  const savedTickets = JSON.parse(localStorage.getItem('myTickets') || '[]')
  savedTickets.unshift(newTicket)
  localStorage.setItem('myTickets', JSON.stringify(savedTickets))
  
  alert('✅ Demo ticket generated successfully!')
}

// Load tickets from localStorage
function loadTickets() {
  isLoading.value = true
  
  try {
    const savedTickets = JSON.parse(localStorage.getItem('myTickets') || '[]')
    
    // Also get bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const currentUser = JSON.parse(localStorage.getItem('eventaura_currentUser') || '{}')
    
    // Convert bookings to tickets
    const bookingTickets = bookings
      .filter(b => b.userId === currentUser.id)
      .map(booking => ({
        id: 'BK-' + booking.id,
        eventId: booking.eventId,
        userId: booking.userId,
        eventTitle: booking.eventTitle || 'Event',
        location: booking.location || 'TBD',
        date: booking.date || 'TBD',
        price: booking.price || '0 DH',
        ticketType: booking.ticketType || 'Standard',
        status: 'active',
        createdAt: booking.createdAt || new Date().toISOString(),
        eventImage: booking.eventImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80'
      }))
    
    // Combine both sources (avoid duplicates)
    const allTickets = [...savedTickets]
    bookingTickets.forEach(bt => {
      if (!allTickets.some(t => t.id === bt.id)) {
        allTickets.push(bt)
      }
    })
    
    tickets.value = allTickets
    
  } catch (error) {
    console.error('Error loading tickets:', error)
    tickets.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTickets()
})
</script>