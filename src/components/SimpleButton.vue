<template>
    <button @click="increment()">{{ buttonText }} -- {{ counter }}</button>

</template>

<script>
    export default {
        name: 'simple-button',
        data () {
            return {
                counter: 0
            }
        },
        props: [
            'buttonText'
        ],
        methods: {
            increment () {
                this.counter++;
            }
        }
    }
</script>

<style scoped>
button {
    background-color: rgb(220, 80, 80);
    padding: 1em;
    border: none;
    border-radius: 2px;
    color: rgba(255, 255, 255, 0.8);
}
</style>
