<template>
    <div class="pop-over" ref="container">
        <transition-group name="fade">
            <div key="overlay" v-if="visible" class="overlay" @click="requestToggle" />
            <div key="content" v-if="visible" class="content-container" :style="contentContainerStyle">
                <div :class="arrowClass" class="arrow" />
                <div class="content" ref="content" :style="contentStyle">
                    <slot ref="slot"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>

.arrow {

}

.arrow-left {
  display: inline;

  width: 0; 
  height: 0; 
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent; 
  
  border-right: 5px solid rgba(0, 0, 0, 0.7); 
}

.arrow-up {
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  
  border-bottom: 5px solid rgba(0, 0, 0, 0.7);

  margin: auto;
}

.overlay {
    background-color: black;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
}

.content-container {
    position: absolute;
    border-radius: 1em;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    background-color: rgba(0, 0, 0, 0.7);
    /*padding: 1em;*/
    color: white;
    height: 100%;
    width: 100%;

    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>

<script>
export default {
    name: 'pop-over',
    props: [
        'visible',
        'width',
        'height',
        'pos'
    ],
    data() {
        return {
            contentContainerStyle: {
                left: 0,
                top: 0,
                width: this.width + 'px',
                height: this.height + 'px'
            },
            contentStyle: {
                transform: 'translateX(0) translateY(0)'
            }
        }
    },
    computed: {
        arrowClass() {
            switch (this.pos) {
                case 'left':
                    return 'arrow-left';
                case 'up':
                    return 'arrow-up';
                default:
                    return 'arrow-up';
            }
        },
        flexDirection() {
            switch (this.pos) {
                case 'left':
                    return 'row';
                case 'up':
                    return 'column';
                default:
                    return 'column';
            }
        }
    },
    watch: {
        visible() {
            this.updateContentStyle();            
        }
    },
    created() {
        window.addEventListener("resize", this.updateContentStyle);
    },
    methods: {
        requestToggle() {
            this.$emit('requestToggle');
        },
        updateContentStyle() {
            if (!this.visible) return;

            const parent = this.$refs.container.parentElement;
            const parentRect = parent.getBoundingClientRect();
            let desiredLeft;
            let desiredTop;
            if (this.pos == 'up') {
                desiredLeft = (parentRect.left + parentRect.width / 2 - this.width / 2);

                desiredTop = parentRect.bottom;
            } else {
                desiredLeft = parentRect.right;

                desiredTop = (parentRect.top + parentRect.height / 2 - this.height / 2);
            }
            let translateX = 0;
            let translateY = 0;
            if (desiredLeft < 0) {
                translateX = Math.max(desiredLeft, 8) - desiredLeft;
            } else if (desiredLeft > window.innerWidth - this.width - 8) {
                translateX = Math.min(desiredLeft, window.innerWidth - this.width - 8) - desiredLeft;
            }
            if (desiredTop < 0) {
                translateY = Math.max(desiredTop, 8) - desiredTop;
            } else if (desiredTop > window.innerHeight - this.height - 8) {
                translateY = Math.min(desiredTop, window.innerHeight - this.height - 8) - desiredTop;
            }

            this.contentContainerStyle['left'] = (desiredLeft) + 'px'
            this.contentContainerStyle['top'] = (desiredTop) + 'px'
            this.contentContainerStyle['flex-direction'] = this.flexDirection;
            this.contentStyle['transform'] = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
    }
}
</script>