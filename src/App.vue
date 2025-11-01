<template>
  <div class="min-h-screen bg-syshack text-white">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" style="top: 10%; left: 10%;"></div>
      <div class="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-float" style="top: 60%; right: 10%; animation-delay: 2s;"></div>
    </div>

    <!-- Header -->
    <nav class="relative z-10 border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <h1 class="text-3xl font-bold syshack-primary glow">SysHack</h1>
            <span class="text-sm bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg border border-cyan-500/30">Script Repository</span>
          </div>
          <div class="flex items-center space-x-6">
            <a href="https://www.youtube.com/@SysHackkk" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe
            </a>
            <button 
              v-if="isAuthenticated" 
              @click="showAdminPanel = !showAdminPanel"
              class="text-cyan-400 hover:text-cyan-300 transition"
            >
              Admin Panel
            </button>
            <button 
              v-if="isAuthenticated" 
              @click="logout" 
              class="text-gray-400 hover:text-white transition"
            >
              Logout
            </button>
            <button 
              v-else 
              @click="showLogin = true" 
              class="text-gray-400 hover:text-cyan-400 transition"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Modal -->
    <div v-if="showLogin" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-slate-800 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold syshack-primary mb-6">Admin Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm text-gray-400 mb-2">Username</label>
            <input 
              v-model="loginForm.username" 
              type="text" 
              class="w-full px-4 py-2 bg-slate-900 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
              required
            >
          </div>
          <div class="mb-6">
            <label class="block text-sm text-gray-400 mb-2">Password</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              class="w-full px-4 py-2 bg-slate-900 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
              required
            >
          </div>
          <div v-if="loginError" class="mb-4 text-red-400 text-sm">{{ loginError }}</div>
          <div class="flex gap-3">
            <button type="submit" class="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition">
              Login
            </button>
            <button type="button" @click="showLogin = false" class="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-if="showAdminPanel && isAuthenticated" class="relative z-10 container mx-auto px-6 py-12">
      <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-2xl p-8 mb-8">
        <h2 class="text-3xl font-bold syshack-primary mb-6">Admin Panel</h2>
        
        <!-- Add New File Form -->
        <div class="bg-slate-900/50 rounded-lg p-6 mb-6">
          <h3 class="text-xl font-semibold text-cyan-300 mb-4">Add New Script</h3>
          <form @submit.prevent="addFile" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">File Name</label>
              <input v-model="newFile.name" type="text" class="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white" required>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Description</label>
              <textarea v-model="newFile.description" class="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white" rows="3" required></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Type</label>
                <select v-model="newFile.type" class="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white">
                  <option value="script">Script</option>
                  <option value="executable">Executable</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">File Size</label>
                <input v-model="newFile.size" type="text" class="w-full px-4 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white" required>
              </div>
            </div>
            <button type="submit" class="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold">
              Add Script
            </button>
          </form>
        </div>

        <!-- Manage Files -->
        <div class="bg-slate-900/50 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-cyan-300 mb-4">Manage Scripts</h3>
          <div class="space-y-3">
            <div v-for="file in files" :key="file.id" class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-cyan-500/10">
              <div>
                <div class="font-semibold text-white">{{ file.name }}</div>
                <div class="text-sm text-gray-400">{{ file.downloads.toLocaleString() }} downloads</div>
              </div>
              <button @click="deleteFile(file.id)" class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else class="relative z-10 container mx-auto px-6 py-12">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <h2 class="text-5xl font-bold syshack-primary mb-6 glow">
          Windows Tweaks, FPS Boosts & Privacy Fixes
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
          Stop guessing. Start optimizing. SysHack delivers concise, tested Windows 11 & Windows 10 tutorials that improve performance, protect your privacy, and reveal hidden system features.
        </p>
        
        <!-- Topics Covered -->
        <div class="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
          <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-4 text-left">
            <h3 class="font-semibold text-cyan-400 mb-2">📈 Performance Tuning</h3>
            <p class="text-sm text-gray-400">+FPS, boot speed & system responsiveness</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-4 text-left">
            <h3 class="font-semibold text-cyan-400 mb-2">🔒 Privacy & Security</h3>
            <p class="text-sm text-gray-400">Telemetry removal & privacy guides</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-4 text-left">
            <h3 class="font-semibold text-cyan-400 mb-2">🗂️ Hidden System Features</h3>
            <p class="text-sm text-gray-400">Hidden folders, caches & security risks</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-4 text-left">
            <h3 class="font-semibold text-cyan-400 mb-2">⚡ Free Automations</h3>
            <p class="text-sm text-gray-400">Scripts, batch files & one-click tools</p>
          </div>
        </div>

        <!-- Channel Stats -->
        <div class="flex justify-center gap-8 mb-8 flex-wrap">
          <div class="text-center">
            <div class="text-2xl font-bold syshack-primary">3.25K+</div>
            <div class="text-sm text-gray-400">Subscribers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold syshack-primary">50+</div>
            <div class="text-sm text-gray-400">Videos</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold syshack-primary">339K+</div>
            <div class="text-sm text-gray-400">Views</div>
          </div>
        </div>

        <!-- Support Info -->
        <div class="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-6 max-w-2xl mx-auto">
          <p class="text-sm text-gray-400 mb-2">💝 Support the channel via PayPal:</p>
          <a href="mailto:nerishmelissa3@gmail.com" class="text-cyan-400 hover:text-cyan-300 font-mono">nerishmelissa3@gmail.com</a>
          <p class="text-xs text-gray-500 mt-3">📍 Based in Kenya 🇰🇪 | Joined 25 Apr 2022</p>
        </div>
      </section>

      <!-- Scripts Repository -->
      <section>
        <h3 class="text-3xl font-bold mb-8 text-center syshack-primary">
          📦 Download Tested Scripts & Tools
        </h3>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="file in files" :key="file.id" class="card-hover bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-lg p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg v-if="file.type === 'script'" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  <svg v-else class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <span class="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                    {{ file.type === 'script' ? 'Script' : 'Executable' }}
                  </span>
                </div>
              </div>
            </div>
            
            <h4 class="text-lg font-semibold mb-2 text-cyan-300">{{ file.name }}</h4>
            <p class="text-sm text-gray-400 mb-4">{{ file.description }}</p>
            
            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{{ file.size }}</span>
              <span>{{ file.uploadDate }}</span>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">
                ⬇️ {{ file.downloads.toLocaleString() }} downloads
              </span>
              <button @click="downloadFile(file)" class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="mt-16 text-center">
        <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
          <h3 class="text-2xl font-bold mb-4 syshack-primary">New Practical Videos Every Week</h3>
          <p class="text-gray-300 mb-6">Subscribe and unlock a faster, cleaner, more private Windows experience.</p>
          <a href="https://www.youtube.com/@SysHackkk" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe Now
          </a>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm mt-16">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center text-gray-400">
          <p class="font-semibold text-white mb-2">SysHack — Windows Tweaks, FPS Boosts & Privacy Fixes</p>
          <p class="text-sm mb-4">Stop guessing. Start optimizing.</p>
          <p class="text-xs">© 2024 SysHack. All scripts tested on Windows 11 & Windows 10.</p>
          <p class="text-xs mt-2">Always create a system restore point before running optimization scripts.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      showAdminPanel: false,
      isAuthenticated: false,
      loginError: '',
      loginForm: {
        username: '',
        password: ''
      },
      newFile: {
        name: '',
        description: '',
        type: 'script',
        size: ''
      },
      files: [
        {
          id: 1,
          name: 'Windows_Telemetry_Remover.bat',
          description: 'Batch script to remove Windows telemetry and tracking',
          type: 'script',
          size: '2.4 KB',
          uploadDate: '2023-06-15',
          downloads: 1245
        },
        {
          id: 2,
          name: 'FPS_Booster.exe',
          description: 'One-click FPS booster for gaming performance',
          type: 'executable',
          size: '1.8 MB',
          uploadDate: '2023-06-10',
          downloads: 2890
        },
        {
          id: 3,
          name: 'Privacy_Fixer.ps1',
          description: 'PowerShell script to enhance Windows privacy settings',
          type: 'script',
          size: '5.1 KB',
          uploadDate: '2023-06-05',
          downloads: 876
        },
        {
          id: 4,
          name: 'Boot_Speed_Optimizer.bat',
          description: 'Optimize Windows boot time and startup programs',
          type: 'script',
          size: '3.2 KB',
          uploadDate: '2023-05-28',
          downloads: 1567
        },
        {
          id: 5,
          name: 'Cache_Cleaner.ps1',
          description: 'Remove hidden system caches and temporary files',
          type: 'script',
          size: '4.8 KB',
          uploadDate: '2023-05-20',
          downloads: 2103
        },
        {
          id: 6,
          name: 'GPU_Optimizer.bat',
          description: 'Optimize GPU settings for maximum gaming performance',
          type: 'script',
          size: '2.9 KB',
          uploadDate: '2023-05-15',
          downloads: 3421
        }
      ]
    }
  },
  methods: {
    handleLogin() {
      // Simple authentication (in production, use proper backend authentication)
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin123') {
        this.isAuthenticated = true;
        this.showLogin = false;
        this.loginError = '';
        this.loginForm = { username: '', password: '' };
      } else {
        this.loginError = 'Invalid username or password';
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.showAdminPanel = false;
    },
    addFile() {
      const newId = Math.max(...this.files.map(f => f.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      
      this.files.unshift({
        id: newId,
        name: this.newFile.name,
        description: this.newFile.description,
        type: this.newFile.type,
        size: this.newFile.size,
        uploadDate: today,
        downloads: 0
      });
      
      // Reset form
      this.newFile = {
        name: '',
        description: '',
        type: 'script',
        size: ''
      };
    },
    deleteFile(id) {
      if (confirm('Are you sure you want to delete this script?')) {
        this.files = this.files.filter(f => f.id !== id);
      }
    },
    downloadFile(file) {
      // Increment download count
      const fileIndex = this.files.findIndex(f => f.id === file.id);
      if (fileIndex !== -1) {
        this.files[fileIndex].downloads++;
      }
      alert(`Downloading: ${file.name}\n\nNote: This is a demo. In production, this would download the actual file from your server.`);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.syshack-primary {
  color: #00d9ff;
}

.bg-syshack {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 217, 255, 0.3);
}

.glow {
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-20px); 
  }
}
</style>