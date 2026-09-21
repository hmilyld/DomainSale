export type Currency = "USD" | "CNY";

export interface DomainCopy {
  tagline: string;
  intro: string;
  tags: string[];
}

export interface Domain {
  /** stable key used for data-* matching */
  slug: string;
  /** canonical host, lowercase, no www */
  host: string;
  /** part before the dot */
  label: string;
  /** suffix without the dot */
  tld: string;
  /** character count of the label */
  length: number;
  category: string;
  status: "available" | "sold";
  /** omit to show "make an offer" instead of a price */
  price?: { amount: number; currency: Currency };
  /** set when the name carries a third-party trademark risk */
  caution?: boolean;
  zh: DomainCopy;
  en: DomainCopy;
}

/**
 * Display form of a domain: first letter capitalised, TLD uppercased.
 * URLs and technical identifiers always use the lowercase `host`.
 */
export function displayLabel(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function displayTld(tld: string): string {
  return tld.toUpperCase();
}

export function displayHost(domain: Pick<Domain, "label" | "tld">): string {
  return `${displayLabel(domain.label)}.${displayTld(domain.tld)}`;
}

export const domains: Domain[] = [
  {
    slug: "javaing",
    host: "javaing.com",
    label: "javaing",
    tld: "com",
    length: 7,
    category: "Developer",
    status: "available",
    zh: {
      tagline: "Java 开发者的技术感名字",
      intro:
        "「java」加上进行时后缀 -ing，读起来像「正在写 Java」。适合技术教程站、开发者社区、编程工具或软件工作室；.COM 通用性强，好记也好输入。",
      tags: ["Java", "开发者", "教程站", "编程品牌"],
    },
    en: {
      tagline: "A developer name built on \u201cJava\u201d",
      intro:
        "\u201cjava\u201d plus the progressive -ing \u2014 it reads like work in progress. A natural fit for a tutorial site, a developer community, coding tools, or a software studio. Solid, familiar, easy to type.",
      tags: ["Java", "Developer", "Tutorials", "Studio"],
    },
  },
  {
    slug: "gridelec",
    host: "gridelec.com",
    label: "gridelec",
    tld: "com",
    length: 8,
    category: "Energy",
    status: "available",
    zh: {
      tagline: "电力与电气行业的行业感名字",
      intro:
        "「grid」电网加上「elec」电力，两个字根直接指向行业。适合智能电网、电气设备、储能或能源工程类品牌，专业、不轻浮。",
      tags: ["电力", "电网", "能源", "工业"],
    },
    en: {
      tagline: "Grid meets electric, straight to industry",
      intro:
        "\u201cgrid\u201d and \u201celec\u201d in one breath \u2014 two roots that point directly at the trade. Fits smart grid, electrical equipment, storage, or energy engineering brands. Technical, not gimmicky.",
      tags: ["Energy", "Grid", "Electrical", "Industrial"],
    },
  },
  {
    slug: "whylover",
    host: "whylover.com",
    label: "whylover",
    tld: "com",
    length: 8,
    category: "Social",
    status: "available",
    zh: {
      tagline: "情感社交向的名字",
      intro:
        "「why」加「lover」，自带一句提问的爱情域名。适合婚恋产品、情感内容社区、礼物电商或约会类应用，辨识度高，容易做品牌延展。",
      tags: ["情感", "社交", "婚恋", "内容社区"],
    },
    en: {
      tagline: "A question about love",
      intro:
        "\u201cwhy\u201d plus \u201clover\u201d \u2014 a name that asks something. Fits dating products, relationship content, gifts, or social apps. Distinctive and easy to build a brand around.",
      tags: ["Social", "Dating", "Lifestyle", "Community"],
    },
  },
  {
    slug: "zchat",
    host: "zchat.cc",
    label: "zchat",
    tld: "cc",
    length: 5,
    category: "Product",
    status: "available",
    zh: {
      tagline: "短后缀的即时通讯名字",
      intro:
        "「z」加「chat」，直接指向对话与消息。五个字符、短后缀，适合客服系统、AI 对话助手、社区工具或轻量 IM；.CC 在全球市场的认知度稳定。",
      tags: ["即时通讯", "AI 对话", "短域名", "客服系统"],
    },
    en: {
      tagline: "A short name for messaging",
      intro:
        "\u201cz\u201d plus \u201cchat\u201d \u2014 it points straight at conversation and messages. Five characters on a short TLD: fits customer support, AI chat assistants, community tools, or a lightweight IM. .CC is well understood worldwide.",
      tags: ["Messaging", "AI", "Short", "Support"],
    },
  },
  {
    slug: "zelda8",
    host: "zelda8.com",
    label: "Zelda8",
    tld: "com",
    length: 6,
    category: "Gaming",
    status: "available",
    caution: true,
    zh: {
      tagline: "游戏主题名字，带一个数字 8",
      intro:
        "游戏方向的联想加上幸运数字 8，适合玩家社区、游戏内容、周边或娱乐项目。注意：名称含第三方游戏商标，使用与转让的法律风险请自行评估，本站与该商标无任何关联。",
      tags: ["游戏", "玩家社区", "游戏内容", "娱乐"],
    },
    en: {
      tagline: "A gaming theme with the number 8",
      intro:
        "A gaming association plus a lucky 8. Fits player communities, game content, merchandise, or entertainment projects. Note: the name contains a third-party trademark \u2014 assess the legal risk of use or transfer yourself. This site is not affiliated with it.",
      tags: ["Gaming", "Community", "Content", "Entertainment"],
    },
  },
  {
    slug: "342263",
    host: "342263.com",
    label: "342263",
    tld: "com",
    length: 6,
    category: "Numeric",
    status: "available",
    zh: {
      tagline: "六位纯数字，好记好输入",
      intro:
        "六位纯数字，短而整齐，输入成本低。适合号码类服务、查询工具、短址、导航站，或任何「记不住名字就记数字」的入口。",
      tags: ["纯数字", "工具站", "短址", "导航"],
    },
    en: {
      tagline: "Six digits, easy to recall",
      intro:
        "Six plain digits, short and even. Low effort to type and to remember. Fits number-based services, lookup tools, short links, directories, or anything that benefits from a numeric address.",
      tags: ["Numeric", "Utility", "Short links", "Directory"],
    },
  },
];

export const hosts = domains.map((d) => d.host);

/** shown when the site is reached without a matching domain (e.g. by IP) */
export const fallbackHost = domains[0].host;
