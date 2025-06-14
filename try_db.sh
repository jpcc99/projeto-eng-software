DB_HOST=localhost DB_PORT=5432 bash -c 'printf "" 2>>/dev/null >> /dev/tcp/${DB_HOST}/${DB_PORT}'
