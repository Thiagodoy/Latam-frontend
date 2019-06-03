<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <status-bar :status="3"></status-bar>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-6 scroll">
        <!--table mock -->
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Field Name</th>
              <th scope="col">Qtd errors</th>
              <th scope="col">Qtd lines</th>
              <th scope="col">Percent erros</th>
              <th scope="col">Percent hit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Campo</td>
              <td>10</td>
              <td>10</td>
              <td>100%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Campo</td>
              <td>10</td>
              <td>10</td>
              <td>100%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Campo</td>
              <td>10</td>
              <td>10</td>
              <td>100%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Campo</td>
              <td>10</td>
              <td>10</td>
              <td>100%</td>
              <td>0%</td>
            </tr>
          </tbody>
        </table>

        <!-- grafico mock -->
      </div>
      <div class="col-md-6">
        Grafico pizza
        <graph-pizza/>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 scroll">
        <!--table mock -->
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Primeiro</th>
              <th scope="col">Último</th>
              <th scope="col">Nickname</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- grafico mock -->
      <div class="col-md-6">
        grafico barras
        <graph-bar/>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "../../components/status-bar-progress/statusBarProgress";
import GraphPizza from "../../components/graphics/graph-pizza";
import GraphBar from "../../components/graphics/graph-bar";
export default {
  components: {
    StatusBar,
    GraphPizza,
    GraphBar
  }
};
</script>

<style>
</style>
