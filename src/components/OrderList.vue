<template>
    <div class="order-list">
        <template v-if="hasItems">
            <h2 class="order-nbr">Order #{{order.getOrderNumber()}}</h2>
            <div class="items-container">
                <template v-if="order.getFoods().length > 0">
                    <p class="category-label">FOODS</p>
                    <div class="order-item" v-for="(food, i) in order.getFoods()">
                        <order-list-item :orderItem="food" @update="updateOrderItem" @remove="removeItem"/>
                    </div>
                </template>
                <template v-if="order.getDrinks().length > 0">
                    <p class="category-label">DRINKS</p>
                    <div class="order-item" v-for="drink in order.getDrinks()">
                        <order-list-item :orderItem="drink" @remove="removeItem"/>
                    </div>
                </template>
            </div>
            <h3 class="order-total"> Order Total:  {{getOrderTotal(order)}}</h3>
        </template>
        <div class="prompt" v-else>
            <h2>Tap items on the right to start an order</h2>
            <h3>Remember to ask for customers table!</h3>
        </div>
    </div>
</template>

<style scoped>
.order-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    color: black;
    border-radius: 2px;
    padding: 0.5em;
}

.prompt {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    animation: pulsate 1s infinite alternate;
}

@keyframes pulsate {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
}

.order-item:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
}

.order-item:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.2);
}

.items-container {
    margin-left: -0.5em;
    margin-right: -0.5em;
    flex-shrink: 1;
    flex-grow: 1;
    overflow-y: auto;
}

.category-label {
    font-size: 0.8em;
    color: rgba(200, 200, 200, 1);
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    margin-left: 0.5em;
}
</style>

<script>
import OrderListItem from './OrderListItem.vue';

export default {
    name: 'order-list',
    props: ['order'],
    components: {
        OrderListItem
    },
    computed: {
        hasItems() {
            return this.order.getDrinks().length + this.order.getFoods().length > 0;
        }
    },
    methods: {
        getOrderTotal(order) {
            let foodCount=order.getFoods().length;
            let drinkCount=order.getDrinks().length;
            var i,j,orderTotal=0;
            for (i=0; i<foodCount; i++){
                var food =order.getFoods()[i];
                let menu = this.clientAPI.getMenu();
                let foodItem = menu.foods.find((fi) => fi._id === food.getId());
                orderTotal = orderTotal + foodItem.price * food.getQty();
            }; 
            
            for (j=0; j<drinkCount; j++){
                var drink =order.getDrinks()[j];
                let menu = this.clientAPI.getMenu();
                let drinkItem = menu.drinks.find((di) => di._id === drink.getId());
                orderTotal = orderTotal + drinkItem.price * drink.getQty();
            };
            return orderTotal;
        },

        updateOrderItem(oldItem, newItem) {
            Object.assign(oldItem, newItem);
        },

        removeItem(item) {
            this.clientAPI.removeItemInOrder(item);
        },
        
        hasFood(order){
            return (order.getFoods().length>0)
        },
    }
}
</script>
