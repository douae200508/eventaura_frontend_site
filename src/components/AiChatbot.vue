<template>
  <!-- Floating bubble + chat panel -->
  <div>

    <!-- Floating button -->
    <button
      @click="isOpen = !isOpen"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0a0f2e] text-white shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"
      :class="isOpen ? 'rotate-45' : ''"
      aria-label="AI Assistant"
    >
      <!-- Chat icon when closed -->
      <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
      </svg>
      <!-- X when open -->
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>

      <!-- Unread dot -->
      <span v-if="!isOpen && hasUnread"
        class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"/>
    </button>

    <!-- Chat panel -->
    <transition name="chat-slide">
      <div v-if="isOpen"
        class="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
        style="height: 560px; max-height: calc(100vh - 120px);">

        <!-- Header -->
        <div class="bg-[#0a0f2e] px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div class="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-white text-sm font-semibold">Aura AI</p>
            <p class="text-white/50 text-xs">Event assistant · Always here</p>
          </div>
          <button @click="clearChat"
            class="text-white/40 hover:text-white/70 transition-colors p-1 rounded-lg hover:bg-white/10"
            title="Clear chat">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesEl" class="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">

          <!-- Welcome message -->
          <div class="flex gap-2.5 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0a0f2e] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[280px]">
              <p class="text-gray-800 text-sm leading-relaxed">
                Hi! I'm <span class="font-semibold text-[#0a0f2e]">Aura AI</span> 👋 I can help you find events, compare tickets, discover service providers, and more. What are you looking for?
              </p>
            </div>
          </div>

          <!-- Quick suggestions (only when no messages yet) -->
          <div v-if="messages.length === 0" class="flex flex-col gap-2 pl-9">
            <button v-for="s in suggestions" :key="s"
              @click="sendSuggestion(s)"
              class="text-left text-xs text-[#0a0f2e] border border-[#0a0f2e]/20 bg-white px-3 py-2 rounded-full hover:bg-[#0a0f2e] hover:text-white transition-all duration-200">
              {{ s }}
            </button>
          </div>

          <!-- Conversation messages -->
          <template v-for="msg in messages" :key="msg.id">

            <!-- User message -->
            <div v-if="msg.role === 'user'" class="flex justify-end">
              <div class="bg-[#0a0f2e] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[280px]">
                <p class="text-sm leading-relaxed">{{ msg.content }}</p>
              </div>
            </div>

            <!-- Assistant message -->
            <div v-else class="flex gap-2.5 items-start">
              <div class="w-7 h-7 rounded-full bg-[#0a0f2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[280px]">
                <p class="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{{ msg.content }}</p>
              </div>
            </div>

          </template>

          <!-- Typing indicator -->
          <div v-if="isLoading" class="flex gap-2.5 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0a0f2e] flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div class="flex gap-1 items-center h-4">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"/>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"/>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"/>
              </div>
            </div>
          </div>

        </div>

        <!-- Input -->
        <div class="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
          <div class="flex gap-2 items-end">
            <textarea
              ref="inputEl"
              v-model="inputText"
              @keydown.enter.exact.prevent="sendMessage"
              @keydown.shift.enter="() => {}"
              placeholder="Ask me anything about events..."
              rows="1"
              class="flex-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 resize-none transition-colors leading-relaxed"
              style="max-height: 100px; overflow-y: auto;"
              @input="autoResize"
            />
            <button
              @click="sendMessage"
              :disabled="!inputText.trim() || isLoading"
              class="w-9 h-9 rounded-xl bg-[#0a0f2e] text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
              </svg>
            </button>
          </div>
          <p class="text-[10px] text-gray-300 mt-2 text-center">Powered by Claude · EventAura AI</p>
        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'

// ── Props: pass your real events + services data from the parent ──
const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  services: {
    type: Array,
    default: () => []
  }
})

// ── State ──────────────────────────────────────────────────────
const isOpen    = ref(false)
const isLoading = ref(false)
const inputText = ref('')
const messages  = ref([])
const hasUnread = ref(false)
const messagesEl = ref(null)
const inputEl    = ref(null)

