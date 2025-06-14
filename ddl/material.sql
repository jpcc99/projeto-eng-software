CREATE TABLE (
  id_material INT,
  codigo VARCHAR(50) NOT NULL,
  descricao,
  unidade_de_medida VARCHAR(20),
  estoque_min INT,
  estoque_max INT,
  ativo BOOLEAN,
  CONSTRAINT material_pk PRIMARY KEY(id_material)
);
