<template>
    <div class="menu-container">
        <menu-list 
            title="Food"
            v-on:itemClick="foodClick"
            :items="foods" />
        <menu-list 
            title="Drinks"
            v-on:itemClick="drinkClick"
            :items="drinks" />
    </div>
</template>

<script>
import MenuList from './MenuList.vue';
import Food from '../../shared/models/food';
import Drink from '../../shared/models/drink';

export default {
    name: 'menu-container',
    components: {
        MenuList
    },
    data() {
        let menu = this.clientAPI.getMenu();

        return {
            foods: menu.foods,
            drinks: menu.drinks
        }
    },
    methods: {
        foodClick(foodItem) {
            let food = new Food(foodItem._id);
            this.clientAPI.addFood(food);
        },
        drinkClick(drinkItem) {
            let drink = new Drink(drinkItem._id);
            this.clientAPI.addDrink(drink);
        }
    }
}
</script>

<style scoped>
.menu-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0;
    padding: 0;
}
</style>