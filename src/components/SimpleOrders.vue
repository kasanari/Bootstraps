<template>
    <div>
        <h3>Waiting orders {{ this.waitingOrders.length }}</h3>
        <div v-for="order in waitingOrders">
            <ul>
                <li>Order number: {{order.getOrderNumber()}}</li>
                <li>Table: {{order.getTable()}}</li>
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
        </div>
        <h3>Ongoing orders</h3>
        <p>TODO add code</p>
        <h3>Ready orders</h3>
        <p>TODO add code</p>

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
</style>