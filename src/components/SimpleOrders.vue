
<template>
<div>    
<div id ="waiting">
        <h3>Waiting orders: {{ this.waitingOrders.length }}</h3>
        
        <div v-for="order in waitingOrders">
            <div v-if="hasFood(order)">                             
            <div id ="order">
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
                <button @click="setStatus(order, 1)" id="button">Pick up order</button> 

                               
            </ul>
    </div> </div></div></div>
        
        <div id="ongoing">
        <h3>Ongoing orders: {{ this.ongoingOrders.length }}</h3>
        <div v-for="order in ongoingOrders">
            <div id ="order">
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
                <button @click="setStatus(order, 2)">Finish up order</button>
                </ul>
    </div>
    </div>
    </div>
        
        <div id="ready">
        <h3>Ready orders: {{ this.readyOrders.length }}</h3>
        <div v-for="order in readyOrders">
            <div id ="order">
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
    </div></div></div>
    </div>
</template>

<script>
import { STATUS } from '../../shared/models/order';

export default {
    name: 'simple-orders',
    data() {
        return {
            allOrders: this.clientAPI.getOrders() || [],
            waitingOrders: [],
            ongoingOrders: [],
            readyOrders: []
        }
    },
    mounted() {
        this.clientAPI.addOrdersListener(this.onOrders.bind(this));
        this.filterOrders();
    },
    methods: {
        onOrders(newOrders) {
            this.allOrders = newOrders;
            this.filterOrders();
        },
        filterOrders() {
            this.waitingOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.waiting);
            this.ongoingOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.ongoing);
            this.readyOrders = this.allOrders.filter((order) => order.getStatus() === STATUS.ready);
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
        
        setStatus(order, status){
            order.setStatus(status);
            this.clientAPI.updateOrder(order);
        },
        
        printOrder(order){            
            var food;
            let menu = this.clientAPI.getMenu();
            var i = order.getFoods().length;
            console.log("START: Order "+ order.getOrderNumber() + "\n---------");
            for (var n=0; n<i; n=n+1){
                var f=order.getFoods()[n];
                let foodItem = menu.foods.find((fi) => fi._id === f.getId());
                console.log(foodItem.label);
            }     
            console.log ("END: Order "+ order.getOrderNumber() + "\n---------------------------");
            
            this.clientAPI.removeOrder(order);
            order.setStatus(3);
            this.clientAPI.updateOrder(order);
            //this.serverAPI.removeOrder(order);
            
        },
        
        removeOrd(order){
            order.setStatus(3);
            this.clientAPI.updateOrder(order);
            //this.clientAPI.removeOrder(order);
            //this.serverAPI.removeOrder(order);
        },
        
        hasFood(order){
        return (order.getFoods().length>0);
        
    }

    }
}

</script>

<style scoped>
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
        display: inline-block; 
        width: 240px;
        
        vertical-align: top;
        padding-left: 20px;
        
    }
    
    #ongoing {

    background-color: lightgoldenrodyellow;
    color: black;
    padding-left:  20px;
    border: 20px 20px 20px 20px;
    border:2px  lightgrey;
    margin-bottom: 20px;
    width: 240px;
    display: inline-block;
    vertical-align: top;
        margin-left: 20px;
    
    
}

    #ready {
    width: 240px;
    background-color: lightgreen;
    color: black;
    padding-left:  23px;
    border: 2px 23px 23px 2px;
    border:2px  #ffffff;
    margin-bottom: 20px;
    align-content: center;
    display: inline-block;
    vertical-align: top;
    
}
    #order {
        
        border: solid 1px;
        width: 200px;
        margin-bottom: 30px;
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