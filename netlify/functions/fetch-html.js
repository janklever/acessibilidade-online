export async function handler(event) {
  const url = event.queryStringParameters.url;
  
  if (!url) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Parâmetro URL é obrigatório.' }),
    };
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'URL fornecida é inválida.' }),
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'AcessibilidadeOnline-Auditor/1.0 (Mozilla/5.0; Compatibility)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: `Erro ao acessar a URL: HTTP ${response.status} ${response.statusText}` }),
      };
    }

    const htmlText = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: htmlText,
    };
  } catch (error) {
    const errorMessage = error.name === 'AbortError' 
      ? 'A requisição excedeu o tempo limite de 8 segundos.' 
      : `Não foi possível buscar a URL: ${error.message}`;

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}
