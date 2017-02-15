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
        foodClick(food) {
            this.clientAPI.addFood(food);
        },
        drinkClick(drink) {
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