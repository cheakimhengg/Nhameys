import './assets/styles/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import km from './locales/km.json';

const savedLang = localStorage.getItem('lang') || 'en';
const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: 'en',
  messages: { en, km },
});

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(i18n);

app.mount('#app');
