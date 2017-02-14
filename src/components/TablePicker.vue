<template>
    <table>
        <tr><td><table-button v-bind:table = "1"></table-button></td>
            <td><table-button v-bind:table = "2"></table-button></td>
            <td><table-button v-bind:table = "3"></table-button> </td>
            <td><table-button v-bind:table = "4"></table-button></td>
        </tr>
         <tr><td><table-button v-bind:table = "5"></table-button></td>
            <td><table-button v-bind:table = "6"></table-button></td>
            <td><table-button v-bind:table = "7"></table-button> </td>
            <td><table-button v-bind:table = "8"></table-button></td>
        </tr>
         <tr><td><table-button v-bind:table = "9"></table-button></td>
            <td><table-button v-bind:table = "10"></table-button></td>
            <td><table-button v-bind:table = "11"></table-button> </td>
            <td><table-button v-bind:table = "12"></table-button></td>
        </tr>
    </table>  
</template>

<script>
    import TableButton from '../components/TableButton.vue'
    export default {
        name: 'table-picker',
        data: function () {
            return {
                
            }
        },
      
        props: [
            
        ],
        methods: {
            
        },
         components: {            
          TableButton
            
        }
    }
</script>

<style scoped>
    div {
        display: inline-block;
        margin-left: 20px;
        background-color: crimson;
        width: 60%;
        height: 900px;
        padding: 20px;
    }
</style>
