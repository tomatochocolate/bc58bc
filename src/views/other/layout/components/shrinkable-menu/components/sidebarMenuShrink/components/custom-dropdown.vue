<template>
    <Dropdown placement="right-start" @on-click="handleMenuSelect">
        <DropdownItem>
            <div class="btn">
                <Icon :type="menu.meta.icon" v-if="menu.meta.icon" />
                <span class="title">{{ menu.meta.title }}</span>
            </div>
            <Icon type="ios-arrow-forward" />
        </DropdownItem>
        <DropdownMenu slot="list">
            <template v-for="(subMenu, subMenuIndex) in menu.children">
                <custom-dropdown :key="`custom-dropdown-${level}-${subMenuIndex}`" :menu="subMenu" :level="subMenuIndex + 1"
                                 v-if="subMenu.children && subMenu.children.length" />
                <DropdownItem :name="subMenu.name" :key="`menu-shrink-dropdown-${subMenuIndex}`"
                              v-else>
                    <Icon :type="subMenu.meta.icon" v-if="subMenu.meta.icon" />
                    <span class="title">{{ subMenu.meta.title }}</span>
                </DropdownItem>
            </template>
        </DropdownMenu>
    </Dropdown>
</template>
<script type="text/babel">
    export default {
        name: 'CustomDropdown',
        inject: [ 'sidebarMenuShrink' ],
        props: {
            menu: Object,
            level: [ String, Number ]
        },
        methods: {
            handleMenuSelect (name) {
                this.sidebarMenuShrink.$emit('on-select', name)
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ {

        .ivu-dropdown-rel .ivu-dropdown-item {
            display: flex;

            .btn {
                flex: 1;
            }
            .ivu-icon {
                margin-top: 3px;
            }
        }
    }
</style>
