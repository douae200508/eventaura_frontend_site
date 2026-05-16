<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-5xl mx-auto px-6 pt-32 pb-20">

      <!-- Back -->
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
        Back to events
      </button>

      <div class="flex gap-8 flex-col lg:flex-row">

        <!-- LEFT: Event info + ticket types -->
        <div class="flex-1">

          <!-- Event summary -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8">
            <div class="relative h-52 overflow-hidden">
              <img :src="event.image" :alt="event.title" class="w-full h-full object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/>
              <div class="absolute bottom-4 left-5 right-5">
                <div class="bg-[#0a0f2e]/80 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2">
                  <span class="text-white text-[10px] tracking-widest uppercase font-medium">{{ event.type }}</span>
                </div>
                <h1 class="text-xl font-bold text-white leading-tight">{{ event.title }}</h1>
              </div>
            </div>
            <div class="grid grid-cols-3 divide-x divide-gray-100 text-center">
              <div class="py-4 px-3">
                <div class="flex items-center justify-center gap-1.5 text-gray-600 text-xs mb-0.5">
                  <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                  </svg>
                  <span>{{ event.date }}</span>
                </div>
                <p class="text-[10px] text-gray-400">{{ event.time }} · {{ event.duration }}</p>
              </div>
              <div class="py-4 px-3">
                <div class="flex items-center justify-center gap-1.5 text-gray-600 text-xs mb-0.5">
                  <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                  <span>{{ event.city }}</span>
                </div>
                <p class="text-[10px] text-gray-400">{{ event.location }}</p>
              </div>
              <div class="py-4 px-3">
                <p class="text-xs text-gray-600 mb-0.5">Capacity</p>
                <p class="text-[10px] text-gray-400">{{ event.spotsLeft }} / {{ event.capacity }} spots left</p>
              </div>
            </div>
          </div>

          <!-- Ticket types -->
          <h2 class="text-lg font-bold text-gray-900 mb-4">Choose your ticket</h2>

          <div class="space-y-4">
            <div v-for="ticket in ticketTypes" :key="ticket.id"
              @click="!ticket.soldOut && selectTicket(ticket)"
              class="bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300"
              :class="[
                ticket.soldOut ? 'opacity-60 cursor-not-allowed border-gray-100' :
                selectedTicketId === ticket.id ? 'border-[#0a0f2e] shadow-md cursor-pointer' : 'border-gray-100 hover:border-gray-300 cursor-pointer'
              ]">

              <!-- Sold out banner -->
              <div v-if="ticket.soldOut" class="bg-gray-100 text-gray-400 text-center text-xs py-1.5 font-semibold tracking-wide uppercase">
                Sold Out
              </div>

              <!-- Selected indicator -->
              <div v-if="selectedTicketId === ticket.id && !ticket.soldOut" class="bg-[#0a0f2e] text-white text-center text-xs py-1.5 font-semibold tracking-widest uppercase">
                Selected
              </div>

              <div class="p-6">
                <div class="flex items-start gap-5">

                  <!-- Left: info -->
                  <div class="flex-1">
                    <div class="flex items-center gap-2.5 mb-2">
                      <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" :class="ticket.badgeClass">
                        {{ ticket.badge }}
                      </span>
                      <h3 class="text-base font-bold text-gray-900">{{ ticket.name }}</h3>
                    </div>
                    <p class="text-xs text-gray-500 leading-relaxed mb-4">{{ ticket.description }}</p>

                    <!-- Perks -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      <div v-for="perk in ticket.perks" :key="perk" class="flex items-center gap-2 text-xs text-gray-500">
                        <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                        {{ perk }}
                      </div>
                    </div>
                  </div>

                  <!-- Right: price + qty -->
                  <div class="text-right flex-shrink-0 min-w-[100px]">
                    <p class="text-2xl font-bold text-[#0a0f2e]">{{ ticket.price }}</p>
                    <p class="text-[10px] text-gray-400 mb-1">per ticket</p>
                    <p class="text-[10px] text-emerald-600 font-medium mb-4">{{ ticket.available }} left</p>

                    <!-- Quantity stepper -->
                    <div v-if="!ticket.soldOut" class="flex items-center gap-2 justify-end" @click.stop>
                      <button @click="decreaseQty(ticket)"
                        class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0a0f2e] hover:text-[#0a0f2e] transition-colors"
                        :class="ticket.quantity === 0 ? 'opacity-30 cursor-not-allowed' : ''"
                        :disabled="ticket.quantity === 0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/></svg>
                      </button>
                      <span class="text-sm font-bold text-gray-900 w-5 text-center">{{ ticket.quantity }}</span>
                      <button @click="increaseQty(ticket)"
                        class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0a0f2e] hover:text-[#0a0f2e] transition-colors"
                        :class="(ticket.quantity >= 10 || ticket.quantity >= ticket.available) ? 'opacity-30 cursor-not-allowed' : ''"
                        :disabled="ticket.quantity >= 10 || ticket.quantity >= ticket.available">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Order summary -->
        <div class="lg:w-80 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
            <h3 class="text-sm font-bold text-gray-900 mb-5">Order Summary</h3>

            <!-- Empty state -->
            <div v-if="selectedTickets.length === 0" class="text-center py-8 mb-4">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                </svg>
              </div>
              <p class="text-xs text-gray-400">Select a ticket type to continue</p>
            </div>

            <!-- Selected tickets -->
            <div v-else class="space-y-3 mb-4">
              <div v-for="t in selectedTickets" :key="t.id" class="flex justify-between items-center text-sm">
                <div>
                  <p class="text-xs font-semibold text-gray-800">{{ t.name }}</p>
                  <p class="text-[11px] text-gray-400">× {{ t.quantity }} ticket{{ t.quantity > 1 ? 's' : '' }}</p>
                </div>
                <span class="text-xs font-bold text-gray-900">${{ (t.priceNum * t.quantity).toLocaleString() }}</span>
              </div>
            </div>

            <!-- Totals -->
            <div v-if="selectedTickets.length > 0" class="border-t border-gray-100 pt-3 mb-5 space-y-2">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span><span>${{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Service fee (5%)</span><span>${{ fee.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span class="text-blue-600">${{ grandTotal.toLocaleString() }}</span>
              </div>
            </div>

            <!-- CTA -->
            <button
              @click="proceedToPayment"
              :disabled="selectedTickets.length === 0"
              class="w-full bg-[#0a0f2e] text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-blue-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
              Proceed to Payment
            </button>

            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-2 text-[11px] text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                SSL encrypted checkout
              </div>
              <div class="flex items-center gap-2 text-[11px] text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                QR ticket sent by email
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()

// Parse event from route query
const event = computed(() => {
  try { return JSON.parse(route.query.event || '{}') }
  catch { return {} }
})

const selectedTicketId = ref(null)

function selectTicket(ticket) {
  selectedTicketId.value = ticket.id
  // Auto set quantity to 1 when selected
  if (ticket.quantity === 0) ticket.quantity = 1
}

const ticketTypes = ref([
  {
    id: 'early',
    badge: 'Limited Offer',
    badgeClass: 'bg-amber-100 text-amber-700',
    name: 'Early Bird',
    description: 'Best value — grab the discounted rate before it sells out. Same access as Standard.',
    price: '$149',
    priceNum: 149,
    available: 20,
    quantity: 0,
    soldOut: false,
    perks: [
      'Full event access',
      'Lunch included',
      'Event welcome kit',
      'Certificate of attendance',
    ],
  },
  {
    id: 'standard',
    badge: 'Most Popular',
    badgeClass: 'bg-blue-100 text-blue-700',
    name: 'Standard',
    description: 'Complete access to all sessions, workshops and networking areas throughout the event.',
    price: '$299',
    priceNum: 299,
    available: 100,
    quantity: 0,
    soldOut: false,
    perks: [
      'Full event access',
      'All meals & coffee breaks',
      'Event welcome kit',
      'Certificate of attendance',
      'Access to session recordings',
    ],
  },
  {
    id: 'vip',
    badge: 'VIP',
    badgeClass: 'bg-[#0a0f2e] text-white',
    name: 'VIP',
    description: 'Premium experience with exclusive perks, priority seating and private networking dinner with speakers.',
    price: '$599',
    priceNum: 599,
    available: 15,
    quantity: 0,
    soldOut: false,
    perks: [
      'Priority front-row seating',
      'Private VIP networking dinner',
      'Meet & greet with speakers',
      'All meals & beverages',
      'Exclusive VIP lounge access',
      'Certificate of attendance',
      'Session recordings (lifetime)',
      'Early access next edition',
    ],
  },
])

function increaseQty(ticket) {
  if (ticket.quantity < Math.min(10, ticket.available)) {
    ticket.quantity++
    selectedTicketId.value = ticket.id
  }
}

function decreaseQty(ticket) {
  if (ticket.quantity > 0) {
    ticket.quantity--
    if (ticket.quantity === 0 && selectedTicketId.value === ticket.id) {
      selectedTicketId.value = null
    }
  }
}

const selectedTickets = computed(() => ticketTypes.value.filter(t => t.quantity > 0))
const subtotal = computed(() => selectedTickets.value.reduce((s, t) => s + t.priceNum * t.quantity, 0))
const fee = computed(() => Math.round(subtotal.value * 0.05))
const grandTotal = computed(() => subtotal.value + fee.value)

function proceedToPayment() {
  if (selectedTickets.value.length === 0) return
  router.push({
    path: '/payment',
    query: {
      event: JSON.stringify(event.value),
      tickets: JSON.stringify(selectedTickets.value.map(t => ({
        id: t.id,
        name: t.name,
        qty: t.quantity,
        price: t.priceNum
      }))),
      total: grandTotal.value
    }
  })
}
</script>