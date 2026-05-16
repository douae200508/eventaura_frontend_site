<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">My <span class="text-blue-500">Notifications</span></h1>
        <button @click="markAllAsRead" class="text-sm text-blue-500 hover:text-blue-700">Mark all as read</button>
      </div>

      <div v-if="notifications.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No notifications yet</h3>
        <p class="text-gray-500">When you receive notifications, they will appear here</p>
      </div>

      <div v-else class="space-y-3">
        <div v-for="notif in notifications" :key="notif.id" 
          @click="handleNotificationClick(notif)"
          class="bg-white rounded-2xl shadow-sm border transition-all cursor-pointer hover:shadow-md"
          :class="!notif.est_lu ? 'border-l-4 border-l-blue-500' : 'border-gray-100'">
          <div class="p-5">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="getNotificationIconClass(notif.type)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="getNotificationIcon(notif.type)"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-gray-800" v-html="notif.message"></p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date_envoi) }}</p>
                  </div>
                  <div v-if="!notif.est_lu" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div v-if="notif.lien" class="mt-3">
                  <span class="text-xs text-blue-500 hover:underline">Click to view details →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Type filters -->
      <div class="mt-8 flex flex-wrap gap-2 justify-center">
        <button @click="filterType = 'all'" :class="filterType === 'all' ? 'bg-[#0a0f2e] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'" class="px-4 py-2 rounded-full text-sm transition-colors">
          All
        </button>
        <button v-for="type in notificationTypes" :key="type.value" @click="filterType = type.value"
          :class="filterType === type.value ? 'bg-[#0a0f2e] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-4 py-2 rounded-full text-sm transition-colors">
          {{ type.label }}
        </button>
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
const notifications = ref([])
const filterType = ref('all')
const currentUser = ref(null)

const notificationTypes = [
  { value: 'evenement', label: 'Events' },
  { value: 'compte', label: 'Account' },
  { value: 'paiement', label: 'Payments' },
  { value: 'reservation', label: 'Reservations' },
  { value: 'service', label: 'Services' },
  { value: 'système', label: 'System' }
]

const filteredNotifications = computed(() => {
  if (filterType.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === filterType.value)
})

function loadNotifications() {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
  }
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  notifications.value = allNotifications.filter(n => n.user_id === currentUser.value?.id)
}

function markAllAsRead() {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  const updatedNotifications = allNotifications.map(n => {
    if (n.user_id === currentUser.value?.id) {
      return { ...n, est_lu: true }
    }
    return n
  })
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  loadNotifications()
}

function handleNotificationClick(notif) {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  const updatedNotifications = allNotifications.map(n => {
    if (n.id === notif.id) {
      return { ...n, est_lu: true }
    }
    return n
  })
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  
  if (notif.lien) {
    router.push(notif.lien)
  } else {
    loadNotifications()
  }
}

function getNotificationIconClass(type) {
  const icons = {
    'evenement': 'bg-blue-100',
    'compte': 'bg-green-100',
    'paiement': 'bg-purple-100',
    'reservation': 'bg-orange-100',
    'service': 'bg-teal-100',
    'système': 'bg-gray-100'
  }
  return icons[type] || 'bg-gray-100'
}

function getNotificationIcon(type) {
  const icons = {
    'evenement': 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5',
    'compte': 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    'paiement': 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
    'reservation': 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'service': 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877',
    'système': 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
  }
  return icons[type] || 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

onMounted(() => {
  loadNotifications()
})
</script>