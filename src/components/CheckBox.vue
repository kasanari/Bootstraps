<template>
    <div class="checkbox-container" @click="onInput(!value)">
        <span class="label"><slot /></span>
        <span class="checkbox">
            <transition name="fade">
                <i v-if="value" class="checkbox-icon material-icons" key="checked">check_box</i>
                <i v-else class="checkbox-icon material-icons" key="unchecked">check_box_outline_blank</i>
            </transition>
        </span>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}
.checkbox {
    position: relative;
    height: 1em;
    width: 1em;
}

.checkbox-icon {
    position: absolute;
    opacity: 1;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.checkbox-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.label {
    margin-right: 0.5em;
}
</style>

<script>
export default {
    name: 'check-box',
    props: ['value'],
    methods: {
        onInput(input) {
            this.$emit('input', input);
        }
    }
}
</script>