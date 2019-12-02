<template>
    <Modal mask-closable scrollable title="批量导入账号"
           :width="500" :loading="isSubmit"
           v-model="show">
        <div class="btn-group">
            <Button><Icon type="md-cloud-download" size="18" />下载导入模板</Button>
        </div>
        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-area">
                <Icon type="ios-cloud-upload" size="52" />
                <p>单击或拖动文件到此处上传</p>
            </div>
        </Upload>
    </Modal>
</template>
<script type="text/babel">
    export default {
        name: 'ImportAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },

        data () {
            return {
                show: this.value,
                isSubmit: false
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .btn-group {
        margin-bottom: 15px;

        /deep/ .ivu-icon {
            margin-right: 5px;
        }
    }
    .upload-area {
        padding: 50px 0;
    }
    /deep/ .ivu-icon {
        color: #3399ff;
    }
</style>
