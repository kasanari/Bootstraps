<template>
    <div class="order-list">
        <h2>Order #{{order.getOrderNumber()}}</h2>
        <div class="items-container">
            <p class="category-label">FOODS</p>
            <div class="order-item" v-for="(food, i) in order.getFoods()">
                <order-list-item :orderItem="food" @update="updateOrderItem"/>
            </div>
            <p class="category-label">DRINKS</p>
            <div class="order-item" v-for="drink in order.getDrinks()">
                <order-list-item :orderItem="drink" />
            </div>
        </div>
        <h3> Order Total:  {{getOrderTotal(order)}}</h3>
    </div>
</template>

<style scoped>
.order-list {
    display: flex;
    flex-direction: column;
}

.order-item:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
}

.order-item:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.2);
}

.items-container {
    flex-shrink: 1;
    overflow-y: auto;
}

.category-label {
    font-size: 0.8em;
    color: rgba(200, 200, 200, 1);
    margin-bottom: 0.4em;
    margin-top: 0.4em;
}
</style>

<script>
import OrderListItem from './OrderListItem.vue';

export default {
    name: 'order-list',
    data() {
        return {
            order: this.clientAPI.getOrder()
        }
    },
    components: {
        OrderListItem
    },
    created() {
        this.clientAPI.addOrderChangedListener((newOrder) => {
            this.order = newOrder;
        })
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
                orderTotal = orderTotal + foodItem.price;
            }; 
            
            for (j=0; j<drinkCount; j++){
                var drink =order.getDrinks()[j];
                let menu = this.clientAPI.getMenu();
                let drinkItem = menu.drinks.find((di) => di._id === drink.getId());
                orderTotal = orderTotal + drinkItem.price;
            };
            return orderTotal;
        },

        updateOrderItem(oldItem, newItem) {
            Object.assign(oldItem, newItem);
        },
        
        hasFood(order){
            return (order.getFoods().length>0)
        },
    }
}
</script>
