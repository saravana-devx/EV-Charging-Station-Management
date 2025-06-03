<template>
  <div class="p-4 w-full mx-auto">
    <h1 class="text-3xl mb-4">Charger Listing</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-6">
      <select v-model="filters.status" @change="fetchChargers" class="input flex-1 min-w-[140px]">
        <option value="">All Status</option>
        <option value="Operational">Operational</option>
        <option value="Out of Service">Out of Service</option>
        <option value="Under Maintenance">Under Maintenance</option>
      </select>

      <select v-model="filters.powerOutput" @change="fetchChargers" class="input flex-1 min-w-[140px]">
        <option value="">All Power Outputs</option>
        <option value="3.7 kW (AC Level 1)">3.7 kW (AC Level 1)</option>
        <option value="7.4 kW (AC Level 2)">7.4 kW (AC Level 2)</option>
        <option value="11 kW (AC 3-phase)">11 kW (AC 3-phase)</option>
        <option value="22 kW (AC 3-phase)">22 kW (AC 3-phase)</option>
        <option value="50 kW (DC Fast)">50 kW (DC Fast)</option>
        <option value="150 kW (DC Fast)">150 kW (DC Fast)</option>
        <option value="350 kW (Ultra-fast)">350 kW (Ultra-fast)</option>
      </select>

      <select v-model="filters.connectorType" @change="fetchChargers" class="input flex-1 min-w-[140px]">
        <option value="">All Connector Types</option>
        <option value="Type 1 (SAE J1772)">Type 1 (SAE J1772)</option>
        <option value="Type 2 (Mennekes)">Type 2 (Mennekes)</option>
        <option value="CHAdeMO">CHAdeMO</option>
        <option value="CCS (Combined Charging System)">CCS (Combined Charging System)</option>
        <option value="Tesla Supercharger">Tesla Supercharger</option>
        <option value="GB/T">GB/T</option>
      </select>

      <button @click="showAddForm = true" class="btn mt-6 text-left flex-none">
        Add Charger
      </button>

      <!-- Add/Edit Modal -->
      <ChargerForm v-if="showAddForm || editingCharger" :charger="editingCharger" @close="closeForm"
        @save="handleSave" />
    </div>

    <!-- Loading spinner -->
    <div v-if="loading" class="flex flex-col items-center py-8">
      <Spinner />
      <p class="text-blue-400 mt-4 text-xl">Loading chargers...</p>
    </div>

    <!-- Charger Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto border-collapse border border-gray-300 min-w-[600px]">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Status</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Power Output</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Connector Type</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Latitude</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Longitude</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charger in chargers" :key="charger._id" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.name }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.status }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.powerOutput }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.connectorType }}</td>
            <!-- Use latitude and longitude directly -->
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.location.latitude }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{{ charger.location.longitude }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">
              <button @click="editCharger(charger)" class="btn mr-2 mb-1 sm:mb-0">Edit</button>
              <button @click="deleteCharger(charger._id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useChargerStore } from '../stores/chargerStore'
import ChargerForm from './ChargerForm.vue'
import Spinner from '../components/Spinner.vue'

const store = useChargerStore()
const chargers = computed(() => store.chargers)

const showAddForm = ref(false)
const editingCharger = ref(null)

const filters = store.filters
const loading = store.loading

watch(filters, () => {
  store.fetchChargers()
}, { deep: true })

onMounted(() => {
  store.fetchChargers()
})

function closeForm() {
  showAddForm.value = false
  editingCharger.value = null
}

function handleSave(charger) {
  if (editingCharger.value) {
    store.editCharger(editingCharger.value._id, charger)
  } else {
    store.addCharger(charger)
  }
  closeForm()
}

function editCharger(charger) {
  editingCharger.value = { ...charger }
}

function deleteCharger(id) {
  if (confirm('Are you sure you want to delete this charger?')) {
    store.deleteCharger(id)
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300;
}

.btn {
  @apply bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition;
}

.btn-danger {
  @apply bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition;
}
</style>
