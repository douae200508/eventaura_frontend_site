<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl p-8 max-w-md text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p class="text-gray-600 mb-6">Your event has been promoted successfully.</p>
      <button @click="goHome" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>