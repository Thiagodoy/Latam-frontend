<template>
    <div>
        <div class="data-table mt-2">
            <div class="wrapper-table">     
                <table class="table table-striped table-dark fluid">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th style="" scope="col">E-mail</th>
                        <th  scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td style="min-width:120px;">
                            <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                            <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                            <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>
                            <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                            <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                            <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                        </td>
                        </tr>
                        <tr>
                        <th  scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <span @click="buttonClick('view',v)"> <i class= " btn-option far fa-sticky-note mr-3" alt="View"  title="View"></i></span>
                            <span @click="buttonClick('edit',v)"><i class=" btn-option  fas fa-pen mr-3" title="Edit"></i></span>
                            <span @click="buttonClick('delete',v)"><i class=" btn-option far fa-times-circle" title="Delete"></i></span>
                        </td>
                        </tr>   
                    </tbody>
                </table>
            </div>    













             
        </div>

    </div>
</template>

<script>


export default {

   methods:{
       buttonClick(action, data){
          this.$emit(action,data);
        },
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
