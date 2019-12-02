<template>
    <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
        <Row type="flex">
            <Col span="10" :style="{ background: color }">
                <Row type="flex" justify="center" align="middle">
                    <Col><Icon :type="icon" :size="iconSize" color="#fff" /></Col>
                </Row>
            </Col>
            <Col span="14" >
                <slot></slot>
            </Col>
        </Row>
    </Card>
</template>
<script type="text/babel">
    export default {
        name: 'InforCard',
        props: {
            color: {
                type: String,
                default: '#2d8cf0'
            },
            icon: {
                type: String,
                default: ''
            },
            iconSize: {
                type: Number,
                default: 20
            },
            shadow: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .info-card-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    /deep/ {
        .ivu-row-flex,
        .ivu-card-body {
            width: 100%;
            height: 100%;
        }
        .ivu-col {
            text-align: center;
        }
    }
</style>
