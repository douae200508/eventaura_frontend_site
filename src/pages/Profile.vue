<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-8 py-24">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#0a0f2e] to-[#1a1f4e] px-8 py-8 text-white">
          <div class="flex items-center gap-6">
            <div class="relative">
              <img 
                :src="user.photo_profil || `https://ui-avatars.com/api/?name=${user.prenom}+${user.nom}&background=1a2560&color=fff&size=100`" 
                class="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
              <label class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                </svg>
                <input type="file" class="hidden" accept="image/*" @change="handlePhotoUpload"/>
              </label>
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ user.prenom }} {{ user.nom }}</h1>
              <p class="text-white/70">{{ user.email }}</p>
              <span class="inline-block mt-2 text-xs px-3 py-1 rounded-full" :class="roleBadge">{{ roleLabel }}</span>
            </div>
          </div>
        </div>
        
        <div class="p-8">
          <!-- Tabs -->
          <div class="flex gap-1 border-b border-gray-200 mb-6">
            <button @click="activeTab = 'profile'" :class="['px-4 py-2 text-sm font-medium rounded-t-lg transition-colors', activeTab === 'profile' ? 'bg-[#0a0f2e] text-white' : 'text-gray-500 hover:text-gray-700']">Profile Info</button>
            <button @click="activeTab = 'stats'" :class="['px-4 py-2 text-sm font-medium rounded-t-lg transition-colors', activeTab === 'stats' ? 'bg-[#0a0f2e] text-white' : 'text-gray-500 hover:text-gray-700']">Statistics</button>
            <button @click="activeTab = 'settings'" :class="['px-4 py-2 text-sm font-medium rounded-t-lg transition-colors', activeTab === 'settings' ? 'bg-[#0a0f2e] text-white' : 'text-gray-500 hover:text-gray-700']">Settings</button>
          </div>

          <!-- Profile Info Tab -->
          <div v-if="activeTab === 'profile'" class="space-y-5">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input v-model="user.prenom" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" disabled/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input v-model="user.nom" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" disabled/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="user.email" type="email" class="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" disabled/>
            </div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input v-model="user.telephone" type="tel" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="Not provided"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input v-model="user.ville" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="Not provided"/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div class="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-700">{{ roleLabel }}</div>
            </div>
            <button @click="updateProfile" class="mt-4 bg-[#0a0f2e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">Save Changes</button>
          </div>

          <!-- Statistics Tab -->
          <div v-if="activeTab === 'stats'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalEvents }}</p>
                <p class="text-sm text-gray-500">Events</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalBookings }}</p>
                <p class="text-sm text-gray-500">Bookings</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-bold text-gray-900">{{ stats.avgRating }} ⭐</p>
                <p class="text-sm text-gray-500">Avg Rating</p>
              </div>
            </div>
            <div class="border-t pt-4">
              <h3 class="font-semibold mb-3">Recent Activity</h3>
              <div v-if="stats.recentActivities.length === 0" class="text-gray-400 text-center py-4">No recent activity</div>
              <div v-else class="space-y-2">
                <div v-for="activity in stats.recentActivities" :key="activity.id" class="flex items-center gap-3 text-sm p-2 hover:bg-gray-50 rounded-lg">
                  <span class="text-gray-400">{{ activity.date }}</span>
                  <span>{{ activity.description }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"/>
            </div>
            <button class="bg-[#0a0f2e] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">Update Password</button>
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
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const activeTab = ref('profile')
const user = ref({ id: null, nom: '', prenom: '', email: '', role: '', photo_profil: '', telephone: '', ville: '' })

const roleBadge = computed(() => ({ client: 'bg-blue-100 text-blue-700', organizer: 'bg-purple-100 text-purple-700', provider: 'bg-emerald-100 text-emerald-700' }[user.value.role] || 'bg-gray-100 text-gray-700'))
const roleLabel = computed(() => ({ client: 'Client', organizer: 'Organizer', provider: 'Provider' }[user.value.role] || ''))

const stats = ref({ totalEvents: 0, totalBookings: 0, avgRating: 0, recentActivities: [] })

function loadUser() {
  const storedUser = localStorage.getItem('eventaura_currentUser')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  } else {
    router.push('/auth')
  }
}

function loadStats() {
  const events = JSON.parse(localStorage.getItem('approvedEvents') || '[]')
  const userEvents = events.filter(e => e.organisateur_id === user.value.id || e.organizerId === user.value.id)
  stats.value.totalEvents = userEvents.length
  stats.value.totalBookings = userEvents.reduce((sum, e) => sum + (e.bookings || 0), 0)
  const reviews = JSON.parse(localStorage.getItem('eventReviews') || '[]')
  const userReviews = reviews.filter(r => r.user_id === user.value.id)
  if (userReviews.length > 0) stats.value.avgRating = (userReviews.reduce((sum, r) => sum + r.note, 0) / userReviews.length).toFixed(1)
}

function handlePhotoUpload(e) { alert('Photo upload feature coming soon!') }
function updateProfile() { alert('Profile updated!') }

onMounted(() => { loadUser(); loadStats() })
</script>