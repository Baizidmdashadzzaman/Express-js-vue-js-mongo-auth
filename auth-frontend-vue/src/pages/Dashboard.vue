<template>
    <div class="dash-box">
      <h2>Dashboard</h2>
      <p v-if="!user">Loading…</p>
      <p v-else>Welcome, <strong>{{ user.email }}</strong>!</p>
      <button @click="logout">Log Out</button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '../api'
  
  const user = ref(null)
  const router = useRouter()
  
  onMounted(async () => {
    try {
      const res = await api.get('/dashboard')
      user.value = res.data
    } catch (err) {
      router.push('/')
    }
  })
  
  async function logout() {
    await api.post('/logout')
    router.push('/')
  }
  </script>
  
  <style scoped>
  .dash-box { max-width: 600px; margin: 2rem auto; }
  button { margin-top: 1rem; padding: 0.5rem 1rem }
  </style>
  