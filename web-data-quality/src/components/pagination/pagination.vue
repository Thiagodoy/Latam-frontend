<template>
  <nav v-if="infoPage && infoPage.totalElements > 0">
    <ul class="pagination">
      <li class="page-item" v-if="!isfirstPage"  @click="setPage(pageSelected - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
          <!-- <span class="sr-only">Previous</span> -->

        </a>
      </li>

      <!-- Render the pages -->
      <li  v-for="(v,i) in pages" :key="i" class="page-item">
          <a class="page-link" v-if="v.show" :class="{active: v.page == pageSelected}" @click="setPage(v.page)">{{v.label}}</a>
      </li>
      
      <li class="page-item" v-if="!isLastPage" @click="setPage(pageSelected + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
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
        background-color: #454d55;
        opacity: .4;
        font-size: 0.9em;
        color: white;
        padding: 2px 3px;
        &:focus,
        &:active,
        &:hover,
        &.active {
          color: #ffed69;
          box-shadow: none;
          font-weight: 600;
        }
        border-style: hidden
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
      pages:[],
      pageSelected:undefined
    }
  },
  computed:{
    isfirstPage(){
      return this.pageSelected == 0
    },
    isLastPage(){


      let index = this.pages.length - 1 ;
      return this.pages.length == 0 || this.pageSelected == this.pages[index].page;
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
      this.pageSelected = number;
    },
    mountSummary(newValue){   
      this.pages = [];     
    
      for(let i = 0; i < newValue.totalPages; i++ ){
        this.pages.push({label:(i + 1),page: i, show:false});
      }
      
      this.pageSelected = newValue.pageable.pageNumber;
       
      let count  = 0; 
      for(let v = this.pageSelected; v >= 0; v-- ){
        this.pages[v].show = true;
        if(count == 6){
          break;
        }
        ++count;
      }

      count  = 0; 
      for(let v = this.pageSelected + 1; v <  this.pages.length ; v++ ){
        this.pages[v].show = true;
        if(count == 6){
          break;
        }
        ++count;
      }


    }
  }
}
</script>


