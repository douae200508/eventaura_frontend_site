<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-5xl mx-auto px-6 pt-32 pb-20">

      <!-- Back -->
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
        Back to tickets
      </button>

      <!-- Progress steps -->
      <div class="flex items-center gap-2 mb-10 flex-wrap">
        <div v-for="(step, i) in steps" :key="step" class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              :class="i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-[#0a0f2e] text-white' : 'bg-gray-200 text-gray-400'">
              <svg v-if="i < currentStep" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="text-xs font-medium hidden sm:block"
              :class="i === currentStep ? 'text-gray-900' : i < currentStep ? 'text-emerald-600' : 'text-gray-400'">
              {{ step }}
            </span>
          </div>
          <div v-if="i < steps.length - 1" class="w-8 h-px bg-gray-200"/>
        </div>
      </div>

      <div class="flex gap-8 flex-col lg:flex-row">

        <!-- LEFT: Form -->
        <div class="flex-1">

          <!-- ── STEP 0: Personal info ── -->
          <transition name="slide" mode="out-in">
          <div v-if="currentStep === 0" key="step0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 class="text-lg font-bold text-gray-900 mb-1">Personal Information</h2>
            <p class="text-xs text-gray-400 mb-6">Your details for the booking confirmation and QR ticket</p>

            <div class="space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">First name *</label>
                  <input v-model="form.firstName" type="text" required placeholder="Yasmine"
                    class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                    :class="errors.firstName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'"/>
                  <p v-if="errors.firstName" class="text-red-400 text-[11px] mt-1">{{ errors.firstName }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last name *</label>
                  <input v-model="form.lastName" type="text" required placeholder="Choujai"
                    class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                    :class="errors.lastName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'"/>
                  <p v-if="errors.lastName" class="text-red-400 text-[11px] mt-1">{{ errors.lastName }}</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email address *</label>
                <input v-model="form.email" type="email" required placeholder="your@email.com"
                  class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                  :class="errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'"/>
                <p v-if="errors.email" class="text-red-400 text-[11px] mt-1">{{ errors.email }}</p>
                <p class="text-[11px] text-gray-400 mt-1">Your QR ticket will be sent here</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone number *</label>
                <input v-model="form.phone" type="tel" required placeholder="06 XX XX XX XX"
                  class="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-colors"
                  :class="errors.phone ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'"/>
                <p v-if="errors.phone" class="text-red-400 text-[11px] mt-1">{{ errors.phone }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
                <input v-model="form.city" type="text" placeholder="Tangier"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"/>
              </div>
            </div>

            <button @click="validateStep0"
              class="w-full mt-6 bg-[#0a0f2e] text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-blue-700 transition-all duration-300">
              Continue to Payment
            </button>
          </div>

          <!-- ── STEP 1: Payment ── -->
          <div v-else-if="currentStep === 1" key="step1" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 class="text-lg font-bold text-gray-900 mb-1">Payment Method</h2>
            <p class="text-xs text-gray-400 mb-6">All transactions are secure and encrypted with SSL</p>

            <!-- Method tabs -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <button v-for="method in paymentMethods" :key="method.id"
                @click="form.paymentMethod = method.id"
                class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-xs font-medium"
                :class="form.paymentMethod === method.id
                  ? 'border-[#0a0f2e] bg-[#0a0f2e]/5 text-[#0a0f2e]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'">
                <span class="text-xl">{{ method.icon }}</span>
                {{ method.name }}
              </button>
            </div>

            <!-- Credit card -->
            <div v-if="form.paymentMethod === 'card'" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Card number *</label>
                <input v-model="form.cardNumber" type="text" placeholder="1234  5678  9012  3456" maxlength="19"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 font-mono tracking-wider transition-colors"/>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expiry *</label>
                  <input v-model="form.expiry" type="text" placeholder="MM / YY" maxlength="7"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"/>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">CVV *</label>
                  <input v-model="form.cvv" type="text" placeholder="123" maxlength="4"
                    class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"/>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name on card *</label>
                <input v-model="form.cardName" type="text" placeholder="YASMINE CHOUJAI"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors uppercase tracking-wide"/>
              </div>
            </div>

            <!-- PayPal -->
            <div v-if="form.paymentMethod === 'paypal'" class="bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
              <p class="text-2xl mb-3">🅿️</p>
              <p class="text-sm font-medium text-blue-700 mb-1">Continue with PayPal</p>
              <p class="text-xs text-blue-500">You'll be redirected to PayPal to complete your payment securely.</p>
            </div>

            <!-- Bank transfer -->
            <div v-if="form.paymentMethod === 'bank'" class="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Bank Transfer Details</p>
              <div class="space-y-2.5">
                <div v-for="row in bankDetails" :key="row.label" class="flex justify-between items-center">
                  <span class="text-xs text-gray-500">{{ row.label }}</span>
                  <span class="text-xs font-semibold text-gray-800 font-mono">{{ row.value }}</span>
                </div>
              </div>
              <div class="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p class="text-[11px] text-amber-700">Include your booking reference in the transfer description. Your ticket will be activated within 24h of confirmation.</p>
              </div>
            </div>

            <div class="flex gap-3 mt-6">
              <button @click="currentStep--"
                class="px-6 border border-gray-200 text-gray-600 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                Back
              </button>
              <button @click="submitPayment"
                :disabled="!step1Valid"
                class="flex-1 bg-[#0a0f2e] text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-blue-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                Pay ${{ totalFromRoute.toLocaleString() }}
              </button>
            </div>
          </div>

          <!-- ── STEP 2: Confirmation ── -->
          <div v-else key="step2" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p class="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Your tickets are confirmed. A QR code confirmation has been sent to
              <span class="font-semibold text-gray-800">{{ form.email }}</span>.
            </p>

            <!-- Booking summary card -->
            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left mb-6 space-y-3">
              <!-- Event preview -->
              <div class="flex gap-3 pb-3 border-b border-gray-100">
                <img :src="event.image" :alt="event.title" class="w-14 h-14 rounded-xl object-cover flex-shrink-0"/>
                <div>
                  <p class="text-xs font-bold text-gray-900">{{ event.title }}</p>
                  <p class="text-[11px] text-gray-400 mt-0.5">{{ event.date }} · {{ event.time }}</p>
                  <p class="text-[11px] text-gray-400">{{ event.city }} · {{ event.location }}</p>
                </div>
              </div>
              <div class="flex justify-between text-xs"><span class="text-gray-500">Booking ref.</span><span class="font-bold text-[#0a0f2e] font-mono">#{{ bookingRef }}</span></div>
              <div class="flex justify-between text-xs"><span class="text-gray-500">Name</span><span class="font-medium">{{ form.firstName }} {{ form.lastName }}</span></div>
              <div class="flex justify-between text-xs"><span class="text-gray-500">Email</span><span class="font-medium">{{ form.email }}</span></div>
              <div class="flex justify-between text-xs"><span class="text-gray-500">Phone</span><span class="font-medium">{{ form.phone }}</span></div>
              <div class="flex justify-between text-xs font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total paid</span>
                <span class="text-emerald-600">${{ totalFromRoute.toLocaleString() }}</span>
              </div>
            </div>

            <div class="flex gap-3">
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
          </transition>
        </div>

        <!-- RIGHT: Summary -->
        <div class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">

            <!-- Event mini card -->
            <div class="flex gap-3 mb-5 pb-5 border-b border-gray-100">
              <img :src="event.image" :alt="event.title" class="w-14 h-14 rounded-xl object-cover flex-shrink-0"/>
              <div class="min-w-0">
                <p class="text-xs font-bold text-gray-900 line-clamp-2">{{ event.title }}</p>
                <p class="text-[11px] text-gray-400 mt-1">{{ event.date }}</p>
                <p class="text-[11px] text-gray-400">{{ event.city }}</p>
              </div>
            </div>

            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tickets</h3>
            <div class="space-y-2 mb-4">
              <div v-for="t in parsedTickets" :key="t.id" class="flex justify-between text-xs">
                <span class="text-gray-600">{{ t.name }} × {{ t.qty }}</span>
                <span class="font-semibold text-gray-800">${{ (t.price * t.qty).toLocaleString() }}</span>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-3 space-y-2 mb-5">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span><span>${{ subtotalFromTickets.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Service fee (5%)</span><span>${{ feeFromTickets.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span class="text-blue-600">${{ totalFromRoute.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Security -->
            <div class="space-y-2 pt-4 border-t border-gray-100">
              <div class="flex items-center gap-2 text-[11px] text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                SSL encrypted
              </div>
              <div class="flex items-center gap-2 text-[11px] text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                QR ticket via email
              </div>
              <div class="flex items-center gap-2 text-[11px] text-gray-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"/></svg>
                Free refund within 48h
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

const steps = ['Personal Info', 'Payment', 'Confirmation']
const currentStep = ref(0)
const bookingRef = ref(`${Math.floor(Math.random() * 900000) + 100000}`)

const event = computed(() => {
  try { return JSON.parse(route.query.event || '{}') } catch { return {} }
})

const parsedTickets = computed(() => {
  try { return JSON.parse(route.query.tickets || '[]') } catch { return [] }
})

const subtotalFromTickets = computed(() => parsedTickets.value.reduce((s, t) => s + t.price * t.qty, 0))
const feeFromTickets = computed(() => Math.round(subtotalFromTickets.value * 0.05))
const totalFromRoute = computed(() => parseInt(route.query.total || 0))

const form = ref({
  firstName: '', lastName: '', email: '', phone: '', city: '',
  paymentMethod: 'card',
  cardNumber: '', expiry: '', cvv: '', cardName: '',
})

const errors = ref({})

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
]

const bankDetails = [
  { label: 'Bank', value: 'Attijariwafa Bank' },
  { label: 'Account name', value: 'EventAura SARL' },
  { label: 'IBAN', value: 'MA64 0XXX XXXX XXXX' },
  { label: 'Reference', value: `#EVT-${Math.floor(Math.random() * 90000) + 10000}` },
]

const step1Valid = computed(() => {
  if (form.value.paymentMethod === 'card')
    return form.value.cardNumber && form.value.expiry && form.value.cvv && form.value.cardName
  return true
})

function validateStep0() {
  errors.value = {}
  if (!form.value.firstName) errors.value.firstName = 'First name is required'
  if (!form.value.lastName) errors.value.lastName = 'Last name is required'
  if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) errors.value.email = 'Valid email is required'
  if (!form.value.phone) errors.value.phone = 'Phone number is required'
  if (Object.keys(errors.value).length === 0) currentStep.value++
}

function submitPayment() {
  currentStep.value = 2
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from { opacity: 0; transform: translateX(20px); }
.slide-leave-to { opacity: 0; transform: translateX(-20px); }
</style>