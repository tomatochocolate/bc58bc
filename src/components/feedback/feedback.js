
(function () {
    // context
    let $context = $(navigator.userAgent.match(/Windows/) ? '#pg_form_pc' : '#pg_form_mobile').removeAttr('hidden')

    // effects
    let $txt_desc = $('[name=txt_desc]', $context),
        $txt_contact = $('[name=txt_tel]', $context),
        $btn_submit = $('#btn_submit', $context),
        $toast = $('#div-toast');

    $txt_desc.add($txt_contact).on('keyup', function (e) {
        if ($txt_desc.val().trim() !== '' && $txt_contact.val().trim() !== '') {
            $btn_submit.removeClass('btn-disabled')
        } else {
            $btn_submit.addClass('btn-disabled')
        }
    }).trigger('keyup')

    // data
    let deviceData = {
        url: '',
        os: '',
        os_version: '',
        version: '',
        rc: '',
        cid: '',
        brand: '',
        model: ''
    }

    // submit
    $btn_submit.click(function (e) {

        if ($(e.srcElement).hasClass('btn-disabled')) {
            if ($txt_desc.val().trim() === '') {
                $txt_desc.focus()
                showToast('请输入反馈内容')
            } else if ($txt_contact.val().trim() === '') {
                $txt_contact.focus()
                showToast('请输入联系方式')
            }
            return
        }

        if (deviceData.url === '') {
            getClientData((msg) => {
                msg ? showToast(msg) : $btn_submit.trigger('click')
            })
            return
        }

        const URL = `${deviceData.url}${deviceData.url.indexOf('app=kkaccess') > -1 ? '' : '?app=kkaccess'}`;

        $.ajax({
            type: 'POST',
            url: URL,
            contentType: 'application/x-www-form-urlencoded',
            data: Object.assign({}, deviceData, {
                content: $txt_desc.val(),
                contact_text: $txt_contact.val(),
                pid: 'kkaccess',
                opt: '1'
            }),
            jsonp: 'cb',
            dataType: 'jsonp',
            cache: false,
            beforeSend: function (xhr, settings) {
                $(e.srcElement).addClass('btn-disabled')
            },
            success: function (data, status, xhr) {
                if (data && data.errno === 0) {
                    showToast(data.errmsg, () => {
                        console.log('$appcmdex_goback')
                        window.webkit && window.webkit.messageHandlers.closeWebPage.postMessage('')
                        window.external && external.AppCmd(external.GetSID(window), '', 'OpenHomePage', '', '', function (code, msg) { })
                    })
                } else if (data && data.errmsg) {
                    showToast(data.errmsg)
                } else {
                    showToast('提交失败，请重试')
                }
            },
            error: function (xhr, errorType, error) {
                showToast('提交失败，请重试')
            },
            complete: function (xhr, status) {
                $(e.srcElement).removeClass('btn-disabled')
            }
        })
    })

    function showToast(msg, callback) {
        $toast.text(msg).show()
        setTimeout(() => {
            $toast.hide()
            callback && callback()
        }, 3000)
    }

    // Get device info by client
    // for PC-Browser
    function getClientData(cb) {
        if (window.external && external.AppCmd) {
            external.AppCmd(external.GetSID(window), "", "GetClientVersion", "", "", function (code, version) { deviceData.version = version })
            external.AppCmd(external.GetSID(window), "", "GetClientRc", "", "", function (code, rc) { deviceData.rc = rc })
            external.AppCmd(external.GetSID(window), "", "GetClientCid", "", "", function (code, cid) { deviceData.cid = cid })
            external.AppCmd(external.GetSID(window), "", "GetOemServer", "", "", function (code, url) { deviceData.url = url })

            let OS = navigator.userAgent.match(/\([^\)]*\)/)[0].replace(/\(|\)/g, '')
            deviceData.os =
                (OS.match('Windows') && 'Windows') ||
                (OS.match('Mac OS X') && 'Mac OS X') ||
                (OS.match('Linux') && 'Linux');
            deviceData.os_version =
                (deviceData.os === 'Windows' && OS.match(/Windows NT (.+);/))[1] ||
                (deviceData.os === 'Mac OS X' && OS.match(/Mac OS X (.+)/))[1] ||
                (deviceData.os === 'Linux' && OS.match(/Linux (.+);/))[1] || '';
        } else {
            // for iOS-Android-Browser [iOS initiative]
            window.queryClientInfo = function (data) {
                deviceData = Object.assign({}, deviceData, data)
            }
            window.__$_qihoo360_$__ && window.__$_qihoo360_$__.notifyClientInfo()
            window.webkit && window.webkit.messageHandlers.notifyClientInfo.postMessage('')
            console.log("$appcmdex_getappInfo:queryClientInfo")
        }

        if (cb) {
            cb(!deviceData.url || deviceData.url === '' ? '无法获取客户端参数' : null)
        }
        setTimeout(() => console.log(deviceData, '-- deviceData --'), 3000)
    }

    getClientData()

    // show&hide header
    $('#header')[location.search.indexOf('hasTitleBar=true') > -1 ? 'addClass' : 'removeClass']('hide')

})();



