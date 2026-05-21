<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <!-- Hero -->
    <div class="bg-gradient-to-br from-[#0a0f2e] via-[#0f1842] to-[#1a2560] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-10 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"/>
        <div class="absolute bottom-0 right-20 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl"/>
      </div>
      <div class="max-w-7xl mx-auto px-8 relative z-10">
        <div class="inline-flex items-center border border-white/15 text-white/50 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
          Events
        </div>
        <h1 class="text-5xl font-light text-white mb-4 leading-tight" style="font-family: 'Cinzel', Georgia, serif;">
          Discover & join<br/><span class="text-blue-400">upcoming events</span>
        </h1>
        <p class="text-white/50 text-base max-w-xl leading-relaxed">
          Connect with industry leaders, share insights and explore new opportunities.
        </p>
        <div class="flex gap-10 mt-10">
          <div>
            <p class="text-2xl font-bold text-white">{{ pagination.total }}+</p>
            <p class="text-white/40 text-xs mt-0.5">Events</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">30k+</p>
            <p class="text-white/40 text-xs mt-0.5">Attendees</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">120+</p>
            <p class="text-white/40 text-xs mt-0.5">Partners</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">94%</p>
            <p class="text-white/40 text-xs mt-0.5">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="flex gap-8">

        <!-- Sidebar Filters -->
        <aside class="w-64 flex-shrink-0 hidden lg:block">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900">Filters</h3>
              <button @click="clearFilters" class="text-xs text-blue-500 hover:text-blue-700 font-medium">Reset</button>
            </div>

            <!-- Category -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <div class="space-y-0.5">
                <label v-for="cat in categories" :key="cat.id"
                  class="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.category === cat.id ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'"
                  @click="filters.category = cat.id; loadEvents()"
                >
                  <span class="text-xs font-medium">{{ cat.name }}</span>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    :class="filters.category === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'">
                    {{ getCategoryCount(cat.id) }}
                  </span>
                </label>
              </div>
            </div>

            <div class="border-t border-gray-100"/>

            <!-- City -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">City</p>
              <select v-model="filters.ville" @change="loadEvents()"
                class="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-white">
                <option value="">All cities</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>

            <div class="border-t border-gray-100"/>

            <!-- Price Range -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
              <div class="space-y-0.5">
                <label v-for="opt in priceOptions" :key="opt.value"
                  class="flex items-center px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.priceRange === opt.value ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'"
                  @click="filters.priceRange = opt.value"
                >
                  <span class="text-xs font-medium">{{ opt.label }}</span>
                </label>
              </div>
            </div>

            <div class="border-t border-gray-100"/>

            <!-- Date -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">When</p>
              <div class="space-y-0.5">
                <label v-for="opt in dateOptions" :key="opt.value"
                  class="flex items-center px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  :class="filters.date === opt.value ? 'bg-[#0a0f2e] text-white' : 'hover:bg-gray-50 text-gray-600'"
                  @click="filters.date = opt.value"
                >
                  <span class="text-xs font-medium">{{ opt.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">

          <!-- Toolbar -->
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p class="text-sm text-gray-500">
              <span class="font-bold text-gray-900">{{ filteredEvents.length }}</span> events found
            </p>
            <div class="flex items-center gap-3">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <input v-model="filters.search" @input="loadEvents()" type="text" placeholder="Search events..."
                  class="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 w-52"/>
              </div>
              <select v-model="sortBy"
                class="text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none bg-white text-gray-700">
                <option value="date">Soonest First</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
            </div>
          </div>

          <!-- Active filter chips -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-5">
            <span v-if="filters.category !== 'all'"
              class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ categories.find(c => c.id === filters.category)?.name }}
              <button @click="filters.category = 'all'; loadEvents()">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
            <span v-if="filters.ville"
              class="inline-flex items-center gap-1.5 text-xs bg-[#0a0f2e] text-white px-3 py-1.5 rounded-full font-medium">
              {{ filters.ville }}
              <button @click="filters.ville = ''; loadEvents()">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          </div>

          <!-- Loading -->
          <div v-if="isLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center text-sm">
            {{ error }}
          </div>

          <!-- Empty -->
          <div v-else-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">No events found</h3>
            <p class="text-gray-400 text-sm">Try adjusting your filters</p>
          </div>

          <!-- Events Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="event in filteredEvents" :key="event.id"
              class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <!-- Image -->
              <div class="relative h-48 overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <img
                  v-if="event.photo"
                  :src="getImageUrl(event.photo)"
                  :alt="event.titre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  @error="event.photo = null"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"/>
                  </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"/>

                <!-- Favori -->
                <button
                  v-if="isLoggedIn"
                  @click.stop="toggleFavori(event)"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-10"
                  :class="event.isFavorited ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'"
                >
                  <svg class="w-4 h-4" :fill="event.isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                  </svg>
                </button>

                <!-- Type badge -->
                <div class="absolute bottom-3 left-3">
                  <span class="bg-[#0a0f2e]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                    {{ event.type }}
                  </span>
                </div>

                <!-- Prix -->
                <div class="absolute bottom-3 right-3">
                  <span class="text-white font-bold text-sm">
                    {{ event.prix_ticket > 0 ? event.prix_ticket + ' DH' : 'Free' }}
                  </span>
                </div>

                <!-- Accès privé -->
                <div v-if="event.acces === 'prive'" class="absolute top-3 left-3">
                  <span class="bg-gray-900/70 text-white text-[10px] px-2 py-1 rounded-full">🔒 Private</span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5 flex flex-col flex-1">
                <h3 class="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                  {{ event.titre }}
                </h3>

                <!-- Lieu -->
                <div class="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                  <svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                  <span>{{ event.ville }}, {{ event.lieu }}</span>
                </div>

                <!-- Date -->
                <div class="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"/>
                  </svg>
                  <span>{{ formatDate(event.date_debut) }}</span>
                </div>

                <!-- Description -->
                <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{{ event.description }}</p>

                <!-- Organisateur -->
                <div v-if="event.organisateur" class="flex items-center gap-2 mb-4">
                  <img
                    :src="event.organisateur.photo_profil
                      ? getImageUrl(event.organisateur.photo_profil)
                      : `https://ui-avatars.com/api/?name=${event.organisateur.prenom}+${event.organisateur.nom}&background=1a2560&color=fff&size=32`"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                  <span class="text-xs text-gray-500">
                    By {{ event.organisateur.prenom }} {{ event.organisateur.nom }}
                  </span>
                </div>

                <!-- Capacité -->
                <div v-if="event.capacite_max" class="mb-4">
                  <div class="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{{ event.tickets_count || 0 }} / {{ event.capacite_max }} spots</span>
                    <span>{{ Math.round(((event.tickets_count || 0) / event.capacite_max) * 100) }}%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      class="bg-blue-500 h-1.5 rounded-full transition-all"
                      :style="`width: ${Math.min(((event.tickets_count || 0) / event.capacite_max) * 100, 100)}%`"
                    ></div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                  <!-- Voir détails -->
                  <button
                    @click="router.push(`/events/${event.id}`)"
                    class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-xs font-semibold hover:border-gray-400 transition-colors flex items-center justify-center gap-1"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Details
                  </button>

                  <!-- Acheter ticket -->
                  <button
                    @click="buyTicket(event)"
                    class="flex-1 bg-[#0a0f2e] text-white py-2.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                    </svg>
                    {{ event.prix_ticket > 0 ? 'Buy Ticket' : 'Register Free' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.lastPage > 1" class="flex justify-center gap-2 mt-10">
            <button
              v-for="page in pagination.lastPage"
              :key="page"
              @click="loadEvents(page)"
              class="w-9 h-9 rounded-full text-sm font-medium transition-colors"
              :class="pagination.currentPage === page
                ? 'bg-[#0a0f2e] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FAB pour organisateur -->
    <button
      v-if="hasRole('organisateur')"
      @click="router.push('/create-event')"
      class="fixed bottom-8 right-8 bg-[#0a0f2e] hover:bg-blue-700 transition-all w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 group hover:scale-110"
      title="Create Event"
    >
      <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
    </button>

    <!-- Buy Ticket Modal -->
    <div v-if="showBuyModal && selectedEvent"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showBuyModal = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Buy Ticket</h2>
          <button @click="showBuyModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Event info -->
        <div class="bg-gray-50 rounded-xl p-4 mb-4">
          <h3 class="font-semibold text-gray-900">{{ selectedEvent.titre }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ formatDate(selectedEvent.date_debut) }} · {{ selectedEvent.lieu }}</p>
        </div>

        <div class="space-y-4">
          <!-- Type ticket -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
            <div class="grid grid-cols-3 gap-2">
              <button v-for="type in ['standard', 'VIP', 'premium']" :key="type"
                @click="ticketForm.type_ticket = type"
                class="py-2.5 rounded-xl text-xs font-medium border transition-all"
                :class="ticketForm.type_ticket === type
                  ? 'bg-[#0a0f2e] text-white border-[#0a0f2e]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'"
              >
                {{ type.toUpperCase() }}
              </button>
            </div>
          </div>

          <!-- Quantité -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div class="flex items-center gap-3">
              <button @click="ticketForm.quantite = Math.max(1, ticketForm.quantite - 1)"
                class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/>
                </svg>
              </button>
              <span class="text-lg font-bold text-gray-900 w-8 text-center">{{ ticketForm.quantite }}</span>
              <button @click="ticketForm.quantite++"
                class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Méthode paiement -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="method in ['carte', 'paypal', 'virement', 'cash']" :key="method"
                @click="ticketForm.methode_paiement = method"
                class="py-2.5 rounded-xl text-xs font-medium border transition-all capitalize"
                :class="ticketForm.methode_paiement === method
                  ? 'bg-[#0a0f2e] text-white border-[#0a0f2e]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'"
              >
                {{ method }}
              </button>
            </div>
          </div>

          <!-- Total -->
          <div class="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
            <span class="text-sm text-gray-600">Total</span>
            <span class="text-xl font-bold text-blue-600">
              {{ selectedEvent.prix_ticket > 0
                ? (selectedEvent.prix_ticket * ticketForm.quantite) + ' DH'
                : 'Free' }}
            </span>
          </div>

          <!-- Error -->
          <p v-if="buyError" class="text-red-500 text-sm">{{ buyError }}</p>

          <button
            @click="confirmBuyTicket"
            :disabled="buyLoading"
            class="w-full bg-[#0a0f2e] text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ buyLoading ? 'Processing...' : 'Confirm Purchase' }}
          </button>
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

const router = useRouter()
const API    = 'http://127.0.0.1:8000/api/site'

// State
const allEvents      = ref([])
const isLoading      = ref(true)
const error          = ref(null)
const sortBy         = ref('date')
const showBuyModal   = ref(false)
const selectedEvent  = ref(null)
const buyLoading     = ref(false)
const buyError       = ref(null)

const ticketForm = ref({
  type_ticket:      'standard',
  quantite:         1,
  methode_paiement: 'carte'
})

const pagination = ref({
  currentPage: 1,
  lastPage:    1,
  total:       0
})

const filters = ref({
  search:     '',
  category:   'all',
  ville:      '',
  priceRange: '',
  date:       ''
})

// ✅ User connecté
const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const isLoggedIn  = computed(() => !!localStorage.getItem('token'))
const hasRole     = (role) => currentUser.value?.roles?.includes(role)

const categories = [
  { id: 'all',        name: 'All Categories' },
  { id: 'conference', name: 'Conference'     },
  { id: 'workshop',   name: 'Workshop'       },
  { id: 'gala',       name: 'Gala'           },
  { id: 'concert',    name: 'Concert'        },
  { id: 'seminaire',  name: 'Seminar'        },
  { id: 'autre',      name: 'Other'          },
]

const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir']

const priceOptions = [
  { value: '',         label: 'All Prices'   },
  { value: 'free',     label: 'Free'         },
  { value: 'under100', label: 'Under 100 DH' },
  { value: '100-500',  label: '100–500 DH'   },
  { value: '500+',     label: '500+ DH'      },
]

const dateOptions = [
  { value: '',        label: 'Any time'    },
  { value: 'week',    label: 'This week'   },
  { value: 'month',   label: 'This month'  },
  { value: 'upcoming', label: 'Upcoming'   },
]

// ✅ URL image
function getImageUrl(photoUrl) {
  return photoUrl || null
}

// ✅ Charger events depuis API Laravel
async function loadEvents(page = 1) {
  isLoading.value = true
  error.value     = null

  try {
    const params = { page }
    if (filters.value.category !== 'all') params.type   = filters.value.category
    if (filters.value.ville)              params.ville  = filters.value.ville
    if (filters.value.search)             params.search = filters.value.search

    const response = await axios.get(`${API}/evenements`, { params })
    const data = response.data

    allEvents.value = data.data || data

    if (data.last_page) {
      pagination.value = {
        currentPage: data.current_page,
        lastPage:    data.last_page,
        total:       data.total
      }
    }

    // Charger favoris si connecté
    if (isLoggedIn.value) await loadFavoris()

  } catch (err) {
    error.value = err.response?.data?.message || 'Error loading events'
  } finally {
    isLoading.value = false
  }
}

// ✅ Charger favoris pour marquer les events
async function loadFavoris() {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API}/favoris`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoris = response.data
    // Marquer les events favoris
    allEvents.value = allEvents.value.map(event => ({
      ...event,
      isFavorited: favoris.some(f => f.evenement_id === event.id)
    }))
  } catch (err) {
    console.error(err)
  }
}

// ✅ Toggle favori
async function toggleFavori(event) {
  const token = localStorage.getItem('token')
  if (!token) { router.push('/auth'); return }

  try {
    if (event.isFavorited) {
      await axios.delete(`${API}/favoris/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      event.isFavorited = false
    } else {
      await axios.post(`${API}/favoris`, { evenement_id: event.id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      event.isFavorited = true
    }
  } catch (err) {
    console.error(err)
  }
}

