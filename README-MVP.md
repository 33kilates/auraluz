# MVP — LP de recrutamento AuraLuz

## Arquivos

- `index.html`: landing page responsiva, formulário de qualificação, pontuação de fit, captura de UTMs e bloco interno de produção.
- `estrategia-mapeamento.md`: pesquisa, mapa racional/emocional, territórios, objeções e experimentos.
- `assets/`: versões normalizadas dos materiais recebidos, incluindo o vídeo do criativo convertido para MP4/H.264.

## Antes de publicar

1. No final do `index.html`, preencher:
   - `ROUTING_ENDPOINT`
   - `WHATSAPP_NUMBER` (DDI + DDD + número, apenas dígitos)
   - `PRIVACY_POLICY_URL`
2. Confirmar e inserir nas FAQs:
   - comissão e possíveis faixas;
   - duração do ciclo;
   - regras de prestação de contas;
   - perda, dano, furto e inadimplência;
   - garantia, troca e cuidados;
   - entrega, coleta e reposição;
   - critérios da análise cadastral.
3. Substituir o logo 120 × 120 por versão vetorial.
4. Produzir os ativos indicados no bloco “O que falta produzir”.
5. Inserir política de privacidade e contato do responsável pelos dados.
6. Remover ou ocultar o bloco `[data-mvp-only]` antes de direcionar tráfego.
7. Testar o endpoint com UTMs reais e validar a recepção de `lead_score`, `lead_tier`, `_fbp` e `_fbc`.
8. Instalar Pixel/CAPI somente com governança de consentimento e documentação compatível com a operação.

## Lógica de qualificação

- Tier A: 13 pontos ou mais — atendimento prioritário.
- Tier B: 9 a 12 pontos — atendimento normal e perguntas complementares.
- Tier C: até 8 pontos — nutrição/lista de espera.

O score usa região, contexto de relacionamento, tamanho aproximado da rede, disponibilidade, plano de apresentação, experiência, momento e compromisso com o controle da maleta. Não utiliza idade, maternidade, estado civil ou emprego/desemprego como filtro.

## Observações importantes

- O formulário não envia dados enquanto `ROUTING_ENDPOINT` estiver vazio.
- O vídeo `criativo-recrutamento.mp4` foi convertido de HEVC/MOV para H.264/MP4, mais compatível com navegadores.
- Os números de vendas informados no briefing não entraram na copy pública porque faltam definição de período, distinção entre vendas e comissão e prova autorizada.
- Não publicar “venda garantida”, “produto se vende sozinho”, “zero risco” ou promessa fixa de renda.

