const EnumTiposUsuario = Object.freeze({
  ALUNO: "Usuario",
  COORDENADOR: "Coordenador",
  CONTROLE_MATERIAIS: "ControleMateriais",
  ADMIN: "Admin"
});

async function checkTipoUsuario(tipo) {
  let isIn = false;
  for (const key in EnumTiposUsuario) {
    if (EnumTiposUsuario[key] == tipo) {
      isIn = true;
      break;
    }
  }
  if (!isIn) throw Error("Tipo inválido de usuário");
}

module.exports = {
  EnumTiposUsuario: EnumTiposUsuario,
  checkTipoUsuario: checkTipoUsuario
};
