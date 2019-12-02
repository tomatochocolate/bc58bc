<template>
    <div id="app"><router-view ref="main" /></div>
</template>
<script type="text/babel">
    import enquire from 'enquire.js/dist/enquire'
    import { mapActions } from 'vuex'

    export default {
        name: 'App',
        provide () {
            return {
                appInject: this
            }
        },
        methods: mapActions('app', [ 'breakpoints' ]),

        mounted () {
            const self = this

            enquire.register('screen and (max-width: 575px)', {
                match () { self.breakpoints({ xs: true }) },
                unmatch () { self.breakpoints({ xs: false }) }
            })
            enquire.register('screen and (min-width: 576px) and (max-width: 767px)', {
                match () { self.breakpoints({ sm: true }) },
                unmatch () { self.breakpoints({ sm: false }) }
            })
            enquire.register('screen and (min-width: 768px) and (max-width: 991px)', {
                match () { self.breakpoints({ md: true }) },
                unmatch () { self.breakpoints({ md: false }) }
            })
            enquire.register('screen and (min-width: 992px) and (max-width: 1199px)', {
                match () { self.breakpoints({ lg: true }) },
                unmatch () { self.breakpoints({ lg: false }) }
            })
            enquire.register('screen and (min-width: 1200px) and (max-width: 1599px)', {
                match () { self.breakpoints({ xl: true }) },
                unmatch () { self.breakpoints({ xl: false }) }
            })
            enquire.register('screen and (min-width: 1600px)', {
                match () { self.breakpoints({ xxl: true }) },
                unmatch () { self.breakpoints({ xxl: false }) }
            })
        }
    }
</script>
<style lang="scss" type="text/scss">
    html, body, #app {
        height: 100%;
        -webkit-text-size-adjust: 100%;
    }
    .ivu-spin-fix {
        background-color: rgba(255, 255, 255, .4)
    }
    .ivu-btn-text {
        border: 0;
        border-radius: 0;

        &:first-child {
            margin-left: 0;
        }
        &:hover {
            background-color: transparent;
        }
        &:focus {
            box-shadow: none;
        }
    }
    .text {

        &-primary {
            color: #2d8cf0;

            &-light {
                color: #5cadff;
            }
            &-dark {
                color: #2b85e4;
            }
        }
        &-info {
            color: #2db7f5;
        }
        &-success {
            color: #19be6b;
        }
        &-warning {
            color: #ff9900;
        }
        &-error {
            color: #ed4014;
        }
        &-disabled {
            color: #c5c8ce;
        }
    }
    .label {
        color: #fff;
        display: inline;
        padding: 3px 5px;
        text-align: center;
        box-sizing: border-box;
        line-height: 1;
        white-space: nowrap;
        border-radius: 4px;
        vertical-align: baseline;

        &-primary {
            background-color: #2d8cf0;

            &-light {
                background-color: #5cadff;
            }
            &-dark {
                background-color: #2b85e4;
            }
        }
        &-info {
            background-color: #2db7f5;
        }
        &-success {
            background-color: #19be6b;
        }
        &-warning {
            background-color: #ff9900;
        }
        &-error {
            background-color: #ed4014;
        }
    }
    .ivu-spin-show-text {

        .ivu-spin-dot {
            margin: 0 auto 20px auto;
            display: block;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
</style>
