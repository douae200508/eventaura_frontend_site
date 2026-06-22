<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">

    <!-- Ticket Header -->
    <div class="bg-gradient-to-r from-[#0a0f2e] to-[#1a2560] px-6 py-4 flex justify-between items-center">
      <div>
        <p class="text-white/60 text-xs uppercase tracking-wider">Ticket</p>
        <p class="text-white font-semibold text-lg">#{{ ticket.id }}</p>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-medium" 
        :class="ticket.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'">
        {{ ticket.status || 'Active' }}
      </span>
    </div>

    <!-- Ticket Content -->
    <div class="p-6">
      <div class="flex gap-6">
        <!-- Event Image -->
        <img :src="ticket.eventImage" :alt="ticket.eventTitle" 
          class="w-24 h-24 rounded-xl object-cover flex-shrink-0"/>

        <!-- Event Info -->
        <div class="flex-1">
          <h3 class="font-bold text-gray-900 mb-1">{{ ticket.eventTitle }}</h3>
          <div class="flex items-center gap-1.5 text-gray-500 text-sm mb-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <span>{{ ticket.location }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-gray-500 text-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
            </svg>
            <span>{{ ticket.date }}</span>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {{ ticket.ticketType || 'Standard' }}
            </span>
            <span class="text-sm font-bold text-blue-600">{{ ticket.price }}</span>
          </div>
        </div>
      </div>

      <!-- QR Code Section -->
      <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-white p-2 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-400 transition" @click="openQRModal">
            <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="w-20 h-20"/>
            <div v-else class="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z"/>
              </svg>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-500">Scan with your phone</p>
            <p class="text-xs text-gray-400">Ticket #{{ ticket.id }}</p>
            <button @click="regenerateQR" class="text-xs text-blue-500 hover:text-blue-700 transition mt-1">
              Regenerate QR
            </button>
          </div>
        </div>
        <button @click="downloadTicket" class="text-xs text-gray-500 hover:text-gray-700 transition">
          Download
        </button>
      </div>
    </div>

    <!-- QR Modal -->
    <div v-if="showQRModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="closeQRModal">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-lg">Your Ticket</h3>
          <button @click="closeQRModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="bg-gray-50 rounded-xl p-4 mb-4">
          <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="w-48 h-48 mx-auto"/>
          <p class="text-xs text-gray-400 mt-2">Scan this QR code with your phone camera</p>
        </div>
        
        <div class="text-left space-y-1">
          <p class="text-sm font-semibold text-gray-900">{{ ticket.eventTitle }}</p>
          <p class="text-xs text-gray-500">{{ ticket.location }}</p>
          <p class="text-xs text-gray-500">{{ ticket.date }}</p>
          <p class="text-xs text-gray-500">Ticket #{{ ticket.id }}</p>
          <p class="text-xs text-gray-500">Attendee: {{ ticket.attendeeName || 'N/A' }}</p>
        </div>
        
        <div class="flex gap-2 mt-4">
          <button @click="closeQRModal" class="flex-1 bg-[#0a0f2e] text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
            Done
          </button>
          <button @click="shareTicket" class="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition">
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const qrCodeUrl = ref(null)
const showQRModal = ref(false)

// 🔴 YOUR NGROK URL - REPLACE THIS WITH YOUR ACTUAL URL 🔴
const NGROK_URL = 'https://boastful-blaming-crushing.ngrok-free.dev'

async function generateQR() {
  try {
    const ticketUrl = `${NGROK_URL}/ticket/${props.ticket.id}`
    
    qrCodeUrl.value = await QRCode.toDataURL(ticketUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0a0f2e',
        light: '#ffffff'
      }
    })
  } catch (err) {
    console.error('Error generating QR code:', err)
  }
}

function regenerateQR() {
  generateQR()
}

function openQRModal() {
  showQRModal.value = true
}

function closeQRModal() {
  showQRModal.value = false
}

function shareTicket() {
  const ticketUrl = `${NGROK_URL}/ticket/${props.ticket.id}`
  if (navigator.share) {
    navigator.share({
      title: props.ticket.eventTitle,
      text: `Here's my ticket for ${props.ticket.eventTitle}`,
      url: ticketUrl
    }).catch(() => {})
  } else {
    navigator.clipboard.writeText(ticketUrl)
    alert('Ticket link copied to clipboard!')
  }
}

function downloadTicket() {
  if (qrCodeUrl.value) {
    const link = document.createElement('a')
    link.download = `ticket-${props.ticket.id}.png`
    link.href = qrCodeUrl.value
    link.click()
  }
}

onMounted(() => {
  generateQR()
})
</script>