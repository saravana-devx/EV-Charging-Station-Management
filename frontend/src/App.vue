<template>
  <div>
    <Navbar v-model="currentView" :showToggle="true" />

    <template v-if="isAuthRoute">
      <router-view />
    </template>
    <template v-else>
      <component :is="currentViewComponent" />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './views/Navbar.vue';
import ChargerList from './views/ChargerList.vue';
import ChargerMap from './views/ChargerMap.vue';
import { useUserStore } from './stores/user';
import { ref } from 'vue'

const userStore = useUserStore();
const currentView = ref('list');
const currentViewComponent = computed(() =>
  currentView.value === 'map' ? ChargerMap : ChargerList
);

const route = useRoute();

// Check if current route is login or register
const isAuthRoute = computed(() =>
  ['Login', 'Register'].includes(route.name)
);
</script>
