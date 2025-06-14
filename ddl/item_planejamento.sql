CREATE TABLE item_planejamento (
  id_planejamento INT,
  id_material INT,
  quantidade_planejada INT,
  CONSTRAINT pk_item_planejamento PRIMARY KEY(id_material, id_planejamento)
  CONSTRAINT fk_planejamento FOREIGN KEY (id_planejamento)
    REFERENCES planejamento(id_planejamento)
  CONSTRAINT fk_material FOREIGN KEY (id_material)
    REFERENCES material(id_material),
);
