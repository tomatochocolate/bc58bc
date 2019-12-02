<template>
    <div class="tag-nav-warp">
        <Row class="tags-nav" type="flex">
            <Col class="btn left-btn">
                <Button type="text" @click="scrollBy('-1')"><Icon :size="18" type="ios-arrow-back" /></Button>
            </Col>
            <Col ref="scroll" class="scroll-outer">
                <div class="scroll-body">
                    <div>
                        <template v-for="(item, index) in list">
                            <Tag ref="tagsPageOpened" type="dot"
                                 :class="{ 'ivu-tag-loading': item.meta && item.meta.loading }" :key="`tag-nav-${index}`"
                                 :name="item.name" :closable="item.name !== homeRoute.name" :color="checked(item)" :fade="false"
                                 @click.native="handleClick(item)" @on-close="handleClose(item)"
                            >
                                <div class="spinner" v-if="item.meta && item.meta.loading">
                                    <div class="spinner-icon"/>
                                </div>
                                {{ (item.meta && item.meta.title) || item.name }}
                            </Tag>
                        </template>
                    </div>
                </div>
            </Col>
            <Col class="btn right-btn">
                <Button type="text" @click="scrollBy('1')"><Icon :size="18" type="ios-arrow-forward" /></Button>
            </Col>
            <Col class="close">
                <Dropdown transfer @on-click="handleTagsOption">
                    <Button size="small" type="text"><Icon :size="18" type="ios-close-circle-outline" /></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="close-all">关闭所有</DropdownItem>
                        <DropdownItem name="close-others">关闭其他</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
    </div>
</template>
<script type="text/babel">
    import BScroll from 'better-scroll'
    import { mapGetters } from 'vuex'

    import { on, off, sleep, debounce } from '@/libs/utils'
    import { routeEqual } from '@/libs/routes'

    export default {
        name: 'TagsNav',
        props: {
            value: Object,
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        watch: {
            list () {
                if (!this.scroll) return
                this.$nextTick(() => this.scroll.refresh())
            },
            currentRoute () {
                this.$nextTick(() => this.scrollToElement())
            }
        },
        computed: mapGetters('app', [ 'homeRoute', 'currentRoute' ]),
        methods: {
            checked (item) {
                return routeEqual(this.$route, item) ? 'primary' : 'default'
            },
            handleClick (item) {
                this.$router.push(item)
                this.$emit('on-click', item)
            },
            handleClose (route) {
                this.$emit('on-close', { type: 'others', route })
            },
            handleTagsOption (type) {
                this.$emit('on-close', { type })
            },

            scrollBy (direction) {
                if (
                    !this.scroll ||
                    (direction === '-1' && this.scroll.x === 0) ||
                    (direction === '1' && this.scroll.x <= this.scroll.maxScrollX)
                ) return
                this.scroll.scrollBy(direction === '-1' ? 150 : -150, 0, 350)
            },
            scrollToElement () {
                if (!this.scroll) return

                const { name } = this.currentRoute
                for (let tag of this.$refs.tagsPageOpened) {
                    if (tag.name === name) {
                        this.scroll.scrollToElement(tag.$el, 350, true)
                        break
                    }
                }
            }
        },
        data () {
            return {
                scroll: null,
                resize: null
            }
        },
        mounted () {
            // 有坑就不放methods了
            this.resize = debounce(() => this.scroll && this.scroll.refresh(), 50)
            this.scroll = new BScroll(this.$refs.scroll.$el, {
                bounce: false,
                scrollX: true,
                scrollY: false,
                scrollbar: {
                    fade: true,
                    interactive: true
                },
                mouseWheel: true,
                observeDOM: false
            })
            on(window, 'resize', this.resize)
            this.$nextTick(async () => {
                // 防止加载图标抖动
                await sleep(200)
                this.scroll && this.scroll.refresh()
            })
        },
        beforeDestroy () {
            this.scroll && this.scroll.destroy()
            off(window, 'resize', this.resize)
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    $height: 40px;

    /deep/ {

        .ivu-tag {
            margin-top: 0;
            margin-bottom: 0;

            &:last-child {
                margin-right: 0;
            }

            &.ivu-tag-loading {
                position: relative;

                &:after {
                    cursor: not-allowed;
                    display: block;
                    content: ' ';
                    background-color: rgba(255, 255, 255, .4);
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    top: 0;
                }
                .ivu-tag-dot-inner {
                    background-color: transparent !important;
                }
                .ivu-tag-text {

                    .spinner {
                        display: block;
                    }
                }
            }
        }
        .ivu-tag-dot-inner {
            width: 6px;
            height: 6px;
            margin-right: 5px;
            top: -1px;
        }
        .ivu-tag-text {
            position: relative;

            .spinner {
                width: 12px;
                height: 12px;
                display: none;
                position: absolute;
                left: -14px;
                top: 1px;

                &-icon {
                    width: 12px;
                    height: 12px;
                    border: solid 1px transparent;
                    animation: ivu-tag-spinner .5s linear infinite;
                    box-sizing: border-box;
                    border-radius: 50%;
                    border-top-color: #2D8cF0;
                    border-left-color: #2D8cF0;

                    @keyframes ivu-tag-spinner {
                        0%   { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                }
            }
        }
    }
    .tag-nav-warp {
        height: $height;
        background-color: #F0F0F0;
    }
    .tags-nav {
        height: $height;
    }
    .btn,
    .close {
        width: 32px;
        height: $height;
        line-height: 36px;
        background-color: #fff;

        /deep/ .ivu-btn {
            width: 100%;
            height: $height;
            border: 0;
            padding: 0;
            line-height: 1;
            border-radius: 0;

            &:focus {
                box-shadow: none;
            }
        }
    }
    .close {
        text-align: center;
    }
    .scroll-outer {
        flex: 1;
        margin: 4px 4px 0 4px;
        overflow: hidden;
        position: relative;
    }
    .scroll-body {
        white-space: nowrap;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
