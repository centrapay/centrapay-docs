<template>
  <div class="flex flex-col overflow-hidden shadow-xl rounded-lg">
    <!-- <p>
      <slot name="title"/>
    </p>
    <p>
      <slot name="description"/>
    </p> -->
    <slot name="title" />
    <button @click="() => console.log('hello')">click me</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['click'])
</script>
