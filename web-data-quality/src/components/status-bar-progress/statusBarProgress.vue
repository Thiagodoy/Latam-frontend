<template>
  <div>
    <div class="box text-center">

      <template v-for="(v,i) in config" >

        <div class="box-status" :key="i">
          <span id="upload" class="status-label">{{v}}</span>
          <div class="status-circle" :class="{ 'etapaOK':(i+1) <= status,'etapaErro':(i+1) == status && hasError}"><i v-if="(i+1) <= status" :class="{'fas fa-check':(i+1) <= status,'fas fa-times':(i+1) == status && hasError}"></i><span v-else>{{(i+1)}}</span></div>
        </div>
        <div v-if="(i+1) < config.length" class="status-line" :class="{ 'lineOk':(i+2) <= status}" :key="i+100"></div>
      </template>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status","config","hasError"] 
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  height: 100px;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.box-status {
}
.wrapper-status {
  display: flex;

  background: #00f;
  height: 40px;
}
.status-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid #fff 2px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  min-width: 50px;
}
.status-line {
  width: 15%;
  background: #fff;
  height: 5px;
}

.etapaOK {
  background: #00b894;
  border: solid #00b894 2px;
}

.etapaErro {
  background: #f51313;
  border: solid #f30101 2px;
}

.lineOk {
  background: #00b894;
}

.status-label {
}

#validacao {
  position: absolute;
  margin: -25px 0 0 -31px;
}
#upload {
  position: absolute;
  margin: -25px 0 0 -25px;
}
#parse {
  position: absolute;
  margin: -25px 0 0 -18px;
}
#persistencia {
  position: absolute;
  margin: -25px 0 0 -40px;
}
#concluido {
  position: absolute;
  margin: -25px 0 0 -37px;
}
</style>
