<template>
    <Row type="flex" align="middle" justify="center">
        <Col>
            <template v-if="$route.name === 'errors.403'"><img src="./img/403.svg"></template>
            <template v-else-if="$route.name === 'errors.404'"><img src="./img/404.svg"></template>
            <template v-else-if="$route.name === 'errors.500'"><img src="./img/500.svg"></template>
        </Col>
        <Col>
            <template v-if="$route.name === 'errors.403'">
                <h1>403</h1>
                <h3>抱歉，你无权访问该页面</h3>
            </template>
            <template v-else-if="$route.name === 'errors.404'">
                <h1>404</h1>
                <h3>抱歉，你访问的页面不存在</h3>
            </template>
            <template v-else-if="$route.name === 'errors.500'">
                <h1>500</h1>
                <h3>抱歉，服务器出错了</h3>
            </template>
            <Button replace to="/" type="primary"
                    v-if="$route.name === 'errors.403' || $route.name === 'errors.500'">返回首页</Button>
        </Col>
    </Row>
</template>
<script type="text/babel">
    export default {
        name: 'Errors'
    }
</script>
<style lang="scss" type="text/scss" scoped>
    h1 {
        color: #434e59;
        font-size: 72px;
        line-height: 1;
        font-weight: 600;
        margin-bottom: 15px;
    }
    h3 {
        color: #a9a9a9;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 30px;
    }
    .ivu-row-flex {
        height: 100%;
    }
    .ivu-col:last-child {
        margin-left: 60px;
    }
</style>
