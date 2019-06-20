# Semi1P1
proyecto 1 - seminario1 - 201314713

Depositorio base de datos      ---->  docker pull 201314713/s1p1-db
Repositorio Api y servidor web ---->  docker pull 201314713/s1p1-api

Se tienen dos carpetas distribuidas de la siguiente manera:
  -docker-compose.yml: crea y alista el entorno de trabajo total creando todas las imagenes necesarias para correr la pagina      web (En el puerto 3258)
    utilizar con comando docker-compose up
    
  - DB: 
      -Dockerfile: recursos para la base de datos, el DockerFile genera una base de datos MYSQL corriendo en el puerto 3306
      -mysql-scripts: carpeta con los scripts de la base de datos
  - WEB:
      -Dockerfile: recursos para la generación de la api y del servidor web
      -views: paginas para el servidor web
      -app.js: appi de NodeJS
