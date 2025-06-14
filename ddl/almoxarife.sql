CREATE TABLE almoxarife (
  cpf VARCHAR(11),
  nome VARCHAR(100),
  matricula VARCHAR(100),
  data_de_atribucao DATE,
  ativo BOOLEAN,
  id_requisicao INT,
  id_planejamento INT,
  id_material INT,
  CONSTRAINT almoxarife_pk PRIMARY KEY(cpf),
  CONSTRAINT requisicaos_fk FOREIGN KEY (id_requisicao)
    REFERENCES requisicao(id_requisicao),
  CONSTRAINT planejamento_fk FOREIGN KEY (id_planejamento)
    REFERENCES planejamento(id_planejamento),
  CONSTRAINT material_fk FOREIGN KEY (id_material)
    REFERENCES material(id_material)
);
