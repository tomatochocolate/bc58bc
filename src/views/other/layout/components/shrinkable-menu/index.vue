<template>
    <div class="shrinkable-menu">
        <slot name="top" />
        <sidebar-menu v-if="!shrink"
            :menu-theme="theme" :menu-list="menuList" :open-names="openNames" :active-name="activeName"
            @on-select="handleMenuSelect" />
        <sidebar-menu-shrink v-if="shrink"
            :menu-list="menuList"
            @on-select="handleMenuSelect" />
        <slot />
    </div>
</template>
<script type="text/babel">
    import sidebarMenu from './components/sidebarMenu'
    import sidebarMenuShrink from './components/sidebarMenuShrink'

    export default {
        name: 'ShrinkableMenu',
        components: {
            sidebarMenu,
            sidebarMenuShrink
        },
        props: {
            shrink: {
                type: Boolean,
                default: false
            },
            menuList: {
                type: Array,
                required: true
            },
            theme: {
                type: String,
                default: 'dark',
                validator (vaule) {
                    return [ 'dark', 'light' ].indexOf(vaule) !== -1
                }
            },
            openNames: {
                type: Array
            },
            activeName: String
        },
        methods: {
            handleMenuSelect (name) {
                this.$emit('on-select', name)
            }
        }
    }
</script>
