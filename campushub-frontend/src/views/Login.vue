<template>
  <div class="login-wrapper">
    <!-- 左侧：品牌展示区 (55%) -->
    <div class="brand-section">
      <!-- 原有的图片层 -->
      <div class="brand-bg"></div>
      
      <!-- 渐变层加上大面积模糊光晕和呼吸动画会在样式 ::before 中实现 -->
      <div class="overlay"></div>
      
      <div class="brand-content">
        <h1 class="brand-title">连接校园，互助无限</h1>
        <p class="brand-subtitle">CampusHub - Your Campus Life Assistant</p>
      </div>
    </div>

    <!-- 右侧：表单区 (45%) -->
    <div class="form-section">
      <div class="form-container">
        <!-- 每一项加入进场动画的 class 和相应的延迟时间 -->
        <div class="form-header animate-fade-up delay-1">
          <h2 class="welcome-title">欢迎回到 CampusHub 👋</h2>
          <p class="welcome-subtitle">请输入学号与密码以继续</p>
        </div>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          size="large"
          class="login-form"
        >
          <el-form-item prop="studentId" class="animate-fade-up delay-2">
            <el-input
              v-model="loginForm.studentId"
              placeholder="请输入学号"
              clearable
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="animate-fade-up delay-3">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="form-options animate-fade-up delay-4">
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            <a class="forgot-password" href="#" @click.prevent>忘记密码？</a>
          </div>

          <div class="animate-fade-up delay-5">
            <el-button
              type="primary"
              class="login-button"
              :loading="isLoading"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </div>
        </el-form>
        
        <p class="register-hint animate-fade-up delay-6">
          还没有账号？ <a href="#" @click.prevent>立即注册</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const loginFormRef = ref(null)
const isLoading = ref(false)

const loginForm = reactive({
  studentId: '',
  password: '',
  rememberMe: false
})

const loginRules = reactive({
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { pattern: /^\d+$/, message: '学号只能包含数字', trigger: 'blur' },
    { min: 4, max: 20, message: '学号长度在 4 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

const handleLogin = () => {
  if (!loginFormRef.value) return
  
  loginFormRef.value.validate((valid) => {
    if (valid) {
      isLoading.value = true
      
      setTimeout(() => {
        isLoading.value = false
        ElMessage.success('登录成功！')
        console.log('登录成功，表单数据:', loginForm)
        
        // TODO: 路由跳转逻辑
        // router.push('/')
      }, 1500)
    } else {
      ElMessage.warning('请检查并正确填入学号和密码')
      return false
    }
  })
}
</script>

<style scoped>
/* ================== 全局布局 ================== */
.login-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #f8fafc; /* 使用极浅的灰度背景突出表单阴影 */
}

/* ================== 左侧 品牌区 (55%) ================== */
.brand-section {
  flex: 0 0 55%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #0f172a;
}

.brand-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
  transition: transform 10s ease;
}

.brand-section:hover .brand-bg {
  transform: scale(1.05);
}

/* ===== 核心改动：左侧动态呼吸质感光晕 ===== */
.brand-section::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  /* 混合亮青色和藏青色的弥散发光体 */
  background: radial-gradient(circle at 30% 40%, rgba(14, 165, 233, 0.45) 0%, rgba(15, 23, 42, 0) 55%),
              radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.3) 0%, rgba(15, 23, 42, 0) 50%);
  filter: blur(80px);
  z-index: 1;
  animation: breathHalo 8s infinite alternate ease-in-out;
}

@keyframes breathHalo {
  0% { transform: scale(0.9) translate(-2%, -2%); opacity: 0.7; }
  100% { transform: scale(1.1) translate(2%, 2%); opacity: 1; }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(14, 165, 233, 0.4) 100%);
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
  padding: 0 40px;
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.brand-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  opacity: 0.95;
  letter-spacing: 1px;
}

/* ================== 右侧 表单区 (45%) ================== */
.form-section {
  flex: 0 0 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 10;
}

/* ===== 核心改动：表单悬浮与弥散阴影 ===== */
.form-container {
  width: 100%;
  max-width: 440px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 24px;
  /* 非常柔和的弥散阴影，塑造前后深度 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.form-header {
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 10px 0;
  font-family: 'Inter', system-ui, sans-serif;
  letter-spacing: 0.5px;
}

.welcome-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

.login-form {
  margin-top: 20px;
}

/* ===== 核心改动：输入框焦点特效 ===== */
:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  padding: 4px 15px;
  transition: all 0.3s ease; /* 增加 0.3s 丝滑过渡 */
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #94a3b8 inset;
}

:deep(.el-input__wrapper.is-focus) {
  /* 增加蓝青色系同色系外发光 */
  box-shadow: 0 0 0 1px #409eff inset, 0 0 0 3px rgba(64, 158, 255, 0.2);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

:deep(.el-checkbox__label) {
  color: #475569;
}

.forgot-password {
  font-size: 14px;
  color: #0ea5e9;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #0284c7;
  text-decoration: underline;
}

/* ===== 核心改动：按钮悬停发光特效 ===== */
.login-button {
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  height: 50px;
  background-color: #0ea5e9;
  border-color: #0ea5e9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-button:hover, .login-button:focus {
  background-color: #0284c7;
  border-color: #0284c7;
  /* 轻微上浮，带底部的发光色彩阴影 */
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);
}

.register-hint {
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: #64748b;
}

.register-hint a {
  color: #0ea5e9;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.register-hint a:hover {
  color: #0284c7;
}

/* ================== 入场动画相关 CSS ================== */
.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
.delay-6 { animation-delay: 0.6s; }

/* ================== 小屏自适应 ================== */
@media screen and (max-width: 900px) {
  .login-wrapper {
    flex-direction: column;
  }
  
  .brand-section {
    flex: 0 0 35%;
  }

  .brand-title {
    font-size: 2.2rem;
  }
  
  .form-section {
    flex: 1;
    border-radius: 20px 20px 0 0;
    margin-top: -20px;
    background: transparent;
  }
  
  .form-container {
    padding: 30px 25px;
    box-shadow: none;
  }
}
</style>
