CREATE TABLE Item_Planejamento(
  id_item_planejamento SERIAL,
  id_planejamento INT,
  id_material INT,
  qtd_planejada INT NOT NULL,
  CONSTRAINT pk_item_planejamento PRIMARY KEY(id_item_planejamento),
  CONSTRAINT fk_planejamento FOREIGN KEY (id_planejamento)
    REFERENCES Planejamento_Mensal(id_planejamento),
  CONSTRAINT fk_material FOREIGN KEY (id_material)
    REFERENCES Material(id_material)
);
