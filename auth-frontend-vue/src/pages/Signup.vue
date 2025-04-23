<template>
    <div class="auth-box">
      <h2>Sign Up</h2>
      <p v-if="error" class="error">{{ error }}</p>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="signup">Sign Up</button>
      <p>Already have an account? <router-link to="/">Login</router-link></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '../api'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  const router = useRouter()
  
  async function signup() {
    error.value = null
    try {
      await api.post('/signup', { email: email.value, password: password.value })
      alert('Signup successful, please log in')
      router.push('/')
    } catch (err) {
      error.value = err.response?.data?.message || 'Signup failed'
    }
  }
  </script>
  
  <style scoped>
  .auth-box { max-width: 400px; margin: 2rem auto; }
  input { width: 100%; margin: 0.5rem 0; padding: 0.5rem }
  button { width: 100%; padding: 0.5rem }
  .error { color: red }
  </style>
  