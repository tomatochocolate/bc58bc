<template>
    <Modal scrollable title="广告费设置"
           :width="500" :mask-closable="false"
           v-model="show">
        <Form ref="form" :model="params" :label-width="60"
              @submit.native.prevent>
            <Row>
                <template v-for="(param, index) of params.channel">
                    <Col span="12" :key="param.key">
                        <FormItem :key="param.key" :prop="`channel.${index}.value`" :label="param.label"
                                  :rules="{ pattern: /^\d+(\.\d{1,2})?$/, message: `${param.label}金额格式错误`, trigger: 'change blur' }">
                            <Input type="text" placeholder="请输入金额" v-model="param.value">
                                <span slot="append">元</span>
                            </Input>
                        </FormItem>
                    </Col>
                </template>
            </Row>
        </Form>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Poptip transfer confirm width="250" title="提交后不可修改，确认要提交吗？" placement="top-end"
                @on-ok="handleSubmit">
                <Button type="primary">提交</Button>
            </Poptip>
        </div>
    </Modal>

</template>
<script type="text/babel">
    import * as api from '@/api'

    export default {
        name: 'AdCost',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            channel: {
                type: Array,
                default () {
                    return []
                }
            },
            date: {
                type: String,
                default: ''
            }
        },
        watch: {
            show (value) {
                if (value) {
                    this.init()
                } else {
                    setTimeout(() => {
                        this.params.channel = []
                        this.$refs.form.resetFields()
                    }, 500)
                }
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods: {
            init () {
                for (let channel of this.channel) {
                    this.params.channel.push({
                        key: channel.value,
                        label: channel.text,
                        value: ''
                    })
                }
            },
            async handleSubmit () {
                if (this.isSubmit) return
                if (!await this.$refs.form.validate()) return

                try {
                    const { channel } = this.params
                    this.isSubmit = true
                    const { code, message } = await api.statistics.adcost({
                        date: this.date,
                        channel: JSON.stringify(channel.map(({ key, value }) => {
                            return { key, value }
                        }))
                    })

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$Message.success('广告费设置成功')
                    this.$emit('on-success')
                } catch (e) {
                    this.$Message.error(e.message)
                    this.isSubmit = false
                }
            }
        },

        data () {
            return {
                show: this.value,
                params: {
                    channel: []
                },
                isSubmit: false
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .ivu-btn-default {
        margin-right: 8px;
    }
</style>
