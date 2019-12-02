/**
 * 全局Page Mixin
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/31 21:23
 */
import { page } from '@/config'
import { extend } from '@/libs/utils'

export default {
    methods: {
        handleSearch () {
            this.page.current = 1
            this.searchParams = extend({}, this.params)
            this.getList()
        },
        handlePageNoChange (pageNo) {
            this.page.current = pageNo
            this.getList()
        },
        handlePageSizeChange (pageSize) {
            this.page.current = 1
            this.page.pageSize = pageSize
            this.getList()
        },

        getParams (params = {}) {
            return extend({
                size: this.page.pageSize,
                current: this.page.current
            }, params)
        },
        async getList () {
            try {
                this.isLoading = true
                const result = await this.getListData()

                this.list = result.data
                this.page.total = result.meta.total

                this.isReady = true
                this.isLoading = false
                return Promise.resolve(result)
            } catch (e) {
                this.isLoading = false
                return Promise.reject(e)
            }
        }
    },
    data () {
        return {
            list: [],
            page: {
                total: 0,
                current: 1,
                pageSize: page.pageSize
            },
            isLoading: true,
            searchParams: {}
        }
    }
}
