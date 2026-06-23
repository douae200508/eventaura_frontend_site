<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-3xl mx-auto px-8 py-24">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ isEditMode ? 'Edit Service' : 'Create Service' }}</h1>
        <p class="text-gray-500 text-sm mb-6">{{ isEditMode ? 'Update your service information' : 'List your service for clients to discover' }}</p>

        <form @submit.prevent="submitService" class="space-y-5">
          <!-- Service Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
            <input v-model="serviceForm.name" type="text" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
              placeholder="e.g., Gourmet Events">
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select v-model="serviceForm.category" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
              <option value="">Select category</option>
              <option value="venue">Venue & Infrastructure</option>
              <option value="catering">Catering</option>
              <option value="av">Audiovisual & Technical</option>
              <option value="media">Media & Content</option>
              <option value="entertainment">Speakers & Entertainment</option>
              <option value="design">Design & Branding</option>
              <option value="reception">Reception & Organization</option>
              <option value="security">Security</option>
            </select>
          </div>

          <!-- City & Location -->
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select v-model="serviceForm.city" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400">
                <option value="">Select city</option>
                <option v-for="city in moroccanCities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location / Address *</label>
              <input v-model="serviceForm.location" type="text" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
                placeholder="e.g., Centre-ville, Avenue Mohammed V">
            </div>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input v-model="serviceForm.price" type="text" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
              placeholder="e.g., 8 500 DH or 350 DH/pers">
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Service Photo *</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors cursor-pointer"
              @click="triggerFileInput">
              <div class="space-y-1 text-center">
                <svg v-if="!serviceForm.imagePreview" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2"/>
                </svg>
                <img v-else :src="serviceForm.imagePreview" class="mx-auto h-32 w-auto object-cover rounded-lg">
                <div class="flex text-sm text-gray-600">
                  <span class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    Upload a file
                    <input ref="fileInput" type="file" class="sr-only" accept="image/*" @change="onFileChange">
                  </span>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea v-model="serviceForm.description" rows="4" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 resize-none"
              placeholder="Describe your service..."></textarea>
          </div>

          <!-- Available -->
          <div class="flex items-center gap-3">
            <input type="checkbox" v-model="serviceForm.available" id="available" class="w-4 h-4 text-blue-500">
            <label for="available" class="text-sm text-gray-700">Available for bookings</label>
          </div>

          <button type="submit"
            class="w-full bg-[#0a0f2e] text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
            {{ isEditMode ? 'Update Service' : 'Create Service' }}
          </button>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const route = useRoute()
const fileInput = ref(null)
const isEditMode = ref(false)
const editServiceId = ref(null)

const moroccanCities = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kenitra','Tetouan']

const serviceForm = ref({
  name: '',
  category: '',
  city: '',
  location: '',
  price: '',
  description: '',
  available: true,
  imagePreview: '',
  imageFile: null
})

function triggerFileInput() { 
  fileInput.value?.click() 
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    serviceForm.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => { 
      serviceForm.value.imagePreview = e.target.result 
    }
    reader.readAsDataURL(file)
  }
}

function getCategoryLabel(category) {
  const labels = {
    venue: 'Venue',
    catering: 'Catering',
    av: 'AV & Technical',
    media: 'Media',
    entertainment: 'Entertainment',
    design: 'Design',
    reception: 'Reception',
    security: 'Security'
  }
  return labels[category] || category
}

function submitService() {
  // Récupérer l'utilisateur connecté
  const currentUser = JSON.parse(localStorage.getItem('eventaura_currentUser') || '{}')
  
  if (!currentUser.id) {
    alert('You must be logged in to create a service')
    router.push('/auth')
    return
  }
  
  const newService = {
    id: isEditMode.value ? editServiceId.value : Date.now(),
    name: serviceForm.value.name,
    category: serviceForm.value.category,
    categoryLabel: getCategoryLabel(serviceForm.value.category),
    city: serviceForm.value.city,
    location: serviceForm.value.location,
    price: serviceForm.value.price,
    rating: 0,
    reviews: 0,
    experience: 'New',
    projects: 0,
    responseTime: '< 24h',
    available: serviceForm.value.available,
    tags: [],
    image: serviceForm.value.imagePreview,
    description: serviceForm.value.description,
    providerId: currentUser.id,
    providerName: `${currentUser.prenom} ${currentUser.nom}`,
    status: 'pending_admin', // En attente d'approbation
    createdAt: isEditMode.value ? undefined : new Date().toISOString()
  }
  
  // Récupérer les services en attente
  let pendingServices = JSON.parse(localStorage.getItem('pendingServices') || '[]')
  
  if (isEditMode.value) {
    // Mode édition - mettre à jour le service existant
    const index = pendingServices.findIndex(s => s.id === editServiceId.value)
    if (index !== -1) {
      pendingServices[index] = newService
      alert('Service updated successfully! It will be reviewed again.')
    } else {
      // Vérifier aussi dans approvedServices
      let approvedServices = JSON.parse(localStorage.getItem('approvedServices') || '[]')
      const approvedIndex = approvedServices.findIndex(s => s.id === editServiceId.value)
      if (approvedIndex !== -1) {
        approvedServices[approvedIndex] = newService
        localStorage.setItem('approvedServices', JSON.stringify(approvedServices))
        alert('Service updated successfully!')
      }
    }
    localStorage.setItem('pendingServices', JSON.stringify(pendingServices))
  } else {
    // Mode création - ajouter le nouveau service
    pendingServices.unshift(newService)
    localStorage.setItem('pendingServices', JSON.stringify(pendingServices))
    alert('Service created successfully! It will appear after admin approval.')
  }
  
  // Rediriger vers My Services
  router.push('/my-services')
}

onMounted(() => {
  const serviceId = route.query.id
  if (serviceId) {
    isEditMode.value = true
    editServiceId.value = parseInt(serviceId)
    
    // Chercher d'abord dans pendingServices, puis dans approvedServices
    let pendingServices = JSON.parse(localStorage.getItem('pendingServices') || '[]')
    let service = pendingServices.find(s => s.id === parseInt(serviceId))
    
    if (!service) {
      let approvedServices = JSON.parse(localStorage.getItem('approvedServices') || '[]')
      service = approvedServices.find(s => s.id === parseInt(serviceId))
    }
    
    if (service) {
      serviceForm.value = {
        name: service.name,
        category: service.category,
        city: service.city,
        location: service.location,
        price: service.price,
        description: service.description,
        available: service.available,
        imagePreview: service.image,
        imageFile: null
      }
    }
  }
})
</script>