<template>
    <div>
        <div class="data-table mt-2">
            <div class="wrapper-table">     
                <table v-if="data.conteudo && data.conteudo.length > 0" class="table table-striped table-dark fluid">
                    <thead>
                        <tr>
                            <!-- <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th style="" scope="col">E-mail</th>
                            <th  scope="col">Options</th> -->

                            <th v-if="config.showCount">#</th>
                            <th  @click.stop="sort(v.name,'ascending')" v-for="(v,i) in config.columns" :key="i" :width="v.width">{{$t(`lang.${v.title}`)}}
                                <img v-if="nameSort == v.name && actionSort == 'descending'" @click.stop="sort(v.name,'ascending')" class="sort" src="../../assets/images/svg/ascending-sort.svg">
                                <img v-if="nameSort == v.name && actionSort == 'ascending'" @click.stop="sort(v.name,'descending')" class="sort" src="../../assets/images/svg/descending-sort.svg">
                            </th>
                            <th v-if="config.showOptions"  :width="config.widthOptions">{{config.titleOption}}</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        <tr v-for="(v,i) in data.conteudo" :key="i">
                            <td v-if="config.showCount">{{de + i}}</td>                           
                            <td v-for="(x,j) in config.columns" :key="j" :style="{'width': x.width}" v-html="getData(x,v)"></td>
                            <td v-if="config.showOptions">
                               <template v-if="config.showOptionsTYPE == 'FILE'">     
                                         
                                     <span v-if="v.repeatedLine > 0"><i @click="buttonClick('download',v)" style="cursor:pointer;" class="fas fa-download" title="Relatório de erros"></i></span>                                                           
                                     <span @click="buttonClick('info',v)" ><i style="margin-left:10px;" class=" btn-option fas fa-info-circle" title="Informação"></i></span>
                                </template>                                
                                <template v-else-if="config.showOptionsTYPE == 'FILE-DETAIL'">                                                                      
                                    
                                    <span v-if="v.qtdErrors == 0"><i class=" btn-option  fas  mr-3 fa-check-circle" style="color:green"></i></span>                                    
                                    <span v-else @click="$emit('showError',v.fieldName)"><i class=" btn-option  fas  mr-3 fa-exclamation-circle" style="color:red"></i></span>                                    
                                </template>
                                <template v-else-if="config.showOptionsTYPE == 'LIST-FILE-UPLOAD'">
                                    <i @click="buttonClick('download',v)" class="fas fa-download"></i>
                                </template> 
                                 <template v-else-if="config.showOptionsTYPE == 'DETALHES'">
                                    <center><span @click="buttonClick('view',v)"> <i  style="cursor:pointer;font-size:25px" class="far fa-calendar-alt"></i></span></center>
                                </template> 
                                
                                 <template v-else-if="config.showOptionsTYPE == 'APROVED'">
                                    <center><span @click="buttonClick('view',v)"> <i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span></center>
                                </template>     
                                 <template v-else-if="config.showOptionsTYPE == 'JOB'">
                                    <span class="mr-2" @click="buttonClick('play',v)"> <img src="img/play.svg"  style="cursor:pointer;font-size:25px" /></span>
                                    <span @click="buttonClick('stop',v)"> <img src="img/stop.svg"  style="cursor:pointer;font-size:25px"/></span>
                                </template>          
                               
                               
                               
                                <template v-else>
                                    <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                                    <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                                    <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                                </template>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else-if="data.conteudo && data.conteudo.length == 0" class="alert alert-warning" role="alert">
                  Nenhum registro encontrado!
                </div>
                <div v-else class="alert alert-warning" role="alert">
                  Carregando...
                </div>
            </div>
            <div v-if="config.showPagination && data.conteudo.length > 0" class="row">
                <div class="col" v-if="data.pagination">
                    <p class="no-margin entries">{{`${$t('lang.table_pagination_show_info')} ${ de } ${$t('lang.table_pagination_show_to')} ${ para } ${$t('lang.table_pagination_show_of')} ${ totais } ${$t('lang.table_pagination_show_registers')}`}}</p>
                </div>
                <div class="col text-right">
                    <nav>
                      <pagination ref="pagination" :info-page="data.pagination" @page="setPage"></pagination>
                    </nav>
                </div>
                <div class="col text-right" style="margin-right:50px" v-if="config.showRowPerPage">
                    <div class="row">
                      <div>
                        <p>{{$t('lang.table_pagination_row_page_title')}}</p>
                      </div>
                      <div>
                        <select class="select-filtro form-control ml-1" v-model="rowPerPage">
                          <option value="10" class="select-filtro">10</option>
                          <option value="20" class="select-filtro">20</option>
                          <option value="30" class="select-filtro">30</option>
                          <option value="40" class="select-filtro">40</option>
                        </select>
                      </div>                      
                    </div>
                </div>
            </div>              
        </div>
    </div>
