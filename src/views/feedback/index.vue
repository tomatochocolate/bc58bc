<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="状态" v-model="filterParams.status">
                            <Option value="0">未处理</Option>
                            <Option value="1">已处理</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="phone"><Input clearable placeholder="手机号" v-model="filterParams.phone" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="date">
                        <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.created_at" />
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="date">
                        <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择回复时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.reply_at" />
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
            <template slot-scope="{ row }" slot="user">
                <template v-if="row.user.status === 3">体验用户</template>
                <template v-else-if="row.user.phone">{{ row.user.phone }}</template>
                <template v-else>未绑定</template>
            </template>
            <template slot-scope="{ row }" slot="reply_user">
                {{ row.reply_user && row.reply_user.username }}
            </template>
            <template slot-scope="{ row }" slot="status">
                <span>{{ row.status === 0 ? '未处理' : '已处理' }}</span>
            </template>
            <template slot-scope="{ row }" slot="functional">
                <Button type="text" @click.stop.capture="handleReply(row)">{{ row.status === 0 ? '回复' : '修改' }}</Button>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <Reply :item="replyModel.item" :mode="replyModel.mode"
               v-model="replyModel.show"
               @on-refresh="getList"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { dayjs } from '@/libs/utils'
    import { datePicker } from '@/config'

    import Reply from './components/reply'

    export default {
        name: 'FeedbackList',
        mixins: [ page ],
        components: { Reply },
        methods: {
            handleReply (row) {
                this.replyModel.show = true
                this.replyModel.item = row
                this.replyModel.mode = row.status === 0 ? 'reply' : 'edit'
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { status, phone, created_at, reply_at } = this.filterParams
                        const { current: page, pageSize } = this.page
                        const { data } = await api.feedback.list({
                            page, pageSize, status, phone,
                            reply_at: reply_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(','),
                            created_at: created_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(',')
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
                    phone: '',
                    status: '',
                    reply_at: [],
                    created_at: []
                },
                columns: [
                    { key: 'id', title: 'ID', width: 100 },
                    { slot: 'user', title: '用户名', width: 150 },
                    { key: 'content', title: '反馈内容', minWidth: 150, ellipsis: true, tooltip: true },
                    { slot: 'status', title: '状态', width: 100 },
                    { slot: 'reply_user', title: '回复用户', width: 150 },
                    { key: 'reply_content', title: '回复内容', minWidth: 150, ellipsis: true, tooltip: true },
                    { key: 'remark', title: '备注', minWidth: 150, ellipsis: true, tooltip: true },
                    { key: 'reply_at', title: '回复时间', width: 160 },
                    { key: 'created_at', title: '创建时间', width: 160 },
                    { slot: 'functional', title: '操作', width: 150, fixed: 'right' }
                ],
                datePickerOptions: {
                    ...datePicker,
                    disabledDate (date) {
                        return dayjs().isBefore(date)
                    }
                },
                replyModel: {
                    show: false,
                    item: {},
                    mode: 'reply'
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
    .ivu-btn-text {
        padding: 0;
        margin-left: 10px;
    }
</style>
