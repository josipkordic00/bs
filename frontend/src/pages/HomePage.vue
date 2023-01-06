<template>
    <div class="min-h-screen w-screen my-14">
        <div
            class="relative w-screen h-[42vh] md:h-[50vh] flex items-center justify-center md:justify-start bg-hero-pattern-mobile md:bg-hero-pattern bg-cover bg-right bg-no-repeat">

            <!-- Background filter on small devices -->
            <div class="block md:hidden absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.40)]"></div>

            <!-- Hero text -->
            <h1
                class="text-center md:text-left md:leading-[3rem] text-white text-2xl font-bold drop-shadow-lg shadow-black z-10 md:w-[50%] lg:w-[30%] md:text-4xl md:pl-10">
                Beauty comes
                from
                inside,
                inside the
                beauty
                salon.
            </h1>
        </div>

        <div class="min-h-[50vh] w-[90%] md:w-2/3 flex-col mx-auto items-center justify-center space-y-8 pt-10">
            <!-- Odabir vrste termina -->
            <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-dark">Odaberite
                    termin</label>
                <select v-model="type" id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="">Odabir vrste termina</option>
                    <option value="nokti">Nokti</option>
                    <option value="obrve">Obrve</option>
                    <option value="sminka">Šminkanje</option>
                </select>
            </div>

            <!-- Datum i vrijeme termina -->
            <Datepicker v-model="date" :min-time="{ hours: 8, minutes: 0 }" :max-time="{ hours: 18, minutes: 0 }"
                minutes-increment="30" hide-offset-dates :is-24="true" :disabled-week-days="[0]" :clearable="false">
            </Datepicker>

            <!-- Success message  -->
            <div v-if="success" class="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3"
                role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                <p>Termin koji ste odabrali je dostupan</p>
            </div>

            <!-- Error message  -->
            <div v-if="error" class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20zm1 11V9h2v2h-2zm0 4V13h2v2h-2z" />
                </svg>
                <p>Termin koji ste odabrali nije dostupan</p>
            </div>

            <!-- Error message  -->
            <div v-if="type === ''" class=" flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
                role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20zm1 11V9h2v2h-2zm0 4V13h2v2h-2z" />
                </svg>
                <p>Molimo odaberite vrstu termina</p>
            </div>

            <!-- Button error message -->
            <div v-if="user === false" class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
                role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20zm1 11V9h2v2h-2zm0 4V13h2v2h-2z" />
                </svg>
                <p>Morate biti prijavljeni kako biste rezervirali termin</p>
            </div>

            <!-- Button -->
            <button :disabled="user === false || error === true || type === ''" @click="addAppointment"
                class="bg-blue-500 hover:bg-blue-700 disabled:bg-dark disabled:text-light float-right text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Rezerviraj termin
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            date: ref(new Date()),
            type: '',
            error: false,
            success: true,
            user: false,
            appointments: [],
            appointmentsDates: [],
        }
    },
    mounted() {
        //Get user from store
        this.user = this.$store.state.user;
        //Set date to tommorow at 8:00
        this.date = this.resetDate();
        //Get all appointments
        this.getAppointments();
    },
    watch: {
        date: function (val) {
            if (this.appointmentsDates.includes(val.getTime())) {
                this.error = true;
                this.success = false;
            } else if (this.resetDate().getTime() > val.getTime()) {
                this.error = true;
                this.success = false;
            } else {
                this.error = false;
                this.success = true;
            }
            console.log(this.resetDate().getTime() > val.getTime())
        }
    },
    methods: {
        async getAppointments() {
            const response = await fetch('http://localhost:3000/appointment');
            const data = await response.json();
            this.appointmentsDates = data.map(appointment => new Date(appointment.date).getTime());
            this.appointments = data;

            if (this.appointmentsDates.includes(this.date.getTime())) {
                this.error = true;
                this.success = false;
            }
        },
        async addAppointment() {
            await fetch('http://localhost:3000/appointment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: this.date,
                    status: 'pending',
                    user_id: this.user._id,
                    type: this.type
                })
            });

            this.date = this.resetDate();
            this.type = "";
            alert("Vaš termin je uspješno rezerviran. Molimo vas da dođete na vrijeme. Hvala!")
        },
        resetDate() {
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(8, 0, 0, 0);
            return currentDate;
        }
    },
}
</script>