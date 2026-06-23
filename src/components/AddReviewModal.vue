<template>
  <!-- ... -->
  
  <AddReviewModal
    :show="showReviewModal"
    :item-id="selectedServiceId"
    :item-title="selectedServiceName"
    type="service"
    @close="showReviewModal = false"
    @submit="handleSubmitServiceReview"
  />
  
  <!-- ... -->
</template>

<script setup>
import AddReviewModal from '../components/AddReviewModal.vue'

const showReviewModal = ref(false)
const selectedServiceId = ref(null)
const selectedServiceName = ref('')

function openServiceReviewModal(service) {
  selectedServiceId.value = service.id
  selectedServiceName.value = service.name
  showReviewModal.value = true
}

function handleSubmitServiceReview(reviewData) {
  console.log('Service review submitted:', reviewData)
  // Appeler votre fonction addServiceReview
  addServiceReview(selectedServiceId.value, reviewData.rating, reviewData.comment)
}
</script>