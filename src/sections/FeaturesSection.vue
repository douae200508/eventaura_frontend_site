<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-light mb-4" style="font-family: 'Cinzel', serif;">
          Discover Our <span class="text-blue-500">Features</span>
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Our platform offers a suite of advanced features built to streamline operations, enhance collaboration, and ensure every event is executed flawlessly.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          v-for="feature in features" 
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
      
      <div class="text-center mt-12">
        <Button 
          variant="outline" 
          size="lg" 
          @click="learnMore"
        >
          Learn More About Features
          <template #icon-right>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </template>
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from '../components/FeatureCard.vue'
import Button from '../components/Button.vue'

const features = [
  {
    icon: 'calendar',
    title: 'Smart Event Management',
    description: 'Plan, organize, and manage every aspect of your events with ease using a centralized and intuitive platform. From scheduling and registration to tracking attendance.'
  },
  {
    icon: 'chart',
    title: 'Advanced Analytics',
    description: 'Gain valuable insights into your event performance with real-time data and detailed analytics. Track attendance, engagement, and key metrics.'
  },
  {
    icon: 'users',
    title: 'Seamless Collaboration',
    description: 'Enhance teamwork and communication across your organization with built-in collaboration tools. Coordinate tasks and share updates.'
  }
]

function learnMore() {
  console.log('Learn more about features clicked')
}
</script>