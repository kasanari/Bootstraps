<template>
    <div>
        <h1>Order #{{order.getOrderNumber()}}</h1>
        <h3>Tap items to add orders</h3>
        <p class="category-label">FOODS</p>
        <div class="item-container" v-for="food in order.getFoods()">
            <p class="item-name">{{getFoodLabel(food)}}, {{getFoodPrice(food)}}kr</p>
            <p class="item-note" v-if="food.getNote() !== ''">
                {{food.getNote()}}
            </p>
        </div>
        <p class="category-label">DRINKS</p>
        <div class="item-container" v-for="drink in order.getDrinks()">
            <p class="item-name">{{getDrinkLabel(drink)}}</p>
        </div>
    </div>
</template>

<style scoped>
.category-label {
    font-size: 0.8em;
    color: rgba(200, 200, 200, 1);
    margin-bottom: 0.4em;
    margin-top: 0.4em;
}

.item-name {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
}

.item-container:hover {
    background-color: rgba(200, 200, 200, 1);
    cursor: pointer;
}
</style>

<script>
export default {
    name: 'order-list',
    data() {
        return {
            order: this.clientAPI.getOrder()
        }
    },
    created() {
        this.clientAPI.addOrderChangedListener((newOrder) => {
            this.order = newOrder;
        })
    },
    methods: {
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
        getFoodPrice(food) {
            let menu = this.clientAPI.getMenu();
            let foodItem = menu.foods.find((fi) => fi._id === food.getId());

            return foodItem.price;
        }
    }
}
</script>
