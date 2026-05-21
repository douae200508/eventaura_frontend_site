<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
    <Navbar />

    <div class="w-full max-w-5xl mt-16">

      <!-- Back -->
      <button @click="$router.back()"
        class="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
        Back to tickets
      </button>

      <!-- ── CONFIRMATION SCREEN ── -->
      <transition name="fade" mode="out-in">
      <div v-if="currentStep === 2" key="confirmed"
        class="bg-white rounded-3xl shadow-lg p-16 text-center">
        <div class="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg class="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p class="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          Your QR ticket has been sent to
          <span class="font-semibold text-gray-800">{{ form.email }}</span>.
          Show it at the entrance.
        </p>

        <div class="bg-gray-50 rounded-2xl border border-gray-100 p-6 max-w-sm mx-auto text-left space-y-3 mb-8">
          <div class="flex gap-3 pb-3 border-b border-gray-100">
            <img :src="event.image" :alt="event.title" class="w-14 h-14 rounded-xl object-cover flex-shrink-0"/>
            <div>
              <p class="text-sm font-bold text-gray-900 line-clamp-1">{{ event.title }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ event.date }} · {{ event.time }}</p>
              <p class="text-xs text-gray-400">{{ event.city }}</p>
            </div>
          </div>
          <div class="flex justify-between text-xs"><span class="text-gray-500">Booking ref.</span><span class="font-bold text-[#0a0f2e] font-mono">#{{ bookingRef }}</span></div>
          <div class="flex justify-between text-xs"><span class="text-gray-500">Name</span><span class="font-medium">{{ form.firstName }} {{ form.lastName }}</span></div>
          <div class="flex justify-between text-xs"><span class="text-gray-500">Email</span><span class="font-medium truncate ml-4">{{ form.email }}</span></div>
          <div class="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
            <span>Total paid</span>
            <span class="text-emerald-600">${{ totalFromRoute.toLocaleString() }}</span>
          </div>
        </div>

        <div class="flex gap-3 max-w-sm mx-auto">
          <button @click="$router.push('/events')"
            class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
            Browse Events
          </button>
          <button @click="$router.push('/profile')"
            class="flex-1 bg-[#0a0f2e] text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
            View My Tickets
          </button>
        </div>
      </div>

      <!-- ── MAIN TWO-COLUMN LAYOUT ── -->
      <div v-else key="form" class="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row min-h-[620px]">

        <!-- ══ LEFT: Order summary ══ -->
        <div class="lg:w-[45%] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">

          <!-- Logo -->
          <p class="text-lg font-light tracking-widest uppercase text-[#0a0f2e] mb-7"
            style="font-family:'Cinzel',Georgia,serif;">
            Event<span class="text-blue-500">Aura</span>
          </p>

          <!-- Step indicator -->
          <div class="flex items-center gap-2 mb-8">
            <div v-for="(step, i) in steps" :key="step" class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  :class="i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-[#0a0f2e] text-white' : 'bg-gray-100 text-gray-400'">
                  <svg v-if="i < currentStep" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span class="text-xs font-medium"
                  :class="i === currentStep ? 'text-gray-900' : i < currentStep ? 'text-emerald-600' : 'text-gray-400'">
                  {{ step }}
                </span>
              </div>
              <div v-if="i < steps.length - 1" class="w-5 h-px bg-gray-200"/>
            </div>
          </div>

          <!-- Event card -->
          <div class="flex gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3.5 mb-6">
            <img :src="event.image" :alt="event.title"
              class="w-14 h-14 rounded-xl object-cover flex-shrink-0"/>
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{{ event.title }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ event.date }} · {{ event.time }}</p>
              <p class="text-xs text-gray-400">{{ event.city }} · {{ event.location }}</p>
            </div>
          </div>

          <!-- Tickets breakdown -->
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Your tickets</p>
          <div class="space-y-2 mb-5">
            <div v-for="t in parsedTickets" :key="t.id"
              class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  :class="t.id === 'vip' ? 'bg-[#0a0f2e] text-white' : t.id === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'">
                  {{ t.name }}
                </span>
                <span class="text-xs text-gray-500">× {{ t.qty }}</span>
              </div>
              <span class="text-xs font-semibold text-gray-800">${{ (t.price * t.qty).toLocaleString() }}</span>
            </div>
          </div>

          <!-- Totals -->
          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Subtotal</span><span>${{ subtotalFromTickets.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Service fee (5%)</span><span>${{ feeFromTickets.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Security badges -->
          <div class="mt-auto pt-6 space-y-2 border-t border-gray-100">
            <div v-for="badge in securityBadges" :key="badge" class="flex items-center gap-2 text-[11px] text-gray-400">
              <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
              {{ badge }}
            </div>
          </div>
        </div>

        <!-- ══ RIGHT: Forms ══ -->
        <div class="lg:w-[55%] p-8 lg:p-10 flex flex-col">

          <transition name="slide" mode="out-in">

            <!-- ── STEP 0: Personal info ── -->
            <div v-if="currentStep === 0" key="step0" class="flex flex-col flex-1">
              <h2 class="text-xl font-bold text-gray-900 mb-1">Personal Information</h2>
              <p class="text-sm text-gray-400 mb-7">Your details for the booking confirmation and QR ticket</p>

              <div class="space-y-4 flex-1">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First name</label>
                    <input v-model="form.firstName" type="text" placeholder="Yasmine"
                      class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                      :class="errors.firstName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#0a0f2e]'"/>
                    <p v-if="errors.firstName" class="text-red-400 text-[11px] mt-1">{{ errors.firstName }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last name</label>
                    <input v-model="form.lastName" type="text" placeholder="Choujai"
                      class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                      :class="errors.lastName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#0a0f2e]'"/>
                    <p v-if="errors.lastName" class="text-red-400 text-[11px] mt-1">{{ errors.lastName }}</p>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email address</label>
                  <input v-model="form.email" type="email" placeholder="your@email.com"
                    class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                    :class="errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#0a0f2e]'"/>
                  <p v-if="errors.email" class="text-red-400 text-[11px] mt-1">{{ errors.email }}</p>
                  <p class="text-[11px] text-gray-400 mt-1">Your QR ticket will be sent here</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone number</label>
                    <input v-model="form.phone" type="tel" placeholder="06 XX XX XX XX"
                      class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                      :class="errors.phone ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#0a0f2e]'"/>
                    <p v-if="errors.phone" class="text-red-400 text-[11px] mt-1">{{ errors.phone }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
                    <input v-model="form.city" type="text" placeholder="Tangier"
                      class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                  </div>
                </div>
              </div>

              <!-- Total + CTA -->
              <div class="mt-8 pt-6 border-t border-gray-100">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-base font-bold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-gray-900">${{ totalFromRoute.toLocaleString() }}</span>
                </div>
                <button @click="validateStep0"
                  class="w-full bg-[#0a0f2e] text-white py-4 rounded-2xl text-sm font-bold tracking-wide hover:bg-blue-700 transition-all duration-300">
                  Continue to Payment
                </button>
                <p class="text-xs text-gray-400 text-center mt-3">Your payment data is fully encrypted and handled with the highest security standards.</p>
              </div>
            </div>

            <!-- ── STEP 1: Payment ── -->
            <div v-else-if="currentStep === 1" key="step1" class="flex flex-col flex-1">
              <h2 class="text-xl font-bold text-gray-900 mb-1">Payment Detail</h2>
              <p class="text-sm text-gray-400 mb-7">All transactions are secure and encrypted with SSL</p>

              <!-- Billed to (prefilled) -->
              <div class="mb-5">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Billed to</label>
                <input :value="`${form.firstName} ${form.lastName}`" type="text" readonly
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-default"/>
              </div>

              <!-- Payment method toggle -->
              <div class="flex gap-2 mb-5 bg-gray-100 p-1 rounded-xl">
                <button v-for="m in paymentMethods" :key="m.id"
                  @click="form.paymentMethod = m.id"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  :class="form.paymentMethod === m.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="m.icon"/>
                  </svg>
                  {{ m.label }}
                </button>
              </div>

              <!-- Card fields -->
              <div v-if="form.paymentMethod === 'card'" class="space-y-3 flex-1">

                <!-- Card type selector -->
                <div class="grid grid-cols-2 gap-3 mb-2">
                  <button v-for="c in cardTypes" :key="c.id"
                    @click="cardType = c.id"
                    class="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 text-sm font-medium transition-all"
                    :class="cardType === c.id
                      ? 'border-[#0a0f2e] bg-[#0a0f2e]/[0.03] text-gray-900'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="c.icon"/>
                    </svg>
                    {{ c.label }}
                  </button>
                </div>

                <!-- Card number -->
                <div class="relative">
                  <input v-model="form.cardNumber" type="text"
                    placeholder="1234  5678  9012  3456" maxlength="19"
                    @input="formatCardNumber"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] font-mono tracking-wider transition-colors pr-28"/>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <div class="w-7 h-5 rounded bg-red-500/80"/>
                    <div class="w-7 h-5 rounded bg-blue-600/80"/>
                    <div class="w-7 h-5 rounded bg-gray-200 flex items-center justify-center">
                      <span class="text-[7px] font-bold text-gray-500">VISA</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <input v-model="form.expiry" type="text" placeholder="MM / YY" maxlength="7"
                    @input="formatExpiry"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                  <input v-model="form.cvv" type="text" placeholder="CVV" maxlength="4"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <input v-model="form.cardCity" type="text" placeholder="City"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                  <input v-model="form.zip" type="text" placeholder="ZIP code"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                </div>
              </div>

              <!-- Bank transfer -->
              <div v-if="form.paymentMethod === 'bank'" class="flex-1">
                <div class="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-3">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Bank Transfer Details</p>
                  <div v-for="row in bankDetails" :key="row.label" class="flex justify-between">
                    <span class="text-sm text-gray-500">{{ row.label }}</span>
                    <span class="text-sm font-semibold text-gray-900 font-mono">{{ row.value }}</span>
                  </div>
                </div>
                <div class="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p class="text-xs text-amber-700">Include your booking reference. Ticket activated within 24h.</p>
                </div>
              </div>

              <!-- Total + Pay -->
              <div class="mt-auto pt-6 border-t border-gray-100">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-base font-bold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-gray-900">${{ totalFromRoute.toLocaleString() }}</span>
                </div>
                <div class="flex gap-3">
                  <button @click="currentStep--"
                    class="px-6 border border-gray-200 text-gray-600 py-3.5 rounded-2xl text-sm font-medium hover:border-gray-400 transition-colors">
                    Back
                  </button>
                  <button @click="submitPayment" :disabled="!step1Valid || isLoading"
                    class="flex-1 bg-[#0a0f2e] text-white py-3.5 rounded-2xl text-sm font-bold tracking-wide hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    <span v-if="isLoading" class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Processing...
                    </span>
                    <span v-else>Pay ${{ totalFromRoute.toLocaleString() }}</span>
                  </button>
                </div>
                <p class="text-xs text-gray-400 text-center mt-3">Your payment data is fully encrypted and handled with the highest security standards.</p>
              </div>
            </div>

          </transition>
        </div>
      </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()

const steps      = ['Personal Info', 'Payment']
const currentStep = ref(0)
const isLoading   = ref(false)
const bookingRef  = ref(`${Math.floor(Math.random() * 900000) + 100000}`)
const cardType    = ref('credit')

const event = computed(() => {
  try { return JSON.parse(route.query.event || '{}') } catch { return {} }
})
const parsedTickets = computed(() => {
  try { return JSON.parse(route.query.tickets || '[]') } catch { return [] }
})
const subtotalFromTickets = computed(() =>
  parsedTickets.value.reduce((s, t) => s + t.price * t.qty, 0)
)
const feeFromTickets = computed(() => Math.round(subtotalFromTickets.value * 0.05))
const totalFromRoute = computed(() => parseInt(route.query.total || 0))

const form = ref({
  firstName: '', lastName: '', email: '', phone: '', city: '',
  paymentMethod: 'card',
  cardNumber: '', expiry: '', cvv: '', cardCity: '', zip: '',
})

const errors = ref({})

const paymentMethods = [
  {
    id: 'card',
    label: 'Pay by Card',
    icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
  },
]

const cardTypes = [
  {
    id: 'bank-card',
    label: 'Bank Transfer',
    icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
  },
  {
    id: 'credit',
    label: 'Credit Card',
    icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
  },
]

const bankDetails = [
  { label: 'Bank',      value: 'Attijariwafa Bank' },
  { label: 'Account',   value: 'EventAura SARL'    },
  { label: 'IBAN',      value: 'MA64 0XXX XXXX XXXX' },
  { label: 'Reference', value: `#EVT-${Math.floor(Math.random() * 90000) + 10000}` },
]

const securityBadges = [
  'SSL encrypted checkout',
  'QR ticket sent by email',
  'Free refund within 48h',
]

const step1Valid = computed(() => {
  if (form.value.paymentMethod === 'card')
    return form.value.cardNumber.length >= 19 && form.value.expiry && form.value.cvv
  return true
})

function validateStep0() {
  errors.value = {}
  if (!form.value.firstName) errors.value.firstName = 'Required'
  if (!form.value.lastName)  errors.value.lastName  = 'Required'
  if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) errors.value.email = 'Valid email required'
  if (!form.value.phone)     errors.value.phone     = 'Required'
  if (Object.keys(errors.value).length === 0) currentStep.value++
}

function formatCardNumber() {
  let v = form.value.cardNumber.replace(/\D/g, '').slice(0, 16)
  form.value.cardNumber = v.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry() {
  let v = form.value.expiry.replace(/\D/g, '').slice(0, 4)
  if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2)
  form.value.expiry = v
}

function submitPayment() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    currentStep.value = 2
  }, 1500)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: all 0.22s ease; }
.slide-enter-from { opacity: 0; transform: translateX(16px); }
.slide-leave-to   { opacity: 0; transform: translateX(-16px); }
</style>