CREATE TABLE setor_cadastro_perfil (
  id_setor,
  id_perfil,
  data_cadastro DATE,
  CONSTRAINT setor_cadastro_perfil_pk PRIMARY KEY(id_setor, id_perfil),
  CONSTRAINT setor_fk FOREIGN KEY (id_setor)
    REFERENCES setor(id_setor),
  CONSTRAINT perfil_fk FOREIGN KEY (id_perfil)
    REFERENCES perfil(cpf)
);
