<template>
    <Menu ref="menu" class="layout-menu" width="auto" accordion
          :theme="menuTheme" :open-names="openNames" :active-name="activeName"
          @on-select="handleMenuSelect">
        <template v-for="(menu, index) in menuList">
            <custom-sub-menu :menu="menu" :key="`customSubmenu-${index}`" :level="index" v-if="menu.children && menu.children.length" />
            <MenuItem :name="menu.id" :key="`menu-${index}`" v-else>
                <Icon v-if="menu.meta.icon" :type="menu.meta.icon" />
                <span>{{ menu.meta.title }}</span>
            </MenuItem>
        </template>
    </Menu>
</template>
<script type="text/babel">
    import CustomSubMenu from './components/custom-submenu'

    export default {
        name: 'sidebarMenu',
        props: {
            menuList: Array,
            iconSize: Number,
            menuTheme: {
                type: String,
                default: 'dark'
            },
            openNames: {
                type: Array
            },
            activeName: String
        },
        components: { CustomSubMenu },
        watch: {
            openNames () {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                    this.$refs.menu.updateActiveName()
                })
            }
        },
        methods: {
            handleMenuSelect (active) {
                this.$emit('on-select', active)
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
                this.$refs.menu.updateActiveName()
            })
        }
    }
</script>
