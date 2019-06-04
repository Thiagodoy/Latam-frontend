<template>
  <div>
    <div class="box text-center">
      <div class="box-status">
        <span id="upload" class="status-label">Upload</span>
        <div class="status-circle um" :class="{ 'etapaOK':etapaUm}"><i v-if="etapaUm" class="fas fa-check"></i><span v-if="!etapaUm">1</span></div>
      </div>

      <div class="status-line" :class="{ 'lineOk':lineUm}"></div>

      <div class="box-status">
        <span id="parse" class="status-label text-center">Parse</span>
        <div class="status-circle" :class="{ 'etapaOK':etapaDois}"><i v-if="etapaDois" class="fas fa-check"></i><span v-if="!etapaDois">2</span></div>
      </div>

      <div class="status-line" :class="{ 'lineOk':lineDois}"></div>

      <div class="box-status">
        <span id="validacao" class="status-label">Validação</span>
        <div class="status-circle" :class="{ 'etapaErro':etapaTres}"><i v-if="etapaTres" class="fas fa-check"></i><span v-if="!etapaTres">3</span></div>
      </div>

      <div class="status-line" :class="{ 'lineOk':lineTres}"></div>

      <div class="box-status">
        <span id="persistencia" class="status-label">Persistência</span>
        <div class="status-circle" :class="{ 'etapaOK':etapaQuatro}"><i v-if="etapaQuatro" class="fas fa-check"></i><span v-if="!etapaQuatro">4</span></div>
      </div>

      <div class="status-line" :class="{ 'lineOk':lineQuatro}"></div>

      <div class="box-status">
        <span id="concluido">Concluido</span>
        <div class="status-circle" :class="{ 'etapaOK':etapaCinco}"><i v-if="etapaCinco" class="fas fa-check"></i><span v-if="!etapaCinco">5</span></div>
      </div>

      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status"],

  data() {
    return {
      

      etapaUm: false,
      etapaDois: false,
      etapaTres: false,
      etapaQuatro: false,
      etapaCinco: false,

      lineUm: false,
      lineDois: false,
      lineTres: false,
      line: false
    };
  },

  created() {
    this.getStatus();
  },
  methods: {
    getStatus() {
      switch (this.status) {
        case 1:
          {
            this.etapaUm = true;
            this.etapaDois = false;
            this.etapaTres = false;
            this.etapaQuatro = false;
            this.etapaCinco = false;
            this.lineUm = false;
            this.lineDois = false;
            this.lineTres = false;
            this.lineQuatro = false;
          }
          break;

        case 2:
          {
           this.etapaUm = true;
            this.etapaDois = true;
            this.etapaTres = false;
            this.etapaQuatro = false;
            this.etapaCinco = false;
            this.lineUm = true;
            this.lineDois = false;
            this.lineTres = false;
            this.lineQuatro = false;
          }
          break;

        case 3:
          {
            this.etapaUm = true;
            this.etapaDois = true;
            this.etapaTres = true;
            this.etapaQuatro = false;
            this.etapaCinco = false;
            this.lineUm = true;
            this.lineDois = true;
            this.lineTres = false;
            this.lineQuatro = false;
          }
          break;

        case 4:
          {
            this.etapaUm = true;
            this.etapaDois = true;
            this.etapaTres = true;
            this.etapaQuatro = true;
            this.etapaCinco = false;
            this.lineUm = true;
            this.lineDois = true;
            this.lineTres = true;
            this.lineQuatro = false;
          }
          break;

        case 5:
          {
            this.etapaUm = true;
            this.etapaDois = true;
            this.etapaTres = true;
            this.etapaQuatro = true;
            this.etapaCinco = true;
            this.lineUm = true;
            this.lineDois = true;
            this.lineTres = true;
            this.lineQuatro = true;
          }
          break;
        default:
          break;
      }
    }
  },

  watch: {
    status: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getStatus();
      }
      
    }
  }
};
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
