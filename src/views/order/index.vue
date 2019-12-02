<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="订单状态" v-model="filterParams.status">
                            <Option value="0">未支付</Option>
                            <Option value="1">已支付</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="pay_channel">
                        <Select clearable placeholder="支付渠道" v-model="filterParams.pay_channel">
                            <Option value="alipay">支付宝</Option>
                            <Option value="wechat">微信</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="user_id"><Input clearable placeholder="用户ID" v-model="filterParams.user_id" /></FormItem>
                </Col>
<!--                <Col :xs="12" :sm="6" :lg="4" :xl="3">-->
<!--                    <FormItem prop="phone"><Input clearable placeholder="手机" v-model="filterParams.phone" /></FormItem>-->
<!--                </Col>-->
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="order_no"><Input clearable placeholder="订单编号" v-model="filterParams.order_no" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="out_trade_no"><Input clearable placeholder="支付单号" v-model="filterParams.out_trade_no" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="escrow_trade_no"><Input clearable placeholder="第三方支付流水号" v-model="filterParams.escrow_trade_no" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="pay_time">
                        <DatePicker format="yyyy/MM/dd HH:mm" type="datetimerange" placement="bottom-start" placeholder="付款时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.pay_time" />
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="created_at">
                        <DatePicker format="yyyy/MM/dd HH:mm" type="datetimerange" placement="bottom-start" placeholder="下单时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.created_at" />
                    </FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="user_id">{{ row.user.user_id }}</template>
            <template slot-scope="{ row }" slot="phone">
                <template v-if="row.user.status === 3">体验用户</template>
                <template v-else-if="row.user.phone">{{ row.user.phone }}</template>
                <template v-else>未绑定</template>
            </template>
            <template slot-scope="{ row }" slot="goods_name">{{ row.order_item.goods_name }}</template>
            <template slot-scope="{ row }" slot="status">
                <template v-if="row.status === 0">未支付</template>
                <template v-else-if="row.status === 1">已支付</template>
            </template>
            <template slot-scope="{ row }" slot="quantity">
                {{ row.quantity | numeral('0,0') }}
            </template>
            <template slot-scope="{ row }" slot="total">
                {{ row.total | numeral('$0,0[.]0') }}
            </template>
            <template slot-scope="{ row }" slot="pay_channel">
                <template v-if="row.pay_channel === 'wechat'">微信</template>
                <template v-else-if="row.pay_channel === 'alipay'">支付宝</template>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'
    import page from '@/mixins/page'

    export default {
        name: 'OrderList',
        mixins: [ page ],
        methods: {
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: page, pageSize } = this.page
                        const {
                            status, user_id, pay_channel, order_no, out_trade_no, escrow_trade_no,
                            pay_time, created_at
                        } = this.filterParams

                        const { data } = await api.order.list({
                            status, user_id, pay_channel, order_no, out_trade_no, escrow_trade_no,
                            pay_time: pay_time.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD HH:mm')).join(','),
                            created_at: created_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD HH:mm')).join(','),
                            page, pageSize
                        })
                        resolve(data)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        },

        data () {
            return {
                filterParams: {
                    status: '',
                    // phone: '',
                    user_id: '',
                    pay_channel: '',
                    order_no: '',
                    out_trade_no: '',
                    escrow_trade_no: '',
                    pay_time: [],
                    created_at: []
                },

                columns: [
                    { key: 'order_no', title: '订单编号', width: 180 },
                    { key: 'out_trade_no', title: '订单支付单号', width: 180 },
                    { key: 'escrow_trade_no', title: '第三方支付流水号', width: 240 },
                    { slot: 'user_id', title: '用户ID', width: 150 },
                    { slot: 'phone', title: '手机号码', width: 150 },
                    { slot: 'goods_name', title: '商品名称', width: 150 },
                    { slot: 'quantity', title: '数量', width: 120 },
                    { slot: 'total', title: '金额', width: 150 },
                    { slot: 'status', title: '订单状态', width: 100 },
                    { slot: 'pay_channel', title: '支付渠道', width: 100 },
                    { key: 'pay_time', title: '付款时间', width: 160 },
                    { key: 'created_at', title: '下单时间', width: 160 },
                    { slot: 'functional', title: '操作', width: 150, fixed: 'right' }
                ],

                datePickerOptions: datePicker
            }
        },
        async mounted () {
            await this.getList()
            this.isReady = true
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .ivu-form {
        margin-bottom: 10px;

        /deep/ {

            .btn-group {

                .ivu-btn {
                    /*width: 90px;*/
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .ivu-date-picker {
                display: block;
            }
            .ivu-col {
                padding-right: 10px;
                margin-bottom: 10px;

                @include media('<sm') {
                    &:nth-child(2n+0) {
                        padding-right: 0;
                    }
                }
                @include media('>sm', '<md') {
                    &:nth-child(4n+0),
                    &:nth-child(14) {
                        padding-right: 0;
                    }
                }
                @include media('>md', '<lg') {
                    &:nth-child(4),
                    &:nth-child(8),
                    &:nth-child(12),
                    &:nth-child(14),
                    &:nth-child(16)  {
                        padding-right: 0;
                    }
                }
                @include media('>lg', '<xl') {
                    &:nth-child(8),
                    &:nth-child(15) {
                        padding-right: 0;
                    }
                }
                @include media('>xl') {
                    &:nth-child(12n+0) {
                        padding-right: 0;
                    }
                }
            }
            .ivu-form-item {
                width: 100%;
                margin-right: 0;
                margin-bottom: 0;
            }
            .ivu-btn-text {
                padding: 0;
                margin-left: 10px;
            }
        }
    }
</style>
