<template>
    <div class="w-screen h-[90vh] flex-col lg:flex items-center justify-center">
        <!-- Login form -->
        <div v-if="toggleForm" class="w-full h-full lg:w-1/2 lg:h-1/2 flex flex-col items-center justify-center">
            <h1 class="text-3xl font-bold py-5">Login</h1>
            <form class="flex flex-col items-center justify-center gap-4 w-10/12 lg:w-1/2">
                <input type="text" placeholder="Email" class="w-full h-10 border-2 border-black rounded-md px-2">
                <input type="password" placeholder="Password" class="w-full h-10 border-2 border-black rounded-md px-2">
                <button class="w-full h-10 bg-black text-white rounded-md">Login</button>
            </form>
            <!-- Dont have an account -->
            <div class="flex items-center justify-center gap-2 py-5">
                <p class="text-sm">Don't have an account?</p>
                <span @click="toggle" class="text-md font-semibold text-blue-500 cursor-pointer">Register</span>
            </div>
        </div>

        <!-- Register form -->
        <div v-else class="w-full h-full lg:w-1/2 lg:min-h-1/2 flex flex-col items-center justify-center">
            <h1 class="text-3xl font-bold py-5">Create Account</h1>
            <form class="flex flex-col items-center justify-center gap-4 w-10/12 lg:w-1/2">
                <input type="text" placeholder="Ime i Prezime"
                    class="w-full h-10 border-2 border-black rounded-md px-2">
                <input type="text" placeholder="Email" class="w-full h-10 border-2 border-black rounded-md px-2">
                <input type="password" placeholder="Password" class="w-full h-10 border-2 border-black rounded-md px-2">
                <input type="password" placeholder="Confirm password"
                    class="w-full h-10 border-2 border-black rounded-md px-2">
                <button class="w-full h-10 bg-black text-white rounded-md">Register</button>
            </form>
            <!-- Already have an account -->
            <div class="flex items-center justify-center gap-2 py-5">
                <p class="text-sm">Already have an account?</p>
                <span @click="toggle" class="text-md font-semibold text-blue-500 cursor-pointer">Log in</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toggleForm: false,
        }
    },
    mounted() {
        if (this.$store.state.user) {
            this.$router.push('/');
        }
    },
    methods: {
        toggle() {
            this.toggleForm = !this.toggleForm;
        },
    },
}
</script>