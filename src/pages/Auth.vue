<template>
  <div class="min-h-screen bg-[#060d2e] flex items-center justify-center p-4">

    <!-- Card -->
    <div class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex" style="min-height: 580px;">

      <!-- ───── LEFT PANEL (form) ───── -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-10 md:p-14 relative z-10 bg-white">

        <!-- Logo -->
        <div
          class="text-xl font-light tracking-widest uppercase mb-10 text-[#0a0f2e]"
          style="font-family: 'Cinzel', Georgia, serif; letter-spacing: .25em;"
        >
          Event<span class="text-blue-500">Aura</span>
        </div>

        <!-- SIGN IN -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="!isSignUp" key="signin">
            <h1 class="text-3xl font-semibold text-gray-900 mb-1">Welcome back</h1>
            <p class="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

            <form @submit.prevent="handleSignIn" class="space-y-6">
              <!-- Email -->
              <div class="relative">
                <input
                  v-model="signInForm.email"
                  type="email"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Email address
                </label>
              </div>

              <!-- Password -->
              <div class="relative">
                <input
                  v-model="signInForm.password"
                  :type="showSignInPassword ? 'text' : 'password'"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors pr-8"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Password
                </label>
                <button type="button" @click="showSignInPassword = !showSignInPassword" class="absolute right-0 bottom-2.5 text-gray-400 hover:text-gray-600">
                  <svg v-if="!showSignInPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                </button>
              </div>

              <div class="flex justify-between items-center">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="rememberMe" class="w-3.5 h-3.5 accent-blue-500 rounded">
                  <span class="text-xs text-gray-400">Remember me</span>
                </label>
                <a href="#" class="text-xs text-blue-500 hover:text-blue-600 transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-[#0a0f2e] text-white py-3.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Connexion...' : 'Sign In' }}
              </button>
            </form>

            <!-- Switch to sign up -->
            <p class="text-center text-xs text-gray-400 mt-6">
              Don't have an account?
              <button @click="isSignUp = true" class="text-blue-500 font-medium hover:underline ml-1">Create one</button>
            </p>
          </div>

          <!-- SIGN UP -->
          <div v-else key="signup">
            <h1 class="text-3xl font-semibold text-gray-900 mb-1">Create account</h1>
            <p class="text-gray-400 text-sm mb-8">Join EventAura and start exploring</p>

            <form @submit.prevent="handleSignUp" class="space-y-5">
              <!-- Prénom -->
              <div class="relative">
                <input
                  v-model="signUpForm.prenom"
                  type="text"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  First name
                </label>
              </div>

              <!-- Nom -->
              <div class="relative">
                <input
                  v-model="signUpForm.nom"
                  type="text"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Last name
                </label>
              </div>

              <!-- Email -->
              <div class="relative">
                <input
                  v-model="signUpForm.email"
                  type="email"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Email address
                </label>
              </div>

              <!-- Téléphone -->
              <div class="relative">
                <input
                  v-model="signUpForm.telephone"
                  type="tel"
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Phone number (optional)
                </label>
              </div>

              <!-- Ville -->
              <div class="relative">
                <input
                  v-model="signUpForm.ville"
                  type="text"
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  City (optional)
                </label>
              </div>

              <!-- Role selector -->
              <div class="relative">
                <select
                  v-model="signUpForm.role"
                  required
                  class="w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="client">Client — Browse & book events</option>
                  <option value="organizer">Organizer — Create & manage events</option>
                  <option value="provider">Provider — Offer services</option>
                </select>
                <label class="absolute left-0 top-0 text-xs text-blue-500 pointer-events-none">I am a</label>
                <svg class="absolute right-0 bottom-3 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>

              <!-- Password -->
              <div class="relative">
                <input
                  v-model="signUpForm.mot_de_passe"
                  :type="showSignUpPassword ? 'text' : 'password'"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-900 text-sm bg-transparent transition-colors pr-8"
                />
                <label class="absolute left-0 top-0 text-xs text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 transition-all duration-200 pointer-events-none">
                  Password
                </label>
                <button type="button" @click="showSignUpPassword = !showSignUpPassword" class="absolute right-0 bottom-2.5 text-gray-400 hover:text-gray-600">
                  <svg v-if="!showSignUpPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                </button>
              </div>

              <!-- Confirm password -->
              <div class="relative">
                <input
                  v-model="signUpForm.confirmPassword"
                  type="password"
                  required
                  placeholder=" "
                  class="peer w-full px-0 pt-5 pb-2 border-0 border-b transition-colors focus:ring-0 outline-none text-gray-900 text-sm bg-transparent pr-8"
                  :class="passwordMismatch ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'"
                />
                <label class="absolute left-0 top-0 text-xs pointer-events-none transition-all duration-200"
                  :class="passwordMismatch ? 'text-red-400' : 'text-gray-400 peer-focus:text-blue-500'">
                  Confirm password
                </label>
                <p v-if="passwordMismatch" class="text-red-400 text-[11px] mt-1">Passwords do not match</p>
              </div>

              <!-- Terms -->
              <label class="flex items-start gap-2 cursor-pointer pt-1">
                <input type="checkbox" v-model="agreeTerms" class="w-3.5 h-3.5 accent-blue-500 mt-0.5 flex-shrink-0">
                <span class="text-xs text-gray-400">
                  I agree to the
                  <a href="#" class="text-blue-500 hover:underline">Terms of Service</a>
                  and
                  <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                :disabled="passwordMismatch || !agreeTerms || isLoading"
                class="w-full bg-[#0a0f2e] text-white py-3.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Création...' : 'Create Account' }}
              </button>
            </form>

            <p class="text-center text-xs text-gray-400 mt-6">
              Already have an account?
              <button @click="isSignUp = false" class="text-blue-500 font-medium hover:underline ml-1">Sign in</button>
            </p>
          </div>
        </transition>
      </div>

      <!-- ───── RIGHT PANEL (decorative) ───── -->
      <div class="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#0a0f2e] to-[#1a2560] flex-col items-center justify-center p-14 overflow-hidden">
        <div class="absolute top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>

        <div class="relative z-10 w-full max-w-xs space-y-3 mb-10">
          <div v-for="card in decorCards" :key="card.label"
            class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="card.color">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="card.icon"/>
              </svg>
            </div>
            <div>
              <p class="text-white text-xs font-medium">{{ card.label }}</p>
              <p class="text-white/40 text-[11px]">{{ card.sub }}</p>
            </div>
          </div>
        </div>

        <div class="relative z-10 text-center">
          <div
            class="text-2xl font-light tracking-widest uppercase text-white mb-3"
            style="font-family: 'Cinzel', Georgia, serif; letter-spacing: .25em;"
          >
            EventAura
          </div>
          <p class="text-white/40 text-xs leading-relaxed max-w-xs">
            Discover, organize, and experience professional events like never before.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSignUp = ref(false)
