CREATE TABLE solicitacao (
  id_solicitacao INT,
  status INT NOT NULL,
  prioridade INT NOT NULL,
  justificativa VARCHAR(200)
  data_solicitacao DATE,
  CONSTRAINT requisicao_pk PRIMARY KEY(id_solicitacao)
);
