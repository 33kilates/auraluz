const SPREADSHEET_ID = '1yTS-jUSAMCIJtpsLQDdxaLTSeObSNuxTng3YOiH2maI';
const SHEET_NAME = 'Candidatas';
const HEADERS = [
  'Data de cadastro', 'Nome', 'E-mail', 'WhatsApp', 'Cidade / região',
  'Contexto profissional', 'Tamanho da rede', 'Disponibilidade',
  'Como pretende apresentar', 'Experiência', 'Momento para começar',
  'Aceita responsabilidade', 'Aceita privacidade', 'Lead score', 'Lead tier',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'campaign_id', 'adset_id', 'ad_id', 'fbclid', 'fbp', 'fbc', 'page_url',
  'Status', 'Observações'
];

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let leads = spreadsheet.getSheetByName(SHEET_NAME);
  if (!leads) leads = spreadsheet.insertSheet(SHEET_NAME);

  leads.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  leads.setFrozenRows(1);
  leads.getRange(1, 1, 1, HEADERS.length)
    .setBackground('#3f4937')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  leads.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm:ss');

  let dashboard = spreadsheet.getSheetByName('Painel');
  if (!dashboard) dashboard = spreadsheet.insertSheet('Painel');
  dashboard.getRange('A1:B5').setValues([
    ['Painel de candidatas', 'Valor'],
    ['Total de cadastros', '=MAX(COUNTA(Candidatas!B:B)-1,0)'],
    ['Candidatas A', '=COUNTIF(Candidatas!O:O,"A")'],
    ['Candidatas B', '=COUNTIF(Candidatas!O:O,"B")'],
    ['Candidatas C', '=COUNTIF(Candidatas!O:O,"C")']
  ]);
  dashboard.getRange('A1:B1')
    .setBackground('#3f4937')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  dashboard.autoResizeColumns(1, 2);
}

function doGet() {
  return jsonResponse({ ok: true, service: 'AuraLuz Leads' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse((event.postData && event.postData.contents) || '{}');
    if (!payload.nome || !payload.whatsapp || !payload.email) {
      return jsonResponse({ ok: false, error: 'Campos obrigatórios ausentes.' });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Aba ${SHEET_NAME} não encontrada.`);

    sheet.appendRow([
      new Date(),
      clean(payload.nome),
      clean(payload.email),
      clean(payload.whatsapp),
      clean(payload.cidade),
      clean(payload.contexto),
      clean(payload.rede),
      clean(payload.disponibilidade),
      clean(payload.apresentacao),
      clean(payload.experiencia),
      clean(payload.momento),
      payload.responsabilidade ? 'Sim' : 'Não',
      payload.privacidade ? 'Sim' : 'Não',
      Number(payload.lead_score || 0),
      clean(payload.lead_tier),
      clean(payload.utm_source),
      clean(payload.utm_medium),
      clean(payload.utm_campaign),
      clean(payload.utm_content),
      clean(payload.utm_term),
      clean(payload.campaign_id),
      clean(payload.adset_id),
      clean(payload.ad_id),
      clean(payload.fbclid),
      clean(payload.fbp),
      clean(payload.fbc),
      clean(payload.page_url),
      'Novo',
      ''
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Falha ao registrar a candidata.' });
  } finally {
    lock.releaseLock();
  }
}

function clean(value) {
  const text = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
