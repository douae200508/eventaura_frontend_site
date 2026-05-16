<template>
  <button 
    :class="[
      'inline-flex items-center gap-2 font-medium transition-all duration-300',
      variant === 'primary' && 'bg-white text-[#0a0f2e] hover:bg-blue-50 rounded-full px-7 py-3 text-sm',
      variant === 'secondary' && 'text-white/60 hover:text-white transition-colors text-sm',
      variant === 'outline' && 'border border-white/25 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-5 py-2 text-sm',
      variant === 'dark' && 'bg-[#0a0f2e] text-white hover:bg-[#1a1f3e] rounded-full px-6 py-2.5 text-sm',
      size === 'sm' && 'px-4 py-2 text-xs',
      size === 'lg' && 'px-8 py-4 text-base',
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>