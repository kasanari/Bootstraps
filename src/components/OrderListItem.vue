<template>
    <div>
        <div class="item" @click="toggleCustomize" ref="item">
            <p class="item-name">{{orderItem.getLabel()}}, {{orderItem.getPrice()}}kr</p>
            <p class="item-note" v-if="customizeLabel.length > 0">
                {{customizeLabel}}
            </p>
        </div>
        <pop-over :visible="customizeVisible" @requestToggle="toggleCustomize" pos="left" :width="300" :height="300">
            <CustomizeOrderItem :order-item="orderItem" @update="updateOrder" />
        </pop-over>
        
    </div>
</template>

<style scoped>
.item-name {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
}

.item-note {
    font-size: 0.8em;
    color: rgba(150, 150, 150, 0.7);
}

.item:hover {
    background-color: rgba(200, 200, 200, 1);
    cursor: pointer;
}

</style>

<script>
import PopOver from './PopOver.vue';
import CustomizeOrderItem from './CustomizeOrderItem.vue';

export default {
    name: 'order-list-item',
    props: [
        'orderItem'
    ],
    computed: {
        customizeLabel() {
            let options = (this.orderItem._options || []).filter((oi) => oi._value).map((oi) => oi._label);
            if (this.orderItem._note) {
                options.push(this.orderItem._note);
            }
            return options.join(', ');
        }
    },
    data() {
        return {
            customizeVisible: false
        }
    },
    methods: {
        toggleCustomize() {
            this.customizeVisible = !this.customizeVisible;
        },
        updateOrder(item) {
            this.$emit('update', this.orderItem, item);
            this.toggleCustomize();
        }
    },
    components: {
        PopOver,
        CustomizeOrderItem
    }
}
</script>