CREATE TABLE Planejamento_Mensal(
  id_planejamento SERIAL,
  mes_ano_planejamento DATE NOT NULL,
  id_setor INT,
  data_criacao DATE NOT NULL DEFAULT NOW(),
  matricula_criador VARCHAR(20),
  CONSTRAINT pk_planejamento_mensal PRIMARY KEY(id_planejamento),
  CONSTRAINT fk_setor FOREIGN KEY (id_setor)
    REFERENCES Setor(id_setor),
  CONSTRAINT fk_matricula_criador FOREIGN KEY (matricula_criador)
    REFERENCES Usuario(matricula)
);
