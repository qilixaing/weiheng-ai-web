import {createApp} from 'vue';
import HomeEntry from './HomeEntry.vue';
import './styles/content.css';
import './styles/campus.css';
// Render the homepage before account requests and the full food catalogue.
createApp(HomeEntry).mount('#app');