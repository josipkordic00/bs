<template>
    <nav
        class="fixed top-0 z-20 w-screen flex items-center justify-between py-5 pl-4 md:p-5 border-b-black border-b bg-white">
        <div class="uppercase tracking-wide text-xl font-bold text-dark">
            <RouterLink to="/">BeautyStudio</RouterLink>
        </div>

        <!-- Links on large & medium screens -->
        <div v-if="user" class="hidden md:flex items-center gap-4 cursor-pointer text-dark font-semibold">

            <RouterLink to="/">Homepage</RouterLink>

            <RouterLink to="/">My Appointments</RouterLink>

            <RouterLink to="/">My profile</RouterLink>

            <RouterLink @click="logout" to="/">Logout</RouterLink>

        </div>

        <div v-else class="hidden md:flex items-center gap-4 cursor-pointer text-dark font-semibold">
            <RouterLink to="/auth">Login / Register</RouterLink>
        </div>

        <!-- Links on mobile devices -->
        <div v-if="user" class="flex md:hidden font-bold items-center gap-4 cursor-pointer text-dark text-lg pr-5">

            <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>

            <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-calendar-check" /></RouterLink>

            <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>

            <RouterLink @click="logout" to="/"><font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </RouterLink>

        </div>

        <div v-else class="flex md:hidden font-bold items-center text-dark text-lg pr-5">
            <RouterLink to="/auth"><font-awesome-icon icon="fa-solid fa-right-to-bracket" /></RouterLink>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: false,
        }
    },
    mounted() {
        this.user = this.$store.state.user;
        console.log(this.$store.state.user);
    },
    methods: {
        logout() {
            this.user = false;
            this.$store.user = false;
        },
    },
}
</script>