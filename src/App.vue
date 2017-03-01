<template>
    <div class="container">
        <app-bar />
        <transition :name="animationName">
            <router-view />
        </transition>
    </div>
</template>

<style scoped>

.container {
    overflow: hidden;
}

div {
    height: 100%;
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: transform 0.25s;
}

.slide-right-leave-to, .slide-left-enter {
    transform: translate3d(100%, 0, 0);
}

.slide-right-enter-to, slide-left-enter-to {
    transform: translate3d(0, 0, 0);
}

.slide-right-enter, .slide-left-leave-to {
    transform: translate3d(-100%, 0, 0);
}
</style>

<script>
    import AppBar from './components/AppBar.vue';
    export default {
        name: 'app',
        components: {
            AppBar
        },
        computed: {
            animationName() {
                switch (this.$route.name) {
                    case 'index':
                        return 'slide-right';
                    case 'kitchen':
                        return 'slide-left';
                }
            }
        }
    }
</script>
