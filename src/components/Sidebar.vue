<template>
    
    <div class="container"> 
        <order-list class="order-list"/>
        <h2>Tables:</h2>
        <table-picker v-on:tableClick = "flip" :active = "tables"></table-picker>
        <h2>Payment method:</h2>
        <payment :isCash = "isCash" :isCard = "isCard" v-on:switch="setType" />
        <button @click="sendOrder">Send to kitchen</button>
        <notification :visible="successVisible" @requestHide="setSuccessVisible(false)">
            <p slot="title">Success</p>
            <p>Order successfully sent to kitchen</p>
        </notification>
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
    margin-top: 0.3em;
    padding: 10px;
    font-family: inherit;
    font-size: 1.5em;
    font-weight: bold;
    align-self: stretch;
    
}
   </style>

<script>
import Payment from './Payment.vue';
import TablePicker from './TablePicker.vue';
import OrderList from './OrderList.vue';
import Notification from './Notification.vue';

export default {
    name: 'sidebar',
    data: function () {
        return {
            tables: {},
            isCard: false,
            isCash: true,
            successVisible: false
        }
    },
    
    props: [
        
    ],
    methods: {
        setSuccessVisible(value) {
            this.successVisible = value;
        },
        sendOrder() {
            this.printOrder();
            this.clientAPI.sendOrder();
            this.reset();
            this.setSuccessVisible(true);
        },
        reset() {
            this.tables = Object.assign({}, {});
            this.isCash = true;
            this.isCard = false;
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
            
        },
        
        flip: function (number) {
            console.log("yo");
            this.tables[number] = !this.tables[number];
            this.tables = Object.assign({}, this.tables);
            this.clientAPI.setTables(this.tables);
            
        },
        setType: function (type) {
                if (type === "Cash") {
                    this.isCash = true;
                } else {
                    this.isCash = false;
                }  
            }
    },
    components: {            
        TablePicker,
        OrderList,
        Payment,
        Notification
    }
}
   </script>