const suggestions = [
  'Find me a free event this week 🎟',
  'I\'m a developer, what suits me?',
  'Compare VIP vs Standard tickets',
  'Best service providers in Tangier',
]

// ── System prompt: gives the LLM full context about EventAura ──
const systemPrompt = computed(() => {
  const eventsContext = props.events.length > 0
    ? `\n\nAVAILABLE EVENTS:\n${props.events.map(e =>
        `- "${e.title}" | Type: ${e.type || e.category} | Date: ${e.date} ${e.time || ''} | Duration: ${e.duration || 'N/A'} | City: ${e.city || e.location} | Price: ${e.price} | Capacity: ${e.capacity || 'N/A'} | Spots left: ${e.spotsLeft || 'N/A'} | Rating: ${e.rating || 'N/A'} | Description: ${e.description}`
      ).join('\n')}`
    : ''

  const servicesContext = props.services.length > 0
    ? `\n\nAVAILABLE SERVICE PROVIDERS:\n${props.services.map(s =>
        `- "${s.name}" | Category: ${s.categoryLabel} | City: ${s.location} | Price: ${s.price} | Rating: ${s.rating} | Available: ${s.available ? 'Yes' : 'No'} | Tags: ${s.tags?.join(', ')}`
      ).join('\n')}`
    : ''

  return `You are Aura AI, the friendly and helpful assistant for EventAura — a professional event management platform in Morocco.

Your job is to help users:
1. Find and recommend events based on their interests, city, budget or schedule
2. Compare ticket types (Early Bird, Standard, VIP)
3. Explain how the platform works (booking, payment, QR tickets)
4. Recommend service providers (photographers, DJs, caterers, AV, etc.)
5. Help organizers understand what services they can add to their events
6. Answer general questions about EventAura

PLATFORM CONTEXT:
- Users can be Clients (browse & book events), Organizers (create & manage events), or Service Providers (offer services)
- Tickets come in 3 types: Early Bird (cheapest, limited), Standard (full access), VIP (premium with dinner, front row, speaker meetups)
- Payment methods: Credit Card, PayPal, Bank Transfer
- QR tickets are sent by email after booking
- Cities covered: all major Moroccan cities (Casablanca, Rabat, Tangier, Marrakech, Agadir, Fès, etc.)
- Service categories: Venue & Infrastructure, Catering, Audiovisual & Technical, Media & Content, Speakers & Entertainment, Design & Branding, Reception & Organization, Security
${eventsContext}${servicesContext}

RESPONSE STYLE:
- Be warm, concise and helpful
- Use short paragraphs — never write walls of text
- When recommending events, always mention the date, city and price
- When the user asks for recommendations, give 2-3 specific options from the list above
- If you don't have relevant data, suggest they use the search/filter on the Events or Services page
- Never make up events or services that aren't in the list above
- Respond in the same language the user writes in (French, English, or Arabic)
- Keep responses under 150 words unless a detailed explanation is truly needed`
})

// ── Send message ────────────────────────────────────────────────
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  // Add user message
  messages.value.push({ id: Date.now(), role: 'user', content: text })
  inputText.value = ''
  resetTextareaHeight()
  isLoading.value = true
  hasUnread.value = false

  await scrollToBottom()

  try {
    // Build conversation history for the API
    const apiMessages = messages.value
      .slice(-10) // keep last 10 messages for context window
      .map(m => ({ role: m.role, content: m.content }))

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt.value,
        messages: apiMessages,
      })
    })

    const data = await response.json()

    if (data.content && data.content[0]) {
      const reply = data.content[0].text
      messages.value.push({ id: Date.now() + 1, role: 'assistant', content: reply })

      // Show unread dot if chat is closed
      if (!isOpen.value) hasUnread.value = true
    } else {
      throw new Error('No response from API')
    }

  } catch (err) {
    console.error('Aura AI error:', err)
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: 'Sorry, I ran into an issue. Please try again in a moment!'
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

function sendSuggestion(text) {
  inputText.value = text
  sendMessage()
}

function clearChat() {
  messages.value = []
  hasUnread.value = false
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 100) + 'px'
}

function resetTextareaHeight() {
  if (inputEl.value) inputEl.value.style.height = 'auto'
}
</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transform-origin: bottom right;
}
</style>