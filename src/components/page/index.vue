<template>
    <Row type="flex" :justify="(simple || (breakpoints.xs || breakpoints.sm)) ? 'center' : 'end'">
        <Page v-bind="$attrs" v-on="$listeners"
              :simple="simple || (breakpoints.xs || breakpoints.sm)" :transfer="transfer"
              :page-size="pageSize" :show-sizer="showSizer" :show-total="showTotal"
              :show-elevator="showElevator" :page-size-opts="pageSizeOpts" />
    </Row>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Page from 'iview/src/components/page'

    import { page } from '@/config'
    const { pageSize, showSizer, showTotal, showElevator, pageSizeOpts } = page
    export default {
        name: 'VPage',
        inheritAttrs: false,
        props: {
            simple: {
                type: Boolean,
                default: false
            },
            transfer: {
                type: Boolean,
                default: true
            },
            pageSize: {
                type: Number,
                default: pageSize
            },
            showSizer: {
                type: Boolean,
                default: showSizer
            },
            showTotal: {
                type: Boolean,
                default: showTotal
            },
            showElevator: {
                type: Boolean,
                default: showElevator
            },
            pageSizeOpts: {
                type: Array,
                default () {
                    return pageSizeOpts
                }
            }
        },
        computed: mapGetters('app', [ 'breakpoints' ]),
        components: { Page }
    }
</script>
<style>
    .ivu-page-options-elevator input {
        text-align: center;
    }
</style>
