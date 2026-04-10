// campushub-backend/src/db/db.js
const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456', // 替换为你电脑上 MySQL 的密码
  database: 'mysql',         // 先连系统自带的 mysql 库测试一下
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 成功连接到 MySQL 数据库！');

    // 执行一个简单的查询测试
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    console.log('数据库测试查询结果:', rows[0].solution); // 应该输出 2

    connection.release(); // 释放连接
    process.exit(0);      // 退出程序
  } catch (err) {
    console.error('❌ 数据库连接失败，请检查账号密码或 MySQL 服务是否开启:', err.message);
    process.exit(1);
  }
}

testConnection();