# DomainSale

多域名在售展示页。所有域名都指向同一个站点，页面读取访客访问时使用的域名，把它置顶为「主推」，其余域名在下方清单中列出。

- 框架：Astro 7（`output: 'static'`，纯静态）+ Tailwind CSS 4
- 无运行时框架、无后端，单页 + 少量内联脚本
- 中英双语（按浏览器语言自动判断，可手动切换并记忆）
- 明暗主题（系统 / 浅色 / 深色三选一，可记忆）
- 字体：JetBrains Mono 自托管（域名与数字），中文使用系统字体，**不依赖任何境外 CDN**

## 快速开始

```sh
pnpm install
pnpm dev          # 开发（会占用终端）
pnpm build        # 构建到 dist/
pnpm preview      # 预览构建结果
```

后台方式启动开发服务器（本仓库习惯）：

```sh
pnpm astro dev --background
pnpm astro dev status     # 状态
pnpm astro dev logs       # 日志
pnpm astro dev stop       # 停止
```

Node 版本见 `.nvmrc`（24 LTS）。Astro 7 要求 `>=22.12.0`，且**不支持奇数版本**（如 25）。

> 首次安装若报 `ERR_PNPM_IGNORED_BUILDS`，执行一次 `pnpm approve-builds esbuild` 即可。仓库里的 `pnpm-workspace.yaml`（`allowBuilds: esbuild`）就是为此保留的，不要删。

## 目录结构

```
public/                    静态资源（favicon、robots.txt、微信二维码）
src/
  data/domains.ts          域名数据 + 中英文案（单一数据源）
  data/site.ts             联系方式 + 界面文案 + 主题/语言脚本用的字符串
  layouts/Base.astro       <head>、到站域名/主题/语言内联脚本、SEO 与 JSON-LD
  components/
    TopBar.astro           顶栏：站名 + 语言切换 + 主题三选一
    Spotlight.astro        主推区（每个域名一个块，CSS 决定显示哪个）
    DomainList.astro       其余域名的清单（不可点击）
    Contact.astro          购买流程 + 邮箱/微信/二维码
    Footer.astro
    DomainName.astro       域名排印（显示用大小写）
    T.astro                双语文本：输出 zh / en 两个 span
  styles/global.css        设计 token + 全部组件样式
  pages/index.astro        唯一路由：组装页面并生成到站 CSS
```

## 要改的地方

| 改什么 | 文件 |
| --- | --- |
| 域名列表、中英文介绍、标签 | `src/data/domains.ts` |
| 邮箱、微信号、二维码路径、界面文案 | `src/data/site.ts` |
| 设计 token（颜色 / 字号 / 间距 / 圆角 / 动效） | `src/styles/global.css` |

### 新增或删域名

只改 `src/data/domains.ts` 就够了：`index.astro` 会依据数据**自动生成**到站 CSS，`Base.astro` 会自动生成每个域名的标题/描述。**不要手写针对某个域名的 CSS 或区块。**

每条记录：

```ts
{
  slug: "javaing",              // 匹配用标识
  host: "javaing.com",          // 必须小写，且与该域名的 DNS 指向一致
  label: "javaing",             // 点号前的部分
  tld: "com",                   // 不带点
  length: 7,                    // label 的字符数（显示在 chip 上，需与 label 一致）
  category: "Developer",
  status: "available",          // "available" | "sold"
  price: { amount: 2800, currency: "USD" },  // 可选
  caution: true,                // 可选：含第三方商标风险时标注
  zh: { tagline, intro, tags },
  en: { tagline, intro, tags },
}
```

- **顺序有意义**：第一个域名同时是「未匹配到」时的兜底（例如直接用 IP 访问）。
- `price` 可选。目前所有域名都**不写** `price`，因此统一显示「价格可议 / Price negotiable」。给某个域名加上 `price` 就会显示价格。`formatPrice` 与相关分支保留即为此。
- `label` 里若有第三方商标（如 `Zelda8`），`caution: true` 会在文案里给出风险提示。

### 换微信二维码

把图片放进 `public/`（当前是 `wechat-qr.jpg`），再把 `src/data/site.ts` 里的 `wechatQr` 改成对应路径。`.ds-qr` 用 `object-fit: contain`，非正方形图片不会被压扁。

## 到站域名识别

`layouts/Base.astro` 的 `<head>` 内联脚本读取 `location.hostname`，写入 `html[data-host]`；`pages/index.astro` 依据 `domains.ts` 生成对应 CSS：显示匹配的主推块，并从下方清单中隐藏同一行。未匹配到（例如直接用 IP 访问）时回落到 `domains[0]`（`fallbackHost`），等同于用该域名访问。

页面里始终渲染所有域名的主推块，靠 CSS 只显示一个——所以没有客户端模板渲染，也不会闪烁。

## 域名写法约定

**显示用**（`displayHost()`）：英文域名首字母大写、后缀全大写 —— `Javaing.COM`、`Gridelec.COM`、`Zchat.CC`、`Zelda8.COM`、`342263.COM`。用在主推大标题、清单、`.COM` chip、浏览器标题、OG/JSON-LD 的 `name`。

**技术用**：URL、`data-host`、`data-spotlight`、`data-row`、canonical、JSON-LD 的 `url` 一律使用小写的 `host`（`javaing.com`）。两者不要互相「对齐」。

## 双语与主题

- 双语：中英文案同时存在于 DOM，`T.astro` 生成 `<span data-i18n="zh">` 与 `<span data-i18n="en">`，CSS 依 `html[data-lang]` 隐藏其一。
  - **不要用 `[lang]` 选择器控制语言显隐**：语言切换按钮本身带 `lang` 属性用于读屏发音，用 `[lang]` 会被误隐藏；双语 span 也带 `lang`，所以统一用 `data-i18n` 判断。
- 语言判断：`navigator.languages` 中首个以 `zh` 开头 → 中文，其余（含英文）→ 英文；手动切换后写入 localStorage。
- 主题：`data-theme-mode` 记偏好（`system` / `light` / `dark`），`data-theme` 记最终值。三选一按钮的选中态是 CSS 依 `data-theme-mode` 渲染，脚本只同步 `aria-pressed`。选「系统」时监听 `prefers-color-scheme` 变化。

## 本地测试某个域名

```sh
# /etc/hosts
127.0.0.1 javaing.com gridelec.com whylover.com zchat.cc zelda8.com 342263.com
```

然后访问 `http://javaing.com:4321/`。未在 `/etc/hosts` 中的域名或 IP 访问会走兜底（第一个域名）。

## 构建与部署

`pnpm build` 产出 `dist/`，部署到任意静态托管（Cloudflare Pages、Vercel、Netlify 等），再把所有域名的 DNS 指向该站点。

- 每个域名自指 canonical（由内联脚本写入），无 JS 时浏览器默认也按自指处理，避免多个域名的页面被搜索引擎合并成一个。
- `public/robots.txt` 允许全站抓取；无 sitemap（同一份内容服务多个域名）。
- 描述、OG、JSON-LD 会按到站域名与语言在客户端同步。

## 已验证 / 注意

- `pnpm build` 是唯一的检查手段：没有 lint / test / typecheck 脚本，也没装 `@astrojs/check`。
- Astro 7 的 `compressHTML` 默认是 `'jsx'`：元素间空白会被去掉，需要空格时显式写 `{' '}`。
- 本机没有可用浏览器（Chromium 下载失败、Firefox 无 X server），无法截图；改动请以产出的 HTML/CSS 为准。
