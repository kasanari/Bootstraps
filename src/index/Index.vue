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
    padding: 1em;
    width: calc(100% - 2em);
    height: calc(100% - 2em);
    align-items: stretch;
}

#sidebar {
    width: 1px;
    margin-left: 1em;
    flex-grow: 2;
}

#menu-area {
    width: 1px;
    flex-grow: 9;
    margin-left: 1em;
    margin-right: 1em;
}
</style>
