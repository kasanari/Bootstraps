<!-- #27ae60 -->

<template>
    
 <button 
           v-on:click = "flip" > <p>{{ label }}</p> </button>
    
</template>

<script>
    export default {
        name: 'pay-button',
        data: function () {
            return {
                isActive: false,
            }
        },
      
        props: [
            'label'
        ],
        methods: {
            flip: function () {
                this.isActive = !this.isActive;
                this.$emit('switch', this.label);
            }
        }
    }
</script>

<style scoped>

    button {
        margin: 10px 10px;
        border: solid 1px;
        border-radius: 2px;
        text-decoration: none;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        font-size: 200%;
        flex-grow: 1;
       
    }

    button:active {
        text-decoration: none;
    }

   
    
   
    
</style>

