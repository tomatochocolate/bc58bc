<template>
    <Submenu :name="menu.id">
        <template slot="title">
            <Icon v-if="menu.meta.icon" :type="menu.meta.icon" />
            <span>{{ menu.meta.title }}</span>
        </template>
        <template v-for="(item, index) in menu.children">
            <custom-sub-menu :key="`customSubmenu-${level}-${index}`" :level="level + 1" :menu="item" v-if="item.children && item.children.length" />
            <MenuItem :name="item.id" :key="`customSubmenu-${level}-${index}`" v-else>
                <Icon v-if="item.meta.icon" :type="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
            </MenuItem>
        </template>
    </Submenu>
</template>
<script type="text/babel">
    export default {
        name: 'CustomSubMenu',
        props: {
            menu: Object,
            level: {
                type: Number,
                default: 0
            }
        }
    }
</script>
