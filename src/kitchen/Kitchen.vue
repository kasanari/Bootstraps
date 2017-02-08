<template>
    <div>
        <h1>Köket</h1>
        <simple-button buttonText="En knapp"></simple-button>
    </div>
</template>

<script>
    import SimpleButton from '../components/SimpleButton.vue'

    export default {
        name: 'kitchen',
        components: {            
            SimpleButton
        }
    }
</script>

<style scoped>
h1 {
    color: blue;
}
</style>

