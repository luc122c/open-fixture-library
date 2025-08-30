
import OflSvg from '../components/global/OflSvg.vue';
import OflTime from '../components/global/OflTime.vue';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(({vueApp})=>{
    vueApp.component(`OflSvg`, OflSvg);
    vueApp.component(`OflTime`, OflTime);
})