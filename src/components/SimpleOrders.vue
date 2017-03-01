
<template>
    <div id="container">
        <div class="section">
            <h3>Waiting orders: {{ this.waitingOrders.length -this.noFoodOrders.length}}</h3>
            <div class="column" id="waiting">
                <div v-for="order in waitingOrders">
                    <div v-if="hasFood(order)">
                        <div id="order">
                            <ul>
                                <button @click="removeOrd(order)" id="button2">Delete order</button>
                                <li>Order number: {{order.getOrderNumber()}}</li>
                                <li>Table: {{order.getTables()}}</li>
                                <li>Food
                                    <ul>
                                        <li v-for="food in order.getFoods()">
                                            {{getFoodLabel(food)}}  x 
                                            {{food.getQty() }} 
                                            {{food.getNote() }}
                                            {{food.getOptions()}}
                                        </li>
                                    </ul>
                                </li>
                                <button @click="setStatus(order, 1)" id="button">Pick up order</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <h3>Ongoing orders: {{ this.ongoingOrders.length }}</h3>
            <div class="column" id="ongoing">    
                <div v-for="order in ongoingOrders">
                    <div id="order">
                        <ul>
                            <button @click="removeOrd(order)" id="button2">Delete order</button>
                            <li>Order number: {{order.getOrderNumber()}}</li>
                            <li>Table: {{order.getTables()}}</li>
                            <li>Food
                                <ul>
                                    <li v-for="food in order.getFoods()">
                                        {{getFoodLabel(food)}}
                                    </li>
                                </ul>
                            </li>
                            <button @click="setStatus(order, 1)" id="button">Start order</button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <h3>Ready orders: {{ this.readyOrders.length }}</h3>
            <div class="column" id="ready"> 
                <div v-for="order in readyOrders">
                    <div id="order">
                        <ul>
                            <li>Order number: {{order.getOrderNumber()}}</li>
                            <li>Table: {{order.getTables()}}</li>
                            <li>Food
                                <ul>
                                    <li v-for="food in order.getFoods()">
                                        {{getFoodLabel(food)}}
                                    </li>
                                </ul>
                            </li>
                            <button @click="printOrder(order)">Print order</button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <notification type="success" :visible="successVisible" @requestHide="setSuccessVisible(false)">
            <p slot="title">Success</p>
            <p>Order printed successfully</p>
        </notification>
    </div>
</template>

<script>
 import { STATUS } from '../../shared/models/order';
 import Notification from './Notification.vue';

 export default {
     name: 'simple-orders',
     components: {
         Notification
     },
     data() {
         return {
             allOrders: this.clientAPI.getOrders() || [],
             waitingOrders: [],
             ongoingOrders: [],
             readyOrders: [],
             noFoodOrders: [],
             successVisible: false
         }
     },
     mounted() {
         this.clientAPI.addOrdersListener(this.onOrders.bind(this));
         this.filterOrders();
     },
     methods: {
         setSuccessVisible(value) {
             this.successVisible = value;
         },
         onOrders(newOrders) {
             this.allOrders = newOrders;
             this.filterOrders();
         },
         filterOrders() {
             this.waitingOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.waiting);
             this.ongoingOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.ongoing);
             this.readyOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.ready);
             this.noFoodOrders = this.allOrders.filter((order) => order.getFoods().length===0);
         },
         getFoodLabel(food) {
             let menu = this.clientAPI.getMenu();
             let foodItem = menu.foods.find((fi) => fi._id === food.getId());

             return foodItem.label;
         },
         getDrinkLabel(drink) {
             let menu = this.clientAPI.getMenu();
             let drinkItem = menu.drinks.find((di) => di._id === drink.getId());

             return drinkItem.label;
         },

         setStatus(order, status) {
             order.setStatus(status);
             this.clientAPI.updateOrder(order);
         },

         printOrder(order) {
             var food;
             let menu = this.clientAPI.getMenu();
             var i = order.getFoods().length;
             // Emulate printing an order
             console.log("START: Order " + order.getOrderNumber() + "\n---------");
             for (var n = 0; n < i; n = n + 1) {
                 var f = order.getFoods()[n];
                 let foodItem = menu.foods.find((fi) => fi._id === f.getId());
                 console.log(foodItem.label);
             }
             console.log("END: Order " + order.getOrderNumber() + "\n---------------------------");
             // Emulate success message
             this.setSuccessVisible(true);

            order.setStatus(2);
            this.clientAPI.updateOrder(order);
        },

        pickupOrder(order) {
            order.setStatus(3);
            this.clientAPI.updateOrder(order);
        },

         removeOrd(order) {
             order.setStatus(3);
             this.clientAPI.updateOrder(order);
             //this.clientAPI.removeOrder(order);
             //this.serverAPI.removeOrder(order);
         },

         hasFood(order) {
             return (order.getFoods().length > 0);
         }

     }
 }

</script>

<style scoped>

 #container {
     display: flex;
     height: 100%;
     overflow: auto;
 }    
 
 ul {
     margin-left: 1em;
 }
 ul > ul {
     margin-left: 2em;
 }
 h3 {
     
     margin-bottom: 10px;
 }
 
 #waiting{
     background-color: lightgray;
     
     
 }
    
    .section {
          flex-grow: 1;
            width: 33%;
    }
 
 .column {
     color: black;
     flex-wrap: wrap;
     padding: 10px;
     display: flex;
     flex-basis: 33%;
     justify-content: space-between;
     flex-shrink: 0;
 }
 
 #ongoing {

     background-color: lightgoldenrodyellow;
     border: 2px lightgrey;
     vertical-align: top;
     
     
 }

 #ready {
     background-color: lightgreen;
     align-content: center;
     vertical-align: top;
     
 }
 #order {
     
     border: solid 1px;
     width: 200px;
     margin: 5px;
     padding: 5px 5px 5px 5px;
     box-shadow:  1px 2px 3px black;
 }
 
 #button2 {
     background-color: rgb(220, 80, 80);
     padding: 1em;
     border: none;
     border-radius: 2px;
     color: white;
     margin-top: 2px;
     margin-bottom: 3px;
     
 }
 button {
     background-color: green;
     padding: 1em;
     border: none;
     border-radius: 2px;
     color: white;
     margin-top: 2px;
     
 }
 
 button {
     background-color: green;
     padding: 1em;
     border: none;
     border-radius: 2px;
     color: white;
     margin-top: 2px;
     
 }
 
 
</style>