const ApiResponse = require('../utils/apiResponse');

const regex = Object.freeze({
  usuario: {
    nome: /^(?! )[a-zA-Zà-úÀ-Ú' -]+(?<! )$/,
    matricula: /^[a-zA-Z0-9-]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },

  setor: {
    nome: /^(?! )[a-zA-Zà-úÀ-ÚãõÃÕâêîôûÂÊÎÔÛáéíóúÁÉÍÓÚçÇ' ,-]+(?<! )$/,
    sigla: /^[A-Z0-9]{1,10}$/,
  }
});

async function checkRegex(campo = "", regex = / /, errMsg = " ") {
  if (!regex.test(campo)) {
    return ApiResponse.error(errMsg);
  }
  return ApiResponse.success();
}

module.exports = {
  checkRegex,
  regex,
};
