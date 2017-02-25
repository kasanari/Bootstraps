<template>
    
    <div>
        <menu-container />
    </div>
    
    
</template>

<script>
    import MenuContainer from './MenuContainer.vue';

    export default {
        name: 'menu-area',
        components: {
            MenuContainer
        }
    }
</script>

<style scoped>
    div {
        clear: right;
        width: 100%;
        /*display: inline-flex;*/
        background-color: rgba(236, 240, 241,1.0);
        padding: 20px;
    }
</style>
