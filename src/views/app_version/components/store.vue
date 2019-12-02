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
                <Input type="textarea" clearable placeholder="请输入描述"
                       :autosize="{ minRows: 3, maxRows: 5 }"
                       v-model="params.content" />
            </FormItem>
            <FormItem prop="channel" label="渠道">
                <Input clearable placeholder="请输入渠道" v-model="params.channel" />
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
                <Upload ref="upload" type="drag" accept="application/octet-stream,application/vnd.android.package-archive"
                        :data="{ token: $store.state.app.token }"
                        :format="[ 'apk', 'exe', 'dmg' ]" :show-upload-list="false"
                        :action="api.appVersion.upload"
                        :on-progress="handleFileUploadProgress" :on-success="handleFileUploadSuccess"
                        :before-upload="handleFileUploadBefore">
                    <div class="upload-area">
                        <div>
                            <template v-if="isUpload">
                                <Progress :percent="uploadPercent" :stroke-width="3" />
                                {{ uploadFile.name }}
                            </template>
                            <template v-else>
                                <Icon type="ios-cloud-upload" size="52" />
                                <p>单击或拖动文件到此处上传</p>
                            </template>
                        </div>
                    </div>
                </Upload>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" :loading="isSubmit" @click="validate">提交</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    // import { getFileExtension } from '@/libs/utils'

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
                this.$nextTick(() => {
                    if (!value) {
                        setTimeout(() => {
                            this.isUpload = false
                            this.isSubmit = false
                            this.$refs.form.resetFields()
                            this.$refs.upload.clearFiles()
                        }, 250)
                    }
                })
            },
            value (value) {
                this.show = value
            }
        },
        methods: {
            async validate () {
                if (this.isSubmit) return
                if (!await this.$refs.form.validate()) return
                try {
                    this.isSubmit = true
                    const { code, message } = await api.appVersion.store(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$Message.success('保存成功')
                    this.$emit('on-success')
                } catch (e) {
                    this.$Message.error(e.message)
                    this.isSubmit = false
                }
            },

            handleFileUploadBefore (file) {
                // const accept = [ 'application/octet-stream', 'application/vnd.android.package-archive' ]
                // const extension = [ 'apk', 'exe', 'dmg' ]
                //
                // if (!extension.includes(getFileExtension(file.name)) || !accept.includes(file.type)) {
                //     this.$Message.error('文件类型错误')
                //     return false
                // }
                this.isUpload = true
                this.isSubmit = true
                this.uploadFile = file
                return file
            },
            handleFileUploadProgress (event, file, fileList) {
                this.uploadPercent = event.percent
            },
            handleFileUploadSuccess (response, file, fileList) {
                this.isSubmit = false
                this.params.app_url = response.data.filePath
            }
        },

        data () {
            return {
                api,
                show: this.value,
                params: {
                    title: '',
                    content: '',
                    latest_version: '',
                    latest_version_code: '',
                    platform: '',
                    app_url: '',
                    channel: ''
                },
                rules: {
                    title: { required: true, message: '请输入标题', trigger: 'change blur' },
                    channel: { required: true, message: '请输入渠道', trigger: 'change blur' },
                    latest_version: { required: true, message: '请输入最后版本号', trigger: 'change blur' },
                    latest_version_code: { required: true, message: '请输入最后版本编号', trigger: 'change blur' },
                    platform: { required: true, message: '请输入平台信息', trigger: 'change blur' },
                    app_url: { required: true, message: '请上传App文件', trigger: 'change blur' }
                },

                isSubmit: false,
                isUpload: false,
                uploadFile: {},
                uploadPercent: 0
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
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
            width: 80%;
        }
        /*padding: 20px 0;*/
    }
    /deep/ .ivu-icon {
        color: #3399ff;
    }
</style>
