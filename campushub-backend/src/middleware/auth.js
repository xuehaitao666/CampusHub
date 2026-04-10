const jwt = require('jsonwebtoken');
const Result = require('../utils/response');
const { JWT_SECRET } = require('../utils/jwt');

/**
 * Express JWT 鉴权中间件
 */
function authMiddleware(req, res, next) {
  // 1. 获取 Authorization 请求头 (格式通常为 'Bearer <token>')
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(Result.error(401, '未授权访问: 缺少或格式不正确的 Token'));
  }

  // 2. 提取 Token 字符串
  const token = authHeader.split(' ')[1];

  try {
    // 3. 验证并解析 Token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 4. 将解析出的用户数据（如 userId, role）附加到 req 对象上，方便后续路由使用
    req.user = decoded;
    
    // 5. 放行到下一个中间件或路由处理函数
    next();
  } catch (error) {
    // 捕获并处理 JWT 报错
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(Result.error(401, '认证失败: Token 已过期'));
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json(Result.error(401, '认证失败: 无效的 Token'));
    }
    
    // 其他未知错误
    return res.status(500).json(Result.error(500, '认证过程发生未知错误'));
  }
}

module.exports = authMiddleware;
