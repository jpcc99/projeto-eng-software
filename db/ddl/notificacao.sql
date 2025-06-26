CREATE TYPE TIPO_NOTIFICACAO AS ENUM ('solicitacao', 'aprovacao', 'reprovacao', 'atendimento', 'planejamento', 'sistema');

CREATE TABLE Notificacao (
    id_notificacao SERIAL,
    id_usuario_destino VARCHAR(20) ,
    mensagem TEXT NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    tipo tipo_notificacao NOT NULL,
    id_referencia INT NULL, -- Pode referenciar ID_Solicitacao, ID_Planejamento, etc.
    CONSTRAINT pk_notificacao PRIMARY KEY(id_notificacao),
    CONSTRAINT fk_usuario_destino FOREIGN KEY (id_usuario_destino)
      REFERENCES usuario(matricula)
);
