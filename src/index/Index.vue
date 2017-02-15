<template>
    <main id="main-container">
        <sidebar></sidebar>
        <menu-area></menu-area>
    </main>
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
#main-container {
    display: flex;
}
</style>
