# DomainSale — agent notes

One static page listing a set of domains for sale. Every domain's DNS points at this same site; the hostname the visitor arrived on decides which domain is featured. No backend, no SSR.

## Commands

- `pnpm build` — the only verification step. There is no lint / test / typecheck script, no CI, and `@astrojs/check` is not installed.
- Dev server (repo convention is background mode): `pnpm astro dev --background`, then `pnpm astro dev status|logs|stop`. Plain `pnpm dev` blocks the terminal.
- Node 24 LTS is pinned in `.nvmrc`. Astro 7 needs `>=22.12.0` and **does not support odd-numbered versions** (e.g. 25).
- Keep `pnpm-workspace.yaml` (`allowBuilds: esbuild`) — fresh installs need it.

## How it is wired

- One route: `src/pages/index.astro`. Nothing else is routed.
- `src/data/domains.ts` and `src/data/site.ts` are the single sources of truth (domains/copy vs. contact info/UI strings).
- Arrival host: `Base.astro`'s head script sets `html[data-host]` from `location.hostname`; `index.astro` **generates** the per-host CSS from `domains.ts`. To add or remove a domain, change the data only — never hand-write host CSS or a per-domain block.
- Unknown host (e.g. IP access) falls back to `domains[0]` (`fallbackHost`), and the static `data-host` on `<html>` is that same value for the no-JS case. **Entry order matters: the first domain is the default.**
- All domains render as sibling `<section data-spotlight>` blocks present in the DOM; CSS reveals only the matching one. There is no client-side templating.
- Theme: the head script writes `data-theme-mode` (`system|light|dark`, persisted) and the resolved `data-theme`. The topbar segmented control's active style is CSS keyed on `data-theme-mode`; JS only syncs `aria-pressed`.
- Language: both languages are always in the DOM. Use `T.astro` for every user-visible string — it emits `<span lang="zh-CN" data-i18n="zh">` plus an `en` sibling, and CSS hides one.
  - **Do not key language visibility on `[lang]`** — the language toggle button carries `lang` for screen-reader pronunciation and would hide itself; the bilingual spans carry `lang` too, so visibility is keyed on `data-i18n`.
- Styling: Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config.js`. Tokens live in `@theme` / `@theme inline` in `src/styles/global.css`, component CSS in `@layer components` with the `ds-` prefix. Use semantic tokens (`--paper`, `--ink`, `--accent`, …), never raw hex; both themes are declared once in `:root` / `[data-theme="dark"]`.

## Easy to get wrong

- **Display vs technical form.** Humans see `displayHost()`: first letter capitalised, TLD upper-cased (`Javaing.COM`, `Zchat.CC`). URLs, `data-host` / `data-spotlight` / `data-row`, canonical and JSON-LD `url` must stay the lowercase `domain.host`. Don't "align" one to the other.
- Fonts are self-hosted (`@fontsource/jetbrains-mono`); Chinese uses the system stack. **Do not add Google Fonts or any foreign CDN** — the audience is mostly in mainland China, where they are unreachable.
- List rows (`<li class="ds-row">`) are intentionally non-clickable (hover only). Every domain already resolves to this same site.
- `Domain.price` still exists in the type but no domain sets it, so everything renders "价格可议 / Price negotiable". That is deliberate, not dead code.
- Astro 7 `compressHTML` defaults to `'jsx'`: whitespace between elements is stripped. Write intentional spaces as `{' '}` or `&nbsp;`.
- The Astro 7 Rust compiler rejects unclosed tags and no longer auto-corrects invalid nesting (e.g. block elements inside `<p>`).
- Output is `static`; the hostname is only knowable client-side. Don't add SSR adapters or build-time host logic.

## Verify

- `pnpm build`, then inspect `dist/index.html`: the counts of `class="ds-spotlight"` and `<li class="ds-row"` must equal the number of entries in `domains.ts`; JSON-LD must parse; removed domains must be absent.
- To exercise a specific domain locally: add it to `/etc/hosts` (see README) and open `http://<domain>:4321/`.
- No browser is installed in this environment (Chromium download fails, Firefox has no X server), so screenshots usually fail — verify from the emitted HTML/CSS instead.
- Local `curl` may be routed through an `http_proxy`; use `--noproxy '*' http://127.0.0.1:4321/`.

## Git

- Remote `https://github.com/hmilyld/DomainSale`, public, branch `main`. No CI or release process. Commit and push only when explicitly asked.
