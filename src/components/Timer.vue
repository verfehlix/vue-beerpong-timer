<template>
    <div class='timer'>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ this.formattedTime }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h3>{{ timer.team1Name }} VS {{ timer.team2Name }}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <button ref="startButton" type="button" class="btn btn-success" v-on:click="startTimer()" :disabled="this.isStarted">Start</button>
                </div>
                <div class="col-4">
                    <button ref="pauseButton" type="button" class="btn btn-warning" v-on:click="togglePause()" :disabled="!this.isStarted">Pause</button>
                </div>
                <div class="col-4">
                    <button ref="resetButton" type="button" class="btn btn-danger" v-on:click="resetTimer()">Reset</button>
                </div>
            </div>
            <div class="row align-items-center justify-content-center">
                <button type="button" class="btn btn-link" v-on:click="deleteTimer()">X</button>
            </div>
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
            },
            timerFinished: function () {
                alert('Timer ' + this.timer.id + ' is done!')
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
        border: 1px solid black;
        border-radius: 5px;
    }
</style>
