<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#0a0f2e]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0f2e]'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navLeft" :key="item.label">
          <router-link :to="item.to" class="nav-link">{{ item.label }}</router-link>
        </li>
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

      <!-- Center Logo - FIXED Cinzel font, looks the same on all pages -->
      <router-link to="/" class="logo-link absolute left-1/2 -translate-x-1/2">
        Event<span class="logo-highlight">Aura</span>
      </router-link>

      <div class="hidden md:flex items-center gap-6">
        <router-link to="/contact" class="nav-link">Contact</router-link>

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
            <button @click="changeLanguage('fr')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <span class="text-lg">🇫🇷</span> Français
            </button>
            <button @click="changeLanguage('en')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <span class="text-lg">🇬🇧</span> English
            </button>
            <button @click="changeLanguage('ar')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <span class="text-lg">🇲🇦</span> العربية
            </button>
          </div>
        </div>

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
              <div v-for="notif in notifications.slice(0, 5)" :key="notif.id" @click="handleNotificationClick(notif)" class="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" :class="{ 'bg-blue-50': !notif.est_lu }">
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="getNotificationIconClass(notif.type)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="getNotificationIcon(notif.type)"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-800" v-html="notif.message"></p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date_envoi) }}</p>
                  </div>
                  <div v-if="!notif.est_lu" class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
            <div class="p-2 border-t border-gray-100 text-center">
              <router-link to="/notifications" class="text-xs text-blue-500 hover:text-blue-700">View all</router-link>
            </div>
          </div>
        </div>

        <router-link v-if="!isLoggedIn" to="/auth" class="sign-in-btn">Sign in</router-link>

        <div v-else class="relative" ref="profileMenuRef">
          <button @click="profileMenuOpen = !profileMenuOpen" class="flex items-center gap-2.5 group">
            <img :src="currentUser.photo_profil || `https://ui-avatars.com/api/?name=${currentUser.prenom}+${currentUser.nom}&background=1a2560&color=fff&size=64`"
              :alt="currentUser.prenom"
              class="w-8 h-8 rounded-full object-cover border-2 border-white/20 group-hover:border-white/50 transition-colors"/>
            <span class="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{{ currentUser.prenom }}</span>
            <svg class="w-3.5 h-3.5 text-white/50 transition-transform duration-200" :class="profileMenuOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="dropdown">
            <div v-if="profileMenuOpen" class="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-900">{{ currentUser.prenom }} {{ currentUser.nom }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ currentUser.email }}</p>
                <span class="inline-flex mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full" :class="roleBadge">{{ roleLabel }}</span>
              </div>
              <div class="py-1.5">
                <router-link to="/profile" @click="profileMenuOpen = false" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                  My Profile
                </router-link>
                <router-link v-if="currentUser.role === 'client'" to="/my-tickets" @click="profileMenuOpen = false" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg>
                  My Tickets
                </router-link>
                <router-link v-if="currentUser.role === 'organizer'" to="/my-events" @click="profileMenuOpen = false" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/></svg>
                  My Events
                </router-link>
                <router-link v-if="currentUser.role === 'provider'" to="/my-services" @click="profileMenuOpen = false" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/></svg>
                  My Services
                </router-link>
              </div>
              <div class="border-t border-gray-100 py-1.5">
                <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
                  Sign out
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <button class="md:hidden flex flex-col gap-1.5 p-2 ml-auto" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span :class="['bar', menuOpen ? 'rotate-45 translate-y-2.5' : '']"/>
        <span :class="['bar', menuOpen ? 'opacity-0' : '']"/>
        <span :class="['bar', menuOpen ? '-rotate-45 -translate-y-2.5' : '']"/>
      </button>
    </div>

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
        
        <div class="flex gap-2 pt-2 border-t border-white/10 mt-2">
          <button @click="changeLanguage('fr')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇫🇷 FR</button>
          <button @click="changeLanguage('en')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇬🇧 EN</button>
          <button @click="changeLanguage('ar')" class="flex-1 text-center text-sm text-white/70 hover:text-white py-1 px-2 rounded-lg hover:bg-white/10 transition-colors">🇲🇦 AR</button>
        </div>
        
        <router-link v-if="!isLoggedIn" to="/auth" class="sign-in-btn w-fit text-center" @click="menuOpen = false">Sign in</router-link>
        <router-link v-else to="/profile" class="sign-in-btn w-fit text-center" @click="menuOpen = false">My Profile</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigation links
