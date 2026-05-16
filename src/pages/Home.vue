<template>
  <div>
    <Navbar />
    <HeroSection />
    <UpcomingEventsSection />
    <FeaturesSection />
    <About />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import UpcomingEventsSection from '../sections/UpcomingEventsSection.vue'
import FeaturesSection from '../sections/FeaturesSection.vue'
import About from '../sections/About.vue'  // ← This is correct - points to sections folder
import Footer from '../components/Footer.vue'
</script>