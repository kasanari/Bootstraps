<template>
    <transition name="slide-top">
        <div v-bind:class="typeClass" class="notification" v-if="visible">
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
    background-color: grey;
    padding: 1em;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}

.title {
    font-weight: bold;
    font-size: 1.1em;
}

.success {
    background-color: hsl(150, 100%, 30%);
}

.error {
    background-color: hsl(0, 100%, 30%);
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
        'visible',
        'type'
    ],
    watch: {
        'visible'() {
            if (this.visible) {
                window.setTimeout(this.requestHide, 5000);
            }
        }
    },
    computed: {
        typeClass() {
            return this.type;
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