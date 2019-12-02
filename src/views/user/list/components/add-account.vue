<template>
    <Modal mask-closable scrollable title="添加用户"
           :width="500" v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
            <FormItem prop="phone" label="手机号">
                <Input clearable type="text" placeholder="请输入手机号码" :maxlength="11" v-model="params.phone"  @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem prop="password" label="密码">
                <Input clearable type="password" placeholder="请输入密码（6~16位）" :maxlength="16" v-model="params.password"  @on-enter="handleSubmitForm"/>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="handleSubmitForm">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

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
                if (!value) this.$refs.form.resetFields()
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods: {
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return

                this.isSubmit = true
                try {
                    const { code, message } = await api.user.store(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('on-refresh')
                    this.$Message.success('添加成功')
                } catch (e) {
                    this.isSubmit = false
                    this.$Message.error(e.message)
                }
            }
        },

        data () {
            return {
                show: this.value,
                params: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change blur' },
                        { pattern: phone, message: '请输入正确的手机号码' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { min: 6, max: 16, message: '请输入6~16位的密码' }
                    ]
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
</style>
