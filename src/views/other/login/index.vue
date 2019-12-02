<template>
    <Row type="flex" align="middle" justify="center" v-if="isReady">
        <Col :xs="20" :sm="20" :md="8" :lg="5">
            <h1 class="title"><Icon type="md-log-in" />欢迎登录</h1>
            <Form ref="form" :model="params" :rules="rules" @keydown.enter.native="validate">
                <FormItem prop="username">
                    <Input v-model="params.username" :maxlength="16" placeholder="账号">
                        <span slot="prepend"><Icon :size="16" type="md-person" /></span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="params.password" :maxlength="16" placeholder="密码">
                        <span slot="prepend"><Icon :size="14" type="md-lock"/></span>
                    </Input>
                </FormItem>
                <FormItem prop="captcha" class="captcha">
                    <Input v-model="params.captcha" :maxlength="16" placeholder="图形验证码">
                        <span slot="prepend"><Icon type="md-image" /></span>
                        <span slot="append" class="img"><img :src="captcha_base64" @click="captcha"></span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary" :loading="isSubmit" @click="validate">登录</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script type="text/babel">
    import { system } from '@/api'

    export default {
        name: 'Login',
        methods: {
            async validate () {
                if (this.isSubmit) return
                if (!await this.$refs.form.validate()) return

                this.isSubmit = true
                try {
                    const { data, code, message } = await system.login(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        await this.captcha()
                        return
                    }
                    this.$store.dispatch('app/login', data)
                    this.$Message.success('登录成功')
                    this.$router.replace({ name: 'home' })
                } catch (e) {
                    this.isSubmit = false
                }
            },
            async captcha () {
                this.params.hash = ''
                this.params.captcha = ''
                try {
                    const { data } = await system.captcha()
                    this.params.hash = data.hash
                    this.captcha_base64 = data.base64
                    return Promise.resolve()
                } catch (e) {
                    return Promise.reject(e)
                }
            }
        },
        data () {
            return {
                params: {
                    hash: '',
                    captcha: '',
                    username: '',
                    password: ''
                },
                rules: {
                    username: { required: true, message: '请输入用户名', trigger: 'change blur' },
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { min: 6, max: 16, message: '请输入6~16位的密码', trigger: 'change blur' }
                    ],
                    captcha: { required: true, message: '请输入图形验证码', trigger: 'change blur' }
                },
                isSubmit: false,
                captcha_base64: ''
            }
        },
        async mounted () {
            await this.captcha()
            this.isReady = true
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .ivu-row-flex {
        width: 100%;
        height: 100%;
        background-image: url('./img/bg.svg');
        background-color: #F0F2F5;
    }
    .title {
        font-size: 28px;
        text-align: center;
        font-weight: 600;
        line-height: 1;
        margin-bottom: 40px;

        .ivu-icon {
            padding-right: 5px;
        }
    }
    .captcha {

        /deep/ .ivu-input-group-append {
            padding: 0;
            overflow: hidden;
        }
        .img {
            width: 90px;
            height: 30px;
            cursor: pointer;
            display: block;

            img {
                height: auto;
                max-width: 100%;
                display: block;
            }
        }
    }
</style>
