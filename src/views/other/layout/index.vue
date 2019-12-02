<template>
    <Layout class="layout">
        <Sider class="layout-sider" ref="sider" breakpoint="sm" collapsible hide-trigger :collapsed-width="60" v-model="shrink">
            <shrinkable-menu :shrink="shrink" :menu-list="menus" :open-names="openNames" :active-name="activeName"
                             @on-select="handleMenuOnSelect">
                <router-link slot="top" class="logo" :to="{ name: 'home' }">
                    <img src="~@/assets/img/logo.png" /><h1>管理后台</h1>
                </router-link>
            </shrinkable-menu>
        </Sider>
        <Layout>
            <Header>
                <Row class="layout-header-warp" type="flex" align="middle">
                    <Button type="text" class="navicon" :class="[ this.shrink ? 'rotate-navicon' : '' ]" @click="handleCollapsedSider">
                        <Icon type="md-menu" size="24" />
                    </Button>
                    <Breadcrumb>
                        <template v-for="(item, index) in breadcrumbs">
                            <BreadcrumbItem :to="breadcrumbTo(item, index, breadcrumbs)" :key="`breadcrumb-${item.id}-${index}`">
                                <Icon :type="item.meta.icon" v-if="item.meta && item.meta.icon" />{{ (item.meta && item.meta.title) || item.id }}
                            </BreadcrumbItem>
                        </template>
                    </Breadcrumb>
                    <Row type="flex" justify="end" align="middle" class="user">
                        <full-screen v-model="isFullscreen" />
                        <Dropdown @on-click="handleClickUserDropdown">
                            <a href="javascript:;">
                                <span class="layout-user-name">{{ user.nickname || user.username }}</span>
                                <Icon type="md-arrow-dropdown"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="logout">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </Row>
                <tags-nav :list="tagsList" @on-close="removeTags" />
            </Header>
            <Content>
                <transition name="fade">
                    <keep-alive :include="caches"><router-view /></keep-alive>
                </transition>
            </Content>
        </Layout>
    </Layout>
</template>
<script type="text/babel">
    import { mapGetters, mapActions } from 'vuex'

    import * as api from '@/api'
    import routes from '@/router/routes'
    import { findRouteId } from '@/libs/routes'
    import TagsNav from './components/tags-nav'
    import FullScreen from './components/fullscreen'
    import ShrinkableMenu from './components/shrinkable-menu'

    export default {
        name: 'AppRootLayout',
        provide () {
            return {
                layoutInject: this
            }
        },
        watch: {
            '$route' () { this.setCurrentRoute() }
        },
        computed: mapGetters('app', [
            'user', 'menus', 'routes', 'caches', 'openNames', 'activeName', 'breadcrumbs', 'tagsList'
        ]),
        components: { TagsNav, FullScreen, ShrinkableMenu },
        methods: {
            ...mapActions('app', [ 'logout', 'addTags', 'removeTags' ]),
            ...mapActions('app', {
                setMenus: 'menus',
                setCurrentRoute: 'currentRoute'
            }),

            breadcrumbTo (to, index = 0, breadcrumbs) {
                if (index < breadcrumbs.length - 1) {
                    return to
                }
                return ''
            },
            handleMenuOnSelect (id) {
                const { name, href } = findRouteId(this.routes, id)

                if (href) {
                    window.open(href)
                    return
                }
                this.$router.push({ name })
            },
            handleCollapsedSider () {
                this.shrink = !this.shrink
            },
            async handleClickUserDropdown (name) {
                if (name === 'logout') {
                    try {
                        await api.system.logout()
                        this.logout()
                        this.$router.replace({ name: 'login' })
                    } catch (e) {}
                }
            }
        },
        data () {
            return {
                shrink: false,
                isFullscreen: false
            }
        },
        created () {
            this.setMenus(routes)
            this.setCurrentRoute()
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .layout {
        width: 100%;
        height: 100%;

        &.ivu-layout-has-sider /deep/ > .ivu-layout {
            overflow-y: scroll !important;
        }

        .fade-enter {
            opacity: 0;

            &-active {
                transition: opacity .3s ease;
            }
        }
        .fade-leave-active {
            display: none;
        }
    }
    /deep/ {
        .ivu-layout-sider {
            background-color: #001529;

            .layout-menu {
                margin-top: 15px;
            }
            .layout-menu,
            .ivu-menu-item:hover,
            .ivu-menu-submenu-title:hover,
            .ivu-menu-opened .ivu-menu-submenu-title {
                background-color: transparent;
            }
            .ivu-menu-item-active:not(.ivu-menu-submenu),
            .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
            .ivu-menu-item-active:not(.ivu-menu-submenu):hover,
            .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
                color: #fff;
                background-color: #1890ff;
            }
            .ivu-menu-opened {
                box-shadow: inset 0 2px 8px rgba(0, 0, 0, .45);
                background-color: #000c17;

                > .ivu-menu-submenu-title {
                    color: #fff;
                }
            }
        }
        .layout-sider {

            .logo {
                width: 200px;
                margin: 10px;
                display: flex;
                align-items: center;

                h1 {
                    color: #fff;
                    margin: 0 0 0 15px;
                    display: inline-block;
                    font-size: 18px;
                    font-weight: 600;
                }
                img {
                    width: 36px;
                    height: 36px;
                }
            }
        }
        .ivu-layout-header {
            height: auto;
            padding: 0;
            line-height: normal;
            background-color: transparent;

            .layout-header-warp {
                height: 60px;
                /*padding: 0 20px 0 5px;*/
                box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
                line-height: 60px;
                background-color: #fff;
                position: relative;
                z-index: 1;

                .navicon {
                    $scoped: &;
                    cursor: pointer;
                    transition: all .2s ease-in-out;
                    padding-top: 0;
                    padding-bottom: 0;

                    &:focus {
                        box-shadow: none;
                    }
                    &.rotate-navicon {
                        transform: rotate(-90deg);
                    }
                }
                .ivu-breadcrumb {
                    flex: 1;
                    height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ivu-breadcrumb-item-link {
                    line-height: 1;

                    .ivu-icon {
                        margin-right: 3px;
                    }
                }
                .full-screen-btn {
                    margin-right: 15px;
                }
                .user {
                    padding-left: 15px;
                    padding-right: 20px;
                }
            }
        }
        .ivu-layout-content {
            margin: 15px;
        }
    }
</style>
