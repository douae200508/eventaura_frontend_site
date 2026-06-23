<template>
  <section v-if="sponsoredEvents.length > 0" class="py-14 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-8">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <svg class="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
            </svg>
            <span class="text-amber-700 text-xs font-semibold tracking-wide">Sponsored</span>
          </div>
          <h2 class="text-2xl font-light text-gray-900" style="font-family:'Cinzel',Georgia,serif;">
            Featured Events
          </h2>
        </div>

        <!-- Arrows -->
        <div class="flex items-center gap-2">
          <button @click="prev" :disabled="atStart"
            class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <button @click="next" :disabled="atEnd"
            class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Cards track -->
      <div ref="track"
        class="flex gap-5 overflow-x-auto scroll-smooth pb-3 scrollbar-hide"
        @scroll="onScroll">

        <div v-for="event in sponsoredEvents" :key="event.id"
          class="group relative flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
          @click="$emit('view', event)">

          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img :src="event.image" :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>

            <!-- Sponsored badge -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-amber-400/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
              <svg class="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
              <span class="text-amber-900 text-[10px] font-bold tracking-wide uppercase">Sponsored</span>
            </div>

            <!-- Price -->
            <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
              <span class="text-xs font-bold text-[#0a0f2e]">{{ event.price }}</span>
            </div>

            <!-- Category bottom -->
            <div class="absolute bottom-3 left-3 bg-[#0a0f2e]/80 backdrop-blur-sm rounded-full px-3 py-1">
              <span class="text-white text-[10px] tracking-widest uppercase font-medium">{{ event.type || event.category }}</span>
            </div>

            <!-- Rating bottom right -->
            <div v-if="event.rating" class="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
              <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-[10px] font-bold text-gray-800">{{ event.rating }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug mb-2 line-clamp-2">
              {{ event.title }}
            </h3>

            <div class="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
              <span>{{ event.date }} · {{ event.time }}</span>
            </div>

            <div class="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
              <svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span>{{ event.city }} · {{ event.location }}</span>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
              <div class="text-center py-2.5 px-1">
                <p class="text-sm font-bold text-gray-900">{{ event.capacity }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">Capacity</p>
              </div>
              <div class="text-center py-2.5 px-1 border-x border-gray-100">
                <p class="text-sm font-bold text-gray-900">{{ event.spotsLeft }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">Spots left</p>
              </div>
              <div class="text-center py-2.5 px-1">
                <p class="text-sm font-bold text-[#0a0f2e]">{{ event.price }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">From</p>
              </div>
            </div>

            <button
              @click.stop="$emit('book', event)"
              class="w-full bg-[#0a0f2e] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-blue-700 transition-colors duration-300">
              Book Tickets
            </button>
          </div>
        </div>

        <!-- End CTA card -->
        <div class="flex-shrink-0 w-72 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:border-gray-400 transition-colors"
          @click="$emit('promote')">
          <div class="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
            </svg>
          </div>
          <div class="text-center">
            <p class="text-sm font-bold text-gray-900 mb-1">Promote your event</p>
            <p class="text-xs text-gray-400 leading-relaxed">Get your event featured here and reach thousands of attendees</p>
          </div>
          <span class="text-xs font-semibold text-amber-600 border border-amber-200 bg-amber-50 px-4 py-1.5 rounded-full">
            Starting from 500 DH
          </span>
        </div>

      </div>

      <!-- Dot indicators -->
      <div class="flex justify-center gap-1.5 mt-5">
        <div v-for="(_, i) in sponsoredEvents" :key="i"
          class="rounded-full transition-all duration-300"
          :class="activeIndex === i ? 'w-5 h-1.5 bg-[#0a0f2e]' : 'w-1.5 h-1.5 bg-gray-300'"/>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  // Pass your full events array — this component filters for sponsored ones
  events: {
    type: Array,
    default: () => []
  }
})

defineEmits(['view', 'book', 'promote'])

const track     = ref(null)
const atStart   = ref(true)
const atEnd     = ref(false)
const activeIndex = ref(0)

// Load active ads from localStorage (replace with API later)
const activeAds = ref([])

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('eventaura_ads') || '[]')
  const now = new Date()
  activeAds.value = stored.filter(ad => {
    return ad.statut === 'active' && new Date(ad.date_fin) > now
  })
})

// Filter events that have an active ad, sorted by package tier (premium first)
const packageOrder = { premium: 0, pro: 1, starter: 2 }

const sponsoredEvents = computed(() => {
  const sponsoredIds = new Set(activeAds.value.map(ad => ad.evenement_id))
  const sponsored = props.events.filter(e => sponsoredIds.has(e.id))

  // Sort: premium > pro > starter
  return sponsored.sort((a, b) => {
    const adA = activeAds.value.find(ad => ad.evenement_id === a.id)
    const adB = activeAds.value.find(ad => ad.evenement_id === b.id)
    const tierA = packageOrder[(adA?.package_nom || '').toLowerCase()] ?? 9
    const tierB = packageOrder[(adB?.package_nom || '').toLowerCase()] ?? 9
    return tierA - tierB
  })
})

const SCROLL_AMOUNT = 340

function next() {
  track.value?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })
}
function prev() {
  track.value?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
}
function onScroll() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 0
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
  activeIndex.value = Math.round(el.scrollLeft / SCROLL_AMOUNT)
}
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>