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
                this.printOrder();
                this.clientAPI.sendOrder();
                
                
            },
            printOrder() {
                 var order= this.clientAPI.getOrder();
                 
                 let menu = this.clientAPI.getMenu();
                 var i = order.getFoods().length;
                var j = order.getDrinks().length;
                 
                 console.log("START: Order "+ order.getOrderNumber() + "\n---------");
                
                for (var n=0; n<i; n=n+1){
                    var f=order.getFoods()[n];
                    let foodItem = menu.foods.find((fi) => fi._id === f.getId());
                    
                    console.log(foodItem.label);
                }  
                
                for (var t=0; t<j; t=t+1){
                    var d=order.getDrinks()[t];
                    let drinkItem = menu.drinks.find((di) => di._id === d.getId());
                    
                    console.log(drinkItem.label);
                }  
                console.log ("END: Order "+ order.getOrderNumber() + "\n---------------------------");     
                
            }
        },
        components: {            
          TablePicker,
            OrderList,
            Payment
        }
    }
</script>

