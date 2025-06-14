CREATE TABLE planejamento (
  id_planejamento INT,
  data_referencia DATE,
  status INT,
  data_envio DATE,
  data_criacao DATE,
  CONSTRAINT planejamento_pk PRIMARY KEY(id_planejamento),
);
