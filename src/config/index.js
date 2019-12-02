import { dayjs } from '@/libs/utils'

export const api = {
    timeout: 10000,
    baseURL: process.env.VUE_APP_BASEURL
}
export const title = ''
export const cache = {
    // 单位: 秒
    expires: 86400
}
export const page = {
    simple: false,
    pageSize: 15,
    showTotal: true,
    showSizer: true,
    showElevator: true,
    pageSizeOpts: [ 15, 30, 50, 100 ]
}

const currentDate = dayjs().format('YYYY-MM-DD 00:00')
export const datePicker = {
    shortcuts: [
        {
            text: '最近一周',
            value () {
                return [ dayjs().subtract(1, 'week').format('YYYY-MM-DD 00:00'), currentDate ]
            }
        }, {
            text: '最近一个月',
            value () {
                return [ dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00'), currentDate ]
            }
        }, {
            text: '最近三个月',
            value () {
                return [ dayjs().subtract(3, 'month').format('YYYY-MM-DD 00:00'), currentDate ]
            }
        }
    ]
}