const navLeft = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
]

// Language switcher functions
const showLangMenu = ref(false)

function getCurrentLangLabel() {
  const lang = localStorage.getItem('selectedLang') || 'en'
  const labels = { fr: '🇫🇷 FR', en: '🇬🇧 EN', ar: '🇲🇦 AR' }
  return labels[lang] || '🌐'
}

function changeLanguage(lang) {
  localStorage.setItem('selectedLang', lang)
  showLangMenu.value = false
}

function toggleLangMenu() {
  showLangMenu.value = !showLangMenu.value
}

// Navigation helpers
function navigateTo(route) {
  showServicesDropdown.value = false
  mobileServicesOpen.value = false
  menuOpen.value = false
  router.push(route)
}

// Auth state
const isLoggedIn = ref(false)
const currentUser = ref({ id: null, nom: '', prenom: '', email: '', role: '', photo_profil: '', telephone: '', ville: '' })

// Notifications logic
const notifications = ref([])
const showNotifications = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => !n.est_lu).length)

const roleBadge = computed(() => ({ 
  client: 'bg-blue-100 text-blue-700', 
  organizer: 'bg-purple-100 text-purple-700', 
  provider: 'bg-emerald-100 text-emerald-700' 
}[currentUser.value.role] || 'bg-gray-100 text-gray-700'))

const roleLabel = computed(() => ({ 
  client: 'Client', 
  organizer: 'Organizer', 
  provider: 'Provider' 
}[currentUser.value.role] || ''))

// UI states
const scrolled = ref(false)
const menuOpen = ref(false)
const profileMenuOpen = ref(false)
const showServicesDropdown = ref(false)
const mobileServicesOpen = ref(false)
const profileMenuRef = ref(null)

function toggleServicesDropdown() {
  showServicesDropdown.value = !showServicesDropdown.value
}

function loadUser() {
  const user = localStorage.getItem('eventaura_currentUser')
  if (user) {
    const parsedUser = JSON.parse(user)
    currentUser.value = { ...parsedUser }
    isLoggedIn.value = true
    loadNotifications()
  } else {
    isLoggedIn.value = false
  }
}

function loadNotifications() {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  notifications.value = allNotifications.filter(n => n.user_id === currentUser.value.id)
}

function toggleNotifications() { showNotifications.value = !showNotifications.value }
function markAllAsRead() { }
function handleNotificationClick(notif) { }
function getNotificationIconClass(type) { return 'bg-gray-100' }
function getNotificationIcon(type) { return 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' }
function formatDate(dateString) { if (!dateString) return ''; return new Date(dateString).toLocaleDateString() }

function handleScroll() { scrolled.value = window.scrollY > 20 }
function handleClickOutside(e) { 
  if (profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    profileMenuOpen.value = false
  }
  if (showServicesDropdown.value && !e.target.closest('.relative')) {
    showServicesDropdown.value = false
  }
}

function logout() { 
  localStorage.removeItem('eventaura_currentUser'); 
  loadUser(); 
  profileMenuOpen.value = false; 
  router.push('/') 
}

onMounted(() => {
  loadUser()
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('mousedown', handleClickOutside)
})
onUnmounted(() => { 
  window.removeEventListener('scroll', handleScroll); 
  document.removeEventListener('mousedown', handleClickOutside) 
})
</script>

<style scoped>
/* Logo with Cinzel font - looks exactly the same on all pages */
.logo-link {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.logo-link:hover {
  opacity: 0.85;
}

.logo-highlight {
  color: #60a5fa;
}

.nav-link { 
  font-size: 0.875rem; 
  font-weight: 400; 
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
  font-weight: 400; 
  letter-spacing: 0.04em; 
  color: rgba(255,255,255,0.8); 
  border: 1px solid rgba(255,255,255,0.3); 
  padding: 5px 20px; 
  border-radius: 9999px; 
  text-decoration: none; 
  transition: all 0.3s; 
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