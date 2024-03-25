<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Versiones utilizadas

Yarn: Version 1.22.22
Ejecutar:
```
yarn -v
```

Npm: Version 9.5.1
Ejecutar:
```
npm -v
```

Nest: Version 9.5.0
Ejecutar:
```
nest -v
```

Node: Version 18.16.0
Ejecutar:
```
node -v
```

Typescript: Version 5.0.4
Ejecutar:
```
tsc -v
```

# Ejecutar en desarrollo

1. Clonar el repositorio.
2. Ejecutar:
```
yarn install
```
3. Tener Nest CLI instalado.
```
npm install -g @nestjs/cli
```
4. Levantar la BD.
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrarlo a  __.env__.

6. Llenar las variables de entorno definidas en el ```.env```.

7. Ejecutar la aplicacion en dev:
```
yarn start dev
```

8. Reconstruir la BD con la semilla
```
http://localhost:3000/api/seed
```

## Stack usado
* MONGODB
* Nest

# Build de Produccion
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de produccion
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod-yaml --env-file .env.prod up --build
```