<template>
  <nav v-if="infoPage && infoPage.totalDeItems > 0">
    <ul class="pagination">
      <li class="page-item" v-if="!isfirstPage"  @click="setPage(paginaSelecionada - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true"><i class="icon-drop-left-arrow"></i></span>
          <!-- <span class="sr-only">Previous</span> -->

        </a>
      </li>

      <!-- Redenrização das paginas -->
      <li v-for="(v,i) in paginas" :key="i" class="page-item"><a class="page-link" :class="{active: v == paginaSelecionada}" @click="setPage(v)">{{v}}</a></li>
      
      <li class="page-item" v-if="!isLastPage" @click="setPage(paginaSelecionada + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true"><i class="icon-drop-right-arrow"></i></span>
          <!-- <span class="sr-only">Next</span> -->

        </a>
      </li>
    </ul>
</nav>
</template>
<style lang="scss" scoped>
  .pagination {
    justify-content: center;
    .page-item {
      .page-link {
        background-color: transparent;
        font-size: 0.9em;
        color: #757575;
        padding: 2px 3px;
        &:focus,
        &:active,
        &:hover,
        &.active {
          color: #ff9800;
          box-shadow: none;
        }
      }
      &:first-child {
        .page-link {
          padding: 2px 3px 0;
        }
      }
      &:last-child {
        .page-link {
          padding: 2px 3px 0;
        }
      }
    }
  }
</style>
<script>
export default {
  props:['infoPage'],
  data(){
    return {
      paginas:[],
      paginaSelecionada:undefined
    }
  },
  computed:{
    isfirstPage(){
      return this.paginaSelecionada == 1
    },
    isLastPage(){
      let index = this.paginas.length - 1 ;
      return this.paginaSelecionada == this.paginas[index];
    }
  },
  mounted(){
    if(this.infoPage){
      this.mountSummary(this.infoPage);
    }
  },
  watch:{
    infoPage(newValue){ 

      
      if(!newValue)
      return;

      this.mountSummary(newValue);  

      
    }
  },
  methods:{
    setPage(number){
      this.$emit('page',number);
      this.paginaSelecionada = number;
    },
    mountSummary(newValue){   
      this.paginas = [];     
      for(let i = newValue.offSetPaginaStart; i <= newValue.offSetPaginaEnd; i++ ){
        this.paginas.push(i);
      }
      
      this.paginaSelecionada = newValue.paginaAtual;
    }
  }
}
</script>


