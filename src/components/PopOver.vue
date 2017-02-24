<template>
    <div class="pop-over-container">
        <div v-if="visible" class="overlay" @click="requestToggle" />
        <div v-if="visible" class="pop-over-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.pop-over-container {
    /* position: relative;*/
}


.overlay {
    background-color: black;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
}

.pop-over-content {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 1em;
    padding: 1em;
    z-index: 100;
    color: white;
}
</style>

<script>
export default {
    name: 'pop-over',
    props: [
        'visible'
    ],
    methods: {
        requestToggle() {
            this.$emit('requestToggle');
        }
    }
}
</script>