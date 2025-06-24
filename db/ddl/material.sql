CREATE TABLE Material(
  id_material SERIAL,
  nome_material VARCHAR(100) NOT NULL,
  descricao_material TEXT,
  unidade_de_medida VARCHAR(20),
  CONSTRAINT pk_material PRIMARY KEY(id_material)
);
