CREATE TYPE STATUS AS ENUM ('Pendente', 'Aprovada', 'Reprovada', 'EmAndamento', 'Concluida');

CREATE TABLE solicitacao(
  id_solicitacao SERIAL,
  data_solicitacao DATE NOT NULL DEFAULT NOW(),
  status_solicitacao STATUS NOT NULL DEFAULT 'Pendente',
  id_setor INT,
  matricula_solicitante VARCHAR(20),
  data_aprovacao_reprovacao DATE,
  matricula_aprovador VARCHAR(20),
  motivo_reprovacao TEXT,
  CONSTRAINT pk_solicitacao PRIMARY KEY(id_solicitacao),
  CONSTRAINT fk_solicitante FOREIGN KEY (matricula_solicitante)
    REFERENCES Usuario(matricula),
  CONSTRAINT fk_aprovador FOREIGN KEY (matricula_aprovador)
    REFERENCES Usuario(matricula)
);
