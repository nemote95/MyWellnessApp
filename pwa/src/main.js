import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { pocketBaseSymbol } from "@/symbols/injectionSymbols"

import PocketBase from 'pocketbase'

const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide(pocketBaseSymbol, client)

app.mount('#app')