</template>

<script>

import _ from 'lodash';
import Pagination from '../pagination/pagination.vue';
export default {
    props:['config','data'],
    data(){
        return {
            pageCurrent:undefined,
            pageInfo:undefined ,
            showQtdElements:[10,20,30,40,50],
            showQtdSelected:10,
            searchText:undefined,
            nameSort:undefined,
            actionSort:undefined,
            rowPerPage:10
        }
    },
    mounted(){},
    computed:{      

      de(){
        return this.data.pagination ? ((this.data.pagination.pageable.pageNumber + 1) * this.data.pagination.size) - (this.data.pagination.size) + 1 : 0;
      },
      para(){        
        return this.data.pagination ? (this.data.pagination.totalPages ==(this.data.pagination.pageable.pageNumber + 1)) ? this.data.pagination.totalElements :
        ((this.data.pagination.pageable.pageNumber + 1) * this.data.pagination.numberOfElements) : 0;
      },
      totais(){
        return this.data.pagination ? this.data.pagination.totalElements : 0;
      }
    },
    methods:{

        fileHasError(v){
          return v.statusProcess && v.statusProcess.some(s=>s.qtdErrors > 0);
        },
        sort(name,ordem){
          this.nameSort = name;
          this.actionSort = ordem;     

             this.data.conteudo.sort((a,b)=>{
               let attribute1 = `${a[name]}`;
               let attribute2 = `${b[name]}`;
               return ordem === 'ascending' ? attribute1.localeCompare(attribute2) : attribute2.localeCompare(attribute1); 
             });          

        },
        setPage(page){
          
            this.$emit('page',page)
        },
        setRowPerPage(){
          this.$emit('rowPerPage',this.rowPerPage);
        },
        buttonClick(action, data){
          this.$emit(action,data);
        },
        getData(config,data){
           return config.formatter ? config.formatter(data[config.name]) : data[config.name]
        },
       search:_.debounce(function(){
          let value = this.searchText;
          if(this.searchText.length == 0)
            value = 'empty';

          this.$emit('searching',value);

        },500),
        downloadCsv(){
          this.$emit('downloadCsv',this.data.pagination);
        }
    },
    watch:{
      showQtdSelected:{
        handler:function(newValue){
          this.$emit('changeQtd', newValue);
        }
      },
      rowPerPage:{
        handler:function(newValue){
          this.setRowPerPage();
        }
      },
      data:{
        handler:function(newValue){
          if(newValue){
            this.data = newValue;
          }
        }
      },
    },
    components:{
        Pagination
    }
}
</script>

<style lang="scss" scoped>

.select-filtro{
  padding:  0 5px 0 5px;
  margin: -7px 0 0 0 ;
  height: none;
  option{
    color: #444;
  }
  
}

.wrapper-table{
    overflow: auto;
}


::-webkit-scrollbar {
    width: 0px;
    height: 6px;
}
::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}



.data-table table{
      background-color: rgba(0, 0, 0, .4);
   
    color: #a9a9a9;
    margin: 15px auto;
    &.table-striped tbody tr:nth-of-type(odd) {
  
    }
  
    & tbody tr:hover,
    & tbody tr.active {
         color:#ffed69;
      -webkit-box-shadow:                     0 0 30px 0 rgba(0, 0, 0, 0.3);
      -moz-box-shadow:                        0 0 30px 0 rgba(0, 0, 0, 0.3);
      box-shadow:                             0 0 30px 0 rgba(0, 0, 0, 0.3);
      &:nth-of-type(even) {
      
      }
    }


}

.btn-option{
    background-color: rgba(0,0,0,0);
    &:hover{
      // font-size: 20px;
       cursor: pointer;
      color: #fff;
      -webkit-transition:                     0.2s;
      -moz-transition:                        0.2s;
      -ms-transition:                         0.2s;
      -o-transition:                          0.2s;
      transition:                             0.2s;
    }
}


@media(max-width: 700px){
  .table-resp thead{
    display: none;
  }

  .table-resp tr{
      display: block;
      border-bottom: 2px solid #dce0e0;
  }

  .table-resp tr td{
      width: 100%;
      display: block;
      text-align: right;
      border-bottom: 1px dotted #ccc;
  }

  .table-resp tr td:last-child {
    border-bottom: 0;
  }

  .table-resp tr td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      font-size: 12px;
  }
}
</style>
