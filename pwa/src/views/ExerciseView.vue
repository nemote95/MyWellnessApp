<script setup>
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { inject } from 'vue';
import { useUserStore } from '@/stores/user'
import { onMounted, reactive } from 'vue';
import * as yup from 'yup';
import { useRoute } from 'vue-router'

const route = useRoute()


const $pb = inject(pocketBaseSymbol);
$pb.autoCancellation(false);

const user = useUserStore()

const exercise = reactive({});

onMounted(async () => {

    Object.assign(exercise, await $pb.collection('exercises').getOne(route.params.id));
    

});


</script>
<template>


  <h1> {{exercise.name}} </h1>
        <div>Video link : {{exercise.video}}</div>

        <div>Note: {{exercise.note}}</div>
                
        
        <div> Target muscle : {{exercise.target_muscle}} </div>



</template>
