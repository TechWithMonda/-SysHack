<template>
  <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
    <h2 class="text-2xl font-bold text-syshack-primary mb-4">Admin Login</h2>
    
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
          required
        />
      </div>
      
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
          required
        />
      </div>
      
      <div class="flex items-center justify-between">
        <button
          type="button"
          @click="$emit('close')"
          class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-syshack-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
      
      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      // Simple authentication - in a real app, this would be an API call
      if (this.username === 'admin' && this.password === 'syshack2023') {
        localStorage.setItem('syshack-auth', 'true')
        this.$emit('login-success')
        this.$emit('close')
      } else {
        this.error = 'Invalid username or password'
      }
    }
  }
}
</script>