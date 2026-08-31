# Simulador de investimentos

Aplicação web para projetar a evolução de um investimento com aporte inicial, contribuições mensais, rentabilidade composta e aumento anual opcional do aporte.

## Recursos

- Prévia atualizada enquanto o cenário é preenchido
- Comparação entre capital investido e rendimentos
- Resultado detalhado com evolução mensal
- URL compartilhável com os parâmetros da simulação
- Temas claro e escuro
- Interface responsiva e navegável por teclado

## Rodar localmente

Instale as dependências:

```bash
pnpm install
```

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O Vite mostrará o endereço local no terminal.

## Verificação

```bash
pnpm test
pnpm lint
pnpm build
```

Use `pnpm test:watch` durante o desenvolvimento para executar os testes a cada alteração.

## Modelo de cálculo

O simulador aplica a rentabilidade informada a cada mês e adiciona o aporte do período. No primeiro mês, o aporte é o valor inicial. A opção avançada soma um valor fixo ao aporte mensal a cada 12 meses.

Os resultados são estimativas matemáticas. A simulação não considera impostos, taxas, inflação nem variações futuras de rentabilidade.

## Tecnologias

React, Vite, Tailwind CSS, React Router e Vitest.
