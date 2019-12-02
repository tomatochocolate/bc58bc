/**
 * 格式化时间
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 23:51
 */
import { dayjs } from '@/libs/utils'

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (date === '') return
    return dayjs(date).format(format)
}
export default formatDate
