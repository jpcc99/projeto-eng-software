CREATE TABLE item_solicitacao (
  id_material INT,
  id_solicitacao INT,
  quantidade_solicitada INT,
  quantidade_atendida INT,
  CONSTRAINT pk_item_solicitacao PRIMARY KEY(id_material, id_solicitacao)
  CONSTRAINT fk_material FOREIGN KEY (id_material)
    REFERENCES material(id_material),
  CONSTRAINT fk_solicitacao FOREIGN KEY (id_solicitacao)
    REFERENCES solicitacao(id_solicitacao)
);
