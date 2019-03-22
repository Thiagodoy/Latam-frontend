<template>
    <div>
        <div class="data-table mt-2">
            <div class="wrapper-table">     
                <table class="table table-striped table-dark fluid">
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
                            <th v-if="config.showOptions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr>  $t('lang.exit')
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td style="min-width:120px;">
                                <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                                <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                                <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                            </td>
                        </tr> -->
                        <tr v-for="(v,i) in data.conteudo" :key="i">
                            <td v-if="config.showCount">{{de + i}}</td>                           
                            <td v-for="(x,j) in config.columns" :key="j" :style="{'width': x.width}" v-html="getData(x,v)"></td>
                            <td v-if="config.showOptions">
                                <template >
                                    <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                                    <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                                    <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="config.showPagination" class="row">
                <div class="col">
                    <p class="no-margin entries">{{`${$t('lang.table_pagination_show_info')} ${ de } ${$t('lang.table_pagination_show_to')} ${ para } ${$t('lang.table_pagination_show_of')} ${ totais } ${$t('lang.table_pagination_show_registers')}`}}</p>
                </div>
                <div class="col text-right">
                    <nav>
                    <pagination :info-page="data.pagination" v-on:page="setPage"></pagination>
                    </nav>
                </div>
                <div class="col text-right" style="margin-right:50px" v-if="config.showRowPerPage">
                <ul>
                    <li class="inline" style="color:#b4b4b4">
                        <p>{{$t('lang.table_pagination_row_page_title')}}</p>
                    </li>
                    <li class="inline">
                        <select class="select-filtro" v-model="rowPerPage">
                        <option value="10" class="select-filtro">10</option>
                        <option value="20" class="select-filtro">20</option>
                        <option value="30" class="select-filtro">30</option>
                        <option value="40" class="select-filtro">40</option>
                        </select>
                    </li>
                </ul>
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
    computed:{
      de(){
        return this.data.pagination ? (this.data.pagination.paginaAtual * this.data.pagination.nroElementoPorPagina) - (this.data.pagination.nroElementoPorPagina) + 1 : 1;
      },
      para(){        
        return this.data.pagination ? (this.data.pagination.totalDePaginas == this.data.pagination.paginaAtual) ? this.data.pagination.totalDeItems :
        (this.data.pagination.paginaAtual * this.data.pagination.nroElementoPorPagina) : 0;
      },
      totais(){
        return this.data.pagination ? this.data.pagination.totalDeItems : 0;
      }
    },
    methods:{

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
       font-size: 20px;
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
