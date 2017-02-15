<template>
    <div class="menu-list-container">
        <h2>{{title}}</h2>
        <div class="menu-list">
            <menu-item v-for="item in items" :item="item" />
        </div>
    </div>
</template>

<script>
    import MenuItem from './MenuItem.vue';

    export default {
        name: 'menu-list',
        props: [
            'items',
            'title'
        ],
        components: {
            MenuItem
        }
    }
</script>

<style scoped>
.menu-list {
    display: flex;
    align-items: stretch;
    height: 200px;
    margin-bottom: 1em;
    overflow-x: auto;
    overflow-y: hidden;
}

.menu-list > * {
    margin-right: 1em;
}
</style>