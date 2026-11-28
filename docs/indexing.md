# Indexação em buscadores

**Estado atual (desde 2026-11-28): o site inteiro está fora dos buscadores.** O João ainda não quer atrair clientes. Nenhuma página é indexada, incluindo `/design`.

## Como funciona

A política vive num lugar só: `src/config/indexing.ts` (`indexing.allowed`).

Com `allowed: false`:
- Toda página tem `<meta name="robots" content="noindex, nofollow">` (feito em `src/layouts/BaseLayout.astro`).
- Toda resposta, inclusive imagens, fontes e outros arquivos que não são HTML, leva o cabeçalho `X-Robots-Tag: noindex, nofollow`. O arquivo `dist/_headers` é gerado no build pela integração `robots-header` em `astro.config.mjs`; o Cloudflare Workers lê esse arquivo.
- `public/robots.txt` **não bloqueia** o rastreamento (`Allow: /`) e não aponta sitemap. Isso é de propósito: se o robô for proibido de entrar, ele não lê o `noindex` e a página pode continuar no índice.
- Não há sitemap: o pacote `@astrojs/sitemap` não está instalado.

Limite conhecido: `/whatsapp` é um redirecionamento configurado no painel do Cloudflare, fora do código, então esta política não coloca cabeçalho nele. Ele redireciona para o WhatsApp e não tem conteúdo para indexar. Se quiser o cabeçalho também ali, crie uma Transform Rule de cabeçalho de resposta no painel.

## Como reverter (liberar o SEO)

Só com a autorização do João.

1. Em `src/config/indexing.ts`, mude `allowed` para `true`. Isso remove a meta `robots` das páginas e deixa de gerar o `_headers`.
2. `/design` continua `noindex` pela propriedade `noindex` da página (internas ficam fora).
3. Defina `site` em `astro.config.mjs` (domínio `https://comitas.tech`), instale `@astrojs/sitemap`, adicione-o em `integrations` e inclua em `public/robots.txt` a linha `Sitemap: https://comitas.tech/sitemap-index.xml`.
4. Revise título, descrição, `og:` e `canonical` das páginas antes de publicar.
5. Depois do deploy, confira com `curl -I https://comitas.tech/` que não há `X-Robots-Tag` e que o HTML não tem a meta `robots`. Para páginas que já foram vistas por buscadores, use a ferramenta de inspeção de URL para pedir nova indexação.
