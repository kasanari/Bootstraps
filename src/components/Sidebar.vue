<template>
    
    <div> 
        <order-list />
        <table-picker ></table-picker>
        <payment/>
        <button @click="sendOrder">Send to kitchen</button>
    </div>
    
    
</template>

<script>
    import Payment from '../components/Payment.vue';
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
            OrderList,
            Payment
        }
    }
</script>

<style scoped>
    div {
        background-color: rgba(236, 240, 241,1.0);
        padding: 20px;
    }
    
    button {
        display: block;
        margin: auto;
        margin-top: 20px;
        padding: 10px;
        font-family: inherit;
        font-size: 150%;
        font-weight: bold;
        
    }
</style>
