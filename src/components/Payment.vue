<!-- #27ae60 -->

<template>
    <div>
    <div class="main">
        <pay-button v-on:switch="setType" v-bind:class="{active: isCash }" class="cash" v-bind:label = '"Cash"'></pay-button>
        <pay-button v-on:switch="setType" v-bind:class="{active: !isCash }" class="card" v-bind:label = '"Card"'></pay-button>
        
    </div>
    </div>
   
</template>

<script>
    import PayButton from '../components/PayButton.vue';
    export default {
        name: 'payment',
        data: function () {
            return {
            }
        },
      
        props: [
            'isCash',
            'isCard'
        ],
        methods: {
            setType: function(type) {
                this.$emit("switch", type);
            }
        },
         components: {            
          PayButton
        }
    }
</script>

<style scoped>

    .main {
        height: 80px;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
    }

    .main > *:not(:last-child) {
        margin-right: 0.3em;
    }
    
    .active {
        color: ghostwhite; 
        background-color: #2980b9;


    }
    
    p {
        padding: 10px;
        display: block;
        width: 50%;
        border: solid 1px;
        margin: auto;
        text-align: center;
    }
/*
    .card {
            background-image: url(https://upload.wikimedia.org/wikipedia/commons/a/a7/Emoji_u1f4b3.svg);
    }
    
    .cash {
            background-image: url(https://upload.wikimedia.org/wikipedia/commons/a/af/Emojione_1F4B6.svg);
    }
  */  
</style>

