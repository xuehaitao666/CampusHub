import axios from 'axios'
// 如果使用了特定 UI 组件库，可在这里导入提示组件，例如：
// import { ElMessage } from 'element-plus'

// 1. 创建 axios 实例
const service = axios.create({
  // 根据环境变量配置基础路径，例如 VITE_APP_BASE_API
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  // 请求超时时间
  timeout: 10000, 
})

// 2. 请求拦截器 Request Interceptor
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前检查前端是否存有 token
    const token = localStorage.getItem('token')
    
    if (token) {
      // 让每个请求头都携带自定义 token
      // 具体配置请根据后端的授权协议调整，比如 Bearer token 等
      config.headers['Authorization'] = `Bearer ${token}` 
    }
    
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('Request Error: ', error)
    return Promise.reject(error)
  }
)

// 3. 响应拦截器 Response Interceptor
service.interceptors.response.use(
  (response) => {
    // 假设后端返回的数据结构如: { code: 200, message: "成功", data: {...} }
    const res = response.data

    // 检查自定义的业务状态码
    if (res.code && res.code !== 200) {
      // 在这里统一处理业务级错误，比如弹出全屏提示
      // ElMessage.error(res.message || 'Error')
      console.warn('业务异常:', res.message)

      // 如果 token 过期或者被锁定，可以统一派发登出事件或跳转回登录页
      if (res.code === 401 || res.code === 403) {
        // 清除 token 等相关信息，然后跳转至登录
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 若无业务外层包装结构，也可直接 return response
      return res
    }
  },
  (error) => {
    console.error('Response Error: ', error.response || error.message)
    // 根据 HTTP 状态码统一处理错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('认证失败，请重新登录')
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          alert('拒绝访问：权限不足')
          break
        case 404:
          console.error('请求接口不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('未知错误')
      }
    } else {
      // 处理超时或断网等没有 response 的情况
      if (error.message.includes('timeout')) {
        alert('网络请求超时，请重试')
      }
    }
    return Promise.reject(error)
  }
)

export default service
