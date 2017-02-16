<template>
    <!-- Detta kan nog genereras via en funktion -->
    <table>
        <tr>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "1"></table-button></td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "2"></table-button></td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "3"></table-button> </td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "4"></table-button></td>
        </tr>
         <tr><td><table-button v-on:toggle="toggleTable"  v-bind:table = "5"></table-button></td>
            <td><table-button  v-on:toggle="toggleTable"  v-bind:table = "6"></table-button></td>
            <td><table-button v-on:toggle="toggleTable"  v-bind:table = "7"></table-button> </td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "8"></table-button></td>
        </tr>
         <tr><td><table-button v-on:toggle="toggleTable" v-bind:table = "9"></table-button></td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "10"></table-button></td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "11"></table-button> </td>
            <td><table-button v-on:toggle="toggleTable" v-bind:table = "12"></table-button></td>
        </tr>
    </table>  
</template>

<script>
    import TableButton from '../components/TableButton.vue'
    export default {
        name: 'table-picker',
        data: function () {
            return {
                tables: []
            }
        },
      
        props: [
            
        ],
        methods: {
            toggleTable(table) {
                if (this.tables.includes(table)) {
                    this.tables = this.tables.filter( (t) => table !== t );
                } else {
                    this.tables.push(table);
                 
                }
                this.clientAPI.setTables(this.tables);
            }
        },
         components: {            
          TableButton   
        }
    }
</script>

<style scoped>
    table {
        margin: auto;
    }
</style>
