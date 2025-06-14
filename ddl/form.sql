CREATE TABLE form (
  id_form INT,
  dados JSON,
  data_criacao DATE NOT NULL,
  dat_preenchimento DATE,
  CONSTRAINT form_pk PRIMARY KEY (id_form)
);
