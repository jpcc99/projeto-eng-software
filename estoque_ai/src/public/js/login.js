const API = "http://localhost:3001";
const HOME = "http://localhost:3000";

const email = document.getElementById("input-email");
const senha = document.getElementById("input-senha");

async function handleSubmit(event) {
  event.preventDefault();

  const [isEmailValid, emailErrMsg] = checkEmail(email.value)
  if (!isEmailValid) {
    alert(emailErrMsg);
    email.value = "";
    return;
  }
  const [isSenhaValid, senhaErrMsg] = checkSenha(senha.value);
  if (!isSenhaValid) {
    alert(senhaErrMsg);
    senha.value = "";
    return;
  }

  const url = `${API}/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: email.value, senha: senha.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);

    window.location.href = `${HOME}/user`;

  } catch (err) {
    console.error(err);
  }
}

function checkEmail(email) {
  const errMsg = "Email inválido";
  const validationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!validationRegex.test(email)) {
    return [false, errMsg];
  }
  return [true, null];
}

function checkSenha(senha) {
  const errMsg = "A senha deve ter no mínimo 8 caracteres, ao menos numa letra maiúscula, uma minúscula, um número e um caracter especial";
  const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!validationRegex.test(senha)) {
    return [false, errMsg];
  }
  return [true, null];
}
