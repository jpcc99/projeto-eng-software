CREATE TABLE Item_Solicitacao(
  id_item_solicitacao SERIAL,
  id_solicitacao INT,
  id_material INT,
  qtd_solicitada INT NOT NULL,
  qtd_atendida INT DEFAULT 0,
  CONSTRAINT pk_item_solicitacao PRIMARY KEY(id_item_solicitacao),
  CONSTRAINT fk_solicitacao FOREIGN KEY (id_solicitacao)
    REFERENCES Solicitacao(id_solicitacao),
  CONSTRAINT fk_material FOREIGN KEY (id_material)
    REFERENCES Material(id_material)
);
