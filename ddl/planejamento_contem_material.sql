CREATE TABLE planejamento_contem_material (
  id_planjamento INT,
  id_material INT,
  CONSTRAINT planejamento_fk FOREIGN KEY (id_planjamento)
    REFERENCES planejamento(id_planjamento),
  CONSTRAINT material_fk FOREIGN KEY (id_material)
    REFERENCES material(id_material)
);
