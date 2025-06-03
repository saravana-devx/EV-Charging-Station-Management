<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import customMarkerIconUrl from '../assets/icons/charger-bg.png'
import { useChargerStore } from '../stores/chargerStore'

const store = useChargerStore()
const map = ref(null)
const markersLayer = ref(null)

const chargers = store.chargers // reactive

const customIcon = L.icon({
    iconUrl: customMarkerIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

function renderMarkers() {
    if (!map.value || !markersLayer.value) return

    // Clear old markers
    markersLayer.value.clearLayers()

    chargers.forEach(charger => {
        const lat = charger.location?.latitude
        const lng = charger.location?.longitude

        if (!lat || !lng) return

        const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(`
      <div>
        <strong>${charger.name}</strong><br />
        Status: ${charger.status}<br />
        Power Output: ${charger.powerOutput}W<br />
        Connector: ${charger.connectorType}
      </div>
    `)

        marker.addTo(markersLayer.value)

        marker.on('mouseover', () => marker.openPopup())
        marker.on('mouseout', () => marker.closePopup())
        marker.on('click', () => marker.openPopup())
    })
}

onMounted(async () => {
    await store.fetchChargersList() // fetch from backend or pinia store

    map.value = L.map('map').setView([19.075983, 72.877655], 7)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map.value)

    markersLayer.value = L.layerGroup().addTo(map.value)

    renderMarkers()
})

// Watch for changes in chargers and update markers
watch(() => chargers.slice(), renderMarkers)
</script>

<template>
    <div id="map" style="height: 860px; width: 100%"></div>
</template>

<style scoped>
.leaflet-container {
    height: 100%;
    width: 100%;
}
</style>
