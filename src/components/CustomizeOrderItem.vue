<template>
    <div class="customize-order-item">
        <template v-for="option in localOrderItem._options">
            <check-box class="quick-option" v-model="option._value">{{ option._label }}</check-box>
        </template>
        <input type="text" v-model="localOrderItem._note" placeholder="Note">
        <div class="qty-container">
            <label for="qty">Quantity</label><input type="number" id="qty" v-model="localOrderItem._qty">
        </div>
        <button @click="update">Apply</button>
    </div>
</template>

<style scoped>
.customize-order-item {
    font-size: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.7em;
    height: calc(100% - 1.4em); /* -2em for padding */
    width: calc(100% - 1.4em);
}

.customize-order-item > * {
}

button {
    font-size: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border: 0;
    align-self: stretch;
}

input {
    font-size: 0.8em;
    border: 0;
    padding: 0.3em;
}

input[type="text"] {
    width: calc(100% - 0.6em); /*-0.6em because of padding*/
}

.qty-container {
    display: flex;
}

label[for="qty"] {
    margin-right: 0.3em;
}

#qty {
    width: 100%;
}
</style>

<script>
import Option from '../../shared/models/option';
import CheckBox from './CheckBox.vue';

export default {
    name: 'customize-order-item',
    props: [
        'order-item'
    ],
    components: {
        CheckBox
    },
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
