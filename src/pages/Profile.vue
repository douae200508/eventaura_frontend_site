<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Navbar />
    
    <div class="max-w-5xl mx-auto px-6 py-24">
      <!-- Profile Card -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        
        <!-- Cover Photo -->
        <div class="relative h-48 bg-gradient-to-r from-[#0a0f2e] via-[#1a2560] to-[#0a0f2e]">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="absolute -bottom-16 left-8">
            <div class="relative group">
              <img 
                :src="user.photo_profil || `https://ui-avatars.com/api/?name=${user.prenom}+${user.nom}&background=1a2560&color=fff&size=120&bold=true`" 
                class="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <label class="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                </svg>
                <input type="file" class="hidden" accept="image/*" @change="handlePhotoUpload"/>
              </label>
            </div>
          </div>
        </div>

        <!-- Profile Info Header -->
        <div class="pt-20 pb-6 px-8 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ user.prenom }} {{ user.nom }}</h1>
              <div class="flex items-center gap-2 mt-1">
                <span class="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full" :class="getRoleBadge()">
                  <span class="w-2 h-2 rounded-full" :class="getRoleDotColor()"></span>
                  {{ getRoleLabel() }}
                </span>
                <span class="text-gray-300">|</span>
                <span class="text-sm text-gray-500">{{ user.email }}</span>
              </div>
            </div>
            <button @click="activeTab = 'profile'" class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition shadow-sm">
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="px-8 border-b border-gray-100">
          <div class="flex gap-2">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id" 
              :class="[
                'px-5 py-3 text-sm font-medium transition-all relative',
                activeTab === tab.id 
                  ? 'text-[#0a0f2e]' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.name }}
              <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="p-8">
          
          <!-- Profile Info Tab -->
          <div v-if="activeTab === 'profile'" class="max-w-2xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                <input v-model="user.prenom" type="text" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                <input v-model="user.nom" type="text" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input v-model="user.email" type="email" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input v-model="user.telephone" type="tel" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition" placeholder="+212 6XX XXX XXX"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
                <select v-model="user.ville" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition bg-white">
                  <option value="">Select city</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-8">
              <button @click="updateProfile" class="px-6 py-2.5 bg-gradient-to-r from-[#0a0f2e] to-[#1a2560] text-white rounded-xl font-medium hover:from-blue-700 transition shadow-sm">
                Save Changes
              </button>
            </div>
          </div>

          <!-- Statistics Tab -->
          <div v-if="activeTab === 'stats'">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-3xl font-bold text-blue-600">{{ stats.totalEvents }}</p>
                    <p class="text-sm text-gray-600 mt-1">Events</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-3xl font-bold text-green-600">{{ stats.totalBookings }}</p>
                    <p class="text-sm text-gray-600 mt-1">Bookings</p>
                  </div>
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-3xl font-bold text-yellow-600">{{ stats.avgRating || 0 }}</p>
                    <p class="text-sm text-gray-600 mt-1">Avg Rating</p>
                  </div>
                  <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-3xl font-bold text-purple-600">{{ stats.memberSince }}</p>
                    <p class="text-sm text-gray-600 mt-1">Member Since</p>
                  </div>
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="max-w-lg">
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-yellow-800">Password Security</p>
                  <p class="text-xs text-yellow-700 mt-1">Use a strong password with at least 8 characters.</p>
                </div>
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input type="password" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition"/>
              </div>
              <button class="px-6 py-2.5 bg-gradient-to-r from-[#0a0f2e] to-[#1a2560] text-white rounded-xl font-medium hover:from-blue-700 transition shadow-sm">
                Update Password
              </button>
            </div>

            <!-- Danger Zone -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
              <div class="bg-red-50 border border-red-200 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-red-800">Delete Account</p>
                    <p class="text-xs text-red-700 mt-1">Permanently delete your account and all data</p>
                  </div>
                  <button class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition">
                    Delete Account
                  </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const activeTab = ref('profile')
const user = ref({ id: null, nom: '', prenom: '', email: '', role: '', photo_profil: '', telephone: '', ville: '' })

const tabs = [
  { id: 'profile', name: 'Profile Info' },
  { id: 'stats', name: 'Statistics' },
  { id: 'settings', name: 'Settings' }
]

const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda']

// Helper functions instead of computed properties to avoid infinite loops
function getRoleBadge() {
  const badges = {
    client: 'bg-blue-50 text-blue-700',
    organizer: 'bg-purple-50 text-purple-700',
    provider: 'bg-emerald-50 text-emerald-700'
  }
  return badges[user.value.role] || 'bg-gray-100 text-gray-700'
}

function getRoleDotColor() {
  const colors = {
    client: 'bg-blue-500',
    organizer: 'bg-purple-500',
    provider: 'bg-emerald-500'
  }
  return colors[user.value.role] || 'bg-gray-500'
}

function getRoleLabel() {
  const labels = { 
    client: 'Client', 
    organizer: 'Organizer', 
    provider: 'Provider' 
  }
  return labels[user.value.role] || ''
}

const stats = ref({ 
  totalEvents: 0, 
  totalBookings: 0, 
  avgRating: 0, 
  memberSince: '2024'
})

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
  if (userReviews.length > 0) {
    const total = userReviews.reduce((sum, r) => sum + r.note, 0)
    stats.value.avgRating = (total / userReviews.length).toFixed(1)
  }
  
  const users = JSON.parse(localStorage.getItem('eventaura_users') || '[]')
  const userData = users.find(u => u.id === user.value.id)
  if (userData && userData.createdAt) {
    stats.value.memberSince = new Date(userData.createdAt).getFullYear()
  }
}

function handlePhotoUpload(e) { 
  alert('Photo upload feature coming soon!') 
}

function updateProfile() { 
  localStorage.setItem('eventaura_currentUser', JSON.stringify(user.value))
  alert('Profile updated successfully!') 
}

onMounted(() => { 
  loadUser()
  loadStats()
})
</script>