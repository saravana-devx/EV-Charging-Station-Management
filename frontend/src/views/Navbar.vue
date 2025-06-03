<template>
    <nav class="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold text-blue-600">
            Charging Stations
        </router-link>

        <div class="flex items-center gap-4">
            <!-- Toggle Button -->
            <button v-if="showToggle" @click="toggleView"
                class="text-sm border px-4 py-2 rounded hover:bg-gray-100 transition">
                View: {{ modelValue === 'map' ? '🗺️ Map' : '📄 List' }}
            </button>

            <!-- Auth Buttons -->
            <template v-if="userStore.token">
                <span class="text-gray-700 hidden sm:inline">Hi, {{ userStore.user.firstName }}</span>
                <button @click="handleLogout"
                    class="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                    Logout
                </button>
            </template>
            <template v-else>
                <router-link to="/login" class="text-blue-600 hover:underline font-medium">Login</router-link>
                <router-link to="/register" class="text-blue-600 hover:underline font-medium">Register</router-link>
            </template>
        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

const router = useRouter()
const userStore = useUserStore()

const props = defineProps({
    showToggle: Boolean,
    modelValue: {
        type: String,
        default: 'map',
    },
})

const emit = defineEmits(['update:modelValue'])

function toggleView() {
    const next = props.modelValue === 'map' ? 'list' : 'map'
    emit('update:modelValue', next)
}

function handleLogout() {
    userStore.logout()
    router.push('/login')
}
</script>
