<script setup>
    import { pocketBaseSymbol } from '@/symbols/injectionSymbols';
    import { inject} from 'vue';
    import { useRouter } from 'vue-router';
    
    import * as yup from 'yup';

    import { Form, Field } from 'vee-validate';

    import { useUserStore } from '@/stores/user'

    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required().min(4),
    });

    const $pb = inject(pocketBaseSymbol);
    const router = useRouter();

    function isInvalid() {
        return "invalid";
    }

    function onSubmit(values, {setErrors}) {
        const user = useUserStore()
        const { username, password } = values;

        const userData = then(
            (userData) => {
                console.log(userData);
                user.userID = userData.record.id;
                user.username = userData.record.username;
                router.push(user.returnUrl || '/');
            }
        ).catch(error => setErrors({ apiError: error }));
    }
</script>
<template>
    <main>
        <h1>Login</h1>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div>
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
            </div>   

            <div>
                <div>
                    <label class="text-muted" for="password">Password</label>
                    <router-link to="/forgot" class="float-end">Forgot Password?</router-link>
                </div>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>  

            <div class="d-flex align-items-center">
                <button class="btn btn-primary ms-auto" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
            </div>

            <div v-if="errors.apiError">{{errors.apiError}}</div>
        </Form>

        <div>
            Don't have an account? <router-link to="/register" class="text-dark">Create One</router-link>
        </div>
    </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
