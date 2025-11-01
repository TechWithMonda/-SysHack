<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-syshack-primary mb-6">Available Files</h2>
    
    <div v-if="files.length === 0" class="text-center py-8 text-gray-500">
      No files available at the moment.
    </div>
    
    <div v-else class="space-y-6">
      <div
        v-for="file in files"
        :key="file.id"
        class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-bold text-xl text-syshack-primary">{{ file.name }}</h3>
            <div class="flex items-center mt-1 space-x-4 text-sm text-gray-600">
              <span class="bg-gray-100 px-2 py-1 rounded">{{ file.type }}</span>
              <span>{{ file.size }}</span>
              <span>Uploaded: {{ file.uploadDate }}</span>
            </div>
          </div>
          <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            {{ file.downloads }} downloads
          </span>
        </div>
        
        <p class="text-gray-700 mb-4">{{ file.description }}</p>
        
        <button
          @click="downloadFile(file)"
          class="bg-syshack-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Download
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  methods: {
    downloadFile(file) {
      // In a real app, this would trigger an actual file download
      // For this demo, we'll just increment the download count
      file.downloads++
      
      // Update localStorage
      const files = JSON.parse(localStorage.getItem('syshack-files') || '[]')
      const fileIndex = files.findIndex(f => f.id === file.id)
      if (fileIndex !== -1) {
        files[fileIndex].downloads = file.downloads
        localStorage.setItem('syshack-files', JSON.stringify(files))
      }
      
      alert(`Downloading ${file.name}...\n\nIn a real application, this would download the actual file.`)
    }
  }
}
</script>