<template>
    <div class='main'>
        <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Beerpong Timer!</h1>
                <button type="button" class="btn btn-link">Add Timer</button>
            </div>
        </div>
        <div class="row">
            <div v-for="timer in timers" v-bind:key="timer.id" class="col-6">
                <Timer v-bind:timer="timer"></Timer>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Timer from '@/components/Timer'

    export default {

        name: 'main',
        components: {Timer},
        data () {
            return {
                timers: [
                    {
                        id: 1,
                        timeInSec: 10,
                        team1Name: 'Humanbierologen',
                        team2Name: 'Arminia Bierlefeld'
                    },
                    {
                        id: 2,
                        timeInSec: 3,
                        team1Name: 'King Pong',
                        team2Name: 'Alkohooligans'
                    }
                ]
            }
        },
        created: function () {},
        methods: {}
    }
</script>

<style scoped>

</style>
