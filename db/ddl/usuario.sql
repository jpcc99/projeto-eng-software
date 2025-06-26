CREATE TYPE TIPO AS ENUM ('Usuario', 'Coodenador', 'ControleMateriais', 'Admin');

CREATE TABLE usuario (
  matricula VARCHAR(20),
  nome_usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  tipo_usuario TIPO NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  id_setor INT,
  CONSTRAINT pk_usuario PRIMARY KEY(matricula),
  CONSTRAINT fk_setor FOREIGN KEY (id_setor)
    REFERENCES Setor(id_setor)
);
