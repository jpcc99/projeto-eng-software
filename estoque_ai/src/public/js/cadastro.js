const API = "http://localhost:3001";
const HOME = "http://localhost:3000";
const nome = document.getElementById("nome-input");
const matricula = document.getElementById("matricula-input");
const email = document.getElementById("email-input");
const senha = document.getElementById("senha-input");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const [isNameValid, nameErrMsg] = checkName(nome.value);
    if (!isNameValid) throw Error(nameErrMsg);

    const [isEmailValid, emailErrMsg] = checkEmail(email.value);
    if (!isEmailValid) throw Error(emailErrMsg);

    const [isSenhaValid, senhaErrMsg] = checkSenha(senha.value);
    if (!isSenhaValid) throw Error(senhaErrMsg);
  } catch (err) {
    console.error(err);
    alert(err);
    return;
  }

  try {
    const url = `${API}/cadastro`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        nome: nome.value,
        matricula: matricula.value,
        email: email.value,
        senha: senha.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      console.log(await response.json());
      window.location.href = `${HOME}/`;
    } else {
      throw Error("Não foi possível fazer o cadastro");
    }
  } catch (err) {
    console.error(err);
  }
});

function checkName(nome) {
  const errMsg = "Nomes devem conter apenas letras, apóstrofos ou hífens";
  const validationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*\.?$/;
  if (!validationRegex.test(nome)) return [false, errMsg];
  return [true, null];
}

function checkEmail(email) {
  const errMsg = "Email inválido";
  const validationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!validationRegex.test(email)) return [false, errMsg];
  return [true, null];
}

function checkSenha(senha) {
  const errMsg = "A senha deve ter no mínimo 8 caracteres, ao menos numa letra maiúscula, uma minúscula, um número e um caracter especial";
  const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!validationRegex.test(senha)) return [false, errMsg];
  return [true, null];
}
