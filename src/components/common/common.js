import common from './common'
import changer from '../change/change.vue'
export default {
  //   发送验证码
  getRandomCode: function getRandomCode(e, t) {
    var time = t;
    if (time === 0) {
      time = t;
      $(".checkcodebtn").removeClass("disable");
      $(e).text("发送验证码");
      return;
    } else {
      time--;
      $(e).text("验证码(" + time + "s)");
    }
    setTimeout(function () {
      getRandomCode(e, time);
    }, 1000);
  },

  // 发送请求
  sengAjax: function sengAjax(api, pars,success) {
    const that = this
    $.ajax({
      url: 'http://192.168.0.160:8080/api/qt' + api,
      cache: false,
      method: 'post',
      data: pars,
      beforeSend(request) {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      success: function (json) {
        if (json.code == 0) {
          if (api == '/login') {
            common.setCookie('token', (typeof json.data == 'string' ? eval('(' + json.data + ')') : json.data).token);
            localStorage.setItem("Flag", 'isLogin');
            success()

            var _ua = navigator.userAgent;
            if (_ua.indexOf('Android') > -1 || _ua.indexOf('Adr') > -1) { //安卓终端
              window.console.log('$appcmdex_vpn_loginResponse:' + json.data);
            } else {
              // external.AppCmd(external.GetSID(window), 'vpn', 'loginResponse', json.data, '', function (code, data) {
              //   console.info(code,data)
              // });
            }
          }
          if(api =='/forgotPassword' || api =='/register'){
            success()
            
          }
          // alert(json.msg);
          return;
        }
        // alert(json); 
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
      },
      complete: function () {//无论成功还是失败，都会调用此函数
      }
    });
  },


  //取得渠道
  getChannelId: function getChannelId() {
    var _channelId = common.getPars("channelId");
    return _channelId.length <= 0 ? "GW" : _channelId;
  },

  // 
  getPars: function getPars(_var) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == _var) {
        return pair[1];
      }
    }
    return "";
  },

  // 取得token
  getToken: function getToken() {
    return common.getCookie('token');
  },

  // 取得Cookie值
  getCookie: function getCookie(key) {
    var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    return arr ? unescape(arr[2]) : '';
  },

  // 设置Cookie值
  setCookie: function setCookie(key, value, millis) {
    if (typeof millis != 'number') millis = 1 * 24 * 60 * 60 * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + millis);
    document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },

  // 除去Cookie值
  delCookie: function delCookie(key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = common.getCookie(key);
    if (cval != null) document.cookie = (key + "=" + cval + ";expires=" + exp.toGMTString());
  }
}

