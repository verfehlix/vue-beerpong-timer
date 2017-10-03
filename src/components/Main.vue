<template>
    <div class='main'>
        <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Beerpong Timer!</h1>

                <button type="button" class="btn btn-link" v-on:click="toggleShowNewTimerForm()">Add Timer</button>

                <form class="addNewTimerForm" v-if="this.showNewTimerForm">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-auto">
                            <select class="form-control" v-model="selectedTeam1">
                                <option>Humanbierologen</option>
                                <option>Arminia Bierlefeld</option>
                                <option>King Pong</option>
                                <option>Alkohooligans</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <b>VS</b>
                        </div>
                        <div class="col-auto">
                            <select class="form-control" v-model="selectedTeam2">
                                <option>Humanbierologen</option>
                                <option>Arminia Bierlefeld</option>
                                <option>King Pong</option>
                                <option>Alkohooligans</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <b>Time:</b>
                        </div>
                        <div class="col-auto">
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">-</button>
                                </span>

                                <input type="text" class="form-control" value="20:00" style="width:65px" v-model="selectedTime">

                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">+</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-link" v-on:click="addTimer()">Add</button>
                        </div>

                    </div>
                </form>
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
    import {EventBus} from '@/eventbus.js'
    import Timer from '@/components/Timer'

    export default {

        name: 'main',
        components: {Timer},
        data () {
            return {
                showNewTimerForm: false,
                selectedTeam1: undefined,
                selectedTeam2: undefined,
                selectedTime: '20:00',
                lastId: 0,
                timers: [

                ]
            }
        },
        computed: {
            selectedTimeInSeconds: function () {
                const minutePart = parseInt(this.selectedTime.split(':')[0])
                const secondPart = parseInt(this.selectedTime.split(':')[1])

                return minutePart * 60 + secondPart
            }
        },
        created: function () {
            EventBus.$on('deleteTimer', (id) => {
                this.deleteTimer(id)
            })
        },
        methods: {
            toggleShowNewTimerForm: function () {
                this.showNewTimerForm = !this.showNewTimerForm
            },
            addTimer: function () {
                this.timers.push({
                    id: this.lastId++,
                    timeInSec: this.selectedTimeInSeconds,
                    team1Name: this.selectedTeam1,
                    team2Name: this.selectedTeam2
                })
            },
            deleteTimer: function (id) {
                for (let i = 0; i < this.timers.length; i++) {
                    if (this.timers[i].id === id) {
                        this.timers.splice(i, 1)

                        return
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .addNewTimerForm {
        border: 1px solid red;
        padding: 1em;
        margin-bottom: 2em;
    }

</style>
