# Comitas — resumo visual (v1, 2026-11-27)

Base para o design e o desenvolvimento do site. A copy está em `docs/copy.md`.

## Referências
- **Principal: [factory.com](https://factory.com/)** — minimalismo claro, muito espaço, títulos em caixa alta, labels e botões em fonte mono, footer como caixa escura flutuante.
- **Secundária: [makingsoftware.com](https://www.makingsoftware.com/)** — ilustrações técnicas (vista explodida, "por dentro" das coisas), legendas no estilo `FIG_ 001 [ ... ]`.
- Usamos as referências como direção. **Não copiamos ilustrações, logos nem textos** delas.

## Princípios
1. **Claro e minimalista.** Fundo quase branco, texto quase preto, cinzas quentes. A tipografia faz o trabalho.
2. **Espaço generoso.** Pouca coisa por tela; seções respiram.
3. **Ofício.** Detalhes que lembram trabalho manual e precisão: réguas, marcas de medida, cotas, numeração de figuras, linhas finas de 1px.
4. **Sem enfeite genérico.** Nada de foto de banco de imagem, gradiente, ícone 3D ou ilustração de "pessoas felizes no notebook".

## Tipografia
| Papel | Fonte | Uso |
|---|---|---|
| Texto e títulos | **Geist** (Vercel, licença OFL, grátis) | corpo, títulos |
| Labels e botões | **Geist Mono** (OFL, grátis) | botões, labels de seção, legendas, navegação |
| Detalhe (opcional) | **Departure Mono** (OFL, grátis) | números e legendas `FIG_` em pontos isolados |

- **H1:** Geist 500, caixa alta, `letter-spacing: -0.04em`, `line-height: 1`, ~48–56px no desktop.
- **H2:** Geist 400, `letter-spacing: -0.025em`, ~36–44px.
- **Corpo:** Geist 400, 16–18px, `line-height: 1.5`.
- **Labels/botões:** Geist Mono 400, caixa alta, 12–13px, `letter-spacing: -0.02em`.
- Labels de seção no formato `[ 01 ] COMO TRABALHAMOS`.

## Cores (variáveis CSS)
```css
:root {
  --color-bg: #F9F9F9;          /* fundo */
  --color-surface: #FFFFFF;     /* cartões, se houver */
  --color-fg: #020202;          /* texto principal */
  --color-fg-muted: #5C5855;    /* texto secundário (passa contraste AA) */
  --color-fg-subtle: #8A8380;   /* só para textos grandes ou decorativos */
  --color-border: #B8B3B0;      /* bordas de botão, linhas */
  --color-line: #EEEEEE;        /* divisores leves */
  --color-inverse: #101010;     /* footer, botão primário */
  --color-on-inverse: #F9F9F9;
  --color-accent: #FF4F00;      /* PROVISÓRIO — testar outras opções */
}
```
- **Accent provisório:** laranja "de ferramenta" (#FF4F00), que conversa com a ideia de ofício. Alternativas para testar: azul elétrico (#2F4BFF) e verde oliva (#5B6B2F). Trocar só a variável.
- Accent com parcimônia: um detalhe por tela (um sublinhado, um número, um ponto), nunca em blocos grandes.
- **Atenção:** `#8A8380` sobre `#F9F9F9` não passa contraste para texto pequeno (≈3,5:1). Para texto pequeno, usar `--color-fg-muted`.

## Botões
- Altura 32px, `padding: 0 14px`, `border-radius: 3px`, Geist Mono caixa alta.
- **Primário:** fundo `--color-inverse`, texto `--color-on-inverse`. Ex.: `CONVERSAR NO WHATSAPP`.
- **Secundário:** fundo `--color-bg`, borda 1px `--color-border`, texto `--color-fg`.

## Layout
- Largura máxima 1440px, grid de 12 colunas, gutter 24px.
- Seções com ~96px de respiro vertical no desktop (~64px no celular).
- Hero alinhado à esquerda, título grande, linha de apoio curta, um botão primário.
- **Footer flutuante:** caixa `--color-inverse` com `border-radius: 12px`, afastada das bordas da página, sobre o fundo claro. Logo/nome grande no canto inferior esquerdo; links e "© 2026 Comitas. Todos os direitos reservados. · Brasil · WhatsApp" à direita.

## Ilustrações e detalhes de ofício
- Estilo **desenho técnico**: linhas de 1px em `--color-fg`, sem preenchimento ou com cinza leve, vistas explodidas e cortes.
- Legendas no formato `FIG_ 01 [ conversa ]`, em mono.
- Réguas e marcas de medida nas bordas de seções ou atrás de títulos.
- Ideias para o site (fazemos nossas próprias, em SVG):
  - **Hero:** vista explodida de um "sistema" em camadas (interface, regras, dados, agente de IA).
  - **Como trabalhamos:** quatro figuras numeradas, `FIG_ 01` a `FIG_ 04` (Conversa, Desenho, Construção, Evolução).
- **Ordem de esforço:** começar com réguas, labels e legendas (baratos). As ilustrações completas entram depois do site no ar.

## Fora do escopo agora
- Logo definitivo (por enquanto, "COMITAS" em Geist 500 caixa alta).
- Página Sobre.
- Animações além de transições simples.
