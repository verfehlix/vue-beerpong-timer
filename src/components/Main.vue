<template>
    <div class='main'>
        <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="title">Beerpong Timer!</div>

                <button type="button" class="btn btn-link addTimerButton" v-on:click="toggleShowNewTimerForm()">Add Timer</button>

                <form class="addNewTimerForm" v-if="this.showNewTimerForm">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-auto">
                            <b>Add New Timer:</b>
                        </div>
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
                            <button type="button" class="btn btn-block btn-success" v-on:click="addTimer()">Add</button>
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
        <img ref="felixface" class="felixface" src="../assets/felixface.png" />
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
                this.$refs.felixface.classList.add('felixface-active')
                this.$refs.felixface.classList.remove('felixface')

                setTimeout(() => {
                    this.$refs.felixface.classList.remove('felixface-active')
                    this.$refs.felixface.classList.add('felixface')
                }, 1000)

                this.timers.push({
                    id: this.lastId++,
                    timeInSec: this.selectedTimeInSeconds,
                    team1Name: this.selectedTeam1,
                    team2Name: this.selectedTeam2
                })
                this.toggleShowNewTimerForm()
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

    .title {
        font-size: 4em;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        color: #F22613;
    }

    .addTimerButton {
        margin-bottom: 2em;
        color: #ededed;
    }

    .addTimerButton:hover {
        color: #F22613;
        text-decoration: none;
    }

    .addNewTimerForm {
        border-radius: 15px;
        background: rgba(255,255,255,0.2);
        padding: 1em;
        margin-bottom: 2em;
        -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
        -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
    }

    .addButton {
        color: #ededed;
    }

    .addButton:hover {
        color: #F22613;
        text-decoration: none;
    }

    @keyframes faceBounce {
        from {
            -webkit-transform:scale(1);
        }

        to {
            -webkit-transform:scale(5);
        }
    }

    .felixface {
        display: none;
    }

    .felixface-active {
        position: absolute;
        top: calc(50% - 171px / 2);
        left: calc(50% - 126px / 2);

        animation-duration: 0.25s;
        animation-name: faceBounce;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

</style>
