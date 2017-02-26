<template>
    <main id="main-container">
        <sidebar id="sidebar"></sidebar>
        <menu-area id="menu-area"></menu-area>
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
    width: 100%;
    height: 100%;
    align-items: stretch;
}

#sidebar {
    width: 1px;
    flex-grow: 2;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    z-index: 2;
}

#menu-area {
    width: 1px;
    flex-grow: 9;
}
</style>
