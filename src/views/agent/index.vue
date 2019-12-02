<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="有效状态" v-model="filterParams.status">
                            <Option value="0">有效</Option>
                            <Option value="1">无效</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="level">
                        <Select clearable placeholder="账号等级" v-model="filterParams.level">
                            <Option value="1">一级</Option>
                            <Option value="2">二级</Option>
                            <Option value="3">三级</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="account"><Input clearable placeholder="账号" v-model="filterParams.account" /></FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button @click="handleAddAccount">新增账号</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" />
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" />
    </Card>
</template>
<script type="text/babel">
    import page from '@/mixins/page'
    import AddAccount from './components/add-account'
    import TableExpand from './components/table-expand'

    export default {
        name: 'NodeList',
        mixins: [ page ],
        components: { AddAccount },
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleFilterQuery () {}
        },
        data () {
            return {
                filterParams: {
                    level: '',
                    account: '',
                    status: ''
                },
                addAccountModal: false,

                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(TableExpand, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        key: 'id',
                        title: '账号ID',
                        minWidth: 100
                    },
                    {
                        key: 'account',
                        title: '账号',
                        minWidth: 100
                    },
                    {
                        key: 'status',
                        title: '账号状态',
                        width: 100
                    },
                    {
                        key: 'level',
                        title: '等级',
                        minWidth: 100
                    },
                    {
                        key: 'totalLower',
                        title: '总下级数',
                        width: 100
                    },
                    {
                        key: 'totalUsers',
                        title: '用户数',
                        width: 100
                    },
                    {
                        key: 'createTime',
                        title: '注册时间',
                        minWidth: 100
                    },
                    {
                        key: 'lastLoginTime',
                        title: '最近登录',
                        width: 150
                    },
                    {
                        key: 'functional',
                        title: '操作',
                        width: 150,
                        fixed: 'right'
                    }
                ]
            }
        },
        mounted () {
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
