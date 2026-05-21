<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto px-8 py-24">

      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-light" style="font-family: 'Cinzel', serif;">
            My <span class="text-blue-500">Notifications</span>
          </h1>
          <p v-if="unreadCount > 0" class="text-sm text-gray-500 mt-1">
            {{ unreadCount }} unread notification{{ unreadCount > 1 ? 's' : '' }}
          </p>
        </div>
        <button
          @click="markAllAsRead"
          :disabled="unreadCount === 0"
          class="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Mark all as read
        </button>
      </div>

      <!-- Type filters -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          @click="filterType = 'all'"
          :class="filterType === 'all' ? 'bg-[#0a0f2e] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-4 py-2 rounded-full text-sm transition-colors border border-gray-100"
        >
          All ({{ notifications.length }})
        </button>
        <button
          v-for="type in notificationTypes"
          :key="type.value"
          @click="filterType = type.value"
          :class="filterType === type.value ? 'bg-[#0a0f2e] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-4 py-2 rounded-full text-sm transition-colors border border-gray-100"
        >
          {{ type.label }} ({{ countByType(type.value) }})
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-sm">
        {{ error }}
      </div>

      <!-- Empty -->
      <div v-else-if="filteredNotifications.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No notifications</h3>
        <p class="text-gray-500">Nothing to show for this category</p>
      </div>

      <!-- Notifications list -->
      <div v-else class="space-y-3">
        <div
          v-for="notif in filteredNotifications"
          :key="notif.id"
          @click="handleNotificationClick(notif)"
          class="bg-white rounded-2xl shadow-sm border transition-all cursor-pointer hover:shadow-md"
          :class="!notif.est_lu ? 'border-l-4 border-l-blue-500 border-gray-100' : 'border-gray-100'"
        >
          <div class="p-5">
            <div class="flex gap-4">

              <!-- Icon -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="getNotificationIconClass(notif.type)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="getNotificationIcon(notif.type)"/>
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-start gap-2">
                  <div class="flex-1">
                    <p class="text-gray-800 text-sm">{{ notif.message }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <p class="text-xs text-gray-400">{{ formatDate(notif.date_envoi) }}</p>
                      <span class="text-xs px-2 py-0.5 rounded-full capitalize"
                        :class="getNotificationIconClass(notif.type)">
                        {{ notif.type }}
                      </span>
                    </div>
                  </div>
                  <!-- Unread dot -->
                  <div v-if="!notif.est_lu" class="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                </div>

                <!-- Lien -->
                <div v-if="notif.lien" class="mt-2">
                  <span class="text-xs text-blue-500 hover:underline">
                    View details →
                  </span>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router        = useRouter()
const notifications = ref([])
const filterType    = ref('all')
const isLoading     = ref(true)
const error         = ref(null)

const API = 'http://127.0.0.1:8000/api/site'

const notificationTypes = [
  { value: 'evenement',   label: '📅 Events'       },
  { value: 'compte',      label: '👤 Account'      },
  { value: 'paiement',    label: '💳 Payments'     },
  { value: 'reservation', label: '📋 Reservations' },
  { value: 'service',     label: '🔧 Services'     },
  { value: 'système',     label: '⚙️ System'       },
]

// ✅ Filtrer par type
const filteredNotifications = computed(() => {
  if (filterType.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === filterType.value)
})

// ✅ Nombre non lues
const unreadCount = computed(() =>
  notifications.value.filter(n => !n.est_lu).length
)

// ✅ Compter par type
function countByType(type) {
  return notifications.value.filter(n => n.type === type).length
}

// ✅ Charger notifications depuis API Laravel
async function loadNotifications() {
  isLoading.value = true
  error.value     = null

  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/auth')
    return
  }

  try {
    const response = await axios.get(`${API}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:        'application/json'
      }
    })

    // ✅ Réponse : { notifications: { data: [...] }, non_lues: 3 }
    notifications.value = response.data.notifications?.data
                       || response.data.notifications
                       || response.data
                       || []

  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Error loading notifications'
  } finally {
    isLoading.value = false
  }
}

// ✅ Marquer toutes comme lues
async function markAllAsRead() {
  const token = localStorage.getItem('token')
  try {
    await axios.put(`${API}/notifications/tous-lus`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Mettre à jour localement
    notifications.value = notifications.value.map(n => ({ ...n, est_lu: true }))
  } catch (err) {
    console.error(err)
  }
}

// ✅ Cliquer sur notification → marquer lue + rediriger
async function handleNotificationClick(notif) {
  const token = localStorage.getItem('token')

  // Marquer comme lue si pas encore lue
  if (!notif.est_lu) {
    try {
      await axios.put(`${API}/notifications/${notif.id}/lu`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Mettre à jour localement
      const index = notifications.value.findIndex(n => n.id === notif.id)
      if (index !== -1) notifications.value[index].est_lu = true
    } catch (err) {
      console.error(err)
    }
  }

  // Rediriger si lien
  if (notif.lien) {
    router.push(notif.lien)
  }
}

function getNotificationIconClass(type) {
  const classes = {
    'evenement':   'bg-blue-100 text-blue-600',
    'compte':      'bg-green-100 text-green-600',
    'paiement':    'bg-purple-100 text-purple-600',
    'reservation': 'bg-orange-100 text-orange-600',
    'service':     'bg-teal-100 text-teal-600',
    'système':     'bg-gray-100 text-gray-600',
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

function getNotificationIcon(type) {
  const icons = {
    'evenement':   'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5',
    'compte':      'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    'paiement':    'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
    'reservation': 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'service':     'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63',
    'système':     'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
  }
  return icons[type] || 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date    = new Date(dateString)
  const now     = new Date()
  const diffMs  = now - date
  const diffMins  = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays  = Math.floor(diffMs / 86400000)

  if (diffMins  < 1)  return 'Just now'
  if (diffMins  < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays  < 7)  return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  loadNotifications()
})
</script>