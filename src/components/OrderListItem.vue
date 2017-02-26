<template>
    <div>
        <div class="item" @click="toggleCustomize" ref="item">
            <div class="header">
                <p class="item-name">{{ orderItem.getQty() }}x {{orderItem.getLabel()}}, {{orderItem.getPrice()}}kr</p>
                <i @click="remove" class="remove-icon material-icons">remove_circle</i>
            </div>
            <div class="subheader">
                <p class="item-note" v-if="customizeLabel.length > 0">
                    {{customizeLabel}}
                </p>
            </div>
        </div>
        <pop-over :visible="customizeVisible" @requestToggle="toggleCustomize" pos="left" :width="300" :height="300">
            <CustomizeOrderItem :order-item="orderItem" @update="updateOrder" />
        </pop-over>
        
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
}

.remove-icon {
    color: rgb(220, 50, 50);
    margin-right: 0.1em;
}

.item-name {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    flex-grow: 1;
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
        },
        remove(event) {
            if (event) {
                event.stopPropagation();
            }
            this.$emit('remove', this.orderItem);
        }
    },
    components: {
        PopOver,
        CustomizeOrderItem
    }
}
</script>