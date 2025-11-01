<template>
  <div>
    <div v-if="isAuthenticated" class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-syshack-primary mb-8">Admin Panel</h1>
      <AdminPanel @file-added="handleFileAdded" @file-deleted="handleFileDeleted" />
    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600">Please log in to access the admin panel.</p>
    </div>
  </div>
</template>

<script>
import AdminPanel from '../components/AdminPanel.vue'

export default {
  name: 'Admin',
  components: {
    AdminPanel
  },
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = localStorage.getItem('syshack-auth') === 'true'
      if (!this.isAuthenticated) {
        this.$emit('show-login')
      }
    },
    handleFileAdded() {
      this.$emit('file-updated')
    },
    handleFileDeleted() {
      this.$emit('file-updated')
    }
  }
}
</script>