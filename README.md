<div align="center">
  <h1> Walrus 共学 </h1>

 <p>  共学的的目标是 通过共学能够在 Walrus 发布自己的站点应用 。</p>

 <p>
    <a href="https://github.com/CreatorsDAO"><img src="https://badgen.net/badge/icon/github?icon=github&label" alt="GitHub" /></a>
    <a href="https://twitter.com/Labs706"><img src="https://badgen.net/badge/icon/twitter?icon=twitter&label" alt="Twitter" /></a>
  </p>

</div>

## **注意事项**

- **Windows 可能存在不可预知的错误，推荐使用 macOS 或者 Ubuntu**

### **0. 开营准备（环境安装）**

- 自行安装环境：https://docs-zh.walrus.site/usage/setup.html
- 主要内容：
    - 安装 Sui 测试网钱包并获取 SUI 代币
    - 将测试网 SUI 兑换为测试网 WAL
    - Walrus 客户端安装（macOS、Ubuntu、Windows）
    - 配置 Walrus 环境，包括配置文件`client_config.yaml`的设置

# **第一部分：项目实战（Walrus 能做什么）**

### **1.1 Walrus Sites 项目实战（上）—— @陈**

- **项目概述**：设计和实现一个支持图片存储的去中心化应用
- **合约开发**：
    - **存储逻辑**：编写 Sui Move 合约，实现图片文件在 Walrus 上的存储和元数据管理
    - **认证与权限**：确保上传文件的用户权限控制
    - **文件生命周期**：管理图片文件的存储周期，支持在特定周期后进行自动删除或存储扩展

### **1.2 使用场景与应用实战（下）—— @陈**

- **图片存储页面**：
    - 用户界面设计，支持图片选择和上传
    - 调用 Sui Move 合约，实现图片文件的上传存储
    - 提示用户上传成功和查看链接
- **图片显示页面**：
    - 用户界面设计，简单显示存储的图片
    - 调用 Walrus 的读取接口，展示图片文件的预览和详细信息

# **第二部分：理论讲解（Walrus 怎么做）**

### **2.1 Walrus 简介—— @uvd** https://docs-zh.walrus.site/blog/00_intro.html

- **分布式存储大文件（“blobs”）的解决方案简介**
- **核心特性**：
    - 成本效益：通过先进的纠删码技术降低存储成本
    - 高容错性：在拜占庭故障下仍能保证数据的高可用性
    - Sui 区块链集成：利用 Sui 进行协调、认证和支付
- **关键概念**：
    - **存储周期（epochs）**
    - **代币经济学**：WAL 和 FROST 代币的作用
    - **存储节点角色**：节点的选择和职责

### **2.2 理解 Walrus 操作—— @king** https://docs-zh.walrus.site/design/operations.html

- **存储操作**：如何存储、读取与管理 blobs
- **链上与链下的交互**：
    - 协调：存储节点之间的协调机制
    - 支付：存储支付流程
    - 可用性认证：证明数据在网络中的可用性
- **存储生命周期和可用性周期的详解**

### **2.3 主要功能—— @king**

- **存储与检索** 
    - 使用 Walrus 客户端存储与检索 blobs 的实操
        - https://docs-zh.walrus.site/dev-guide/dev-operations.html
    - **认证与可用性**：如何创建和验证可用性证书
        - https://docs-zh.walrus.site/walrus-sites/authentication.html
- **成本管理**：利用可删除 blobs 优化存储成本
    - https://docs-zh.walrus.site/design/encoding.html
- **公共访问**：
    - 确保数据的公共可访问性
        - https://docs-zh.walrus.site/walrus-sites/overview.html
    - 解释私密数据的存储限制和注意事项
        - https://docs-zh.walrus.site/walrus-sites/restrictions.html
### **2.4 开发者工具与 API—— @害虫 ** 

- **CLI 命令**：
    - 关键命令详解（存储管理、系统状态查询、数据检索）
      - https://docs-zh.walrus.site/usage/client-cli.html
    - 实际操作演示
- **JSON API**：
    - 使用 JSON 请求进行编程交互
      - https://docs-zh.walrus.site/usage/json-api.html
    - 示例代码和应用场景
- **HTTP API**：
    - 运行 Walrus 客户端为守护进程
      - https://docs-zh.walrus.site/usage/web-api.html#local-daemon
    - 支持 HTTP 交互的配置和使用
      - https://docs-zh.walrus.site/usage/web-api.html#public-services 

### **2.5 高级用法—— @uvd 或 Sui 官方人员**

- **存储管理**：
    - 监控存储资源的使用情况
    - 资源的合并和拆分操作
- **周期与治理**：
    - 理解存储节点在每个周期内的选择机制
    - 治理模型和参与方式
- **错误处理与不一致性**：
    - 使用不一致证明来管理和处理故障 blobs
    - 故障排查和解决方案

## 参考链接

1. https://docs-zh.walrus.site/
2. https://github.com/MystenLabs/walrus-sites
3. https://docs.walrus.site/walrus-sites/intro.html
4. https://docs.sui.io/

## 共学产出

按照 [项目模版](https://github.com/orgs/CreatorsDAO/discussions/60) 创建自己的 demo 项目，共学结束的时候参与 demo day。

## 共学 QA

[discussions](https://github.com/orgs/CreatorsDAO/discussions/categories/q-a)
