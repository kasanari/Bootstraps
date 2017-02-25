<template>
    <div>
        <div v-for="option in localOrderItem._options">
            <label :for="option._label">{{option._label}}</label><input :id="option._label" type="checkbox" v-model="option._value">
        </div>
        <input type="text" v-model="localOrderItem._note">
        <button @click="update">Apply</button>
    </div>
</template>

<style scoped>
</style>

<script>
import Option from '../../shared/models/option';

export default {
    name: 'customize-order-item',
    props: [
        'order-item'
    ],
    data() {
        let localOrderItem = new this.orderItem.constructor();
        Object.assign(localOrderItem, this.orderItem);

        const menuItem = localOrderItem.getMenuItem();
        if (menuItem.options) {
            localOrderItem._options = [];
            menuItem.options.forEach((option) => {
                const oldOption = this.orderItem._options ? this.orderItem._options.find((op) => option.label === op._label) : null;
                if (oldOption) {
                    localOrderItem._options.push(oldOption);
                } else {
                    localOrderItem._options.push(new Option(option.label, option.default))
                }
            });
        }
        return {
            localOrderItem
        }
    },
    methods: {
        update() {
            this.$emit('update', this.localOrderItem);
        }
    }
}
</script>
