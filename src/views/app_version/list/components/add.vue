<template>
    <Modal scrollable title="上传App新版本"
           :width="500" :mask-closable="false"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="120"
              @submit.native.prevent>
            <FormItem prop="title" label="标题">
                <Input clearable type="text" placeholder="请输入标题" v-model="params.title" />
            </FormItem>
            <FormItem prop="content" label="描述">
                <Input clearable placeholder="请输入描述" v-model="params.content" />
            </FormItem>
            <FormItem prop="latest_version" label="最后版本号">
                <Input clearable type="text" placeholder="请输入最后版本号" v-model="params.latest_version" />
            </FormItem>
            <FormItem prop="latest_version_code" label="最后版本编号">
                <Input clearable type="text" placeholder="请输入最后版本编号" v-model="params.latest_version_code" />
            </FormItem>
            <FormItem prop="platform" label="平台信息">
                <Input clearable type="text" placeholder="请输入平台信息" v-model="params.platform" />
            </FormItem>
            <FormItem prop="app_url" label="App文件">
                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                    <div class="upload-area">
                        <Icon type="ios-cloud-upload" size="52" />
                        <p>单击或拖动文件到此处上传</p>
                    </div>
                </Upload>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" @click="validate">提交</Button>
        </div>
        <Spin size="large" fix v-if="isSubmit" />
    </Modal>
</template>
<script type="text/babel">
    export default {
        name: 'AddAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
                if (!value) this.$refs.form.resetFields()
            },
            value (value) {
                this.show = value
            }
        },
        methods: {
            async validate () {
                if (this.isSubmit) return
                if (!await this.$refs.form.validate()) return
                this.isSubmit = true
            }
        },

        data () {
            return {
                show: this.value,
                params: {
                    title: '',
                    content: '',
                    latest_version: '',
                    latest_version_code: '',
                    platform: '',
                    app_url: ''
                },
                rules: {
                    title: { required: true, message: '请输入标题', trigger: 'change blur' },
                    content: { required: true, message: '请输入描述', trigger: 'change blur' },
                    latest_version: { required: true, message: '请输入最后版本号', trigger: 'change blur' },
                    latest_version_code: { required: true, message: '请输入最后版本编号', trigger: 'change blur' },
                    platform: { required: true, message: '请输入平台信息', trigger: 'change blur' },
                    app_url: { required: true, message: '请上传App文件', trigger: 'change blur' }
                },
                isSubmit: false
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .agent.ivu-form-item {

        .ivu-form-item-label {
            padding-top: 5px;
        }
    }
    .upload-area {
        padding: 20px 0;
    }
    /deep/ .ivu-icon {
        color: #3399ff;
    }
</style>
