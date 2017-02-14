<!-- #27ae60 -->

<template>
    
    <button 
        v-on:click = "flip" v-bind:class="{active: isActive }"> {{ table }} </button>
    
    
</template>

<script>
    export default {
        name: 'table-button',
        data: function () {
            return {
                isActive: false
            }
        },
      
        props: [
            'table'
        ],
        methods: {
            flip: function () {
                this.isActive = !this.isActive;
            }
        }
    }
</script>

<style scoped>
button {
    margin: 10px 10px;
    width: 5em;
    height: 5em;
  
    padding: 1em;
    border: solid 1px;
    border-radius: 2px;
    
    text-decoration: none;
}

button:active {
    text-decoration: none;
    border:none;
}

.active {

    background-color: rgba(39, 174, 96,1.0);
    color: rgba(255, 255, 255, 0.8);
   
 
}
</style>
