<template>
    <div class="h-[660px] flex justify-center items-center p-4 bg-gray-50">
        <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
            <h1 class="text-3xl font-semibold text-center text-gray-800 mb-2">Login</h1>
            <p class="text-center text-gray-600 mb-6">Welcome back! Please log in.</p>

            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-5">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="form.email" type="email" name="email" class="input"
                        placeholder="you@example.com" required />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" v-model="form.password" type="password" name="password" class="input"
                        placeholder="********" required />
                </div>

                <div class="text-right">
                    <button type="button" class="text-sm text-indigo-600 hover:underline" @click="handleForgetPassword">
                        Forgot password?
                    </button>
                </div>

                <button type="submit" class="btn">Login</button>
            </form>

            <p class="mt-6 text-center text-gray-600 text-sm">
                Don't have an account?
                <router-link to="/register" class="text-blue-600 hover:underline font-medium">Register</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
const toast = useToast();
const router = useRouter();

const form = ref({
    email: '',
    password: '',
});

const userStore = useUserStore();

async function handleSubmit() {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/login-user', {
            email: form.value.email,
            password: form.value.password,
        });

        if (response.data.success) {
            userStore.setUser({
                user: response.data.user,
                token: response.data.token,
            });

            toast.success('Login successful!');
            console.log('Login successful:', response.data);

            router.push('/');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        console.error('Login failed:', errorMessage);
        toast.error(errorMessage);
    }
}

</script>

<style scoped>
.input {
    @apply w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300;
}

.btn {
    @apply w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200;
}
</style>
