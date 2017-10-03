<template>
    <div ref="timer" class='timer'>
        <div class="container">
            <div class="row align-items-center justify-content-center">

                <!-- TIME -->
                <div class="col-5 timeContainer">
                    <div class="timeDisplay">{{ this.formattedTime }}</div>
                </div>

                <!-- TEAMS -->
                <div class="col-5 teamContainer">
                    <h1>{{ timer.team1Name }}</h1>
                    <h3>VS</h3>
                    <h1>{{ timer.team2Name }}</h1>
                </div>

                <!-- BUTTONS -->
                <div class="col-2 buttonContainer">
                    <button ref="startButton" type="button" class="btn btn-outline-success btn-block" v-on:click="startTimer()" :disabled="this.isStarted">Start</button>
                    <button ref="pauseButton" type="button" class="btn btn-outline-warning btn-block" v-on:click="togglePause()" :disabled="!this.isStarted">Pause</button>
                    <button ref="resetButton" type="button" class="btn btn-outline-danger btn-block" v-on:click="resetTimer()">Reset</button>
                </div>
            </div>

            <button type="button" class="btn btn-link deleteButton" v-on:click="deleteTimer()">x</button>

        </div>
    </div>
</template>

<script>
    import {EventBus} from '@/eventbus.js'

    export default {

        name: 'timer',
        props: ['timer'],
        components: {},
        data () {
            return {
                timeLeft: this.timer.timeInSec,
                interval: undefined,
                isStarted: false,
                isPaused: false
            }
        },
        computed: {
            formattedTime: function () {
                let minutes = parseInt(this.timeLeft / 60, 10)
                let seconds = parseInt(this.timeLeft % 60, 10)

                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds

                return minutes + ':' + seconds
            }
        },
        created: function () {},
        methods: {
            startTimer: function () {
                this.isStarted = true
                this.interval = setInterval(() => {
                    if (!this.isPaused) {
                        this.timeLeft--

                        if (this.timeLeft === 0) {
                            clearInterval(this.interval)
                            this.timerFinished()
                        }
                    }
                }, 1000)
            },
            togglePause: function () {
                this.isPaused = !this.isPaused
                if (this.isPaused) {
                    this.$refs.pauseButton.innerText = 'Resume'
                } else {
                    this.$refs.pauseButton.innerText = 'Pause'
                }
            },
            resetTimer: function () {
                clearInterval(this.interval)
                this.timeLeft = this.timer.timeInSec
                this.isStarted = false
                this.isPaused = false
                this.$refs.pauseButton.innerText = 'Pause'
            },
            timerFinished: function () {
                this.$refs.timer.classList.add('timer-done')
            },
            deleteTimer: function () {
                this.resetTimer()
                EventBus.$emit('deleteTimer', this.timer.id)
            }
        }
    }
</script>

<style scoped>
    .timer {
        border-radius: 15px;
        margin-bottom: 2em;
        background: rgba(255,255,255,0.2);
        -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
        -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
    }

     @keyframes faceBounce {
        from {
            -webkit-transform:scale(1);
        }

        to {
            -webkit-transform:scale(1.05);
        }
    }

    .timer-done {
        background: rgba(255,0,0,0.5);
        animation-duration: 0.25s;
        animation-name: faceBounce;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .timeDisplay {
        font-size: 8em;
    }

    .deleteButton {
        position: absolute;
        top:-2px;
        right:15px;
        color: #ededed;
        text-decoration: none;
    }

    .deleteButton:hover {
        color: #F22613;
        text-decoration: none;
    }
</style>
