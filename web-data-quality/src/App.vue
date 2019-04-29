<template>
  <div id="app">
    <router-view/>
    <a id="mobi"></a>
    <message-dialog></message-dialog>
  </div>
</template>

<script>

 
import {dictionary} from './validators';
import MessageDialog from './components/modal/message-dialog.vue'
export default {
  name: 'app',
  created(){
    this.$validator.localize('pt_BR', {
      messages: dictionary.brasil.messages,      
    });
  },
  mounted(){
    //  window.addEventListener('beforeunload', ()=>{
    //      sessionStorage.removeItem('user');
    //  });
  },
  components: {
    MessageDialog
  }
}
</script>

<style>

</style>
