CREATE TABLE setor (
  id_setor INT,
  nome VARCHAR(100),
  sigla VARCHAR(10),
  id_perfil VARCHAR(11),
  id_solicitacao INT,
  id_planejamento INT,
  CONSTRAINT pk_setor PRIMARY KEY(id_setor),
  CONSTRAINT fk_perfil FOREIGN KEY (id_perfil)
    REFERENCES perfil(id_perfil),
  CONSTRAINT fk_solicitacao FOREIGN KEY (id_solicitacao)
    REFERENCES solicitacao(id_solicitacao),
  CONSTRAINT fk_planejamento FOREIGN KEY (id_planejamento)
    REFERENCES planejamento(id_planejamento)
);
