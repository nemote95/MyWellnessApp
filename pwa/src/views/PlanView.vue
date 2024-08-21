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
console.log(user)

const plan = reactive({});
const plan_days = reactive({});

onMounted(async () => {

    Object.assign(plan, await $pb.collection('plans').getOne(route.params.id));
    
    Object.assign(plan_days, await $pb.collection('days').getList( 1,50, {
        filter: `plan_id.id = '${route.params.id}'`,
        })
    );

});


</script>
<template>


  <h1> This is plan {{plan.name}} </h1>

    <ul v-for="day in plan_days.items">
        <li>{{ day.name }} - {{ day.note }}  </li>
    </ul>

 

</template>
