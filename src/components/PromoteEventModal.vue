<template>
  <transition name="modal">
    <div v-if="modelValue"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="close">

      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">

        <!-- ── SUCCESS SCREEN ── -->
        <transition name="fade" mode="out-in">
        <div v-if="isConfirmed" key="success" class="flex flex-col items-center justify-center py-20 px-10 text-center">
          <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
            <svg class="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Your event is now live!</h2>
          <p class="text-gray-500 text-sm max-w-sm mb-8">
            <span class="font-semibold text-gray-800">{{ event?.title }}</span> is now featured on EventAura for <span class="font-semibold">{{ selectedPackage?.days }} days</span>. Attendees will see it highlighted across the platform.
          </p>
          <div class="bg-gray-50 rounded-2xl border border-gray-100 p-5 w-full max-w-xs text-left space-y-2.5 mb-8">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Package</span>
              <span class="font-semibold text-gray-900">{{ selectedPackage?.name }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Duration</span>
              <span class="font-semibold text-gray-900">{{ selectedPackage?.days }} days</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Ends on</span>
              <span class="font-semibold text-gray-900">{{ endDate }}</span>
            </div>
            <div class="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span class="text-gray-500">Amount paid</span>
              <span class="font-bold text-emerald-600">{{ selectedPackage?.price }}</span>
            </div>
          </div>
          <button @click="close"
            class="bg-[#0a0f2e] text-white px-10 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
            Done
          </button>
        </div>

        <!-- ── MAIN LAYOUT ── -->
        <div v-else key="form" class="flex flex-col lg:flex-row min-h-[580px]">

          <!-- LEFT: Package selection -->
          <div class="lg:w-[48%] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">

            <!-- Logo + title -->
            <div class="mb-7">
              <p class="text-lg font-light tracking-widest uppercase text-[#0a0f2e] mb-4"
                style="font-family:'Cinzel',Georgia,serif;">
                Event<span class="text-blue-500">Aura</span>
              </p>
              <h2 class="text-2xl font-bold text-gray-900 mb-1">Promote Your Event</h2>
              <p class="text-gray-400 text-sm">Get featured and reach more attendees on the platform.</p>
            </div>

            <!-- Event preview pill -->
            <div v-if="event" class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-7">
              <img :src="event.image" :alt="event.title"
                class="w-12 h-12 rounded-xl object-cover flex-shrink-0"/>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-900 line-clamp-1">{{ event.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ event.date }} · {{ event.city }}</p>
              </div>
            </div>

            <!-- Packages -->
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Choose a package</p>
            <div class="space-y-3 mb-7">
              <div v-for="pkg in packages" :key="pkg.id"
                @click="selectedPackage = pkg"
                class="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200"
                :class="selectedPackage?.id === pkg.id
                  ? 'border-[#0a0f2e] bg-[#0a0f2e]/[0.03]'
                  : 'border-gray-200 hover:border-gray-300'">

                <!-- Radio -->
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  :class="selectedPackage?.id === pkg.id ? 'border-[#0a0f2e]' : 'border-gray-300'">
                  <div v-if="selectedPackage?.id === pkg.id"
                    class="w-2.5 h-2.5 rounded-full bg-[#0a0f2e]"/>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <p class="text-sm font-bold text-gray-900">{{ pkg.name }}</p>
                    <span v-if="pkg.popular"
                      class="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  </div>
                  <p class="text-xs text-gray-400">{{ pkg.description }}</p>
                </div>

                <div class="text-right flex-shrink-0">
                  <p class="text-base font-bold text-gray-900">{{ pkg.price }}</p>
                  <p class="text-[10px] text-gray-400">{{ pkg.days }} days</p>
                </div>
              </div>
            </div>

            <!-- What you unlock -->
            <div v-if="selectedPackage">
              <p class="text-sm font-bold text-gray-900 mb-3">What you'll unlock →</p>
              <ul class="space-y-2">
                <li v-for="f in selectedPackage.features" :key="f"
                  class="flex items-center gap-2.5 text-sm text-gray-600">
                  <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  {{ f }}
                </li>
              </ul>
            </div>
          </div>

          <!-- RIGHT: Payment -->
          <div class="lg:w-[52%] p-8 lg:p-10 flex flex-col">

            <!-- Payment method tabs -->
            <div class="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              <button v-for="m in paymentMethods" :key="m.id"
                @click="paymentMethod = m.id"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                :class="paymentMethod === m.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="m.icon"/>
                </svg>
                {{ m.label }}
              </button>
            </div>

            <!-- Billed to -->
            <div class="mb-5">
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Billed to</label>
              <input v-model="form.name" type="text" placeholder="Your full name"
                class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors bg-white"/>
            </div>

            <!-- Payment Detail -->
            <p class="text-base font-bold text-gray-900 mb-4">Payment Detail</p>

            <!-- CARD payment -->
            <div v-if="paymentMethod === 'card'" class="space-y-3 flex-1">

              <!-- Method icons row -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <button v-for="c in cardTypes" :key="c.id"
                  @click="cardType = c.id"
                  class="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                  :class="cardType === c.id
                    ? 'border-[#0a0f2e] bg-[#0a0f2e]/[0.03] text-gray-900'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="c.icon"/>
                  </svg>
                  {{ c.label }}
                </button>
              </div>

              <!-- Card number -->
              <div class="relative">
                <input v-model="form.cardNumber"
                  type="text" placeholder="1234  5678  9012  3456" maxlength="19"
                  @input="formatCardNumber"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors font-mono tracking-wider pr-28"/>
                <!-- Card brand icons -->
                <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <div class="w-8 h-5 bg-red-500 rounded-sm opacity-80"/>
                  <div class="w-8 h-5 bg-blue-600 rounded-sm opacity-80"/>
                  <div class="w-8 h-5 bg-gray-200 rounded-sm flex items-center justify-center">
                    <span class="text-[8px] font-bold text-gray-500">VISA</span>
                  </div>
                </div>
              </div>

              <!-- Expiry + CVV -->
              <div class="grid grid-cols-2 gap-3">
                <input v-model="form.expiry" type="text" placeholder="MM / YY" maxlength="7"
                  @input="formatExpiry"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                <input v-model="form.cvv" type="text" placeholder="CVV" maxlength="4"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
              </div>

              <!-- City + ZIP -->
              <div class="grid grid-cols-2 gap-3">
                <input v-model="form.city" type="text" placeholder="City"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
                <input v-model="form.zip" type="text" placeholder="ZIP / Postal code"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0a0f2e] transition-colors"/>
              </div>
            </div>

            <!-- BANK TRANSFER -->
            <div v-if="paymentMethod === 'bank'" class="flex-1">
              <div class="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-3">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Bank Transfer Details</p>
                <div v-for="row in bankDetails" :key="row.label" class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">{{ row.label }}</span>
                  <span class="text-sm font-semibold text-gray-900 font-mono">{{ row.value }}</span>
                </div>
              </div>
              <div class="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p class="text-xs text-amber-700">Include your event name in the transfer reference. Your promotion will be activated within 24h of confirmation.</p>
              </div>
            </div>

            <!-- Spacer -->
            <div class="flex-1"/>

            <!-- Total + Pay button -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <span class="text-base font-bold text-gray-900">Total</span>
                <span class="text-xl font-bold text-gray-900">
                  {{ selectedPackage?.price ?? '—' }}
                </span>
              </div>

              <button @click="submitPayment"
                :disabled="!canPay || isLoading"
                class="w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                :class="isLoading ? 'bg-[#0a0f2e]/80 text-white' : 'bg-[#0a0f2e] text-white hover:bg-blue-700'">
                <span v-if="isLoading" class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Processing...
                </span>
                <span v-else>
                  Promote for {{ selectedPackage?.price ?? '—' }}
                </span>
              </button>

              <!-- Security note -->
              <div class="flex items-center justify-center gap-2 mt-3">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                </svg>
                <p class="text-xs text-gray-400">Your payment data is fully encrypted and handled with the highest security standards.</p>
              </div>
            </div>

          </div>
        </div>
        </transition>

        <!-- Close button -->
        <button v-if="!isConfirmed" @click="close"
          class="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  event:      { type: Object,  default: null  },
})
const emit = defineEmits(['update:modelValue', 'ad-created'])

