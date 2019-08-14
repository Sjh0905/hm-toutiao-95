<template>
<!-- 组件 -->
    <div class="container">
        <!-- element-ui里的卡片类型的代码 -->
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- :model绑定的数据对象 -->
            <!-- :rules校验规则对象 -->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                <!-- prop设为校验的字段名称 -->
             <el-form-item class="sj" prop="mobile">
                 <!-- v-model="loginForm.mobile"被校验规则的对象 -->
               <el-input v-model="loginForm.mobile"  placeholder="请输入手机号"></el-input>
             </el-form-item>
             <el-form-item prop="code">
               <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:230px"></el-input>
               <el-button style="width:115px;margin-left: 10px; ">获取验证码</el-button>
             </el-form-item>
            <el-form-item>
                <!-- :value="true"默认选中 -->
                <el-checkbox :value="true">已阅读并同意以上协议</el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary"  style="width:100%" @click="login()">登录</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    //   自定义校验函数 需在return之前先声明
    // rule规则对象, value字段的值, callback校验结束的回调函数
    // 校验失败: callback(new Error('手机格式不对')) 校验成功:callback()
    const checkMobile = (rule, value, callback) => {
      // 按自己的逻辑校验值value即可
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不对'))
      callback()
    }
    // 接收返回值
    return {
      // 表单的数据对象
      loginForm: {
        // 字段参考借口文档
        mobile: '17320600114',
        code: '246810'

      },
      //   校验规则对象 (在return里写,需要接收返回值)
      loginRules: {
        //   一个字段可能有多个校验规则, 所以用数组
        mobile: [
          // required必填项 message如果没有填显示 trigger 什么时候出发校验
          { required: true, message: '请输入手机号', trigger: 'blur' },
          //   validator:指定自定义校验函数,在router之前先定义
          { validator: checkMobile, message: '手机号格式不正确', trigger: 'blur' }
        ],
        code: [
          // required必填项 message如果没有填显示 trigger 什么时候出发校验
          { required: true, message: '请输入验证码', trigger: 'blur' },
          //   len索引长度为6位
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    login () {
      // 1. 对整个表单进行校验
      this.$refs.loginForm.validate(async value => {
        if (value) {
          console.log('sunjiahui')
          //  2.  校验成功发起登录请求
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          //   .then(res => {
          //     // res 是响应对象 res.data数据属于响应主体
          //     // 储存用户信息
          //     store.setUser(res.data.data)
          //     // 登录成功后跳转首页
          //     this.$router.push('/')
          //     // 因为没有err的参数, 所以改成了()↓
          //   }).catch(() => {
          //     // 请求失败的提示信息
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }

}
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        height: 100%;
        position: absolute;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        .my-card {
            width: 400px;
            height: 350px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-60%);

            // text-align: center;
            img {
                width: 220px;

            }
            .sj {
                margin-top: 20px;
            }
        }
    }
</style>
