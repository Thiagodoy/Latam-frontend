<template>
  <div id="app">
    <router-view/>
    <a id="mobi"></a>
  </div>
</template>

<script>

 
import {dictionary} from './validators';
export default {
  name: 'app',
  created(){
    this.$validator.localize('pt_BR', {
      messages: dictionary.brasil.messages,      
    });
  },
  components: {}
}
</script>

<style>

</style>
