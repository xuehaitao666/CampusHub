<template>
  <div class="login-container">
    <div class="glass-card">
      <div class="login-header">
        <h1 class="title">CampusHub</h1>
        <p class="subtitle">欢迎回来，请登录您的账号</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        size="large"
        class="login-form"
      >
        <el-form-item prop="studentId">
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

        <el-form-item prop="password">
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

        <div class="form-options">
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          <a class="forgot-password" href="#" @click.prevent>忘记密码？</a>
        </div>

        <el-button
          type="primary"
          class="login-button"
          :loading="isLoading"
          @click="handleLogin"
        >
          登 录
        </el-button>
      </el-form>
      
      <p class="register-hint">
        还没有账号？ <a href="#" @click.prevent>立即注册</a>
      </p>
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
    { min: 4, max: 15, message: '长度在 4 到 15 个位数字', trigger: 'blur' }
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
      
      // 模拟 API 请求延迟
      setTimeout(() => {
        isLoading.value = false
        ElMessage.success('登录成功！')
        console.log('提交的登录信息:', loginForm)
        
        // TODO: 等待接真实 API 后，这里处理路由跳转与 Token 保存
        // router.push('/')
      }, 1500)
    } else {
      ElMessage.warning('请正确填写学号和密码')
      return false
    }
  })
}
</script>

<style scoped>
/* 优雅的动态渐变背景 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(-45deg, #409eff, #36cfc9, #73d13d, #b37feb);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 毛玻璃半透明卡片 (Glassmorphism) */
.glass-card {
  width: 100%;
  max-width: 400px;
  margin: 0 20px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #303133;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
  font-family: 'Inter', -apple-system, sans-serif;
}

.subtitle {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.login-form {
  margin-top: 10px;
}

/* 调整 Element Plus 输入框样式更加圆润 */
:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-password {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #66b1ff;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  border-radius: 8px;
  height: 48px;
  background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
  border: none;
  transition: opacity 0.2s, transform 0.1s;
}

.login-button:hover {
  opacity: 0.9;
}

.login-button:active {
  transform: scale(0.98);
}

.register-hint {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #606266;
}

.register-hint a {
  color: #b37feb;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.register-hint a:hover {
  color: #9254de;
}

/* 适配超小屏幕移动端 */
@media screen and (max-width: 480px) {
  .glass-card {
    padding: 30px 20px;
    margin: 0 16px;
    border-radius: 16px;
  }
  
  .title {
    font-size: 24px;
  }
}
</style>
