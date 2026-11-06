# 部署

燕云十六声攻略站是构建期静态站：MDX 在 `next build` 时读入，产物是 `out/` 里的 HTML。上线方式是 Cloudflare Workers 的静态资源，不跑 OpenNext，也不在请求路径上执行 Worker 脚本。这样免费档的 10ms CPU 限制不会被页面渲染占用，响应也不会带 `Set-Cookie`，边缘可以缓存。

合并到 `master` 之后，由 Cloudflare Workers Builds 自动构建并部署。不要在 GitHub Actions 里再加部署步骤。

## Workers 控制台要填的值

在 Workers & Pages 里新建 Worker，连接本仓库。

| 项 | 值 |
| --- | --- |
| Worker 名称 | `windsmeet-codex` |
| 生产分支 | `master` |
| 构建命令 | `npm run build` |
| 部署命令 | `npx wrangler deploy` |
| 预览命令 | 保持默认 `npx wrangler versions upload`；若该账号的默认仍是 `npx wrangler preview`，用界面里的默认即可 |
| 根目录 | 仓库根目录 |
| 自定义域 | `yanyun.mvphubapp.com` |

自定义域在 Worker 的 Settings → Domains & Routes 里添加。`mvphubapp.com` 这个 zone 需要已经在同一个 Cloudflare 账号下。路由就是这一个主机名，不需要路径前缀。

`wrangler.jsonc` 里没有写死自定义域，避免第一次部署时 DNS 还没接上就失败。域要在控制台手动绑。

## 构建环境变量

运行时不需要环境变量。

构建命令本身会设置：

- `SWC_NATIVE_BINDING_CACHE`：仓库内的绝对路径 `.swc-native-cache`
- `SWC_NATIVE_BINDING_CACHE_SKIP_SECURITY_CHECK=1`

这是为了 Workers Builds 上 `@swc/core` 原生绑定加载失败（next-intl 会用到它）。`package.json` 的 `allowScripts` 同时放行了 `@swc/core` 的安装脚本。如果构建机上的默认缓存目录不可执行，再在 Build variables 里把 `SWC_NATIVE_BINDING_CACHE` 改成一个可执行文件系统上的绝对路径。

可选构建变量：

- `NEXT_PUBLIC_SITE_URL=https://yanyun.mvphubapp.com`  
  不设时，sitemap、robots 和 metadata 也使用这个地址。

不要把 `NODE_ENV=production` 设进安装阶段。Tailwind 和 Wrangler 在 devDependencies 里，`npm ci` 需要装上它们才能构建和部署。

## 本地

```bash
npm ci
npm run dev                 # http://localhost:3000/en
npm run build               # 生产构建，输出 out/
npm run preview             # 用 Wrangler 按线上规则提供 out/（重定向、404、响应头）
npm test
npm run validate:content
```

`npm run build` 就是 Workers Builds 使用的构建命令。静态导出没有 Node 服务器，`next start` 不可用。

## 缓存和未知路径

- 页面由静态资源层直接返回，不经过 Worker，因此没有 `Set-Cookie`。
- `/` 由 `public/_redirects` 302 到 `/en`。语言前缀写在路径里，不靠 cookie 或 Accept-Language。
- 未知路径使用 `not_found_handling: "404-page"`，返回根目录那份不带脚本的 `404.html`。
- `/_next/static/*` 带一年的 `Cache-Control: public, max-age=31536000, immutable`。HTML 使用 Workers 静态资源的默认缓存（`public, max-age=0, must-revalidate`，边缘仍会缓存并用 ETag 再验证）。

## 主站

门户 `mvphubapp.com` 上的产品 slug 是 `yanyun`，卡片目前没有对外地址（关于页仍把 Yanyun Codex 写成 coming soon）。本仓库部署完成并绑上 `yanyun.mvphubapp.com` 之后，需要在门户仓库里把该产品改成已上线，并加上指向 `https://yanyun.mvphubapp.com` 的入口。那次修改不在这个仓库里。
