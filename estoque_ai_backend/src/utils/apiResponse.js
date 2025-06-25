class ApiResponse {
  static success(data, message = 'Operação realizada com sucesso') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message = 'Ocorreu um erro', statusCode = 400) {
    return {
      success: false,
      message,
      statusCode
    }
  }
}

module.exports = ApiResponse;
