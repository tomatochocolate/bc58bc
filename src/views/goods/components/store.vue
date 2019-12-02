<template>
    <Modal scrollable :title="`${type === 'add' ? '新增' : '编辑' }商品`"
           :width="500" :mask-closable="false"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="120"
              @submit.native.prevent>
            <FormItem prop="title" label="商品名称">
                <Input clearable type="text" placeholder="请输入商品名称" v-model="params.title" />
            </FormItem>
            <FormItem prop="cardType" label="商品类型">
                <Input clearable type="text" placeholder="请输入商品类型" v-model="params.cardType" />
            </FormItem>
            <FormItem prop="cost_price" label="商品价格">
                <Input clearable placeholder="请输入商品价格" v-model="params.cost_price" />
            </FormItem>
            <FormItem prop="content" label="商品描述">
                <Input type="textarea" clearable placeholder="请输入商品描述"
                       :autosize="{ minRows: 3, maxRows: 5 }"
                       v-model="params.content" />
            </FormItem>
            <FormItem prop="is_del" label="状态">
                <Select clearable placeholder="状态" v-model="params.is_del">
                    <Option :value="1">上架</Option>
                    <Option :value="0">下架</Option>
                </Select>
            </FormItem>
            <FormItem prop="is_top" label="是否Top">
                <Select clearable placeholder="是否Top" v-model="params.is_top">
                    <Option :value="1">是</Option>
                    <Option :value="0">否</Option>
                </Select>
            </FormItem>
            <FormItem prop="is_hot" label="是否热门">
                <Select clearable placeholder="是否热门" v-model="params.is_hot">
                    <Option :value="1">是</Option>
                    <Option :value="0">否</Option>
                </Select>
            </FormItem>
            <FormItem prop="sort" label="排序">
                <Input clearable placeholder="请输入商品排序（越大越靠前）" v-model="params.sort" />
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
    import * as api from '@/api'
    import { extend } from '@/libs/utils'

    export default {
        name: 'EditGoodsModal',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'add'
            },
            data: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
                if (!value) {
                    this.$refs.form.resetFields()
                }
            },
            data (value) {
                this.params = extend({}, this.params, value)
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
                    const { code, message } = await api.goods[this.type === 'add' ? 'store' : 'update'](this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
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
                    title: '',
                    cardType: '',
                    cost_price: '',
                    content: '',
                    is_del: '',
                    is_top: '',
                    is_hot: '',
                    sort: ''
                },
                rules: {
                    title: { required: true, message: '请输入商品名称', trigger: 'change blur' },
                    cardType: { required: true, message: '请输入商品类型', trigger: 'change blur' },
                    cost_price: { required: true, message: '请输入商品价格', trigger: 'change blur' }
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
