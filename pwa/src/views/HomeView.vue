<script setup>
import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
import { inject } from 'vue';
import { useUserStore } from '@/stores/user'
import { onMounted, reactive } from 'vue';
import * as yup from 'yup';

const $pb = inject(pocketBaseSymbol);
$pb.autoCancellation(false);

const user = useUserStore()
console.log(user)


const user_plans = reactive({});

onMounted(async () => {
  Object.assign(user_plans, await $pb.collection('plans').getFullList());
});


</script>
<template>


  <h1> Hi {{ user.username }} </h1>

  <ul v-for="plan in user_plans">
    <li><RouterLink v-bind:to="{ name: 'plan', params: { id: plan.id }}">{{ plan.name }} - {{ plan.note }} </RouterLink> </li>
  </ul>

</template>
