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

const day = reactive({});
const day_prescriptions = reactive({});

onMounted(async () => {

    Object.assign(day, await $pb.collection('days').getOne(route.params.id));
    
    Object.assign(day_prescriptions, await $pb.collection('prescriptions').getFullList({
        filter: `day_id.id = '${route.params.id}'`,
        expand : 'exercise_id,load_id'

        })
    );

});


</script>
<template>


  <h1> This is {{day.name}} day! </h1>
    <ul v-for="pres in day_prescriptions">
        <li>
            <span>
                <RouterLink v-bind:to="{ name: 'exercise', params: { id: pres.exercise_id }}">
                    {{ pres.expand.exercise_id.name }} - 

                </RouterLink>
            </span>
            <span>{{ pres.expand.load_id.map(load => load.rep).join('-') }} </span>
        </li>
    </ul>

 

</template>
