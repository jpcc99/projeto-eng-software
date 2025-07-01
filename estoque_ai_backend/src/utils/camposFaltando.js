// TODO refatorar para usar a nova util
const ApiResponse = require("./apiResponse");

async function checaCamposFaltando(camposNecessários = [], target = {}) {
  const camposFaltando = [];

  if (!target) {
    return ApiResponse.error("Body não existe na requisição");
  }

  for (const campo of camposNecessários) {
    if (!(campo in target)) {
      camposFaltando.push(campo);
    }
  }

  if (camposFaltando.length > 0) {
    return ApiResponse.error(`Campos Faltando: ${camposFaltando}`);
  }
  return ApiResponse.success();
}

module.exports = checaCamposFaltando;
