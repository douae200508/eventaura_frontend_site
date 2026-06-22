<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-2xl mx-auto px-8 py-24">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2 text-center">Scan Ticket</h1>
        <p class="text-gray-500 text-sm text-center mb-6">Scan the QR code to view ticket details</p>
        
        <!-- Scanner -->
        <div class="bg-gray-100 rounded-xl overflow-hidden mb-6">
          <div id="reader" class="w-full h-64"></div>
        </div>
        
        <div class="text-center">
          <p class="text-xs text-gray-400">Position the QR code within the frame</p>
          <button @click="openFileScanner" class="mt-2 text-blue-500 hover:text-blue-700 text-sm">
            Or upload a QR code image
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden"/>
        </div>
        
        <!-- Scanned Ticket Result -->
        <div v-if="scannedTicket" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div class="flex items-center gap-3 text-green-700 mb-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="font-semibold">Ticket Found!</span>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Event:</span>
              <span class="font-medium">{{ scannedTicket.eventTitle }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Ticket #:</span>
              <span class="font-medium">{{ scannedTicket.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Attendee:</span>
              <span class="font-medium">{{ scannedTicket.attendeeName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Type:</span>
              <span class="font-medium">{{ scannedTicket.ticketType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Status:</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium" 
                :class="scannedTicket.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'">
                {{ scannedTicket.status || 'Active' }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-red-600 text-sm text-center">{{ error }}</p>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const fileInput = ref(null)
const scannedTicket = ref(null)
const error = ref(null)
let html5QrCode = null

async function initScanner() {
  try {
    const { Html5Qrcode } = await import('html5-qrcode')
    
    html5QrCode = new Html5Qrcode('reader')
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    }
    
    await html5QrCode.start(
      { facingMode: 'environment' },
      config,
      onScanSuccess,
      onScanError
    )
  } catch (err) {
    console.error('Scanner init error:', err)
  }
}

function onScanSuccess(decodedText) {
  try {
    const ticketData = JSON.parse(decodedText)
    scannedTicket.value = ticketData
    error.value = null
  } catch (err) {
    error.value = 'Invalid QR code. Please scan a valid ticket QR code.'
  }
}

function onScanError(err) {
  // Ignore - keep scanning
}

function openFileScanner() {
  fileInput.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const result = await Html5Qrcode.scanFile(e.target.result, true)
      onScanSuccess(result)
    } catch (err) {
      error.value = 'Could not read QR code from image. Please try again.'
    }
  }
  reader.readAsDataURL(file)
}

onMounted(() => {
  initScanner()
})

onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop()
  }
})
</script>