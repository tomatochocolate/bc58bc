<template>
    <div class="menu-shrink">
        <template v-for="(menu, index) in menuList">
            <Dropdown placement="right-start" :key="`menu-shrink-${index}`"
                      v-if="menu.children && menu.children.length"
                      @on-select="handleMenuSelect">
                <Button long type="text"><Icon :type="menu.meta.icon" v-if="menu.meta.icon" /></Button>
                <DropdownMenu slot="list">
                    <template v-for="(subMenu, subMenuIndex) in menu.children">
                        <custom-dropdown :key="`custom-dropdown-${subMenuIndex}`" :menu="subMenu" :level="subMenuIndex"
                                         v-if="subMenu.children && subMenu.children.length" />
                        <DropdownItem :name="subMenu.name" :key="`menu-shrink-dropdown-${subMenuIndex}`"
                                      v-else>
                            <Icon :type="subMenu.meta.icon" v-if="subMenu.meta.icon" />
                            <span class="title">{{ subMenu.meta.title }}</span>
                        </DropdownItem>
                    </template>
                </DropdownMenu>
            </Dropdown>
            <Button long type="text"
                    :key="`menu-shrink-${index}`"
                    v-else
                    @click="handleMenuSelect(menu.name)">
                <Icon :type="menu.meta.icon" v-if="menu.meta.icon" />
            </Button>
        </template>
    </div>
</template>
<script type="text/babel">
    import CustomDropdown from './components/custom-dropdown'

    export default {
        name: 'sidebarMenuShrink',
        provide () {
            return {
                sidebarMenuShrink: this
            }
        },
        props: {
            menuList: {
                type: Array
            }
        },
        components: { CustomDropdown },
        methods: {
            handleMenuSelect (name) {
                this.$emit('on-select', name)
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ {

        > .ivu-dropdown .ivu-btn {
            width: 60px;
        }
        .ivu-btn-text {
            color: #fff;
            border: 0;
            padding: 15px 0;
            font-size: 20px;
            line-height: normal;
            border-radius: 0;
        }
    }
</style>
