<template>
  <div class="buy">
    <!-- <div class="product">
      <ul id="goods">
        <li>
          <div class="main">
            <span class="days">包月套餐</span>
            <span class="price">￥48</span>
            <span class="buy">
              <a href="#" goodid="101" class="btn">
                <i class="icon">
                  <img src="../../assets/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价60元&nbsp;&nbsp;</span>
            <span class="save">立省12元</span>
            <span class="average">￥0.2/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">季度套餐</span>
            <span class="price">￥128</span>
            <span class="buy">
              <a href="#" goodid="102" class="btn">
                <i class="icon">
                  <img src="../../assets/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价120元&nbsp;&nbsp;</span>
            <span class="save"></span>
            <span class="average">￥-0.04/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">半年套餐</span>
            <span class="price">￥228</span>
            <span class="buy">
              <a href="#" goodid="103" class="btn">
                <i class="icon">
                  <img src="../../assets/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价360元&nbsp;&nbsp;</span>
            <span class="save">立省132元</span>
            <span class="average">￥0.37/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">全年套餐</span>
            <span class="price">￥399</span>
            <span class="buy">
              <a href="#" goodid="104" class="btn">
                <i class="icon">
                  <img src="../../assets/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价720元&nbsp;&nbsp;</span>
            <span class="save">立省321元</span>
            <span class="average">￥0.45/天</span>
          </div>
        </li>
      </ul>
    </div>-->
    <div class="product">
      <ul id="goods">
        <li>
          <div class="main">
            <span class="days">包月套餐</span>
            <span class="price">￥48</span>
            <span class="buy">
              <a href="#" goodid="101" class="btn">
                <i class="icon">
                  <img src="style/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价60元&nbsp;&nbsp;</span>
            <span class="save">立省12元</span>
            <span class="average">￥0.2/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">季度套餐</span>
            <span class="price">￥128</span>
            <span class="buy">
              <a href="#" goodid="102" class="btn">
                <i class="icon">
                  <img src="style/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价120元&nbsp;&nbsp;</span>
            <span class="save"></span>
            <span class="average">￥-0.04/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">半年套餐</span>
            <span class="price">￥228</span>
            <span class="buy">
              <a href="#" goodid="103" class="btn">
                <i class="icon">
                  <img src="style/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价360元&nbsp;&nbsp;</span>
            <span class="save">立省132元</span>
            <span class="average">￥0.37/天</span>
          </div>
        </li>
        <li>
          <div class="main">
            <span class="days">全年套餐</span>
            <span class="price">￥399</span>
            <span class="buy">
              <a href="#" goodid="104" class="btn">
                <i class="icon">
                  <img src="style/buy.png" alt />
                </i>
                <span>购买</span>
              </a>
            </span>
          </div>
          <div class="info">
            <span class="oldprice">原价720元&nbsp;&nbsp;</span>
            <span class="save">立省321元</span>
            <span class="average">￥0.45/天</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="buylist">
      <div class="buybox">
        <div class="head">选择支付方式</div>
        <a href="javascript:;" class="close">X</a>
        <ul>
          <li>
            <a href="javascript:;" class="alipay">
              <i>
                <img src="../../assets/zfb.png" alt />
              </i>
              <span>支付宝</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="wechat">
              <i>
                <img src="../../assets/wx.png" alt />
              </i>
              <span>微信</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      id="payload"
      style="display: none;width: 100%;height: 100%; top: 0; position: absolute;background: rgba(0,0,0,.5)"
    >
      <div
        id="payloadText"
        style="width:330px; margin:90px auto 0 auto;background: #fff;padding: 20px;position: relative"
      >正在跳转，请耐心等待...</div>
    </div>
  </div>
</template>


<script >
import common from "../common/common";

