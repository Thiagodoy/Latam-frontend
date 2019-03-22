<template>
    <div class="lang text-center">
        <img @click="changeLocation('pt_BR')" :class="{'location-selected':location == 'pt_BR'}" class="mr-2" style="width:22px; cursor:pointer" src="../../assets/images/brazil.png"/>
        <img @click="changeLocation('en')" :class="{'location-selected':location == 'en'}" class="mr-2" style="width:22px;cursor:pointer" src="../../assets/images/united-states.png"/>
        <img @click="changeLocation('esp')" :class="{'location-selected':location == 'esp'}" class="mr-1" style="width:22px;cursor:pointer" src="../../assets/images/spain.png"/>               
    </div>
</template>
<script>
import {i18n} from '../../main';

export default {
    data(){
        return {
            location:''
        }
    },
    mounted(){
        this.location = i18n.locale;
        this.$validator.localize(this.location);
    },
    methods:{
        changeLocation(key){
            i18n.locale = key;
            this.location = key;

            //set location for validations
            this.$validator.localize(key);
        }
    }
}
</script>
<style lang="scss" scoped>
.location-selected{
    border: 2px solid #ffed69;border-radius: 50%;
}
</style>

