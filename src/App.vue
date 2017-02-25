<template>
    <div>
        <app-bar />
        <router-view></router-view>
    </div>
</template>

<style scoped>
div {
    height: 100%;
}
</style>

<script>
    import AppBar from './components/AppBar.vue';
    export default {
        name: 'app',
        components: {
            AppBar
        }
    }
</script>
