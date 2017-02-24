<template>
    <div class="pop-over" ref="container">
        <div v-if="visible" class="overlay" @click="requestToggle" />
        <div v-if="visible" class="content-container" :style="contentContainerStyle">
            <div :class="arrowClass" class="arrow" />
            <div class="content" ref="content">
                <slot ref="slot"></slot>
            </div>
        </div>
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
            let desiredLeft;
            let desiredTop;
            if (this.pos == 'up') {
                desiredLeft = (parent.offsetLeft + parent.offsetWidth / 2 - this.width / 2);

                desiredTop = (parent.offsetTop + parent.offsetHeight);
            } else {
                desiredLeft = parent.offsetLeft + parent.offsetWidth;

                desiredTop = (parent.offsetTop + parent.offsetHeight / 2 - this.height / 2);
            }
            // Make sure it doesn't go outside screen to right
            desiredLeft = Math.min(desiredLeft, window.innerWidth - this.width - 8); //-8 to give some space
            // To the left
            desiredLeft = Math.max(desiredLeft, 8); //8 to give some space
            // To the bottom
            desiredTop = Math.min(desiredTop, window.innerHeight - this.height - 8); // -8 for margin



            this.contentContainerStyle['left'] = (desiredLeft) + 'px'
            this.contentContainerStyle['top'] = (desiredTop) + 'px'
            this.contentContainerStyle['flex-direction'] = this.flexDirection;
        }
    }
}
</script>