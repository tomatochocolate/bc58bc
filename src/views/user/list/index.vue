<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="有效状态" v-model="filterParams.status">
                            <Option value="0">正常</Option>
                            <Option value="1">禁用</Option>
                            <Option value="2">过期</Option>
                            <Option value="3">体验</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="id"><Input clearable placeholder="用户ID" v-model="filterParams.id" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="phone"><Input clearable placeholder="手机号" v-model="filterParams.phone" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="date">
                        <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择注册时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.created_at" />
                    </FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button @click="handleAddAccount">添加用户</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="status">
                <template v-if="row.status === 0">正常</template>
                <template v-else-if="row.status === 1">禁用</template>
                <template v-else-if="row.status === 2">过期</template>
                <template v-else-if="row.status === 3">体验</template>
            </template>
            <template slot-scope="{ row }" slot="phone">
                <template v-if="row.status === 3 || (row.status === 2 && row.phone === null)">体验账号</template>
                <template v-else-if="row.phone === null">未绑定</template>
                <template v-else>{{ row.phone }}</template>
            </template>
            <template slot-scope="{ row }" slot="is_pay_order">
                {{ row.is_pay_order === 1 ? '已' : '未' }}付费
            </template>
            <template slot-scope="{ row }" slot="residualFlow">
                {{ row.totalTransfer - row.usedTransfer | bytesToSize }}
            </template>
            <template slot-scope="{ row }" slot="expiresDate">
                <template v-if="row.status === 0 || (row.status === 2 && row.is_pay_order === 1)">{{ row.expiredDate | formatDate }}</template>
                <template v-else-if="row.status === 3 || (row.status === 2 && row.is_pay_order !== 1)">{{ row.created_at | trialExpiredDate }}</template>
            </template>
            <template slot-scope="{ row }" slot="switch">
                {{ row.switch ? '在线' : '离线' }}
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" @on-refresh="handleFilterQuery" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs, extend } from '@/libs/utils'

    import AddAccount from './components/add-account'
    dayjs.add
    export default {
        name: 'UserList',
        mixins: [ page ],
        filters: {
            trialExpiredDate (created_at) {
                return dayjs(created_at).add(30, 'minute').format('YYYY-MM-DD HH:mm:ss')
            }
        },
        components: { AddAccount },
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: page, pageSize } = this.page
                        const { id, status, phone, created_at } = this.filterParams

                        const { data } = await api.user.list({
                            page, pageSize, status, phone, id,
                            created_at: created_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(',')
                        })
                        const query = await api.user.query({ ids: data.data.map(item => item.id).join(',') })

                        data.data = data.data.map((item, key) => {
                            return extend({}, item, query.data.data[key])
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
                    id: '',
                    phone: '',
                    status: '',
                    created_at: []
                },
                addAccountModal: false,
                importAccountModal: false,

                columns: [
                    { slot: 'status', title: '账号状态', width: 100, fixed: 'left' },
                    { key: 'id', title: '用户ID', minWidth: 100 },
                    { slot: 'phone', title: '手机号', minWidth: 120 },
                    { slot: 'switch', title: '在线状态', width: 100 },
                    { slot: 'is_pay_order', title: '付费状态', width: 100 },
                    { slot: 'residualFlow', title: '剩余流量', minWidth: 100 },
                    { slot: 'expiresDate', title: '到期时间', width: 150 },
                    { key: 'last_login_ip', title: '用户位置', width: 130 },
                    { key: 'version', title: 'App版本号', width: 100 },
                    { key: 'imei', title: 'IMEI码', width: 100 },
                    { key: 'created_at', title: '注册时间', width: 160 },
                    { key: 'last_login_at', title: '最近登录', width: 160 }
                    // { slot: 'functional', title: '操作', width: 150, fixed: 'right' }
                ],
                datePickerOptions: {
                    ...datePicker,
                    disabledDate (date) {
                        return dayjs().isBefore(date)
                    }
                }
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
