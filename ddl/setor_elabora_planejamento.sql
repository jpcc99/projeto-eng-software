CREATE TABLE setor_elabora_planejamento (
  id_planejamento INT,
  id_setor INT,
  CONSTRAINT setor_elabora_planejamento_pk PRIMARY KEY(id_planejamento, id_setor),
  CONSTRAINT planejamento_fk FOREIGN KEY (id_planejamento)
    REFERENCES planejamento(id_planejamento),
  CONSTRAINT setor_fk FOREIGN KEY (id_setor)
    REFERENCES setor(id_setor)
);
