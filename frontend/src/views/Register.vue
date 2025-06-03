<template>
    <div class="h-[660px] flex items-center justify-center bg-gray-50 p-4">
        <div class="w-full max-w-xl bg-white shadow-xl rounded-xl p-8">
            <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Register</h1>
            <p class="text-center text-gray-600 mb-6">Create your account to get started</p>

            <!-- Registration Form -->
            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">First Name</label>
                        <input v-model="form.firstName" type="text" placeholder="First Name" class="input" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Last Name</label>
                        <input v-model="form.lastName" type="text" placeholder="Last Name" class="input" required />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" placeholder="you@example.com" class="input" required />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" placeholder="••••••••" class="input" required />
                </div>

                <button type="submit" class="btn">Register</button>
            </form>

            <p class="mt-6 text-center text-gray-600 text-sm">
                Already have an account?
                <router-link to="/login" class="text-blue-600 hover:underline font-medium">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
});

async function handleSubmit() {
    try {
        const response = await axios.post('https://ev-charging-station-management-backend.onrender.com/api/v1/auth/register-user', {
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            email: form.value.email,
            password: form.value.password,
        });

        if (response.data.success) {
            userStore.setUser({
                user: response.data.user,
                token: response.data.token,
            });

            toast.success('Account registered successfully!');

            router.push('/');
        }
    } catch (e) {
        const errorMessage = e.response?.data?.message || e.message || 'Registration failed';

        toast.error(errorMessage);
    }
}
</script>

<style scoped>
.input {
    @apply w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none;
}

.btn {
    @apply w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200;
}
</style>