export default {
  name: "buy",
  data() {
    return {
      code: 0,
      data: [
        {
          id: 101,
          price: 48.0,
          priceDay: 0.2,
          priceSave: 12,
          priceShow: 60,
          title: "包月套餐"
        },
        {
          id: 102,
          price: 128.0,
          priceDay: -0.04,
          priceSave: -8,
          priceShow: 120,
          title: "季度套餐"
        },
        {
          id: 103,
          price: 228.0,
          priceDay: 0.37,
          priceSave: 132,
          priceShow: 360,
          title: "半年套餐"
        },
        {
          id: 104,
          price: 399.0,
          priceDay: 0.45,
          priceSave: 321,
          priceShow: 720,
          title: "全年套餐"
        }
      ],
      msg: "加载成功"
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    }
  },
  created: function() {
    var selectGoodId = 0; // 当前选择的产品套餐
    var token = common.getToken();

    if (token.length <= 0) {
      $("#goods").html('请先&nbsp;&nbsp;<a href="login.html">登录</a>');
    } else {
      $.ajax({
        url: "http://192.168.0.160:8080/api/qt/goods",
        cache: false,
        type: "post",
        beforeSend: function(xhr) {
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.setRequestHeader("token", token);
        },
        success: function(json) {
          if (json.code == 0) {
            setGoodsList(
              typeof json.data == "string"
                ? eval("(" + json.data + ")")
                : json.data
            );
            return;
          }
          $("#goods").html(json.msg);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $("#goods").html(
            "发生错误，HTTP代码是" + (jqXHR ? jqXHR.status : "未知")
          );
        },
        complete: function() {
          //无论成功还是失败，都会调用此函数
        }
      });
    }

    function setGoodsList(list) {
      // var str = "";
      // for (var i = 0; i < list.length; i++) {
      //   var _id = list[i].id;
      //   var _price = list[i].price;
      //   var _priceDay = list[i].priceDay;
      //   var _title = list[i].title;
      //   var _priceShow = list[i].priceShow;
      //   var _priceSave = list[i].priceSave;
      //   //alert('_id='+_id+'\n'+'_price='+_price+'\n'+'_priceDay='+_priceDay+'\n'+'_title='+_title+'\n'+'_priceShow='+_priceShow+'\n'+'_priceSave='+_priceSave+'\n');
      //   str += "<li>";
      //   str += '<div class="main">';
      //   str +=
      //     '<span class="days">' +
      //     _title +
      //     '</span><span class="price">￥' +
      //     _price +
      //     '</span><span class="buy">';
      //   str +=
      //     '<a href="#" goodId="' +
      //     _id +
      //     '" class="btn"><i class="icon"><img src="../../assets/buy.png" alt=""></i><span>购买</span></a>';
      //   str += "</span>";
      //   str += "</div>";
      //   str += '<div class="info">';
      //   str +=
      //     '<span class="oldprice">原价' +
      //     _priceShow +
      //     '元&nbsp;&nbsp;</span><span class="save">' +
      //     (_priceSave > 0 ? "立省" + _priceSave + "元" : "") +
      //     '</span><span class="average">￥' +
      //     (_priceDay + "").substring(0, 8) +
      //     "/天</span>";
      //   str += "</div>";
      //   str += "</li>";
      // }
      // $("#goods").html(str);

      $(".product .btn").click(function() {
        selectGoodId = $(this).attr("goodId"); //设置当前选择的产品套餐
        $(".buylist").addClass("show"); //显示选择支付方式

        $(".buylist .close").click(function() {
          //关闭 不支持
          selectGoodId = 0; //清空当前选择的产品套餐
          $(".buylist").removeClass("show"); //隐藏选择支付方式
        });

        $(".buylist .alipay").click(function() {
          //选择 支付宝
          goPay("alipay");
        });

        $(".buylist .wechat").click(function() {
          //选择 微信
          goPay("wechat");
        });
      });
    }

    function goPay(payChannel) {
      //alert('selectGoodId='+selectGoodId+'\npayChannel='+payChannel+'\ntoken='+token);
      $("#payload").show();
      $.ajax({
        url: "http://192.168.0.160:8080/api/qt/pay",
        cache: false,
        type: "post",
        data: { goodsId: selectGoodId, payChannel: payChannel },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("token", token);
        },
        success: function(json) {
          if (json.code == 0) {
            //alert(json.data.payUrl);
            var _json =
              typeof json.data == "string"
                ? eval("(" + json.data + ")")
                : json.data;
            var orderNo = _json.orderNo;
            var payUrl = _json.payUrl;
            if (orderNo.length > 0 && payUrl.length > 0) {
              setCookie("orderNo", orderNo, 5 * 60 * 1000); //5分钟有效
              $("#payloadText").html(
                "请在新窗口完成支付后，回到订单页面刷新查看"
              );
              window.open(payUrl, "_blank");
            } else {
              $("#payload").hide();
              alert("请求返回不存在有效的订单编号或支付URL");
            }
            return;
          }
          $("#payload").hide();
          alert(json.msg);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("发生错误，HTTP代码是" + (jqXHR ? jqXHR.status : "未知"));
        },
        complete: function() {
          //无论成功还是失败，都会调用此函数
        }
      });
    }
  }
};
</script>

<style scoped>
.product ul li .main .price {
  width: 25%;
}
</style>