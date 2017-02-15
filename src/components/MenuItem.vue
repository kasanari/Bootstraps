<template>
    <div class="item-container">
        <div 
            class="item"
            v-bind:style="itemStyle"
        >
            <p class="item-label">{{ item.label }}</p>
        </div>
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
            itemStyle: {
                backgroundImage: 'url(' + this.item.img + ')'
            }
        }
    }
}
</script>

<style scoped>
.item-container {
    padding: 5px;
}

.item {
    width: 200px;
    height: 100%;
    background-position: center;
    background-size: cover;

    position: relative;

    cursor: pointer;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.8);
}

.item:hover {
    filter: brightness(1.3);
}

.item-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.2em;
    font-size: 1.2rem;
}
</style>