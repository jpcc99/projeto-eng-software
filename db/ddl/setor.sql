CREATE TABLE Setor(
  id_setor SERIAL, 
  nome_setor VARCHAR(100) NOT NULL,
  sigla_setor VARCHAR(10) NOT NULL UNIQUE,
  ativo BOOLEAN DEFAULT TRUE,
  CONSTRAINT pk_setor PRIMARY KEY(id_setor)
);
