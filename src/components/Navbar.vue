<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#0a0f2e]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0f2e]'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

      <!-- Left links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navLeft" :key="item.label">
          <router-link :to="item.to" class="nav-link">{{ item.label }}</router-link>
        </li>
        <!-- Services Dropdown -->
        <li class="relative">
          <button @click="toggleServicesDropdown" class="nav-link inline-flex items-center gap-1">
            Services
            <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': showServicesDropdown }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="showServicesDropdown" class="absolute top-full left-0 mt-2 w-56 bg-[#0a0f2e] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
            <button @click="navigateTo('/service-provider')" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 0v5.625m0-5.625v5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"/>
              </svg>
              <span>Service Providers</span>
            </button>
            <button @click="navigateTo('/venue')" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21"/>
              </svg>
              <span>Venues</span>
            </button>
          </div>
        </li>
      </ul>

      <!-- Center logo -->
      <router-link to="/" class="logo absolute left-1/2 -translate-x-1/2">EventAura</router-link>

      <!-- Right -->
      <div class="hidden md:flex items-center gap-6">
        <router-link to="/contact" class="nav-link">Contact</router-link>

        <!-- Language Switcher -->
        <div class="relative">
          <button @click="toggleLangMenu" class="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h2.25m6 0h2.25M3 12a9 9 0 0018 0m-18 0a9 9 0 0118 0m-9-9v2.25m6 0h2.25M21 12a9 9 0 01-18 0m18 0h-2.25M12 21v-2.25m0-6v2.25" />
            </svg>
            <span class="text-sm">{{ getCurrentLangLabel() }}</span>
            <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': showLangMenu }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-if="showLangMenu" class="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
            <button @click="changeLanguage('fr')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <span class="text-lg">🇫🇷</span> Français
            </button>
            <button @click="changeLanguage('en')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <span class="text-lg">🇬🇧</span> English
            </button>
            <button @click="changeLanguage('ar')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <span class="text-lg">🇲🇦</span> العربية
            </button>
          </div>
        </div>

        <!-- Notifications Icon -->
        <div v-if="isLoggedIn" class="relative">
          <button @click="toggleNotifications" class="relative p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <svg class="w-5 h-5 text-white/70 hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>
          <div v-if="showNotifications" class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
            <div class="p-3 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-semibold text-gray-900">Notifications</h3>
              <button @click="markAllAsRead" class="text-xs text-blue-500 hover:text-blue-700">Mark all as read</button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-if="notifications.length === 0" class="p-6 text-center text-gray-400 text-sm">No notifications</div>
              <div
                v-for="notif in notifications.slice(0, 5)"
                :key="notif.id"
                @click="handleNotificationClick(notif)"
                class="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                :class="{ 'bg-blue-50': !notif.est_lu }"
              >
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="getNotificationIconClass(notif.type)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="getNotificationIcon(notif.type)"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-800">{{ notif.message }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date_envoi) }}</p>
                  </div>
                  <div v-if="!notif.est_lu" class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                </div>
              </div>
            </div>
            <div class="p-2 border-t border-gray-100 text-center">
              <router-link to="/notifications" class="text-xs text-blue-500 hover:text-blue-700" @click="showNotifications = false">View all</router-link>
            </div>
          </div>
        </div>

        <!-- Sign in button -->
        <router-link v-if="!isLoggedIn" to="/auth" class="sign-in-btn">Sign in</router-link>

        <!-- Profile dropdown -->
        <div v-else class="relative" ref="profileMenuRef">
          <button @click="profileMenuOpen = !profileMenuOpen" class="flex items-center gap-2.5 group">
            <img
              :src="currentUser.photo_profil || `https://ui-avatars.com/api/?name=${currentUser.prenom}+${currentUser.nom}&background=1a2560&color=fff&size=64`"
              :alt="currentUser.prenom"
              class="w-8 h-8 rounded-full object-cover border-2 border-white/20 group-hover:border-white/50 transition-colors"
            />
            <span class="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
              {{ currentUser.prenom }}
            </span>
            <svg class="w-3.5 h-3.5 text-white/50 transition-transform duration-200" :class="profileMenuOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <transition name="dropdown">
            <div v-if="profileMenuOpen" class="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

              <!-- User info -->
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-900">{{ currentUser.prenom }} {{ currentUser.nom }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ currentUser.email }}</p>
                <span class="inline-flex mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full" :class="roleBadge">
                  {{ roleLabel }}
                </span>
              </div>

              <!-- Menu items -->
              <div class="py-1.5">
                <!-- Profile — tous les users -->
                <router-link
                  to="/profile"
                  @click="profileMenuOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                  My Profile
                </router-link>

                <!-- ✅ My Tickets — tous les clients -->
                <router-link
                  v-if="hasRole('client')"
                  to="/my-tickets"
                  @click="profileMenuOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                  </svg>
                  My Tickets
                </router-link>

                <!-- ✅ My Events — organisateurs seulement -->
                <router-link
                  v-if="hasRole('organisateur')"
                  to="/my-events"
                  @click="profileMenuOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                  </svg>
                  My Events
                </router-link>

                <!-- ✅ My Services — prestataires seulement -->
                <router-link
                  v-if="hasRole('prestataire')"
                  to="/my-services"
                  @click="profileMenuOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
                  </svg>
                  My Services
                </router-link>

                <!-- Reservations — tous -->
                <router-link
                  to="/reservations"
                  @click="profileMenuOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15"/>
                  </svg>
                  My Reservations
                </router-link>
              </div>

              <!-- Logout -->
              <div class="border-t border-gray-100 py-1.5">
                <button
                  @click="logout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Mobile hamburger -->
      <button class="md:hidden flex flex-col gap-1.5 p-2 ml-auto" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span :class="['bar', menuOpen ? 'rotate-45 translate-y-2.5' : '']"/>
        <span :class="['bar', menuOpen ? 'opacity-0' : '']"/>
        <span :class="['bar', menuOpen ? '-rotate-45 -translate-y-2.5' : '']"/>
      </button>
    </div>

    <!-- Mobile menu -->
    <div :class="['md:hidden overflow-hidden transition-all duration-300', menuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0']">
      <div class="bg-[#0a0f2e] px-6 py-4 flex flex-col gap-3">
        <router-link to="/" class="text-sm text-white/70 hover:text-white transition-colors" @click="menuOpen = false">Home</router-link>
        <div>
          <button @click="mobileServicesOpen = !mobileServicesOpen" class="flex items-center justify-between w-full text-sm text-white/70 hover:text-white transition-colors">
            Services
            <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': mobileServicesOpen }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="mobileServicesOpen" class="ml-4 mt-2 space-y-2">
            <button @click="navigateTo('/service-provider')" class="block text-xs text-white/50 hover:text-white transition-colors py-1 w-full text-left">Service Providers</button>
            <button @click="navigateTo('/venue')" class="block text-xs text-white/50 hover:text-white transition-colors py-1 w-full text-left">Venues</button>
          </div>
        </div>
        <router-link to="/events" class="text-sm text-white/70 hover:text-white transition-colors" @click="menuOpen = false">Events</router-link>
        <router-link to="/contact" class="text-sm text-white/70 hover:text-white transition-colors" @click="menuOpen = false">Contact</router-link>

        <!-- Language selector mobile -->
        <div class="flex gap-2 pt-2 border-t border-white/10 mt-2">
          <button @click="changeLanguage('fr')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇫🇷 FR</button>
          <button @click="changeLanguage('en')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇬🇧 EN</button>
          <button @click="changeLanguage('ar')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇲🇦 AR</button>
        </div>

        <router-link v-if="!isLoggedIn" to="/auth" class="sign-in-btn w-fit text-center" @click="menuOpen = false">Sign in</router-link>
        <button v-else @click="logout" class="sign-in-btn w-fit text-center text-red-400 border-red-400/30">Sign out</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API = 'http://127.0.0.1:8000/api/site'

