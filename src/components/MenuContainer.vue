<template>
    <div class="menu-container">
        <menu-list 
            title="Food"
            :items="foods" />
        <menu-list 
            title="Drinks"
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
    }
}
</script>

<style scoped>
.menu-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0;
    padding: 0;
}
</style>