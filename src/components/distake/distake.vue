<template>
    <div>
    <div class="content">出错了404
      <button @click="goLogin">返回登录</button>
    </div>
    </div>
    
</template>

<script>
export default {
  name: 'distake',
  data () {
    return {
    }
  },
  methods:{
    goLogin(){
		   this.$router.push('/login');
	  }
  }
}
</script>
<style scoped>
         html,body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    
        body {
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
            justify-content: center; /*定义body的里的元素水平居中*/
        }
        .content {
            width: 100%;
            height: 100%;
            margin: auto;
            text-align: center; 
            line-height: 300px;
            font-size: 50px    
        }
        button{
            width: 100px;
            height: 50px;
            margin: auto;
            position: relative;
            top: 50px;
            left: -170px;
        }
</style>