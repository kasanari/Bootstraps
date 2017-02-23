<template>
    <div class="item-container">
        <div 
            class="item"
            v-bind:style="itemStyle"
            v-on:click="click"
        >
            <p class="item-label">{{ item.label }} <span @click="toggleCustomize">{cust}</span></p>
        </div>
        <pop-over :visible="customizeVisible" @requestToggle="toggleCustomize">
            SPECIALBESTÄLLNINGAR HÄR!
        </pop-over>
    </div> 
</template>

<script>
import PopOver from './PopOver.vue';

export default {
    name: 'menu-item',
    props: [
        'item'
    ],
    data() {
        return {
            itemStyle: {
                backgroundImage: 'url(' + this.item.img + ')'
            },
            customizeVisible: false
        }
    },
    methods: {
        click() {
            this.$emit('itemClick', this.item);
        },
        toggleCustomize(event) {
            this.customizeVisible = !this.customizeVisible;
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    },
    components: {
        PopOver
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