<template>
    <nav class="flex items-center justify-between py-5 pl-4 md:p-5 border-b-black border-b bg-white">
        <div class="uppercase tracking-wide text-xl font-bold text-dark">BeautyStudio</div>

        <!-- Links on large & medium screens -->
        <ul v-if="user" class="hidden md:flex items-center gap-4 cursor-pointer text-dark font-semibold">
            <li>
                <RouterLink to="/">Homepage</RouterLink>
            </li>
            <li>
                <RouterLink to="/">My Appointments</RouterLink>
            </li>
            <li>
                <RouterLink to="/">My profile</RouterLink>
            </li>
            <li>
                <RouterLink to="/">Logout</RouterLink>
            </li>
        </ul>

        <ul v-else class="hidden md:flex items-center gap-4 cursor-pointer text-dark font-semibold">
            <li>
                <RouterLink to="/">Login / Register</RouterLink>
            </li>
        </ul>

        <!-- Links on mobile devices -->
        <ul class="flex md:hidden font-bold items-center gap-6 cursor-pointer text-dark text-lg">
            <li>
                <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>
            </li>
            <li>
                <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-calendar-check" /></RouterLink>
            </li>
            <li>
                <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
            </li>
            <li>
                <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></RouterLink>
            </li>
        </ul>
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
            this.$store.user = false;
        },
    },
}
</script>