<template>
    <Card class="list" v-if="isReady">
        <div class="btn-group">
            <Button type="primary" @click="handleEditGoods('add')">新增商品</Button>
        </div>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="cost_price">
                {{ row.cost_price | numeral('$0,0[.]0') }}
            </template>
            <template slot-scope="{ row }" slot="is_del">
               {{ row.is_del === 1 ? '上' : '下' }}架
            </template>
            <template slot-scope="{ row }" slot="is_top">
                {{ row.is_top === 1 ? '是' : '否' }}
            </template>
            <template slot-scope="{ row }" slot="is_hot">
                {{ row.is_hot === 1 ? '是' : '否' }}
            </template>
            <template slot-scope="{ row }" slot="functional">
                <Button type="text" @click="handleEditGoods('edit', row)">编辑</Button>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
        <Store :type="editGoodsModal.type" :data="editGoodsModal.data"
               v-model="editGoodsModal.show" @on-success="getList"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'

    export default {
        name: 'GoodsList',
        mixins: [ page ],
        components: { Store },
        methods: {
            handleEditGoods (type = 'add', row = {}) {
                this.editGoodsModal.show = true
                this.editGoodsModal.type = type
                this.editGoodsModal.data = row
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { data } = await api.goods.list()

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
                    { title: 'ID', key: 'id', width: 100 },
                    { title: '商品名称', key: 'title', minWidth: 150, maxWidth: 200 },
                    { title: '商品类型', key: 'cardType', width: 160 },
                    { title: '商品价格', slot: 'cost_price', width: 130 },
                    { title: '商品描述', key: 'content', minWidth: 180 },
                    { title: '状态', slot: 'is_del', width: 120 },
                    { title: '是否Top', slot: 'is_top', width: 100 },
                    { title: '是否Hot', slot: 'is_hot', width: 100 },
                    { title: '排序', key: 'sort', width: 100 },
                    { title: '操作', slot: 'functional', width: 150, fixed: 'right' }
                ],
                editGoodsModal: {
                    show: false,
                    type: 'add',
                    data: {}
                }
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
