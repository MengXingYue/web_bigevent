// index.html入口函数
$(function() {
    // 调用 getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer
        // 点击退出事件

    $('#bynLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
            //do somethin
            // 清空本地存储的token
            localStorage.removeItem('token')
                // 2.跳转到登陆页面
            location.href = './login.html'
                // 关闭confirm询问框
            layer.close(index);

        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers请求头配置的请求对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.statue !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用这个函数
        // complete: function(res) {
        //     // 在complete回调函数中，可以使用res.responseJSION拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //             // 2.跳转到登陆页面
        //         location.href = './login.html'

        //     }
        // }

    })
}