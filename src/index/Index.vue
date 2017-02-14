<template>
    <div>
        <sidebar></sidebar>
        <menu-area></menu-area>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar.vue'
    import MenuArea from '../components/MenuArea.vue'
    export default {
        name: 'index',
        components: {            
            Sidebar,
            MenuArea
            
        }
    }
</script>

<style scoped>
h1 {
    color: red
}
</style>
