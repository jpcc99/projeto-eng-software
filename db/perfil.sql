CREATE TABLE perfil (
  cpf VARCHAR(11),
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(128) NOT NULL,
  ativo BOOLEAN,
  tipo_perfil INT NOT NULL,
  CONSTRAINT perfil_pk PRIMARY KEY(cpf)
);
