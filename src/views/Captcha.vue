<template>
    <el-form ref="formRef" :model="form" label-width="120px" label-suffix="：" :status-icon="true">
        <el-form-item>
            <span class="captcha" v-html="form.captchaSvg" @click="getCapthca()"></span>
        </el-form-item>
        <el-form-item label="输入验证码">
            <el-input v-model="form.captcha" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive, inject } from 'vue';
export default {
    name: 'Capthca',
    components: {},
    setup() {
        const axios = inject('axios');
        const api = inject('api');
        const Message = inject('Message');
        let form = reactive({
            captcha: '',
            captchaSvg: '',
        });
        const getCapthca = () => {
            axios
                .get(api.captcha)
                .then(res => {
                    form.captchaSvg = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        };
        const onSubmit = () => {
            axios
                .post(api.captcha, {captcha: form.captcha})
                .then(res => {
                    Message({
                        message: res.data.msg,
                        grouping: true,
                        type: 'success',
                    });
                })
                .catch(err => {
                    Message({
                        message: err,
                        grouping: true,
                        type: 'error',
                    });
                });
        };

        return {
            form,
            onSubmit,
            getCapthca,
        };
    },
    created() {
        this.getCapthca();
    },
};
</script>

<style lang="scss">
.captcha {
    width: 100px;
    height: 36px;
    display: inline-block;
    cursor: pointer;
}
</style>