// ── State ──────────────────────────────────────────────────────
const isConfirmed   = ref(false)
const isLoading     = ref(false)
const selectedPackage = ref(null)
const paymentMethod   = ref('card')
const cardType        = ref('credit')

const form = ref({
  name: '', cardNumber: '', expiry: '', cvv: '', city: '', zip: ''
})

// ── Data ───────────────────────────────────────────────────────
const packages = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: '500 DH',
    priceNum: 500,
    days: 7,
    popular: false,
    description: 'Ideal for short-term visibility boost.',
    features: [
      'Events list priority placement',
      'Sponsored badge on your card',
      '7 days of featured visibility',
    ]
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: '1 200 DH',
    priceNum: 1200,
    days: 21,
    popular: true,
    description: 'Best value — reach more attendees.',
    features: [
      'Homepage featured carousel slot',
      'Events list top position',
      'Sponsored badge on your card',
      '21 days of featured visibility',
    ]
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: '2 000 DH',
    priceNum: 2000,
    days: 30,
    popular: false,
    description: 'Maximum exposure across the platform.',
    features: [
      'Homepage hero carousel (first slot)',
      'Events list #1 pinned position',
      'Sponsored badge on your card',
      'Platform-wide banner exposure',
      '30 days of featured visibility',
    ]
  }
]

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
  { label: 'Bank',        value: 'Attijariwafa Bank' },
  { label: 'Account',     value: 'EventAura SARL'    },
  { label: 'IBAN',        value: 'MA64 0XXX XXXX XXXX' },
  { label: 'Reference',   value: `#AD-${props.event?.id ?? '000'}-${Date.now().toString().slice(-4)}` },
]

