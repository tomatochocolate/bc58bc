/**
 * 格式化时间
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 23:51
 */
import { isNull, numeral } from '@/libs/utils'

export default (value, format = '0,0[.]0') => {
    if (isNull(value)) return
    return numeral(value).format(format)
}
