CREATE TABLE Material(
  id_material SERIAL,
  nome_material VARCHAR(100) NOT NULL,
  descricao_material TEXT,
  unidade_de_medida VARCHAR(20),
  codigo_material VARCHAR(100),
  estoque_min DECIMAL(10, 2) DEFAULT 0,
  estoque_max DECIMAL(10, 2) DEFAULT 0,
  ativo BOOLEAN DEFAULT TRUE,
  CONSTRAINT pk_material PRIMARY KEY(id_material)
);
