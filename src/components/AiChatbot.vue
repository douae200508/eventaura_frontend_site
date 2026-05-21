<template>
  <div>
    <!-- Floating button -->
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0a0f2e] text-white shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"
      :class="isOpen ? 'rotate-45' : ''"
      aria-label="AI Assistant"
    >
      <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>

      <span v-if="!isOpen && hasUnread" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"/>
    </button>

    <!-- Chat panel -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style="height: 560px; max-height: calc(100vh - 120px);">

        <!-- Header -->
        <div class="bg-[#0a0f2e] px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div class="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-white text-sm font-semibold">Aura AI</p>
            <p class="text-white/50 text-xs">Event assistant</p>
          </div>
          <button @click="closeChat" class="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
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
              <p class="text-gray-800 text-sm">Hi! I'm Aura AI 👋 How can I help you today?</p>
            </div>
          </div>

          <!-- Quick suggestions -->
          <div class="flex flex-wrap gap-2 pl-9">
            <button v-for="s in suggestions.slice(0,4)" :key="s" @click="sendSuggestion(s)" class="text-xs text-[#0a0f2e] border border-[#0a0f2e]/20 bg-white px-3 py-1.5 rounded-full hover:bg-[#0a0f2e] hover:text-white transition">
              {{ s }}
            </button>
          </div>

          <!-- Messages -->
          <template v-for="msg in messages" :key="msg.id">
            <div v-if="msg.role === 'user'" class="flex justify-end">
              <div class="bg-[#0a0f2e] text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[280px]">
                <p class="text-sm">{{ msg.content }}</p>
              </div>
            </div>
            <div v-else class="flex gap-2.5 items-start">
              <div class="w-7 h-7 rounded-full bg-[#0a0f2e] flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm border border-gray-100 max-w-[280px]">
                <p class="text-gray-800 text-sm whitespace-pre-line">{{ msg.content }}</p>
              </div>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="isLoading" class="flex gap-2.5 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0a0f2e] flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm border border-gray-100">
              <div class="flex gap-1">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
          <div class="flex gap-2">
            <input
              ref="inputEl"
              v-model="inputText"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Ask me anything..."
              class="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 transition"
            />
            <button
              @click="sendMessage"
              :disabled="!inputText.trim() || isLoading"
              class="w-9 h-9 rounded-xl bg-[#0a0f2e] text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  services: { type: Array, default: () => [] }
})

const isOpen = ref(false)
const isLoading = ref(false)
const inputText = ref('')
const messages = ref([])
const hasUnread = ref(false)
const messagesEl = ref(null)
const inputEl = ref(null)

const suggestions = [
  'Find me events in Casablanca',
  'What events are free?',
  'Show me service providers',
  'How do I book tickets?'
]

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasUnread.value = false
    scrollToBottom()
  }
}

function closeChat() {
  isOpen.value = false
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ id: Date.now(), role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true

  await scrollToBottom()

  // Simulate AI response (replace with actual API call)
  setTimeout(() => {
    let reply = ''
    
    if (text.toLowerCase().includes('event')) {
      if (props.events.length > 0) {
        const eventsList = props.events.slice(0, 3).map(e => `• ${e.title} - ${e.date} - ${e.price}`).join('\n')
        reply = `Here are some events you might like:\n\n${eventsList}\n\nWould you like more details about any of these?`
      } else {
        reply = "I couldn't find any events right now. Please check back later!"
      }
    } else if (text.toLowerCase().includes('service') || text.toLowerCase().includes('provider')) {
      if (props.services.length > 0) {
        const servicesList = props.services.slice(0, 3).map(s => `• ${s.name} - ${s.categoryLabel} - ${s.price}`).join('\n')
        reply = `Here are some service providers:\n\n${servicesList}\n\nWould you like to see more?`
      } else {
        reply = "I couldn't find any service providers at the moment."
      }
    } else {
      reply = "Thanks for your message! I can help you find events, compare tickets, or discover service providers. What are you interested in?"
    }
    
    messages.value.push({ id: Date.now() + 1, role: 'assistant', content: reply })
    isLoading.value = false
    scrollToBottom()
    
    if (!isOpen.value) hasUnread.value = true
  }, 1000)
}

function sendSuggestion(text) {
  inputText.value = text
  sendMessage()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
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

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.animate-bounce {
  animation: bounce 0.8s infinite;
}
</style>