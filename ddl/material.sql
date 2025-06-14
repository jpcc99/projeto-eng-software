CREATE TABLE (
  id_material INT,
  codigo VARCHAR(100) NOT NULL,
  descricao VARCHAR(200),
  unidade_de_medida VARCHAR(20),
  estoque_min INT,
  estoque_max INT,
  status INT,
  CONSTRAINT material_pk PRIMARY KEY(id_material)
);
