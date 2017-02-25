<template>
    <div>
        <div v-for="option in localOrderItem._options">
            <label :for="option._label">{{option._label}}</label><input :id="option._label" type="checkbox" v-model="option._value">
        </div>
        <input type="text" v-model="localOrderItem._note"><br>
        <label for="qty">Quantity</label><input type="number" id="qty" v-model="localOrderItem._qty">
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
            const menuItem = this.localOrderItem.getMenuItem();
            this.localOrderItem._options = this.localOrderItem._options.filter((option) => {
                const originalOption = menuItem.options.find((op) => option._label.localeCompare(op.label) === 0);
                return option._value !== originalOption.default;
            });

            this.$emit('update', this.localOrderItem);
        }
    }
}
</script>
