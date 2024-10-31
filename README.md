<div align="center">
  <h1> Walrus 共学 </h1>

 <p>  共学的的目标是 通过共学能够在 Walrus 发布自己的站点应用 。</p>

 <p>
    <a href="https://github.com/CreatorsDAO"><img src="https://badgen.net/badge/icon/github?icon=github&label" alt="GitHub" /></a>
    <a href="https://twitter.com/Labs706"><img src="https://badgen.net/badge/icon/twitter?icon=twitter&label" alt="Twitter" /></a>
  </p>

</div>

## 共学前置

参与这个共学需要知道

1. 熟练基础的命令行操作、环境配置 、github
2. 基础的编程知识(擅长前端知识更好)

## 共学模块

### **1. Walrus 简介  → @uvd**  https://docs-zh.walrus.site/blog/00_intro.html

- 分布式存储大文件（“blobs”）的解决方案简介
- 核心特性：成本效益、高容错性、Sui 区块链集成
- 关键概念：存储周期（epochs）、代币经济学、存储节点角色

### **2. 准备工作 & 安装与配置 → @害虫** https://docs-zh.walrus.site/usage/interacting.html （再补充）

- 设置 Sui 测试网钱包并获取 SUI 代币
- WAL 代币及其子单位 FROST 简介
- 将测试网 SUI 兑换为测试网 WAL 的操作
- 使用 WAL 代币进行存储支付及委托给存储节点
- 配置 Walrus 环境与 Sui 测试网：环境设置与工具需求
- 在不同操作系统（macOS、Ubuntu、Windows）上安装 Walrus 客户端
- 配置客户端：
    - 设置配置文件（`client_config.yaml`）
    - 高级配置选项：自定义网络设置

### **3. 理解 Walrus 操作 → @king**

- 存储操作：存储、读取与管理 blobs
- 链上与链下的交互（协调、支付和可用性认证）
- 存储生命周期和可用性周期的详解

### **4. 主要功能 → @king**

- **存储与检索**
    - 使用 Walrus 客户端存储与检索 blobs
    - 认证与可用性：创建和验证可用性证书
- **成本管理**：使用可删除 blobs 优化存储成本
- **公共访问**：确保数据公共访问，说明私密数据的存储限制

### **5. 开发者工具与 API → @害虫 **

- **CLI 命令**：关键命令（存储管理、系统状态、数据检索）
- **JSON API**：使用 JSON 请求进行编程交互
- **HTTP API**：运行 Walrus 客户端为守护进程，支持 HTTP 交互

### **6. 高级用法 → @uvd 或者 Sui 官方人员**

- **存储管理**：监控存储资源、资源合并和拆分
- **周期与治理**：理解每个周期内的存储节点选择与治理机制
- **错误处理与不一致性**：使用不一致证明管理故障 blobs

### **7. Walrus Sites @老陈 带着做一个小项目**

- **Walrus Sites 概述**：结合 Sui 和 Walrus 构建去中心化网站
- **核心功能**：
    - 客户端路由规则设置
    - 自定义 HTTP 头添加，提高站点安全性和灵活性
- **迁移指南**：从旧版 Devnet 向 Testnet 迁移的详细操作
- **使用案例**：全去中心化 Web 体验和多样化内容托管

### **8. 使用场景与应用 @老陈 带着做一个小项目**

- **NFT 和媒体存储 Walrus Dapp（实战）**
- **AI 数据集**：存储大型模型权重和训练数据
- **支持 L2**：为 L2 解决方案提供 blobs 可用性认证

## 参考链接

1. https://docs-zh.walrus.site/
2. https://github.com/MystenLabs/walrus-sites
3. https://docs.walrus.site/walrus-sites/intro.html
4. https://docs.sui.io/

## 共学产出

按照 [项目模版](https://github.com/orgs/CreatorsDAO/discussions/60) 创建自己的 demo 项目，共学结束的时候参与 demo day。

## 共学 QA

[discussions](https://github.com/orgs/CreatorsDAO/discussions/categories/q-a)
