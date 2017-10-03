<template>
    <div id="app">
         <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    body {
        background-image: url('assets/wallpaper.jpg');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #ededed;
    }
</style>
