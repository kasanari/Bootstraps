<template>
    <div class="menu-list-container">
        <h2>{{title}}</h2>
        <div class="menu-list">
            <menu-item v-for="item in items" v-on:itemClick="itemClick" :item="item" :type="type" />
        </div>
    </div>
</template>

<script>
    import MenuItem from './MenuItem.vue';

    export default {
        name: 'menu-list',
        props: [
            'items',
            'title',
            'type'
        ],
        components: {
            MenuItem
        },
        methods: {
            itemClick(item) {
                this.$emit('itemClick', item);
            }
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