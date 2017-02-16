
<template>
<div>    
<div id ="waiting">
        <h3>Waiting orders {{ this.waitingOrders.length }}</h3>
        <div v-for="order in waitingOrders">
            <button @click="setStatus(order, 1)">Pick up order</button>
            
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
                
                <li>Drinks
                    <ul>
                        <li v-for="drink in order.getDrinks()">
                            {{getDrinkLabel(drink)}}
                        </li>
                    </ul>
                </li>
            </ul>
    </div> </div>
        
        <div id="ongoing">
        <h3>Ongoing orders {{ this.ongoingOrders.length }}</h3>
        <div v-for="order in ongoingOrders">
            <button @click="setStatus(order, 2)">Finish up order</button>
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
                </ul>
        </div>
    </div>
        
        <div id="ready">
        <h3>Ready orders {{ this.readyOrders.length }}</h3>
        <div v-for="order in readyOrders">
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
            </ul>
    </div></div>
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
  
    #waiting{
        background-color: lightgray;
       display: inline-block; 
    }
    
    #ongoing {

    background-color: lightgoldenrodyellow;
    color: black;
    padding-left:  23px;
    border: 2px 23px 23px 2px;
    border:2px  #ffffff;
    margin-bottom: 20px;
    
    display: inline-block;
    
    
}

    #ready {

    background-color: lightgreen;
    color: black;
    padding-left:  23px;
    border: 2px 23px 23px 2px;
    border:2px  #ffffff;
    margin-bottom: 20px;
    align-content: center;
    display: inline-block;
    
}
</style>