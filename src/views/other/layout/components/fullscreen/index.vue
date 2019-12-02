<template>
    <div class="full-screen-btn" v-if="enabled">
        <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
            <Icon @click.native="handleFullscreen" :type="value ? 'md-contract' : 'md-expand'" :size="23" />
        </Tooltip>
    </div>
</template>
<script type="text/babel">
    import fullscreen from './fullscreen'

    export default {
        name: 'Fullscreen',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleFullscreen () { fullscreen.toggle() }
        },
        data () {
            return { enabled: fullscreen.enabled }
        },
        mounted () {
            if (this.enabled) {
                fullscreen.on('change', event => {
                    this.$emit('input', !this.value)
                    this.$emit('on-change', !this.value)
                })
            }
        },
        beforeDestroy () {
            this.enabled && fullscreen.off('change')
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .full-screen-btn {
        cursor: pointer;

        /deep/ .ivu-icon {
            font-size: 18px !important;
        }
    }
</style>