const navLeft = [
  { label: 'Home',   to: '/' },
  { label: 'Events', to: '/events' },
]

const showLangMenu         = ref(false)
const scrolled             = ref(false)
const menuOpen             = ref(false)
const profileMenuOpen      = ref(false)
const showServicesDropdown = ref(false)
const mobileServicesOpen   = ref(false)
const profileMenuRef       = ref(null)
const isLoggedIn           = ref(false)
const notifications        = ref([])
const showNotifications    = ref(false)

const currentUser = ref({
  id:           null,
  nom:          '',
  prenom:       '',
  email:        '',
  roles:        [], // ✅ array
  photo_profil: '',
  telephone:    '',
  ville:        ''
})

// ✅ Vérifier rôle depuis array
const hasRole = (role) => {
  return currentUser.value.roles?.includes(role)
}

// ✅ Label rôle principal
const roleLabel = computed(() => {
  if (hasRole('organisateur')) return 'Organizer'
  if (hasRole('prestataire'))  return 'Provider'
  return 'Client'
})

// ✅ Badge couleur rôle
const roleBadge = computed(() => {
  if (hasRole('organisateur')) return 'bg-purple-100 text-purple-700'
  if (hasRole('prestataire'))  return 'bg-emerald-100 text-emerald-700'
  return 'bg-blue-100 text-blue-700'
})

