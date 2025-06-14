CREATE TABLE perfil (
  cpf VARCHAR(11),
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(128),
  ativo BOOLEAN,
  tipo_perfil INT,
  id_form INT,
  CONSTRAINT perfil_pk PRIMARY KEY(cpf),
  CONSTRAINT form_fk FOREIGN KEY (id_form)
    REFERENCES form(id_form)
);
