/**
 * 字节转换
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 23:51
 */
const bytesToSize = (size) => {
    let i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + [ 'B', 'kB', 'MB', 'GB', 'TB' ][i]
}
export default bytesToSize
