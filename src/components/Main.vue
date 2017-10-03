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
            <div class="col-12" v-for="timer in timers" v-bind:key="timer.id">
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
                    },
                    {
                        id: 3,
                        timeInSec: 10,
                        team1Name: 'Humanbierologen',
                        team2Name: 'Arminia Bierlefeld'
                    },
                    {
                        id: 4,
                        timeInSec: 3,
                        team1Name: 'King Pong',
                        team2Name: 'Alkohooligans'
                    },
                    {
                        id: 5,
                        timeInSec: 10,
                        team1Name: 'Humanbierologen',
                        team2Name: 'Arminia Bierlefeld'
                    },
                    {
                        id: 6,
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
