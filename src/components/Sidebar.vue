<template>
    
    <div class="container"> 
        <order-list class="order-list"/>
        <table-picker ></table-picker>
        <payment/>
        <button @click="sendOrder">Send to kitchen</button>
    </div>
    
    
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: rgba(236, 240, 241,1.0);
    }

    .order-list {
        max-height: 30vh;
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

