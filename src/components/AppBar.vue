<template>
    <header>
        <h1>Wermlandskällar'n</h1>
        <view-switcher class="view-switcher"/>
    </header>
</template>

<script>
import ViewSwitcher from './ViewSwitcher.vue';

export default {
    name: 'app-bar',
    components: {
        ViewSwitcher
    }
}
</script>

<style scoped>
.view-switcher {
    font-size: 1.3em;
}
header {
    font-size: 0.85em;
    background-color: rgb(220, 80, 80);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
    padding: 1em;
    margin-bottom: 1em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    right: 1em;
    z-index: 10;
    border-radius: 0 0 2px 2px;
}

h1 {
    margin-right: 1em;
}

h1 {
    color: rgba(255, 255, 255, 0.8);
}
</style>
