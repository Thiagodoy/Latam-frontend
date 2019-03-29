<template>
    <div>
        <div :id="file.name + 'new'" v-if="file.status == 'NEW'" class="progress">            
            <div class="progress-bar" role="progressbar" style="width: 10%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>                                        
        </div>
        <div :id="file.name + 'processing'" v-if="file.status == 'PROCESSING'">
            <div class="spinner-grow text-primary" role="status"><span class="sr-only"></span></div>
        </div>
        <div :id="file.name + 'uploaded'" v-if="file.status == 'UPLOADED'">
            <div src="..." alt="..." class="rounded-circle" style="height:25px;width:25px; background-color:green;"/>
        </div>
        <div :id="file.name + 'error'" v-if="file.status == 'ERROR'">
            <div src="..." alt="..." class="rounded-circle" style="height:25px;width:25px; background-color:red;"/>
        </div>
    </div>
</template>
<script>
export default {
    props:['file']
}
</script>

