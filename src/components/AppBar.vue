<template>
    <header>
        <h1>Wermlandskällar'n</h1>
        <view-switcher />
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
header {
    background-color: rgb(220, 80, 80);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.8);
    padding: 1em;
    margin-bottom: 1em;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

h1 {
    color: rgba(255, 255, 255, 0.8);
}
</style>
