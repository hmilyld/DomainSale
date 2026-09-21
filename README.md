# DomainSale

多域名在售展示页。所有域名都指向这一个站点，页面会读取访客使用的域名，把它置顶为主推，其余域名在下方清单中列出。

- 框架：Astro 7（纯静态输出）+ Tailwind CSS 4
- 零运行时框架，双语（中/英自动切换，可手动切换）、明暗主题
- 字体：JetBrains Mono 自托管（域名与数字），中文使用系统字体，不依赖境外 CDN

## 命令

```sh
pnpm dev          # 开发
pnpm build        # 构建到 dist/
pnpm preview      # 预览构建结果

pnpm astro dev --background   # 后台启动开发服务器
pnpm astro dev status|logs|stop
```

Node 版本见 `.nvmrc`（24 LTS）。Astro 7 要求 `>=22.12.0`，且不支持奇数版本。

## 要改的地方

| 改什么 | 文件 |
| --- | --- |
| 域名、中英文介绍、价格 | `src/data/domains.ts` |
| 邮箱、微信号、二维码路径、页面文案 | `src/data/site.ts` |
| 设计 token（颜色 / 字号 / 间距 / 动效） | `src/styles/global.css` |

价格：在 `domains.ts` 里给某个域名加 `price: { amount: 2800, currency: "USD" }` 就显示价格；不写 `price` 则显示「价格面议 / Make an offer」。

二维码：把图片放到 `public/`（例如 `wechat-qr.png`），再把 `site.ts` 里的 `wechatQr` 改成对应路径。

## 到站域名识别

`layouts/Base.astro` 的 `<head>` 内联脚本读取 `location.hostname`，写入 `html[data-host]`；`pages/index.astro` 依据 `domains.ts` 生成对应 CSS 规则，显示匹配的主推块并隐藏清单中的同一行。未匹配到（例如直接用 IP 访问）时回落到 `domains.ts` 的第一个域名，等同于用该域名访问。

顶栏主题为三个并列按钮：跟随系统 / 浅色 / 深色，可点选，当前项高亮；选择会记入 localStorage，`跟随系统` 时监听系统配色变化。

本地测试某个域名的效果：

```sh
# /etc/hosts
127.0.0.1 javaing.com gridelec.com whylover.com zchat.cc zelda8.com 342263.com 281761.com
```

然后访问 `http://javaing.com:4321/`。

## 部署

`pnpm build` 产出 `dist/`，部署到任意静态托管（Cloudflare Pages、Vercel、Netlify 等），再把所有域名的 DNS 指向该站点即可。
