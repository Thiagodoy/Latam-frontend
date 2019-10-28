<template>
  <div>
    <div class="topo text-center">
      <h6></h6>
      <i class="far fa-check-square"></i>&nbsp;&nbsp;Entrega IM
    </div>

    <table class="table table-striped table-dark fluid">
      <thead>
        <tr>
          <td>Agência</td>
          <td>Período</td>
          <td>Entrega IM</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entrega,i) in entregas" :key="i">
          <td>{{entrega.agencia}}</td>
          <td width="150">{{entrega.periodo}}</td>
          <td class="text-center" width="120">
            <input :checked="entrega.entrega" name="i" type="checkbox" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entregas: [
        {codigo:545454, agencia: "Agência 1", periodo: "01/2020", entrega: true },
        {codigo:545454, agencia: "Agência 2", periodo: "02/2020", entrega: false },
        {codigo:545454, agencia: "Agência 3", periodo: "03/2020", entrega: true },
        {codigo:545454, agencia: "Agência 4", periodo: "04/2020", entrega: true },
        {codigo:545454, agencia: "Agência 5", periodo: "05/2020", entrega: true },
        {codigo:545454, agencia: "Agência 6", periodo: "06/2020", entrega: true },
        {codigo:545454, agencia: "Agência 7", periodo: "07/2020", entrega: false },
        {codigo:545454, agencia: "Agência 8", periodo: "08/2020", entrega: true }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
input[type="checkbox"] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 10px;
  background: #ffed69;
}

.icon-pass-view {
  position: relative;
  top: -30px;
  left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0px;
  color: #ddd;

  padding: 40px;
}

.topo {
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0px;
  color: #ddd;
  padding: 15px;
  margin-bottom: 20px;
}

table {
  background-color: rgba(0, 0, 0, 0.4);

  color: #a9a9a9;
  margin: 15px auto;
  &.table-striped tbody tr:nth-of-type(odd) {
  }

  & tbody tr:hover,
  & tbody tr.active {
    color: #ffed69;
    -webkit-box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
    &:nth-of-type(even) {
    }
  }
}
</style>

