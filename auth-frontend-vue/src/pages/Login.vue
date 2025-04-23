<template>
    <div class="auth-box">
      <h2>Login</h2>
      <p v-if="error" class="error">{{ error }}</p>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Log In</button>
      <p>Don’t have an account? <router-link to="/signup">Sign up</router-link></p>
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
  
  async function login() {
    error.value = null
    try {
      await api.post('/login', { email: email.value, password: password.value })
      router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
    }
  }
  </script>
  
  <style scoped>
  .auth-box { max-width: 400px; margin: 2rem auto; }
  input { width: 100%; margin: 0.5rem 0; padding: 0.5rem }
  button { width: 100%; padding: 0.5rem }
  .error { color: red }
  </style>
  