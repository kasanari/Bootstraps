<template>
    <div 
        class="item-container"
        v-bind:style="itemContainerStyle">
        <p>{{ item.label }}</p>
    </div>
</template>

<script>
export default {
    name: 'menu-item',
    props: [
        'item'
    ],
    data() {
        return {
            itemContainerStyle: {
                backgroundImage: 'url(' + this.item.img + ')'
            }
        }
    }
}
</script>

<style scoped>
.item-container {
    width: 200px;
    background-position: center;
    background-size: cover;
}
</style>