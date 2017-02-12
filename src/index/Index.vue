<template>
    <div>
        <h1>Index osv mm</h1>
        <simple-button buttonText="En knapp"></simple-button>
        <simple-button buttonText="En annan knapp"></simple-button>
        <simple-button buttonText="En tredje knapp"></simple-button>
        <button>En knapp som inte är 'simple-button'</button>
        <br>
        <table-button v-bind:table = "1"></table-button>
        <table-button v-bind:table = "2"></table-button>
    </div>
</template>

<script>
    import SimpleButton from '../components/SimpleButton.vue'
    import TableButton from '../components/TableButton.vue'
    export default {
        name: 'index',
        components: {            
            SimpleButton,
            TableButton
        }
    }
</script>

<style scoped>
h1 {
    color: red
}
</style>
