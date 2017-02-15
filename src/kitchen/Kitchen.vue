<template>
    <div>
        <h1>Köket</h1>
        <simple-button buttonText="En knapp"></simple-button>
        <simple-orders />
    </div>
</template>

<script>
    import SimpleButton from '../components/SimpleButton.vue'
    import SimpleOrders from '../components/SimpleOrders.vue'

    export default {
        name: 'kitchen',
        components: {            
            SimpleButton,
            SimpleOrders
        }
    }
</script>

<style scoped>
h1 {
    color: blue;
}
</style>

