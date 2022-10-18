// Arquitetura Hexagonal
// Ports & Adapters
export async function HttpClient(fetchUrl, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };
  return fetch(fetchUrl, options)
    .then(async (respostaDoServidor) => {
      return {
        ok: respostaDoServidor.ok,
        status: respostaDoServidor.status,
        statusText: respostaDoServidor.statusText,
        body: await respostaDoServidor.json(),
      }
    })
    .then(async (response) => {
      if (!fetchOptions.refresh && !response.status !== 401) return response;
      console.log('Middleware: Rodar codigo para atualizar o token')

      //Tentar atualizar os tokens
      const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
        method: 'GET',
      });

      const newAccessToken = await refreshResponse.body.data.access_token;
      const newRefreshToken = await refreshResponse.body.data.refresh_token;

      //guarda token
      tokenService.save(newAccessToken)

      // tentar rodar a request anterior
      const retryResponse = await HttpClient(fetchUrl, {
        ...options,
        refresh: false,
        headers: {
          'Authorization': `Bearer ${newAccessToken}`
        }
      })
      return response;

    })
}