// ✅ Ouvrir modal achat ticket
function buyTicket(event) {
  const token = localStorage.getItem('token')
  if (!token) { router.push('/auth'); return }
  selectedEvent.value = event
  buyError.value      = null
  ticketForm.value    = { type_ticket: 'standard', quantite: 1, methode_paiement: 'carte' }
  showBuyModal.value  = true
}

// ✅ Confirmer achat
async function confirmBuyTicket() {
  const token = localStorage.getItem('token')
  buyLoading.value = true
  buyError.value   = null

  try {
    const response = await axios.post(`${API}/paiements/ticket`, {
      evenement_id:     selectedEvent.value.id,
      type_ticket:      ticketForm.value.type_ticket,
      quantite:         ticketForm.value.quantite,
      methode_paiement: ticketForm.value.methode_paiement,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    showBuyModal.value = false
    // Rediriger vers mes tickets
    router.push('/my-tickets')

  } catch (err) {
    buyError.value = err.response?.data?.message || 'Error processing payment'
  } finally {
    buyLoading.value = false
  }
}

// Filters & sort
const hasActiveFilters = computed(() =>
  filters.value.category !== 'all' || filters.value.ville || filters.value.priceRange || filters.value.date
)

function clearFilters() {
  filters.value = { search: '', category: 'all', ville: '', priceRange: '', date: '' }
  sortBy.value  = 'date'
  loadEvents()
}

function getCategoryCount(catId) {
  if (catId === 'all') return allEvents.value.length
  return allEvents.value.filter(e => e.type === catId).length
}

function formatDate(date) {
  if (!date) return 'TBD'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

// ✅ Filtrer et trier côté frontend
const filteredEvents = computed(() => {
  let result = allEvents.value.filter(e => {
    // Prix
    if (filters.value.priceRange) {
      const p = e.prix_ticket || 0
      if (filters.value.priceRange === 'free'     && p !== 0)          return false
      if (filters.value.priceRange === 'under100' && (p === 0 || p >= 100)) return false
      if (filters.value.priceRange === '100-500'  && (p < 100 || p > 500))  return false
      if (filters.value.priceRange === '500+'     && p <= 500)          return false
    }
    // Date
    if (filters.value.date) {
      const now  = new Date()
      const date = new Date(e.date_debut)
      if (filters.value.date === 'week') {
        const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7)
        if (date > weekEnd || date < now) return false
      }
      if (filters.value.date === 'month') {
        if (date.getMonth() !== now.getMonth()) return false
      }
      if (filters.value.date === 'upcoming' && date < now) return false
    }
    return true
  })

  // Sort
  if (sortBy.value === 'price_asc')  result.sort((a, b) => (a.prix_ticket || 0) - (b.prix_ticket || 0))
  if (sortBy.value === 'price_desc') result.sort((a, b) => (b.prix_ticket || 0) - (a.prix_ticket || 0))
  if (sortBy.value === 'date')       result.sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut))

  return result
})

onMounted(() => {
  loadEvents()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>