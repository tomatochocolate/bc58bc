// var token = getToken();
// if (token.length <= 0) {
//     $('#con').html('请先&nbsp;&nbsp;<a href="login.html" style="font-size:12px;color:blue;text-decoration:underline">登录</a>')
// } else {
//     $(".btn").click(function () {
//         var cardSerial = $("#cardSerial").val();
//         if (cardSerial.length <= 0) {
//             alert("请填写");
//             return false;
//         }
//         var _url = apiUrl + 'api/qt/pay/cart';
//         $.ajax({
//             url: _url,
//             cache: false,
//             type: 'post',
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader('token', token);
//             },
//             data: { cardPassword: cardSerial },
//             success: function (json) {
//                 if (json.code == 0 && json.paySuccess == 'true') {
//                     window.location.href = 'user_center_order.html';
//                     return;
//                 }
//                 alert(json.msg);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 alert('发生错误，HTTP代码是' + (jqXHR ? jqXHR.status : '未知'));
//             },
//             complete: function () {//无论成功还是失败，都会调用此函数
//             }
//         });
//     });
// }