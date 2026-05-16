<template>
  <section class="py-20 bg-[#060d2e]">
    <div class="max-w-7xl mx-auto px-8">

      <!-- Header row -->
      <div class="flex items-start justify-between mb-10">
        <div>
          <div class="inline-flex items-center border border-white/15 text-white/50 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Upcoming
          </div>
          <h2
            class="text-4xl font-light text-white leading-tight"
            style="font-family: 'Cinzel', Georgia, serif;"
          >
            Upcoming events
          </h2>
          <p class="text-white/50 text-sm mt-3 max-w-lg leading-relaxed">
            Join us for our upcoming professional events to connect with industry leaders,
            share insights, and explore new opportunities. Don't miss the chance to grow your network.
          </p>
        </div>

        <!-- Prev / Next -->
        <div class="flex items-center gap-3 mt-2 flex-shrink-0">
          <button
            @click="prev"
            :disabled="atStart"
            class="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <button
            @click="next"
            :disabled="atEnd"
            class="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Cards track -->
      <div
        ref="track"
        class="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        @scroll="onScroll"
      >
        <!-- Event cards (only show first 3) -->
        <EventCard
          v-for="event in visibleEvents"
          :key="event.id"
          :event="event"
          @register="handleRegister"
        />

        <!-- View More card — always last -->
        <div
          class="flex-shrink-0 w-[300px] rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-5 cursor-pointer group hover:border-white/30 transition-all duration-300"
          style="min-height: 380px;"
          @click="goToEvents"
        >
          <!-- Circle icon -->
          <div class="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
            <svg class="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </div>
          <div class="text-center px-6">
            <p class="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-300">
              View all events
            </p>
            <p class="text-white/30 text-xs mt-1">
              {{ events.length - visibleEvents.length }}+ more events waiting
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventCard from '../components/EventCard.vue'

const router = useRouter()
const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

const SCROLL_AMOUNT = 324 // card width + gap

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
}

onMounted(() => onScroll())

function handleRegister(eventId) {
  router.push(`/events/${eventId}`)
}

function goToEvents() {
  router.push('/events')
}

const events = [
  {
    id: 1,
    title: 'International Tech Conference 2026',
    category: 'Conference',
    date: 'May 15, 2026 · 09:00 AM',
    location: 'Tangier Convention Center',
    price: '$299',
    attendees: '500+ Attendees',
    spotsLeft: '156',
    rating: '4.8',
    description: 'Discover innovative ideas, connect with industry leaders, and explore the latest trends shaping the future of technology.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: 2,
    title: 'UI/UX Design Workshop',
    category: 'Workshop',
    date: 'Apr 22, 2026 · 10:00 AM',
    location: 'Tech Hub Tangier',
    price: '$149',
    attendees: '200+ Attendees',
    spotsLeft: '45',
    rating: '4.9',
    description: 'Learn the fundamentals of UI/UX design and create your first prototype using modern tools and industry best practices.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80'
  },
  {
    id: 3,
    title: 'Startup Networking Meetup',
    category: 'Networking',
    date: 'Apr 28, 2026 · 06:30 PM',
    location: 'Coworking Space Downtown',
    price: 'Free',
    attendees: '150+ Attendees',
    spotsLeft: '32',
    rating: '4.7',
    description: 'Connect with founders, developers, and investors in a relaxed and friendly environment. Build meaningful relationships.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80'
  },
  {
    id: 4,
    title: 'Digital Marketing Summit',
    category: 'Summit',
    date: 'May 5, 2026 · 09:00 AM',
    location: 'Business Hub Casablanca',
    price: '$199',
    attendees: '300+ Attendees',
    spotsLeft: '78',
    rating: '4.6',
    description: 'Learn modern digital marketing strategies, SEO, social media, and growth hacking from top industry experts.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80'
  },
  {
    id: 5,
    title: 'AI & Machine Learning Bootcamp',
    category: 'Bootcamp',
    date: 'Jun 10, 2026 · 08:00 AM',
    location: 'Innovation Lab Rabat',
    price: '$499',
    attendees: '100+ Attendees',
    spotsLeft: '20',
    rating: '5.0',
    description: 'Hands-on intensive bootcamp covering machine learning fundamentals, neural networks, and real-world AI applications.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
  },
]

// Only show first 3 cards, the rest are teased by the "View More" card
const visibleEvents = computed(() => events.slice(0, 3))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>