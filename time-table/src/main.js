import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-universal-modal/dist/index.css'

import VueUniversalModal from 'vue-universal-modal'

import store from './store'



createApp(App).use(router, store,VueUniversalModal, 
    {  teleportTarget: '#modals',   modalComponent: 'MyModal'} ).mount('#app')