// ── Computed ───────────────────────────────────────────────────
const endDate = computed(() => {
  if (!selectedPackage.value) return '—'
  const d = new Date()
  d.setDate(d.getDate() + selectedPackage.value.days)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
})

const canPay = computed(() => {
  if (!selectedPackage.value || !form.value.name) return false
  if (paymentMethod.value === 'card')
    return form.value.cardNumber.length >= 19 && form.value.expiry && form.value.cvv
  return true // bank transfer always valid once package selected
})

// ── Input formatters ───────────────────────────────────────────
function formatCardNumber() {
  let v = form.value.cardNumber.replace(/\D/g, '').slice(0, 16)
  form.value.cardNumber = v.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry() {
  let v = form.value.expiry.replace(/\D/g, '').slice(0, 4)
  if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2)
  form.value.expiry = v
}

// ── Submit ─────────────────────────────────────────────────────
function submitPayment() {
  if (!canPay.value) return
  isLoading.value = true

  // Simulate Stripe / API call — replace with real Stripe.js later
  setTimeout(() => {
    const ad = {
      id:            Date.now(),
      evenement_id:  props.event?.id,
      user_id:       JSON.parse(localStorage.getItem('eventaura_currentUser') || '{}').id,
      package_nom:   selectedPackage.value.name,
      prix_total:    selectedPackage.value.priceNum,
      duree:         selectedPackage.value.days,
      statut:        'active',
      date_debut:    new Date().toISOString(),
      date_fin:      new Date(Date.now() + selectedPackage.value.days * 86400000).toISOString(),
    }

    const ads = JSON.parse(localStorage.getItem('eventaura_ads') || '[]')
    ads.push(ad)
    localStorage.setItem('eventaura_ads', JSON.stringify(ads))

    isLoading.value = false
    isConfirmed.value = true
    emit('ad-created', ad)
  }, 1800)
}

function close() {
  emit('update:modelValue', false)
  // reset after close animation
  setTimeout(() => {
    isConfirmed.value   = false
    selectedPackage.value = null
    paymentMethod.value = 'card'
    cardType.value      = 'credit'
    form.value = { name: '', cardNumber: '', expiry: '', cvv: '', city: '', zip: '' }
  }, 300)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; transform: scale(0.97); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>