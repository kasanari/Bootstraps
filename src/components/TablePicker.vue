<template>
    <!-- Detta kan nog genereras via en funktion -->
    <div>
        <div v-for="(n, index) in amount" @click="() => flip(index)" class="table-button">
            <table-button v-bind:table ="n" v-bind:isActive = "active[index]"> </table-button>
        </div>
    </div>
  </template>

<script>
    import TableButton from '../components/TableButton.vue';

export default {
    name: 'table-picker',
    data: function () {
        return {
            tables: [],
            amount: 12,
           
        }
    },
    
    props: [
        'active'
    ],
    methods: {
        toggleTable: function(table) {
            if (this.tables.includes(table)) {
                this.tables = this.tables.filter( (t) => table !== t );
            } else {
                this.tables.push(table);
                
            }
            this.clientAPI.setTables(this.tables);
        },
        
        flip: function (number) {
            this.$emit('tableClick', number);
        }
      
    },

    components: {            
        TableButton   
    }
}
      </script>

<style scoped>
div {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}

.table-button {
    width: 25%;
}

</style>