const agreeTerms = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const showSignInPassword = ref(false)
const showSignUpPassword = ref(false)

const signInForm = ref({ 
  email: '', 
  password: '' 
})

const signUpForm = ref({ 
  nom: '', 
  prenom: '', 
  email: '', 
  telephone: '', 
  ville: '', 
  role: '', 
  mot_de_passe: '', 
  confirmPassword: '' 
})

const passwordMismatch = computed(() =>
  signUpForm.value.mot_de_passe &&
  signUpForm.value.confirmPassword &&
  signUpForm.value.mot_de_passe !== signUpForm.value.confirmPassword
)

function getUsers() {
  const users = localStorage.getItem('eventaura_users')
  return users ? JSON.parse(users) : []
}

function saveUsers(users) {
  localStorage.setItem('eventaura_users', JSON.stringify(users))
}

function findUserByEmail(email) {
  const users = getUsers()
  return users.find(u => u.email === email)
}

function handleSignIn() {
  if (!signInForm.value.email || !signInForm.value.password) {
    alert('Please fill in all fields')
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    const user = findUserByEmail(signInForm.value.email)
    
    if (!user) {
      alert('Email not found. Please create an account.')
      isLoading.value = false
      return
    }
    
    if (user.mot_de_passe !== signInForm.value.password) {
      alert('Incorrect password. Please try again.')
      isLoading.value = false
      return
    }
    
    const loggedInUser = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      telephone: user.telephone,
      ville: user.ville,
      photo: user.photo || null
    }
    
    localStorage.setItem('eventaura_currentUser', JSON.stringify(loggedInUser))
    
    if (rememberMe.value) {
      localStorage.setItem('eventaura_rememberedEmail', signInForm.value.email)
    } else {
      localStorage.removeItem('eventaura_rememberedEmail')
    }
    
    isLoading.value = false
    
    // TOUJOURS rediriger vers Home.vue
    router.push('/')
  }, 800)
}

function handleSignUp() {
  if (passwordMismatch.value || !agreeTerms.value) return
  
  if (!signUpForm.value.nom || !signUpForm.value.prenom || !signUpForm.value.email || !signUpForm.value.mot_de_passe || !signUpForm.value.role) {
    alert('Please fill in all required fields')
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    const existingUser = findUserByEmail(signUpForm.value.email)
    
    if (existingUser) {
      alert('This email is already registered. Please sign in.')
      isLoading.value = false
      return
    }
    
    const newUser = {
      id: Date.now(),
      nom: signUpForm.value.nom,
      prenom: signUpForm.value.prenom,
      email: signUpForm.value.email,
      mot_de_passe: signUpForm.value.mot_de_passe,
      role: signUpForm.value.role,
      telephone: signUpForm.value.telephone || null,
      ville: signUpForm.value.ville || null,
      photo: null,
      statut_compte: 'actif',
      createdAt: new Date().toISOString()
    }
    
    const users = getUsers()
    users.push(newUser)
    saveUsers(users)
    
    isLoading.value = false
    alert(`Account created successfully! You are registered as ${getRoleLabel(newUser.role)}. Please sign in.`)
    
    isSignUp.value = false
    signUpForm.value = { 
      nom: '', 
      prenom: '', 
      email: '', 
      telephone: '', 
      ville: '', 
      role: '', 
      mot_de_passe: '', 
      confirmPassword: '' 
    }
  }, 800)
}

function getRoleLabel(role) {
  const labels = {
    client: 'Client',
    organizer: 'Event Organizer',
    provider: 'Service Provider'
  }
  return labels[role] || role
}

onMounted(() => {
  const savedEmail = localStorage.getItem('eventaura_rememberedEmail')
  if (savedEmail) {
    signInForm.value.email = savedEmail
    rememberMe.value = true
  }
})

const decorCards = [
  { label: 'Tech Conference 2026', sub: 'May 15 · Tangier', color: 'bg-blue-500/30', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3' },
  { label: 'UI/UX Workshop', sub: 'Apr 22 · Online', color: 'bg-purple-500/30', icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' },
  { label: 'Startup Meetup', sub: 'Apr 28 · Free', color: 'bg-green-500/30', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400&display=swap');

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>