const unreadCount = computed(() =>
  notifications.value.filter(n => !n.est_lu).length
)

// ✅ Charger user depuis localStorage
function loadUser() {
  const token = localStorage.getItem('token')
  const user  = localStorage.getItem('user')

  if (token && user) {
    currentUser.value = JSON.parse(user)
    isLoggedIn.value  = true
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Accept']        = 'application/json'
    loadNotifications()
  } else {
    isLoggedIn.value = false
  }
}

// ✅ Charger notifications depuis API
async function loadNotifications() {
  try {
    const response = await axios.get(`${API}/notifications`)
    notifications.value = response.data.notifications?.data || []
  } catch (error) {
    console.log('Erreur notifications:', error)
  }
}

// ✅ Logout propre
async function logout() {
  try {
    await axios.post(`${API}/logout`)
  } catch (error) {
    console.log('Logout error:', error)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isLoggedIn.value  = false
    currentUser.value = { id: null, nom: '', prenom: '', email: '', roles: [], photo_profil: '' }
    profileMenuOpen.value = false
    menuOpen.value        = false
    router.push('/')
  }
}

// ✅ Marquer toutes notifications lues
async function markAllAsRead() {
  try {
    await axios.put(`${API}/notifications/tous-lus`)
    notifications.value = notifications.value.map(n => ({ ...n, est_lu: true }))
  } catch (error) {
    console.log(error)
  }
}

// ✅ Cliquer sur notification
function handleNotificationClick(notif) {
  if (!notif.est_lu) {
    axios.put(`${API}/notifications/${notif.id}/lu`)
    notif.est_lu = true
  }
  if (notif.lien) router.push(notif.lien)
  showNotifications.value = false
}

function getNotificationIconClass(type) {
  const classes = {
    paiement:    'bg-green-100 text-green-600',
    evenement:   'bg-blue-100 text-blue-600',
    reservation: 'bg-purple-100 text-purple-600',
    service:     'bg-orange-100 text-orange-600',
    compte:      'bg-red-100 text-red-600',
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

function getNotificationIcon(type) {
  const icons = {
    paiement:    'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75',
    evenement:   'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5',
    reservation: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15',
    default:     'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
  }
  return icons[type] || icons.default
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  })
}

function getCurrentLangLabel() {
  const lang = localStorage.getItem('selectedLang') || 'fr'
  if (lang === 'fr') return '🇫🇷 FR'
  if (lang === 'en') return '🇬🇧 EN'
  if (lang === 'ar') return '🇲🇦 AR'
  return '🌐'
}

function changeLanguage(lang) {
  localStorage.setItem('selectedLang', lang)
  showLangMenu.value = false
}

function toggleLangMenu()          { showLangMenu.value = !showLangMenu.value }
function toggleServicesDropdown()  { showServicesDropdown.value = !showServicesDropdown.value }
function toggleNotifications()     { showNotifications.value = !showNotifications.value }

function navigateTo(route) {
  showServicesDropdown.value = false
  mobileServicesOpen.value   = false
  menuOpen.value             = false
  router.push(route)
}

function handleScroll() { scrolled.value = window.scrollY > 20 }

function handleClickOutside(e) {
  if (profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    profileMenuOpen.value = false
  }
  if (showServicesDropdown.value && !e.target.closest('.relative')) {
    showServicesDropdown.value = false
  }
  if (showNotifications.value && !e.target.closest('.relative')) {
    showNotifications.value = false
  }
  if (showLangMenu.value && !e.target.closest('.relative')) {
    showLangMenu.value = false
  }
}

onMounted(() => {
  loadUser()
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');

.logo {
  font-family: 'Cinzel', Georgia, serif;
  font-weight: 300;
  font-size: 1.05rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: rgba(255,255,255,0.6);
  transition: width 0.3s;
}

.nav-link:hover { color: white; }
.nav-link:hover::after { width: 100%; }

.sign-in-btn {
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 5px 20px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s;
  background: transparent;
  cursor: pointer;
}

.sign-in-btn:hover { background: white; color: #0a0f2e; }

.bar {
  display: block;
  width: 20px;
  height: 1px;
  background: white;
  transition: all 0.3s;
}

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-8px); }
</style>