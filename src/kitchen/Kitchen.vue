<template>
    <div>
        <h1>Kitchen</h1>
           
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
    color: black;
    padding-bottom: 20px;
    padding-left: 20px;
}
</style>

