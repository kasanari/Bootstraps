<template>
    <div>
        <h1>Index osv mm</h1>
        <simple-button buttonText="En knapp"></simple-button>
        <simple-button buttonText="En annan knapp"></simple-button>
        <simple-button buttonText="En tredje knapp"></simple-button>
        <button>En knapp som inte är 'simple-button'</button>
    </div>
</template>

<script>
    import SimpleButton from '../components/SimpleButton.vue'

    export default {
        name: 'index',
        components: {            
            SimpleButton
        }
    }
</script>

<style scoped>
h1 {
    color: red
}
</style>
