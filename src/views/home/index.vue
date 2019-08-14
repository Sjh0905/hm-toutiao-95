<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#fffd0b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 绑定点击事件 -->
            <!-- 个人设置 跳转即可 -->
            <!-- 退出登录 删除用户信息 跳转登录 -->
            <!-- native---绑定原生事件  -->
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"  @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 导航菜单容器 -->
      <!-- default-active="2"默认激活的菜单单项 指定的其实就是菜单项的index属性的值-->
      <!-- 导航菜单容器 -->
      <!-- active-text-color="#fffd0b" 激活文字颜色 -->
      <!-- el-menu-item 是菜单项不包含子级菜单 -->
      <el-main>
          <!-- 二级路由的出口 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // click 绑定的是原生的dom事件 绑定在组件上认为是自定义事件 组件内部没触发无效事件
    // click 绑定在组件解析后的DOM上 使用事件修饰符 prevent--阻止默认行为 native---绑定原生事件
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除用户信息
      store.clearUser()
      // 跳转登录
      this.$router.push({ name: 'login' })
    },
    toggleMenu () {
      // 切换侧边栏 收起与展开
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .test {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: bold;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
      104px auto;
  }
  .miniLogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
