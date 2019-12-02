<template>
    <Modal mask-closable scrollable :title="title"
           :width="500" v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="80"
              @submit.native.prevent>
            <FormItem label="主题"> {{ item.content }}</FormItem>
            <FormItem prop="content" label="回复内容">
                <Input type="textarea" clearable placeholder="请输入回复内容"
                       :autosize="{ minRows: 3, maxRows: 5 }"
                       v-model="params.content" />
            </FormItem>
            <FormItem prop="remark" label="备注">
                <Input type="textarea" clearable placeholder="请输入备注"
                       :autosize="{ minRows: 3, maxRows: 5 }"
                       v-model="params.remark" />
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
    export default {
        name: 'Reply',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                default () {
                    return {}
                }
            },
            mode: {
                type: String,
                default: 'reply'
            }
        },
        watch: {
            show (value) {
                if (value) {
                    const { reply_content, remark } = this.item
                    this.params.remark = remark
                    this.params.content = reply_content
                } else {
                    this.$refs.form.resetFields()
                }
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        computed: {
            title () {
                return this.mode === 'reply' ? '回复' : '修改回复'
            }
        },
        methods: {
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return

                this.isSubmit = true
                try {
                    const { code, message } = await api.feedback.reply({
                        id: this.item.id,
                        ...this.params
                    })

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('on-refresh')
                    this.$Message.success(`${this.mode === 'reply' ? '' : '修改'}回复成功`)
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
                    content: '',
                    remark: ''
                },
                rules: {
                    content: { required: true, message: '请输入回复内容', trigger: 'change blur' }
                }
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
