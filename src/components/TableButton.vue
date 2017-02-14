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
    margin: 5px 5px;
    width: 3em;
    height: 3em;
    background-color: rgb(220, 80, 80);
    padding: 1em;
    border: none;
    border-radius: 2px;
    color: rgba(255, 255, 255, 0.8);
    -webkit-box-shadow: 0px 10px 0px 0px rgba(0,0,0,0.24);
    -moz-box-shadow: 0px 10px 0px 0px rgba(0,0,0,0.24);
    box-shadow: 0px 10px 0px 0px rgba(220,80,80,0.80);
    text-decoration: none;
}

button:active {
    text-decoration: none;
    border:none;
}

.active {
    -webkit-box-shadow: inset 0px 10px 0px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: inset 0px 10px 0px 0px rgba(0,0,0,0.2);
    box-shadow: inset 0px 10px 0px 0px rgba(0,0,0,0.2); 
    transform: translateY(10px);
}
</style>
