<template>
  <section class="relative w-full h-screen overflow-hidden">

    <!-- Slides -->
    <div class="relative w-full h-full">
      <transition-group name="fade">
        <div
          v-for="(event, index) in events"
          :key="event.id"
          v-show="currentIndex === index"
          class="absolute inset-0"
        >
          <!-- Background image -->
          <img
            :src="event.image"
            :alt="event.title"
            class="w-full h-full object-cover"
          />
          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a0f2e]/90 via-[#0a0f2e]/60 to-transparent" />

          <!-- Slide content -->
          <div class="absolute inset-0 flex items-center">
            <div class="max-w-7xl mx-auto px-8 w-full">
              <div class="max-w-xl">

                <!-- Category tag -->
                <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  {{ event.category }}
                </div>

                <!-- Title -->
                <h1
                  class="text-white font-light leading-tight mb-5"
                  style="font-family: 'Cinzel', Georgia, serif; font-size: clamp(2rem, 4vw, 3.2rem);"
                >
                  {{ event.title }}
                </h1>

                <!-- Meta info -->
                <div class="flex flex-wrap items-center gap-4 text-white/60 text-sm mb-5">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                    </svg>
                    {{ event.date }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    {{ event.location }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  {{ event.description }}
                </p>

                <!-- CTA button -->
                <Button 
                  variant="primary" 
                  @click="handleDiscover(event.id)"
                >
                  Discover more
                  <template #icon-right>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </template>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Prev arrow -->
    <button
      @click="prev"
      class="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-all duration-200 z-10"
      aria-label="Previous"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
      </svg>
    </button>

    <!-- Next arrow -->
    <button
      @click="next"
      class="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-all duration-200 z-10"
      aria-label="Next"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
      </svg>
    </button>

    <!-- Dot indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
      <button
        v-for="(_, index) in events"
        :key="index"
        @click="goTo(index)"
        :class="[
          'transition-all duration-300 rounded-full',
          currentIndex === index
            ? 'w-6 h-1.5 bg-white'
            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Slide counter -->
    <div class="absolute bottom-8 right-8 text-white/40 text-xs tracking-widest z-10">
      {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(events.length).padStart(2, '0') }}
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Button from './Button.vue'

// Replace these with real API data later
const events = ref([
  {
    id: 1,
    title: 'The Future of Work in a Digital World',
    category: 'TED Talk · Technology',
    date: 'April 15, 2026 · 05:00 PM',
    location: 'Grand Conference Hall',
    description: 'Join us for our upcoming professional event to connect with industry leaders, share insights, and explore new opportunities.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  },
  {
    id: 2,
    title: 'International Tech Conference 2026',
    category: 'Conference · Innovation',
    date: 'May 15, 2026 · 09:00 AM',
    location: 'Tangier Convention Center',
    description: 'Discover innovative ideas, connect with industry leaders, and explore the latest trends shaping the future of technology.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80',
  },
  {
    id: 3,
    title: 'Startup Networking Meetup',
    category: 'Networking · Business',
    date: 'April 28, 2026 · 06:30 PM',
    location: 'Coworking Space Downtown',
    description: 'Connect with founders, developers, and investors in a relaxed and friendly environment. Build your network.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&q=80',
  },
])

const currentIndex = ref(0)
let autoplayTimer = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % events.value.length
  resetAutoplay()
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + events.value.length) % events.value.length
  resetAutoplay()
}

function goTo(index) {
  currentIndex.value = index
  resetAutoplay()
}

function startAutoplay() {
  autoplayTimer = setInterval(next, 5000)
}

function resetAutoplay() {
  clearInterval(autoplayTimer)
  startAutoplay()
}

function handleDiscover(eventId) {
  console.log('Discover clicked for event:', eventId)
  // Add your navigation or modal logic here
}

onMounted(() => startAutoplay())
onUnmounted(() => clearInterval(autoplayTimer))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>