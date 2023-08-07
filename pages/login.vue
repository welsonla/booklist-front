<template>
<Layout>
  <div class="flex flex-col">
    <div class="nav-text-color text-center text-2xl font-semibold">时光书单</div>
    <div class="flex flex-col login-form p-4 m-auto my-6">

      <div class="flex flex-row items-center content-center justify-center text-lg">
        <a href="" class="inline-block w-12">登录</a>
        <span class="w-4">·</span>
        <a href="" class="inline-block w-12">注册</a>
      </div>
      <div class="flex flex-col">
        <label for="username" class="nav-text-color leading-8 text-sm">用户名或邮箱</label>
        <input type="text" name="username" placeholder="用户名/邮箱" class="h-10 border-color rounded-md border text-sm pl-2"/>
        <label for="password" class="nav-text-color leading-8 text-sm mt-2">密码</label>
        <input type="password" name="password" placeholder="密码" class="h-10 border-color rounded-md border text-sm pl-2"/>
      </div>
      <button type="submit" class="h-8 bg-green-600 rounded-md text-white mt-4">登录</button>
    </div>
  </div>

</Layout>
</template>

<script>
import Layout from "@/pages/layout";
export default {
  name: "login",
  components: {Layout}
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
</style>
