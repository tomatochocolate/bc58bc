<template>
    <Card class="list" v-if="isReady">
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="totalTransfer">
                {{ row.totalTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="usedTransfer">
                {{ row.usedTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="residualFlow">
                {{ row.totalTransfer - row.usedTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="averageOnline">
                {{ row.averageOnline | numeral('0,0') }}
            </template>
        </Table>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'

    export default {
        name: 'NodeList',
        methods: {
            getList () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.node.list()

                        this.list = data
                        resolve(data)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        },
        data () {
            return {
                list: [],
                columns: [
                    { type: 'index', width: 70 },
                    { title: '节点名称', key: 'name', minWidth: 140, maxWidth: 200 },
                    { title: '节点类型', key: 'nodeType', minWidth: 100 },
                    { title: '节点状态', key: 'status', minWidth: 100 },
                    { title: '节点域名/IP地址', key: 'ip', minWidth: 140 },
                    { title: '地区', key: 'location', minWidth: 100 },
                    { title: '节点总流量', slot: 'totalTransfer', width: 110 },
                    { title: '已用流量', slot: 'usedTransfer', width: 110 },
                    { title: '剩余流量', slot: 'residualFlow', width: 110 },
                    { title: '平均在线', slot: 'averageOnline', width: 130 },
                    // { title: '在线人数/H', slot: 'averageOnlineHour', width: 160 },
                    { title: '提供商', key: 'provider', width: 160 }
                ]
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
