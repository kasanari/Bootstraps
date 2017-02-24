<template>
    <div>
        <div class="item" @click="toggleCustomize" ref="item">
            <p class="item-name">{{orderItem.getLabel()}}, {{orderItem.getPrice()}}kr</p>
            <p class="item-note" v-if="orderItem.getNote && orderItem.getNote() !== ''">
                {{orderItem.getNote()}}
            </p>
        </div>
        <pop-over :visible="customizeVisible" @requestToggle="toggleCustomize" pos="left" :width="300" :height="300">
            customize this order osv
        </pop-over>
        
    </div>
</template>

<style scoped>
.item-name {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
}

.item:hover {
    background-color: rgba(200, 200, 200, 1);
    cursor: pointer;
}

</style>

<script>
import PopOver from './PopOver.vue';

export default {
    name: 'order-list-item',
    props: [
        'orderItem'
    ],
    data() {
        return {
            customizeVisible: false
        }
    },
    methods: {
        toggleCustomize() {
            this.customizeVisible = !this.customizeVisible;
        }
    },
    components: {
        PopOver
    }
}
</script>