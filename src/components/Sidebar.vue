<template>
    
    <div> 
        <h1>SIDEBAR</h1>
        <order-list />
        <table-picker ></table-picker>
        <button @click="sendOrder">Send to kitchen</button>
    </div>
    
    
</template>

<script>
    import TablePicker from '../components/TablePicker.vue';
    import OrderList from '../components/OrderList.vue';
  
    export default {
        name: 'sidebar',
        data: function () {
            return {
                
            }
        },
      
        props: [
            
        ],
        methods: {
            sendOrder() {
                this.clientAPI.sendOrder();
            }
        },
        components: {            
          TablePicker,
          OrderList
        }
    }
</script>

<style scoped>
    div {
        background-color: rgba(236, 240, 241,1.0);
        padding: 20px;
    }
</style>
