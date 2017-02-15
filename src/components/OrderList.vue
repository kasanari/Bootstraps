<template>
    <div>
        <p>Tap items to add orders</p>
        {{order}}
    </div>
</template>

<script>
export default {
    name: 'order-list',
    data() {
        return {
            order: null
        }
    },
    created() {
        this.clientAPI.addOrderChangedListener((newOrder) => {
            this.order = newOrder;
        })
    }
}
</script>