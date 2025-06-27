// TODO refatorar para usar a nova util
const ApiResponse = require("./apiResponse");

async function checaCamposFaltando(camposNecessários = [], req = {}) {
  const camposFaltando = [];

  const body = req?.body;
  if (!body) {
    return ApiResponse.error("Body não existe na requisição");
  }

  for (const campo of camposNecessários) {
    if (!(campo in body)) {
      camposFaltando.push(campo);
    }
  }

  if (camposFaltando.length > 0) {
    return ApiResponse.error(`Campos Faltando: ${camposFaltando}`);
  }
  return ApiResponse.success();
}

module.exports = checaCamposFaltando;
