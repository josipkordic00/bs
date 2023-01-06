<template>
    <div class="relative overflow-x-auto mt-[10vh] md:mx-10">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Ime Korisnika
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Vrsta termina
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Vrijeme
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="app in appointments" :key="app._id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Ana Kordić
                    </th>
                    <td class="px-6 py-4">
                        {{ app.type }}
                    </td>
                    <td class="px-6 py-4">
                        {{ app.date }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    data() {
        return {
            user: false,
            appointments: [],
        }
    },
    mounted() {
        this.user = this.$store.state.user;
        if (!this.user) {
            this.$router.push('/auth');
        }
        this.getAppointments();
    },
    methods: {
        async getAppointments() {
            const response = await fetch('http://localhost:3000/appointment');
            const data = await response.json();
            this.appointments = data;
            //Convert date to readable format
            this.appointments.forEach(app => {
                app.date = new Date(app.date).toLocaleString();
            });
        },
    }
}
</script>