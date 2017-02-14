<template>
    <menu>
        <router-link to="/">
            <div 
                class="link-button" 
                v-bind:class="{ 'active': this.$route.name === 'index'}"
                id="index-button">Pub</div>
        </router-link>
        <router-link to="/kitchen">
            <div 
                class="link-button" 
                v-bind:class="{ 'active': this.$route.name === 'kitchen'}"
                id="kitchen-button">Kitchen</div>
        </router-link>
    </menu>
</template>

<script>
export default {
    name: 'view-switcher',
}

</script>

<style scoped>
a:link, a:visited {
    color: black;
}

menu {
    display: flex;
}

.link-button {
    display: inline-block;
    background-color: white;
    border: 0;
    margin: 0;
    padding: 0.5em;

    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
}

.link-button:not(.active):hover {
    background-color: rgb(230, 230, 230);
}

#index-button {
    border-radius: 2px 0 0 2px;
}

#kitchen-button {
    border-radius: 0 2px 2px 0;
}

.link-button.active {
    box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.8);
}

</style>