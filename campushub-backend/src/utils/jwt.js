const jwt = require('jsonwebtoken');

// 从环境变量读取秘钥，若没有则提供一个默认的开发秘钥
const JWT_SECRET = process.env.JWT_SECRET || 'campushub_super_secret_dev_key';

// 设置 Token 有效期
const EXPIRES_IN = '24h'; 

/**
 * 生成 JWT Token
 * @param {Object} payload 载荷信息（如 { id: 1, role: 'STUDENT' }）
 * @returns {String} Token 字符串
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

module.exports = {
  generateToken,
  JWT_SECRET
};
