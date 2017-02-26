<template>
    <transition name="slide-top">
        <div class="notification" v-if="visible">
            <p class="title"><slot name="title" /></p>
            <p class="message"><slot /></p>
        </div>
    </transition>
</template>

<style scoped>
.notification {
    position: fixed;
    left: 50vw;
    transform: translateX(-50%);
    z-index: 200;
    top: 0;
    background-color: rgb(80, 220, 80);
    padding: 1em;
    border-radius: 0 0 10px 10px;
}

.slide-top-enter-active, .slide-top-leave-active {
    transition: transform .2s;
}

.slide-top-enter, .slide-top-leave-to {
    transform: translateX(-50%) translateY(-100%);
}
</style>

<script>
export default {
    name: 'notification',
    props: [
        'title',
        'message',
        'visible'
    ],
    watch: {
        'visible'() {
            if (this.visible) {
                window.setTimeout(this.requestHide, 5000);
            }
        }
    },
    methods: {
        requestHide() {
            if (this.visible) {
                this.$emit('requestHide');
            }
        }
    }
}
</script>