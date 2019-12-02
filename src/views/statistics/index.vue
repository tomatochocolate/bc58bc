<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline @submit.native.prevent>
            <Row type="flex">
                <Col>
                    <FormItem prop="channel">
                        <Row type="flex">
                            <Col>投放渠道</Col>
                            <Col>
                               <Row type="flex">
                                   <Col>
                                       <Checkbox :indeterminate="indeterminate" :value="checkAllChannel"
                                                 @click.prevent.native="handleCheckAllChannel"> 全选</Checkbox>
                                   </Col>
                                   <Col>
                                       <CheckboxGroup v-model="filterParams.channel" @on-change="checkAllChannelChange">
                                           <template v-for="item of channel">
                                               <Checkbox :label="item.value" :key="item.value"> {{ item.text }}</Checkbox>
                                           </template>
                                       </CheckboxGroup>
                                   </Col>
                               </Row>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
                <Col>
                    <FormItem prop="date">
                        <Row type="flex">
                            <Col span="auto">时间区间</Col>
                            <Col>
                                <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择时间区间"
                                            :options="datePickerOptions"
                                            v-model="filterParams.date" />
                            </Col>
                        </Row>
                    </FormItem>
                </Col>

                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
<!--                        <Button type="primary" @click="handleFilterQuery">导出</Button>-->
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="visit">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.visit.data, '浏览量', 'amount')">
                    {{ row.visit.amount | numeral }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="download">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.download.data, '下载量', 'amount')">
                    {{ row.download.amount | numeral }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="signup">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.signup.data, '激活用户', 'amount')">
                    {{ row.signup.amount | numeral }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="signup_conversion">
                {{ row.signup.amount / row.download.amount | numeral('0[.]00%') }}
            </template>
            <template slot-scope="{ row }" slot="firstpay">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.firstpay.data, '首充用户', 'amount')">
                    {{ row.firstpay.amount | numeral }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="firstpay_money">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.firstpay_money.data, '首充金额', 'money')">
                    {{ row.firstpay_money.amount | numeral('$0,0[.]0') }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="firstpay_conversion">{{ row.firstpay.amount / row.signup.amount | numeral('0[.]00%') }}</template>
            <template slot-scope="{ row }" slot="morepay">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.morepay.data, '复投金额', 'money')">
                    {{ row.morepay.amount | numeral('$0,0[.]0') }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="total">
                <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.total.data, '总营收', 'money')">
                    {{ row.total.amount | numeral('$0,0[.]0') }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="adcost">
                <template v-if="row.adcost.data.length">
                    <div class="chartPie" @click.stop.prevent="handleOpendChartPie(row.adcost.data, '广告支出', 'money')">
                        {{ row.adcost.amount | numeral('$0,0[.]0') }}
                    </div>
                </template>
                <template v-else>
                    <Button type="text" @click="handleEditAdCost(row)">设置</Button>
                </template>
            </template>
        </Table>
        <Pie v-model="chartPie.show" :data="chartPie.data" :field="chartPie.field" :field-type="chartPie.fieldType" :channel="channel" />
        <AdCost v-model="adCost.show" :date="adCost.date" :channel="channel" @on-success="getList" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { datePicker } from '@/config'
    import { dayjs, isArray, numeral } from '@/libs/utils'

    import Pie from './components/pie'
    import AdCost from './components/ad-cost'

    const fieldTotal = (result, field = 'amount') => {
        if (isArray(result) && !result.length) return 0
        return result.reduce((iteratee, accumulator) => numeral(accumulator[field]).value() + iteratee, 0)
    }
    export default {
        name: 'StatisticsList',
        components: { Pie, AdCost },
        methods: {
            handleFilterQuery () {
                if (!this.filterParams.channel.length) return this.$Message.error('请选择投放渠道')
                this.getList()
            },
            handleCheckAllChannel () {
                if (this.indeterminate) {
                    this.checkAllChannel = false
                } else {
                    this.checkAllChannel = !this.checkAllChannel
                }
                this.indeterminate = false
                if (this.checkAllChannel) {
                    this.filterParams.channel = this.channel.map(item => item.value)
                } else {
                    this.filterParams.channel = []
                }
            },
            checkAllChannelChange (checkbox) {
                if (checkbox.length === this.channel.length) {
                    this.indeterminate = false
                    this.checkAllChannel = true
                } else if (checkbox.length > 0) {
                    this.indeterminate = true
                    this.checkAllChannel = false
                } else {
                    this.indeterminate = false
                    this.checkAllChannel = false
                }
            },
            handleOpendChartPie (data = [], field = '', fieldType = 'amount') {
                this.chartPie.show = true
                this.chartPie.data = data
                this.chartPie.field = field
                this.chartPie.fieldType = fieldType
            },

            handleEditAdCost (row) {
                this.adCost.show = true
                this.adCost.date = row.date
            },

            getList () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { channel, date } = this.filterParams
                        const { code, data, message } = await api.statistics.list({
                            date: date.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(','),
                            channel: channel.join(',')
                        })

                        if (code !== 200) return this.$Message.error(message)

                        this.list = data.map(item => {
                            const firstpay = fieldTotal(item.firstpay)
                            const morepay = fieldTotal(item.morepay)
                            const total = firstpay + morepay

                            return {
                                date: item.date,
                                visit: { data: item.visit, amount: fieldTotal(item.visit) },
                                download: { data: item.download, amount: fieldTotal(item.download) },
                                signup: { data: item.signup, amount: fieldTotal(item.signup) },
                                firstpay: { data: this.getFirstPayUsersData(item.firstpay), amount: fieldTotal(item.firstpay, 'users') },
                                firstpay_money: { data: item.firstpay, amount: firstpay },
                                morepay: { data: item.morepay, amount: morepay },
                                adcost: { data: item.adcost, amount: fieldTotal(item.adcost) },
                                total: { data: this.getTotalData(item), amount: total }
                            }
                        })
                        resolve()
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            getInitData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.statistics.channel()
                        const channel = []

                        for (let item of data) {
                            let index = 0
                            for (let platform of item.platform) {
                                index++
                                channel.push({
                                    text: `${item.code}${index}`,
                                    value: `${item.id}:${platform.id}`,
                                    channel: item.id,
                                    channel_code: item.code,
                                    platform: platform.id,
                                    platform_code: platform.code
                                })
                            }
                        }
                        this.channel = channel
                        resolve()
                    } catch (e) {
                        reject(e)
                    }
                })
            },

            getTotalData ({ firstpay, morepay }) {
                return firstpay.map(({ amount, channel, platform }, index) => {
                    return {
                        amount: numeral(amount).value() + numeral(morepay[index].amount).value(),
                        channel, platform
                    }
                })
            },
            getFirstPayUsersData (data) {
                return data.map(({ users, channel, platform }) => {
                    return {
                        amount: users,
                        channel, platform
                    }
                })
            }
        },
        data () {
            return {
                filterParams: {
                    date: [],
                    channel: []
                },
                columns: [
                    { title: '日期', key: 'date', width: 100 },
                    { title: '浏览量', slot: 'visit', width: 150 },
                    { title: '下载量', slot: 'download', width: 150 },
                    { title: '激活用户', slot: 'signup', width: 150 },
                    { title: '激活转化', slot: 'signup_conversion', width: 150 },
                    { title: '首充用户', slot: 'firstpay', width: 150 },
                    { title: '首充金额', slot: 'firstpay_money', minWidth: 150 },
                    { title: '首充转化率', slot: 'firstpay_conversion', width: 150 },
                    { title: '复投金额', slot: 'morepay', minWidth: 150 },
                    { title: '总营收', slot: 'total', minWidth: 150 },
                    { title: '广告支出', slot: 'adcost', width: 150, fixed: 'right' }
                ],
                list: [],
                channel: [],

                isRead: false,
                indeterminate: false,
                checkAllChannel: false,

                datePickerOptions: {
                    ...datePicker,
                    disabledDate (date) {
                        return dayjs().isBefore(date)
                    }
                },

                adCost: {
                    show: false,
                    date: ''
                },
                chartPie: {
                    show: false,
                    data: [],
                    field: '',
                    fieldType: ''
                }
            }
        },
        async mounted () {
            try {
                await this.getInitData()
                this.handleCheckAllChannel()

                await this.getList()
                this.isReady = true
            } catch (e) {}
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .ivu-btn-text {
        padding-left: 0;
        padding-right: 0;
    }
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
    .btn-group {
        margin-bottom: 15px;
    }
    .chartPie {
        cursor: pointer;
    }
</style>
