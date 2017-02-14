<template>
    
    <div> <h1>SIDEBAR</h1> <table-picker></table-picker> </div>
    
    
</template>

<script>
    import TablePicker from '../components/TablePicker.vue'
  
    export default {
        name: 'sidebar',
        data: function () {
            return {
                
            }
        },
      
        props: [
            
        ],
        methods: {
            
        },
        components: {            
          TablePicker  
            
        }
    }
</script>

<style scoped>
    div {
        display: inline-block;
        margin-left: 20px;
        background-color: rgba(236, 240, 241,1.0);
        width: 30%;
        height: 900px;
        padding: 20px;
    }
</style>
