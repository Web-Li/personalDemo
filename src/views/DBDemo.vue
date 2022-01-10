<template>
    <div class="dbdemo">
        <p v-html="resStr"></p>
    </div>
</template>

<script>
// @ is an alias to /src
import api from '@/base/api.js';
export default {
    name: 'DBDemo',
    components: {},
    data() {
        return {
            resStr: '',
            form: {
                id: '',
                title: '',
                template: '',
            },
        };
    },
    created() {
        this.axios
            .get(api.dbdemo)
            .then(res => {
                this.resStr = JSON.stringify(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
};
</script>
