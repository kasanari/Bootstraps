<template>
    <div class="item-container">
        <div 
            class="item"
            v-bind:style="itemStyle"
            v-on:click="click"
            ref="itemContainer"
        >
            <p class="item-label">{{ item.label }} <span v-if="type === 'food'" @click="toggleCustomize">{cust}</span></p>
        </div>
        <pop-over v-if="type === 'food'" :visible="customizeVisible" @requestToggle="toggleCustomize" :width="300" :height="300" pos="up">
            <div class="custom-order">
                <customize-order-item :order-item="orderItem" @update="addOrderItem"/>
            </div>
        </pop-over>
    </div> 
</template>

<script>
import PopOver from './PopOver.vue';
import CustomizeOrderItem from './CustomizeOrderItem.vue';
import Food from '../../shared/models/food';
import Drink from '../../shared/models/drink';

export default {
    name: 'menu-item',
    props: [
        'item',
        'type'
    ],
    computed: {
        orderItem() {
            if (this.isFood) {
                return new Food(this.item._id, [], "");
            } else if (this.isDrink) {
                return new Drink(this.item._id);
            }
        },
        isFood() {
            return !!this.type && this.type === 'food';
        },
        isDrink() {
            return !!this.type && this.type === 'drink';
        }
    },
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
        addOrderItem(item) {
            if (this.isFood) {
                this.clientAPI.addFood(item);
            } else if (this.isDrink) {
                this.clientAPI.addDrink(item);
            }
            this.customizeVisible = false;
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
        PopOver,
        CustomizeOrderItem
    }
}
</script>

<style scoped>
.custom-order {
    width: 100%;
    height: 100%;
    padding: 1em;
}

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