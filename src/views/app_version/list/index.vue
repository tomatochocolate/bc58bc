<template>
    <Card class="list" v-if="isReady">
        <div class="btn-group">
            <Button type="primary" @click="addModalVisible = false">上传App</Button>
        </div>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="app_url">
                <a :href="row.app_url" target="_blank" title="点击下载App"><Icon type="ios-cloud-download" :size="26"/></a>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
        <Store v-model="addModalVisible" @success="getList"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'

    export default {
        name: 'AppVersionList',
        mixins: [ page ],
        components: { Store },
        methods: {
            handleFilterQuery () {},
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.appVersion.list()

                        resolve(data)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        },
        data () {
            return {
                columns: [
                    { title: 'ID', key: 'id', width: 80 },
                    { title: '标题', key: 'title', minWidth: 80, maxWidth: 200 },
                    { title: '描述', key: 'content', minWidth: 100 },
                    { title: '最后版本号', key: 'latest_version', width: 140 },
                    { title: '最后版本编号', key: 'latest_version_code', width: 140 },
                    { title: '地址', slot: 'app_url', width: 100 },
                    { title: '平台信息', key: 'platform', width: 140 },
                    { title: '上传时间', key: 'created_at', width: 160 }
                ],
                addModalVisible: false
            }
        },
        async mounted () {
            await this.getList()
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
    .btn-group {
        margin-bottom: 15px;
    }
</style>
