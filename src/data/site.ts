import type { Currency } from "./domains";

export const site = {
  brand: "域名出售",
  email: "hmilyld@gmail.com",
  wechatId: "hmilyld",
  /** your QR image, served from public/ */
  wechatQr: "/wechat-qr.jpg",
  year: new Date().getFullYear(),
};

export function formatPrice(price: { amount: number; currency: Currency }): string {
  return new Intl.NumberFormat(price.currency === "CNY" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}

export const t = {
  available: { zh: "可转让", en: "Available" },
  sold: { zh: "已售", en: "Sold" },
  onRequest: { zh: "价格可议", en: "Price negotiable" },
  buy: { zh: "联系购买", en: "Get in touch" },
  seeOthers: { zh: "查看其他域名", en: "See other domains" },
  others: { zh: "其他在售域名", en: "Also for sale" },
  buyTitle: { zh: "如何购买", en: "How to buy" },
  emailLabel: { zh: "邮箱", en: "Email" },
  wechatLabel: { zh: "微信", en: "WeChat" },
  copy: { zh: "复制", en: "Copy" },
  copied: { zh: "已复制", en: "Copied" },
  note: {
    zh: "域名交易建议通过第三方托管平台完成，例如 Escrow、Sedo 或阿里云、腾讯云的域名交易服务，双方权益更有保障。",
    en: "Domain transfers are best handled through an escrow platform such as Escrow.com, Sedo, or your registrar\u2019s trading service. It protects both sides.",
  },
  footerNote: {
    zh: "本页所列域名均可转让，价格与付款方式可协商。",
    en: "Every domain listed here is available to transfer. Price and payment are open to discussion.",
  },
  defaultTagline: {
    zh: "一组可直接购买或议价的域名",
    en: "A small set of names, ready to buy or negotiate",
  },
  defaultIntro: {
    zh: "下面这些域名都在出售。选一个你想要的，直接联系我。如果你是打开其中某个域名访问进来的，它会自动显示在页面最上方。",
    en: "Every domain below is for sale. Pick the one you want and get in touch. If you arrived through one of these domains, it is already shown at the top of this page.",
  },
};

export const steps = [
  { zh: "告诉我你想要哪个域名", en: "Tell me which domain you want" },
  { zh: "确认价格与付款方式", en: "Agree on the price and how to pay" },
  { zh: "通过域名托管平台完成转移", en: "Transfer it through a domain platform" },
];

/** Strings consumed by the client-side UI script. */
export const uiStrings = {
  zh: {
    themeAria: "主题",
    langLabel: "English",
    langAria: "切换到英文",
    defaultTitle: "域名出售 · Domains for sale",
    defaultDesc: "一组在售域名，价格可议。",
    copy: "复制",
    copied: "已复制",
    copyFailed: "请手动复制",
  },
  en: {
    themeAria: "Theme",
    langLabel: "中文",
    langAria: "Switch to Chinese",
    defaultTitle: "Domains for sale",
    defaultDesc: "A small set of names, all with negotiable pricing.",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy manually",
  },
};
