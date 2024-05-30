import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueApexCharts from 'vue3-apexcharts'
import './main.css'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
  // Adicione outras rotas aqui, se necessário
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// Registrar o VueApexCharts globalmente
app.component("apexchart", VueApexCharts)

app.use(router)
app.mount('#app')
