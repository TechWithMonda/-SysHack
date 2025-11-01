<template>
  <div>
    <!-- Upload Section -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-bold text-syshack-primary mb-4">Upload New File</h2>
      
      <form @submit.prevent="uploadFile" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            File
          </label>
          <input
            type="file"
            @change="handleFileSelect"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
            required
          />
        </div>
        
        <div>
          <label for="fileName" class="block text-gray-700 text-sm font-bold mb-2">
            File Name
          </label>
          <input
            id="fileName"
            v-model="newFile.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
            required
          />
        </div>
        
        <div>
          <label for="fileDescription" class="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="fileDescription"
            v-model="newFile.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
            required
          ></textarea>
        </div>
        
        <div>
          <label for="fileType" class="block text-gray-700 text-sm font-bold mb-2">
            File Type
          </label>
          <select
            id="fileType"
            v-model="newFile.type"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-syshack-primary"
            required
          >
            <option value="script">Script</option>
            <option value="executable">Executable</option>
            <option value="document">Document</option>
          </select>
        </div>
        
        <button
          type="submit"
          class="bg-syshack-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload File
        </button>
      </form>
    </section>

    <!-- File Management Section -->
    <section class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-syshack-primary mb-4">Manage Files</h2>
      
      <div v-if="files.length === 0" class="text-center py-8 text-gray-500">
        No files uploaded yet.
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="file in files"
          :key="file.id"
          class="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 class="font-bold text-lg">{{ file.name }}</h3>
            <p class="text-gray-600">{{ file.description }}</p>
            <div class="text-sm text-gray-500 mt-1">
              <span class="mr-4">Type: {{ file.type }}</span>
              <span class="mr-4">Size: {{ file.size }}</span>
              <span>Downloads: {{ file.downloads }}</span>
            </div>
          </div>
          
          <button
            @click="deleteFile(file.id)"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      files: [],
      newFile: {
        name: '',
        description: '',
        type: 'script',
        file: null
      }
    }
  },
  created() {
    this.loadFiles()
  },
  methods: {
    loadFiles() {
      const savedFiles = localStorage.getItem('syshack-files')
      if (savedFiles) {
        this.files = JSON.parse(savedFiles)
      }
    },
    handleFileSelect(event) {
      this.newFile.file = event.target.files[0]
    },
    uploadFile() {
      if (!this.newFile.file) {
        alert('Please select a file to upload')
        return
      }
      
      // Create a new file object
      const fileSize = (this.newFile.file.size / 1024).toFixed(1) + ' KB'
      
      const newFileObj = {
        id: Date.now(),
        name: this.newFile.name,
        description: this.newFile.description,
        type: this.newFile.type,
        size: fileSize,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0
      }
      
      // Add to files array
      this.files.push(newFileObj)
      
      // Save to localStorage
      this.saveFiles()
      
      // Reset form
      this.newFile = {
        name: '',
        description: '',
        type: 'script',
        file: null
      }
      
      // Clear file input
      document.querySelector('input[type="file"]').value = ''
      
      // Emit event
      this.$emit('file-added')
      
      alert('File uploaded successfully!')
    },
    deleteFile(id) {
      if (confirm('Are you sure you want to delete this file?')) {
        this.files = this.files.filter(file => file.id !== id)
        this.saveFiles()
        this.$emit('file-deleted')
      }
    },
    saveFiles() {
      localStorage.setItem('syshack-files', JSON.stringify(this.files))
    }
  }
}
</script>