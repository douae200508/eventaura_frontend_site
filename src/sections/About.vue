<template>
  <section class="py-28 pt-0 bg-white">
    <div class="max-w-7xl mx-auto px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left side - Image with badges -->
        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" 
              alt="Event Management"
              class="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          
          <!-- Floating Stat Badges -->
          <div class="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 text-center animate-bounce-slow">
            <div class="text-3xl font-bold text-blue-500">500+</div>
            <div class="text-xs text-gray-600">Events Hosted</div>
          </div>
          
          <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 text-center animate-bounce-slow animation-delay-200">
            <div class="text-3xl font-bold text-blue-500">98%</div>
            <div class="text-xs text-gray-600">Satisfaction</div>
          </div>
          
          <div class="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4 text-center animate-pulse-slow">
            <div class="text-2xl font-bold text-blue-500">10K+</div>
            <div class="text-xs text-gray-600">Attendees</div>
          </div>
        </div>

        <!-- Right side - Text content -->
        <div>
          <h2 class="text-4xl font-light mb-4" style="font-family: 'Cinzel', serif;">
            About <span class="text-blue-500">EventAura</span>
          </h2>
          
          <p class="text-gray-600 leading-relaxed mb-6">
            Event Aura is a professional event management platform built to help agencies plan, organize, and execute high-quality events with efficiency and precision.
          </p>
          
          <p class="text-gray-600 leading-relaxed mb-8">
            Our platform simplifies the entire event lifecycle—from scheduling and attendance management to analytics and communication—allowing organizations to focus on delivering impactful and memorable experiences.
          </p>

          <!-- Feature list with icons -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <svg class="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-gray-700">Streamline event management for large agencies</span>
            </div>
            
            <div class="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300 animation-delay-100">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <svg class="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-gray-700">Provide powerful and intuitive tools</span>
            </div>
            
            <div class="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300 animation-delay-200">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <svg class="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-gray-700">Enhance productivity across teams</span>
            </div>
            
            <div class="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300 animation-delay-300">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <svg class="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-gray-700">Ensure every event is executed flawlessly</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
// About section with image and round statistic badges
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}
</style>