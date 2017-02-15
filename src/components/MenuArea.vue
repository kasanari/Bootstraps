<template>
    
    <div>
        <h1>MENU GOES HERE</h1>
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
        /*display: inline-flex;*/
        margin-left: 20px;
        background-color: rgba(236, 240, 241,1.0);
        width: 60%;
        height: 900px;
        padding: 20px;
    }
</style>
