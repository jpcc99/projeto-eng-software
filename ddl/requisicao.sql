CREATE TABLE requisicao (
  id_requisicao INT,
  status VARCHAR(20) NOT NULL,
  prioridade INT NOT NULL,
  justificativa VARCHAR(200)
  qtd_requisitada INT NOT NULL,
  qtd_aprovada INT,
  data_requisicao DATE,
  CONSTRAINT requisicao_pk PRIMARY KEY(id_requisicao)
);
