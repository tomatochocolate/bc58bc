<template>
    <Modal mask-closable scrollable footer-hide :title="field"
           :width="400" v-model="show">
        <template v-if="isReady">
            <div ref="dom" class="charts chart-pie" />
            <Table :data="list" :columns="columns">
                <template slot-scope="{ row }" slot="amount">
                    <template v-if="fieldType === 'amount'">{{ row.value | numeral }}</template>
                    <template v-else-if="fieldType === 'money'">{{ row.value | numeral('$0,0[.]0') }}</template>
                </template>
            </Table>
        </template>
        <Spin size="large" fix v-if="!isReady && show" />
    </Modal>

</template>
<script type="text/babel">
    import echarts from 'echarts'
    import echartsThemeConfig from '@/config/echarts'

    echarts.registerTheme('theme', echartsThemeConfig)
    export default {
        name: 'ChartPie',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            field: {
                type: String,
                default: ''
            },
            fieldType: {
                type: String,
                default: 'amount'
            },
            channel: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        watch: {
            show (value) {
                if (value) {
                    setTimeout(() => {
                        this.isReady = true
                        this.initChartPie()
                    }, 500)
                } else {
                    this.isReady = false
                }
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods: {
            initChartPie () {
                this.list = this.data.map(item => {
                    const channel = this.channel.find(channel => {
                        if (item.platform) {
                            return channel.channel === item.channel && channel.platform === item.platform
                        }
                        return channel.channel === item.channel
                    }) || {}

                    return {
                        name: item.platform ? channel.text : channel.channel_code,
                        value: item.amount
                    }
                })
                this.$nextTick(() => {
                    this.dom = echarts.init(this.$refs.dom, 'theme')
                    this.dom.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                data: this.list,
                                name: this.field,
                                type: 'pie',
                                radius: '55%',
                                center: [ '50%', '50%' ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    })
                })
            }
        },

        data () {
            return {
                dom: null,
                show: this.value,

                list: [],
                columns: [
                    { title: '投放渠道', key: 'name', width: 150 },
                    { title: '合计', slot: 'amount' }
                ]
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .ivu-modal-body {
        min-height: 300px;
    }
    .chart-pie {
        width: 100%;
        height: 150px;
    }
</style>
