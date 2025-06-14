# Pra rodar o postgres
docker compose up -d flask_db

# Vê se pega
docker compose logs

# Checa os containers
docker ps -a

# Subir o flask app
docker compose build

# Checa as imagens
docker images

# Faz o build do flask app
docker compose up flask_app
