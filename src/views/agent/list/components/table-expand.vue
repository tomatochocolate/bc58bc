<template>
    <Row class="expand-row">
        <Col span="8">
            <span class="expand-key">Job: </span>
            <span class="expand-value">{{ row.job }}</span>
        </Col>
        <Col span="8">
            <span class="expand-key">Interest: </span>
            <span class="expand-value">{{ row.interest }}</span>
        </Col>
        <Col span="8">
            <span class="expand-key">Birthday: </span>
            <span class="expand-value">{{ row.birthday }}</span>
        </Col>
    </Row>
</template>
<script type="text/babel">
    export default {
        name: 'TableExpand'
    }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
