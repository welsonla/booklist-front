<template>
  <Layout>
    <div class="flex flex-col">
      <div class="nav-text-color text-center text-2xl font-semibold">时光书单</div>
      <div class="flex flex-col login-form p-4 m-auto my-6">
        <!-- 登录与注册切换 -->
        <div class="flex flex-row items-center content-center justify-center text-lg mb-4">
          <span class="inline-block w-10 h-8 text-center"
                @click="updateTab(0)"
                :class="selectIndex===0?'login-menu-select':''">
            登录
          </span>
          <span class="w-8 text-center">·</span>
          <span class="inline-block w-10 h-8 text-center"
                  @click="updateTab(1)"
                  :class="selectIndex===1?'login-menu-select':''">
            注册
          </span>
        </div>
        <!-- End 登录与注册切换 -->

        <!-- 登录注册Form -->
        <template v-if="selectIndex===0">
          <!-- 登录表单 -->
          <div class="flex flex-col">
              <label for="username" class="nav-text-color leading-8 text-sm">用户名或邮箱</label>
              <input type="text" name="username" placeholder="用户名/邮箱" class="h-10 border-color rounded-md border text-sm pl-2"/>
              <label for="password" class="nav-text-color leading-8 text-sm mt-2">密码</label>
              <input type="password" name="password" placeholder="密码" class="h-10 border-color rounded-md border text-sm pl-2"/>
          </div>
          <button type="submit" class="h-8 bg-green-600 rounded-md text-white mt-4">登录</button>
          <!-- End 登录表单 -->
        </template>
        <template v-else>
          <!-- 注册表单 -->
          <div class="flex flex-col">
              <label for="username" class="nav-text-color leading-8 text-sm">用户名</label>
              <input type="text" name="username" placeholder="用户名" class="h-10 border-color rounded-md border text-sm pl-2"/>
              <label for="email" class="nav-text-color leading-8 text-sm mt-2">邮箱</label>
              <input type="text" name="email" placeholder="邮箱" class="h-10 border-color rounded-md border text-sm pl-2"/>
              <label for="password" class="nav-text-color leading-8 text-sm mt-2">密码</label>
              <input type="password" name="password" placeholder="密码" class="h-10 border-color rounded-md border text-sm pl-2"/>
              <label for="password-confirm" class="nav-text-color leading-8 text-sm mt-2">确认密码</label>
              <input type="password" name="password-confirm" placeholder="确认密码" class="h-10 border-color rounded-md border text-sm pl-2"/>
          </div>
          <button type="submit" class="h-8 bg-green-600 rounded-md text-white mt-4">注册</button>
          <!-- End 注册表单 -->
        </template>
        <!-- End 登录注册Form -->
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/pages/layout";
export default {
  name: "login",
  components: {Layout},
  methods:{
    updateTab(index){
      this.selectIndex = index
    }
  },
  data(){
    return {
      selectIndex: 1
    }
  }
}
</script>

<style scoped lang="scss">
.login-form{
  background: #f6f8fa;
  width: 350px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #d8dee4;
}

.login-menu-select{
  border-bottom: 2px solid #111111;
}
</style>
