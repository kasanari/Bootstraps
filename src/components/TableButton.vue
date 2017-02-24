<!-- #27ae60 -->

<template>
    
    <button  v-bind:class= "{active: this.isActive}"> {{ table }} </button>
    
    
</template>

<script>
    export default {
        name: 'table-button',
        data: function () {
            return {
               
            }
        },
      
        props: [
            'table',
             'isActive'
        ],
        methods: {
            
        },
        }
    
</script>

<style scoped>
   button {
    margin: 10px 10px;
    width: 2em;
    height: 2em;
  
    //padding: 1em;
    border: solid 1px;
    border-radius: 2px;
    
    text-decoration: none;

    font-size: 200%;
}

.active {

    background-color: rgba(39, 174, 96,1.0);
    color: rgba(255, 255, 255, 0.8);
   
 
}
</style>
