/**
 * iview
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2018/08/02 09:18
 */
import Tag from 'iview/src/components/tag'
import Spin from 'iview/src/components/spin'
import Card from 'iview/src/components/card'
import Form from 'iview/src/components/form'
import Icon from 'iview/src/components/icon'
import Menu from 'iview/src/components/menu'
import Tabs from 'iview/src/components/tabs'
import Modal from 'iview/src/components/modal'
import Steps from 'iview/src/components/steps'
import Radio from 'iview/src/components/radio'
import Input from 'iview/src/components/input'
import Table from 'iview/src/components/table'
import Switch from 'iview/src/components/switch'
import Drawer from 'iview/src/components/drawer'
import Upload from 'iview/src/components/upload'
import Poptip from 'iview/src/components/poptip'
import Button from 'iview/src/components/button'
import Layout from 'iview/src/components/layout'
import Message from 'iview/src/components/message'
import Tooltip from 'iview/src/components/tooltip'
import Divider from 'iview/src/components/divider'
import Cascader from 'iview/src/components/cascader'
import Checkbox from 'iview/src/components/checkbox'
import Progress from 'iview/src/components/progress'
import Dropdown from 'iview/src/components/dropdown'
import DatePicker from 'iview/src/components/date-picker'
import TimePicker from 'iview/src/components/time-picker'
import LoadingBar from 'iview/src/components/loading-bar'
import Breadcrumb from 'iview/src/components/breadcrumb'
import InputNumber from 'iview/src/components/input-number'
import { Row, Col } from 'iview/src/components/grid'
import { Select, Option, OptionGroup } from 'iview/src/components/select'

import './index.less'

export const components = {
    // 基础
    Button, ButtonGroup: Button.Group, Icon,
    // 布局
    Row, Col, Card, Sider: Layout.Sider, Header: Layout.Header, Layout, Content: Layout.Content, Divider,
    // 导航
    Dropdown, DropdownItem: Dropdown.Item, DropdownMenu: Dropdown.Menu, LoadingBar, Breadcrumb, BreadcrumbItem: Breadcrumb.Item,
    Menu, Submenu: Menu.Sub, MenuGroup: Menu.Group, MenuItem: Menu.Item, Tabs, TabPane: Tabs.Pane, Steps, Step: Steps.Step,
    // 表单
    Form, FormItem: Form.Item, Input, InputNumber, Checkbox, CheckboxGroup: Checkbox.Group, Radio, RadioGroup: Radio.Group,
    Select, Option: Option, OptionGroup, Upload, Cascader, Table, DatePicker, TimePicker, iSwitch: Switch,
    // 视图
    Message, Modal, Tooltip, Poptip, Spin, Tag, Drawer, Progress
}
const install = (Vue, opts = {}) => {
    if (install.installed) return

    Object.keys(components).forEach(key => Vue.component(key, components[key]))
    Vue.prototype.$IVIEW = {
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : '',
        menu: {
            arrow: opts.menu ? opts.menu.arrow ? opts.menu.arrow : '' : '',
            customArrow: opts.menu ? opts.menu.customArrow ? opts.menu.customArrow : '' : '',
            arrowSize: opts.menu ? opts.menu.arrowSize ? opts.menu.arrowSize : '' : ''
        },
        select: {
            arrow: opts.select ? opts.select.arrow ? opts.select.arrow : '' : '',
            customArrow: opts.select ? opts.select.customArrow ? opts.select.customArrow : '' : '',
            arrowSize: opts.select ? opts.select.arrowSize ? opts.select.arrowSize : '' : ''
        },
        cascader: {
            arrow: opts.cascader ? opts.cascader.arrow ? opts.cascader.arrow : '' : '',
            customArrow: opts.cascader ? opts.cascader.customArrow ? opts.cascader.customArrow : '' : '',
            arrowSize: opts.cascader ? opts.cascader.arrowSize ? opts.cascader.arrowSize : '' : '',
            itemArrow: opts.cascader ? opts.cascader.itemArrow ? opts.cascader.itemArrow : '' : '',
            customItemArrow: opts.cascader ? opts.cascader.customItemArrow ? opts.cascader.customItemArrow : '' : '',
            itemArrowSize: opts.cascader ? opts.cascader.itemArrowSize ? opts.cascader.itemArrowSize : '' : ''
        },
        datePicker: {
            icon: opts.datePicker ? opts.datePicker.icon ? opts.datePicker.icon : '' : '',
            customIcon: opts.datePicker ? opts.datePicker.customIcon ? opts.datePicker.customIcon : '' : '',
            iconSize: opts.datePicker ? opts.datePicker.iconSize ? opts.datePicker.iconSize : '' : ''
        },
        timePicker: {
            icon: opts.timePicker ? opts.timePicker.icon ? opts.timePicker.icon : '' : '',
            customIcon: opts.timePicker ? opts.timePicker.customIcon ? opts.timePicker.customIcon : '' : '',
            iconSize: opts.timePicker ? opts.timePicker.iconSize ? opts.timePicker.iconSize : '' : ''
        },
        tabs: {
            closeIcon: opts.tabs ? opts.tabs.closeIcon ? opts.tabs.closeIcon : '' : '',
            customCloseIcon: opts.tabs ? opts.tabs.customCloseIcon ? opts.tabs.customCloseIcon : '' : '',
            closeIconSize: opts.tabs ? opts.tabs.closeIconSize ? opts.tabs.closeIconSize : '' : ''
        },
        modal: {
            maskClosable: opts.modal ? 'maskClosable' in opts.modal ? opts.modal.maskClosable : '' : ''
        }
    }
    Vue.prototype.$Loading = LoadingBar
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
    Vue.prototype.$Spin = Spin
}

export default {
    install,
    ...components
}
