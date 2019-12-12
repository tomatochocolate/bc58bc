<template>
  <div class="help">
     <Collapse v-model="value2" accordion>
        <Panel :bind:name=i v-for="(item,i) in data.listData" v-bind:key=i>
            {{item.title}}
            <p slot="content">{{item.Msg}}</p>
        </Panel>
       
    </Collapse>
 
  </div>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
        value2: '-1',
      data: {
        listData: [
          {
            title: "Q：首次注册",
            Msg: "A：注册赠送试用时长，试用期结束后需购买套餐使用。",
          },
          {
            title: "Q：连接问题",
            Msg: "A：如果您没有购买套餐，请您检查一下免费时长是否用完，如果用完，您需要购买套餐之后才能继续使用。",
          },
          {
            title: "Q：网络问题",
            Msg: "A：请您确认您当前的网络是否可以正常上网，再尝试官网下载一下最新版浏览器，遇到无法连接重启一般重启手机可以解决",
          },
           {
            title: "Q：充值问题",
            Msg: "A：如果您出现充值失败，请您检查一下您使用的支付方式是否成功；如果支付成功，请稍等10分钟，可能充值系统处在维护期有一定延迟。10分钟之后购买的套餐依旧没有到账的话，请您通过客服邮箱联系我们，我们将在第一时间为您解决问题。",
          },
           {
            title: "Q：支持平台",
            Msg: "A：浏览器支持：Android,Windows 两个平台，请到官网下载最新版使用。",
          }
        ]
      }
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    },
    
  }
};
</script>

<style  scoped>
.help ul li .info {
  display: block;
}
ul {
  position: relative;
}
button {
  margin: auto;
  width: 80px;
  margin-top: 10px;
  margin-left: 100px;
}
</style>