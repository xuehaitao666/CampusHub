# CampusHub 校园互助平台

## 项目简介
CampusHub 是面向高校学生的校园互助平台，旨在通过 **需求发布 → 智能匹配 → 订单管理** 的完整闭环，帮助学生快速找到学习、生活、兼职等各类需求的解决方案。平台核心价值在于：

- **高效匹配**：基于标签、兴趣、地理位置等多维度信息，使用轻量级推荐算法实现需求与供给的即时匹配。  
- **透明订单**：全流程可追溯的订单管理，支持需求发布、接单、完成、评价四个阶段。  
- **安全可靠**：统一身份认证、数据加密、权限控制，保障用户信息与交易安全。

---

## 团队成员与职责分配

| 成员 | 角色 | 主要职责 |
|------|------|----------|
| 张三 | 项目经理 | 项目进度把控、需求梳理、里程碑制定 |
| 李四 | 前端负责人 | Vue3 + Vite 项目搭建、页面交互、UI 实现 |
| 王五 | 后端负责人 | Node.js + Express API 设计、数据库模型、业务逻辑 |
| 赵六 | 算法工程师 | 智能匹配模型研发、数据分析、性能调优 |
| 陈七 | 测试/运维 | 单元/集成测试、CI/CD 流程、服务器部署 |
| 周八 | UI/UX 设计 | 视觉设计、交互原型、品牌风格统一 |

> **注**：以上仅为示例，实际成员请自行替换。

---

## 技术栈介绍

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | **Vue 3** + **Vite** | 现代化响应式框架，极速热更新 |
| 前端 | **Pinia** | 状态管理，轻量且类型安全 |
| 前端 | **Tailwind CSS**（可选） | 原子化样式，快速实现 UI 设计 |
| 前端 | **Axios** | HTTP 请求库 |
| 后端 | **Node.js 20** + **Express** | 高性能 RESTful API |
| 后端 | **TypeScript** | 静态类型，提升代码可维护性 |
| 数据库 | **PostgreSQL** | 关系型数据库，支持事务 |
| ORM | **Prisma** | 类型安全的数据库访问层 |
| 智能匹配 | **Python 3.12** + **scikit‑learn** | 简单的基于向量相似度的推荐模型 |
| 部署 | **Docker** + **Docker‑Compose** | 本地/生产环境一致化 |
| CI/CD | **GitHub Actions** | 自动化测试、构建、部署 |
| 代码规范 | **ESLint** + **Prettier** | 统一代码风格 |
| 版本管理 | **Git** | 采用 Git Flow 分支模型 |

---

## 本地开发环境配置步骤

> 以下步骤在 **Windows 10/11** 环境下验证通过，其他平台请自行适配相应命令。

1. **克隆仓库**  
   ```bash
   git clone https://github.com/your-org/campushub.git
   cd campushub
   ```

2. **安装 Node.js & pnpm**（推荐使用 pnpm）  
   - 下载并安装 Node.js 20 LTS（[官方链接](https://nodejs.org)）  
   - 安装 pnpm：`npm i -g pnpm`

3. **前端依赖**  
   ```bash
   cd campushub-frontend
   pnpm install
   ```

4. **后端依赖**  
   ```bash
   cd ../campushub-backend
   pnpm install   # 或 npm install
   ```

5. **数据库准备**  
   - 安装 Docker Desktop（[下载链接](https://www.docker.com/products/docker-desktop)）  
   - 在项目根目录运行：  
     ```bash
     docker-compose up -d db
     ```
   - 创建数据库并执行迁移（使用 Prisma）：  
     ```bash
     npx prisma migrate dev --name init
     ```

6. **运行本地服务**  
   - 前端（热更新）：  
     ```bash
     cd ../campushub-frontend
     pnpm dev
     ```
   - 后端（热重载）：  
     ```bash
     cd ../campushub-backend
     pnpm dev
     ```

7. **打开浏览器**  
   前端默认运行在 `http://localhost:5173`，后端 API 在 `http://localhost:3000/api`。

8. **代码检查**（可选）  
   ```bash
   pnpm lint   # 前端
   pnpm lint   # 后端（在各自目录下）
   ```

> **Tip**：若出现端口冲突，可在 `.env` 文件中自行修改 `VITE_PORT`（前端）或 `PORT`（后端）。

---

## 分支管理策略（Git Flow）

```
main      ← 生产环境代码，始终保持可部署状态
│
└─ dev   ← 开发主线，所有功能完成后合并到这里
   │
   ├─ feature/xxx   ← 单个功能分支，基于 dev 创建
   │   └─ 完成后 PR 合并回 dev
   │
   ├─ bugfix/xxx    ← 修复 bug 的短期分支，基于 dev
   │   └─ 完成后 PR 合并回 dev
   │
   └─ release/vX.Y  ← 预发布分支，基于 dev，进行冒烟测试、版本号更新等
       └─ 合并到 main 并打 tag，随后合并回 dev 以同步修复
```

### 操作规范

| 操作 | 推荐命令 |
|------|----------|
| 创建功能分支 | `git checkout -b feature/需求描述 dev` |
| 提交代码 | `git add . && git commit -m "feat: 添加需求发布功能"` |
| 合并回 dev（PR） | 在 GitHub 上发起 Pull Request，确保 **CI 通过** |
| 发布新版本 | `git checkout main && git merge release/vX.Y && git tag vX.Y && git push --tags` |
| 热修复 | `git checkout -b hotfix/紧急bug main` → 合并到 `main` 与 `dev` |

---

## 联系方式

- **项目仓库**：`https://github.com/your-org/campushub`  
- **技术讨论**：Slack / Discord（渠道名）  
- **Issue 反馈**：请在 GitHub Issues 中提交，注明功能模块或 Bug 类型。

---

> 🎉 **祝开发愉快！** 若有任何疑问或建议，欢迎随时在项目仓库提出 Issue 或联系项目负责人。