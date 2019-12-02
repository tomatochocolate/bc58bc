<template>
    <Row type="flex" align="middle" justify="center">
        <Col><img src="./img/develop.svg"></Col>
        <Col>
            <h3>抱歉，该页面在正开发中</h3>
        </Col>
    </Row>
</template>
<script type="text/babel">
    export default {
        name: 'Develop'
    }
</script>
<style lang="scss" type="text/scss" scoped>
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
