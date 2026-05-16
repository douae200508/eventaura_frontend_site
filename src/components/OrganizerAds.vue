<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Promote Your Events</h3>
      <button 
        @click="showCreateModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        + New Campaign
      </button>
    </div>
    
    <!-- Active Campaigns -->
    <div v-if="activeCampaigns.length > 0" class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Active Campaigns</h4>
      <div class="space-y-3">
        <div v-for="campaign in activeCampaigns" :key="campaign.id" class="border border-gray-100 rounded-xl p-4">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-gray-900">{{ campaign.event_title }}</span>
                <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>{{ campaign.package_nom }}</span>
                <span>•</span>
                <span>{{ getPlatformIcon(campaign.plateforme) }} {{ campaign.plateforme }}</span>
                <span>•</span>
                <span>{{ campaign.duree }} days</span>
              </div>
              <div class="text-xs text-gray-400 mt-2">
                Ends: {{ formatDate(campaign.date_fin) }}
              </div>
            </div>
            <button @click="deactivateCampaign(campaign.id)" class="text-red-500 hover:text-red-700 text-sm">
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Past Campaigns -->
    <div v-if="pastCampaigns.length > 0">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Past Campaigns</h4>
      <div class="space-y-3">
        <div v-for="campaign in pastCampaigns" :key="campaign.id" class="border border-gray-100 rounded-xl p-4 opacity-75">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-gray-900">{{ campaign.event_title }}</span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">Expired</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>{{ campaign.package_nom }}</span>
                <span>•</span>
                <span>{{ campaign.plateforme }}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-400">{{ formatDate(campaign.date_debut) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="activeCampaigns.length === 0 && pastCampaigns.length === 0" class="text-center py-8">
      <div class="text-4xl mb-3">📢</div>
      <p class="text-gray-500 text-sm">No ad campaigns yet</p>
      <p class="text-gray-400 text-xs mt-1">Promote your events to reach more people</p>
    </div>
    
    <!-- Create Ad Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showCreateModal = false">
      <div class="bg-white rounded-2xl w-full max-w-md p-6">
        <h3 class="text-xl font-semibold mb-4">Create Ad Campaign</h3>
        
        <form @submit.prevent="createCampaign" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
            <select v-model="newCampaign.evenement_id" required class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Choose an event</option>
              <option v-for="event in userEvents" :key="event.id" :value="event.id">{{ event.titre }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Package</label>
            <select v-model="newCampaign.package_nom" required class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="Starter Pack">Starter Pack - 99 DH (7 days)</option>
              <option value="Boost Pack">Boost Pack - 199 DH (14 days)</option>
              <option value="Premium Pack">Premium Pack - 399 DH (30 days)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Platform to Target</label>
            <select v-model="newCampaign.plateforme" required class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="instagram">📸 Instagram</option>
              <option value="facebook">📘 Facebook</option>
              <option value="twitter">🐦 Twitter</option>
              <option value="youtube">📺 YouTube</option>
              <option value="autre">🌐 Other</option>
            </select>
          </div>
          
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-blue-800">Estimated reach: <span class="font-bold">{{ getEstimatedReach() }}</span> views</p>
            <p class="text-xs text-blue-600 mt-1">Your ad will appear on EventAura homepage</p>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showCreateModal = false" class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createAdCampaign } from '../services/adService'

const props = defineProps({
  userEvents: {
    type: Array,
    default: () => []
  },
  campaigns: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['campaign-created'])

const showCreateModal = ref(false)
const newCampaign = ref({
  evenement_id: '',
  package_nom: '',
  plateforme: ''
})

const activeCampaigns = computed(() => 
  props.campaigns.filter(c => c.statut === 'active')
)

const pastCampaigns = computed(() => 
  props.campaigns.filter(c => c.statut === 'expiree')
)

function getPlatformIcon(platform) {
  const icons = { instagram: '📸', facebook: '📘', twitter: '🐦', youtube: '📺', autre: '🌐' }
  return icons[platform.toLowerCase()] || '📢'
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

function getEstimatedReach() {
  const packages = {
    'Starter Pack': '5,000-10,000',
    'Boost Pack': '15,000-25,000',
    'Premium Pack': '50,000-100,000'
  }
  return packages[newCampaign.value.package_nom] || '5,000'
}

async function createCampaign() {
  const selectedPackage = newCampaign.value.package_nom
  const prices = { 'Starter Pack': 99, 'Boost Pack': 199, 'Premium Pack': 399 }
  const durations = { 'Starter Pack': 7, 'Boost Pack': 14, 'Premium Pack': 30 }
  
  const adData = {
    evenement_id: newCampaign.value.evenement_id,
    user_id: JSON.parse(localStorage.getItem('eventaura_currentUser')).id,
    package_nom: selectedPackage,
    plateforme: newCampaign.value.plateforme,
    prix_total: prices[selectedPackage],
    duree: durations[selectedPackage]
  }
  
  try {
    await createAdCampaign(adData)
    showCreateModal.value = false
    emit('campaign-created')
    alert('Ad campaign created successfully!')
  } catch (error) {
    alert('Error creating campaign')
  }
}
</script>