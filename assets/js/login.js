// 入口函数
$(function() {
    // 点击“去注册账号的链接”时，隐藏login-box,显示reg-box
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击“去注册”这个链接时，隐藏reg-box，显示login-box,
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    // 自定义验证规则
    // 从layui中获取form对象
    var form = layui.form
        // 导出提示框
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于判断
                // 如果判断失败，则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听注册表单的提交
    $('#form_reg').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault()

        // 发起AJAX的Post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('注册成功，请登录！')
                        // 模拟点击行为
                    $('#link_login').click()
                }
            })
    })

    // 监听登陆表单的提交
    $('#form_login').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault()
            //   发起ajax的请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                } else {
                    layer.msg('登陆成功')
                        // 将登陆成功的token字符串，保存到localStorage中
                        // localStorage.setItem('token,res.token')
                        // console.log(res.token)
                        //     // 跳转到后台
                    location.href = './index.html'
                }

            }
        })
    })
})