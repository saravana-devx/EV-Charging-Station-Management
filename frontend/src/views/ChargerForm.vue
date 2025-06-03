<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4">{{ charger ? 'Edit Charger' : 'Add Charger' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block font-medium">Name</label>
          <input v-model="form.name" type="text" class="input" required />
        </div>

        <div>
          <label class="block font-medium">Latitude</label>
          <input v-model.number="form.latitude" type="number" step="any" class="input" required />
        </div>

        <div>
          <label class="block font-medium">Longitude</label>
          <input v-model.number="form.longitude" type="number" step="any" class="input" required />
        </div>

        <div>
          <label class="block font-medium">Status</label>
          <select v-model="form.status" class="input" required>
            <option value="Operational">Operational</option>
            <option value="Out of Service">Out of Service</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>

        <div>
          <label class="block font-medium">Power Output</label>
          <select v-model="form.powerOutput" class="input" required>
            <option value="3.7 kW (AC Level 1)">3.7 kW (AC Level 1)</option>
            <option value="7.4 kW (AC Level 2)">7.4 kW (AC Level 2)</option>
            <option value="11 kW (AC 3-phase)">11 kW (AC 3-phase)</option>
            <option value="22 kW (AC 3-phase)">22 kW (AC 3-phase)</option>
            <option value="50 kW (DC Fast)">50 kW (DC Fast)</option>
            <option value="150 kW (DC Fast)">150 kW (DC Fast)</option>
            <option value="350 kW (Ultra-fast)">350 kW (Ultra-fast)</option>
          </select>
        </div>

        <div>
          <label class="block font-medium">Connector Type</label>
          <select v-model="form.connectorType" class="input" required>
            <option value="Type 1 (SAE J1772)">Type 1 (SAE J1772)</option>
            <option value="Type 2 (Mennekes)">Type 2 (Mennekes)</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="CCS (Combined Charging System)">CCS (Combined Charging System)</option>
            <option value="Tesla Supercharger">Tesla Supercharger</option>
            <option value="GB/T">GB/T</option>
          </select>
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="btn btn-danger">Cancel</button>
          <button type="submit" class="btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  charger: Object
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  name: '',
  latitude: 0,
  longitude: 0,
  status: 'Out of Service',
  powerOutput: '3.7 kW (AC Level 1)',
  connectorType: 'Type 1 (SAE J1772)'
})

// Fill form with data from charger prop
watch(
  () => props.charger,
  (newCharger) => {
    if (newCharger) {
      form.value = {
        name: newCharger.name || '',
        latitude: newCharger.location?.latitude ?? 0,
        longitude: newCharger.location?.longitude ?? 0,
        status: newCharger.status || 'Out of Service',
        powerOutput: newCharger.powerOutput || '3.7 kW (AC Level 1)',
        connectorType: newCharger.connectorType || 'Type 1 (SAE J1772)',
      }
    } else {
      form.value = {
        name: '',
        latitude: 0,
        longitude: 0,
        status: 'Out of Service',
        powerOutput: '3.7 kW (AC Level 1)',
        connectorType: 'Type 1 (SAE J1772)',
      }
    }
  },
  { immediate: true }
)

function submitForm() {
  const payload = {
    ...form.value,
    location: {
      latitude: form.value.latitude,
      longitude: form.value.longitude
    }
  }
  delete payload.latitude
  delete payload.longitude

  emit('save', payload)
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300;
}

.btn {
  @apply bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition;
}

.btn-danger {
  @apply bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition;
}
</style>
