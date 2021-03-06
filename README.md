# Platzi Notion Notes

## 1. Duplicar Template

Este proyecto permite generar 3 bases de datos en Notion (Categorías, Rutas y Cursos) con la información de la plataforma Platzi. Esto permitirá tener un template en notion donde se puede tomar apuntes de los cursos que vayas realizando en la plataforma.

Si aún no tienes manejo de la herramienta Notion puedes apuntarte al curso [Curso de Organización y Productividad con Notion](https://platzi.com/cursos/notion/)

> Puedes duplicar este template con la información ya completada.
> [Template con información completa al 09/05/2022 ](https://www.notion.so/nestcode/PlatziNotes-Complete-93bf13484c66485790fad49467661fc8)

![complete](./assets/complete.PNG)

o

> Puedes duplicar este template vacio y que será completado con la información actual de la plataforma.
> [Template vacio](https://www.notion.so/nestcode/PlatziNotes-Empty-861e3e7535d3474dae5093b717a845e5)

![empty](./assets/empty.PNG)

## 2. Completar el template vacio

Para completar el template vacio haremos uso del presente repositorio. Utilizando NodeJS y el API de Notion.

![charge](./assets/charge.gif)

### 2.1 Obtener `Internal Integration Token` de Notion

- Ve a [https://www.notion.com/my-integrations](https://www.notion.com/my-integrations).
- Click en el botón `+ New integration`.
- Da un nombre a tu integración, por ejemplo "PlatziNotion".
- Selecciona el workspace donde vas a instalar la integración.
- Click en `Submit` para crear la integración
- Copia el `Internal Integration Token` de la siguiente página.

<img src="https://files.readme.io/2ec137d-093ad49-create-integration.gif" alt="" title="093ad49-create-integration.gif" loading="lazy" width="600">

> Imágenes referenciales obtenidas de [https://developers.notion.com/docs/getting-started](https://developers.notion.com/docs/getting-started)

### 2.2 Comparte las bases de datos ( Categorías, Rutas y Cursos ) con la integración

Al inicio, las integraciones no tienen acceso a ninguna página (o base de datos) del workspace. Un usuario debe compartir páginas específicas con una integración para que se pueda acceder a esas páginas mediante la API.

En cada una de las bases de datos, haz clic en el botón "Share". Luego, haz clic en "Invite" y utiliza el selector para encontrar tu integración por su nombre.

<img src="https://files.readme.io/0a267dd-share-database-with-integration.gif" title="Click to close..."  height="auto" alt="Creating and sharing a database with your integration" width="600" loading="lazy">

> Imágenes referenciales obtenidas de [https://developers.notion.com/docs/getting-started](https://developers.notion.com/docs/getting-started)

### 2.3 Clona el proyecto

```
git clone https://github.com/NestorPlasencia/platzi-notion.git
```

```
cd platzi-notion
```

### 2.4 Instala las dependencias

```
npm install
```

### 2.5 Renombra el archivo .env.template por .env

```
mv .env.template .env
```

### 2.6 Extrae los `ids` de las bases de datos

El ID de la base de datos es la parte de la URL que aparece después del nombre de su espacio de trabajo (si tiene uno) y la barra (/) y antes del signo de interrogación (?). El ID tiene 32 caracteres y contiene números y letras.

```
https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                  |--------- Database ID --------|
```

### 2.7 Reemplazar la información en el archivo .env

Reemplaza la información de los `ids` y el `Internal Integration Token` en el archivo `.env`

```
NOTION_KEY=secret_...
NOTION_COURSES_DB_ID=...
NOTION_ROUTES_DB_ID=...
NOTION_CATEGORIES_DB_ID=...
```

### 2.8 Correr el script de Node.Js

```
node index.js
```

![charge](./assets/charge.gif)
