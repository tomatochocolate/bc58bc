<template>
  <div class="feedback">
    <table>
      <tr>
        <td colspan="2" align="center">
          <h2>意见反馈</h2>
        </td>
      </tr>
      <tr>
        <td>
          <label>联系方式</label>
        </td>
        <td>
          <i-Input v-model="value3" size="small" placeholder="请填写联系方式"  />
        </td>
      </tr>
      <tr>
        <td>
          <label>反馈内容</label>
        </td>
        <td>
          <i-Input
            v-model="value17"
            maxlength="300"
            show-word-limit
            type="textarea"
            placeholder="Enter something..."
            style="width: 200px"
            class="fmore"
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button>提交反馈</button>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import "../../public/rem"
export default {
  data() {
    return {
      name: "feedback",
      value17: "",
      value3: ""
    };
  }
};
</script>

<style scoped>
table {
  margin:50px auto;
}
h2{
    text-align: center
}
.ivu-input{
    min-height: 100px;
}
</style>>

  
 
 


   