<template>
    <div class='timer'>
        <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ timer.timeInSec }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3>{{ timer.team1Name }} VS {{ timer.team2Name }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button type="button" class="btn btn-outline-success">Start</button>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-outline-warning">Pause</button>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-outline-danger">Reset</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: 'main',
        props: ['timer'],
        components: {},
        data () {
            return {}
        },
        created: function () {},
        methods: {}
    }
</script>

<style scoped>
    .timer {
        border: 1px solid black;
        border-radius: 5px;
    }
</style>
