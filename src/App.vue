<template>
    <div>
        <app-bar />
        <router-view></router-view>
    </div>
</template>

<script>
    import AppBar from './components/AppBar.vue';
    export default {
        name: 'app',
        components: {
            AppBar
        }
    }
</script>
