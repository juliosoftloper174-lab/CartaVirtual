# 🍔 Burguer Peru - Aplicación de Restaurante

¡Hola! 👋 Esta es una aplicación web moderna para un restaurante de hamburguesas peruanas. Incluye un menú digital interactivo, carrito de compras y un panel de administración para gestionar el menú.

## 🚀 Características Principales

### 1. 👨‍💻 Panel de Administración
- Autenticación de usuarios
- CRUD completo para los ítems del menú
- Interfaz intuitiva para gestión de productos

### 2. 🏠 Página de Inicio
- Muestra un gran banner con una imagen atractiva de hamburguesas
- Barra de navegación con acceso al menú y carrito
- Categorías de comidas disponibles

### 3. 🍽️ Menú de Comida
- Muestra todas las hamburguesas y combos disponibles
- Cada ítem tiene foto, nombre, descripción y precio
- Filtrado por categorías

### 4. 🛒 Carrito de Compras
- Gestión de ítems seleccionados
- Modificación de cantidades
- Cálculo automático del total
- Vaciar carrito

---

## 🏗️ Estructura del Frontend

### 📁 Directorios Principales
- `/src/components` - Componentes reutilizables (Header, Footer, etc.)
- `/src/pages` - Vistas principales de la aplicación
  - `/admin` - Panel de administración
  - `LoginPage.jsx` - Autenticación de usuarios
  - `RegisterPage.jsx` - Registro de nuevos usuarios
- `/src/contexts` - Manejo de estado global (carrito, autenticación)
- `/public/images` - Recursos multimedia

### 🛠️ Tecnologías Clave
- ⚛️ React 18 - Biblioteca principal
- 🎨 Tailwind CSS - Estilización
- 🔄 React Router 6 - Navegación
- 🛒 Context API - Gestión de estado
- 🔐 JWT - Autenticación

---

## 🔧 Configuración del Backend (PHP/MySQL)

### 2. Configuración del Backend (PHP)

1. Crear una base de datos MySQL:
   ```sql
   CREATE DATABASE hamburgueseria;
   ```

2. Importar la estructura y datos iniciales:
   ```bash
   mysql -u usuario -p hamburgueseria < database/hamburgueseria.sql
   ```

3. Configurar las credenciales de la base de datos:
   ```bash
   cd api
   cp config/database.example.php config/database.php
   ```
   Editar `config/database.php` con tus credenciales.

4. Instalar dependencias de PHP:
   ```bash
   composer install
   ```

### 3. Configuración del Frontend (React)

1. Instalar dependencias de Node.js:
   ```bash
   cd ../frontend
   npm install
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env.development
   ```
   Asegúrate de que las URLs apunten a tu servidor PHP.

## 🗃️ Estructura de la Base de Datos

### Tabla: categorias
```sql
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `orden` int(11) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Tabla: hamburguesas
```sql
CREATE TABLE `hamburguesas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `ingredientes` text,
  `destacado` tinyint(1) DEFAULT 0,
  `activo` tinyint(1) DEFAULT 1,
  `orden` int(11) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `hamburguesas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 🌐 API PHP

### Estructura de Archivos
```
api/
├── config/
│   └── database.php       # Configuración de la base de datos
├── controllers/
│   ├── CategoriaController.php
│   └── HamburguesaController.php
├── models/
│   ├── Categoria.php
│   └── Hamburguesa.php
├── uploads/               # Imágenes subidas
└── index.php              # Punto de entrada de la API
```

### Endpoints Principales

#### Categorías
- `GET /api/categorias` - Listar todas las categorías
- `GET /api/categorias/{id}` - Obtener una categoría
- `POST /api/categorias` - Crear categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

#### Hamburguesas
- `GET /api/hamburguesas` - Listar todas las hamburguesas
- `GET /api/hamburguesas/{id}` - Obtener una hamburguesa
- `POST /api/hamburguesas` - Crear hamburguesa
- `PUT /api/hamburguesas/{id}` - Actualizar hamburguesa
- `DELETE /api/hamburguesas/{id}` - Eliminar hamburguesa
- `GET /api/categorias/{id}/hamburguesas` - Hamburguesas por categoría

## 🖥️ Frontend React

### Estructura de Componentes
```
src/
├── components/
│   ├── admin/            # Componentes del panel de administración
│   ├── common/           # Componentes reutilizables
│   └── menu/             # Componentes del menú público
├── pages/
│   ├── admin/            # Vistas del panel de administración
│   ├── menu/             # Vistas del menú público
│   └── Auth/             # Autenticación
├── services/
│   ├── api.js            # Configuración de Axios
│   ├── auth.js           # Servicio de autenticación
│   └── menuService.js    # Servicio para el menú
└── App.js                # Componente principal
```

### Servicio API (services/api.js)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
```

### Ejemplo de Componente (CategoriasList.jsx)
```jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categorias.map(categoria => (
        <div key={categoria.id} className="border p-4 rounded-lg">
          <h3 className="text-xl font-bold">{categoria.nombre}</h3>
          <p>{categoria.descripcion}</p>
          {categoria.imagen && (
            <img 
              src={`${import.meta.env.VITE_IMAGES_URL}/${categoria.imagen}`} 
              alt={categoria.nombre}
              className="w-full h-48 object-cover mt-2"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriasList;
```

## 🔑 Variables de Entorno

### Backend (config/database.php)
```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'hamburgueseria');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_contraseña');
```

### Frontend (.env.development)
```env
VITE_API_URL=http://localhost/api
VITE_IMAGES_URL=http://localhost/api/uploads
```

## 🚀 Despliegue

### Backend
1. Configurar el servidor web (Apache/Nginx) para que apunte a la carpeta `api/`
2. Asegurarse de que la carpeta `uploads/` tenga permisos de escritura
3. Configurar el archivo `.htaccess` para reescribir URLs

### Frontend
1. Construir la aplicación para producción:
   ```bash
   npm run build
   ```
2. Configurar el servidor web para servir los archivos estáticos de `dist/`

## 🛠️ Tecnologías Utilizadas

- **Frontend**
  - React 18
  - React Router 6
  - Tailwind CSS
  - Axios
  - React Hook Form

- **Backend**
  - PHP 8.x
  - MySQL
  - PDO
  - JWT para autenticación

- **Herramientas**
  - Vite
  - Composer
  - Git

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ por [Tu Nombre]

¡Hola! 👋 Esta es una aplicación web moderna para un restaurante de hamburguesas peruanas. Incluye un menú digital interactivo, carrito de compras y un panel de administración para gestionar el menú.

## 🚀 Características Principales

### 1. 👨‍💻 Panel de Administración
- Autenticación de usuarios
- CRUD completo para los ítems del menú
- Interfaz intuitiva para gestión de productos

### 2. 🏠 Página de Inicio
- Muestra un gran banner con una imagen atractiva de hamburguesas
- Barra de navegación con acceso al menú y carrito
- Categorías de comidas disponibles

### 3. 🍽️ Menú de Comida
- Muestra todas las hamburguesas y combos disponibles
- Cada ítem tiene foto, nombre, descripción y precio
- Filtrado por categorías

### 4. 🛒 Carrito de Compras
- Gestión de ítems seleccionados
- Modificación de cantidades
- Cálculo automático del total
- Vaciar carrito

---

## 🏗️ Estructura del Frontend

### 📁 Directorios Principales
- `/src/components` - Componentes reutilizables (Header, Footer, etc.)
- `/src/pages` - Vistas principales de la aplicación
  - `/admin` - Panel de administración
  - `LoginPage.jsx` - Autenticación de usuarios
  - `RegisterPage.jsx` - Registro de nuevos usuarios
- `/src/contexts` - Manejo de estado global (carrito, autenticación)
- `/public/images` - Recursos multimedia

### 🛠️ Tecnologías Clave
- ⚛️ React 18 - Biblioteca principal
- 🎨 Tailwind CSS - Estilización
- 🔄 React Router 6 - Navegación
- 🛒 Context API - Gestión de estado
- 🔐 JWT - Autenticación

---

## 🔧 Configuración del Backend (PHP/MySQL)

### Requisitos
- PHP 8.0+
- MySQL 5.7+
- Servidor web (Apache/Nginx)
- Composer (para dependencias)

### Estructura de la Base de Datos
```sql
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Endpoints de la API

#### 1. Obtener menú
- **Método:** GET
- **URL:** `/api/menu`
- **Respuesta:** Lista de ítems del menú

#### 2. Crear ítem
- **Método:** POST
- **URL:** `/api/menu`
- **Body:** 
  ```json
  {
    "name": "Hamburguesa Especial",
    "description": "Descripción del producto",
    "price": 24.99,
    "category": "Hamburguesas",
    "image": "ruta/imagen.jpg"
  }
  ```

#### 3. Actualizar ítem
- **Método:** PUT
- **URL:** `/api/menu/{id}`
- **Body:** Misma estructura que creación

#### 4. Eliminar ítem
- **Método:** DELETE
- **URL:** `/api/menu/{id}`

---

## 🚀 Instalación y Despliegue

### Frontend
1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Backend
1. Configurar base de datos MySQL
2. Configurar credenciales en `/backend/config.php`
3. Asegurar permisos de escritura en `/public/images`
4. Configurar el servidor web para que apunte a la carpeta pública

---

## 🔒 Seguridad
- Validación de entrada en backend
- Autenticación JWT
- Protección contra CSRF
- CORS configurado

## 📝 Notas para Desarrolladores
- Las credenciales por defecto para el panel de administración son:
  - Usuario: admin
  - Contraseña: 1234
- Se recomienda cambiar estas credenciales en producción
- Las imágenes se guardan en `/public/images`

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

## 🌟 Características Principales

### 1. 🏠 Página de Inicio
- Muestra un gran banner con una imagen atractiva de hamburguesas
- Tiene una barra de navegación en la parte superior para moverse fácilmente
- Muestra las categorías de comidas disponibles

### 2. 🍽️ Menú de Comida
- Muestra todas las hamburguesas y combos disponibles
- Cada ítem tiene una foto, nombre, descripción y precio
- Botón para agregar al carrito

### 3. 🛒 Carrito de Compras
- Muestra todo lo que has seleccionado
- Puedes cambiar las cantidades o quitar ítems
- Muestra el total a pagar
- Botón para vaciar todo el carrito

## 🛠️ Cómo Funciona (Para Desarrolladores)

### Estructura de Carpetas
- `/src/components` - Piezas reutilizables como el encabezado, pie de página, ítems del menú
- `/src/pages` - Las páginas principales de la aplicación
- `/src/contexts` - Maneja el estado global (como el carrito de compras)
- `/public/images` - Todas las imágenes que usa la aplicación

### Tecnologías Usadas
- ⚛️ React - Para construir la interfaz de usuario
- 🎨 Tailwind CSS - Para los estilos (hace que todo se vea bonito)
- 🔄 React Router - Para navegar entre páginas sin recargar
- 🛒 Context API - Para manejar el estado del carrito de compras

## 🚀 Cómo Empezar

1. **Clona el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia la aplicación**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   Ve a: http://localhost:3000

## 📱 Diseño Responsivo
La aplicación se ve bien en todos los dispositivos:
- 📱 Teléfonos móviles
- 💻 Tablets
- 🖥️ Computadoras de escritorio

## 🎨 Personalización
Puedes cambiar fácilmente:
- Los colores en `tailwind.config.js`
- Las imágenes en `/public/images`
- Los productos en `src/data/menu.js`

## 🤝 Contribuir
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación, por favor:
1. Haz un fork del proyecto
2. Crea una rama con tu función
3. Envía un pull request

## 📝 Licencia
Este proyecto está bajo la licencia MIT - mira el archivo LICENSE para más detalles.

---

¡Espero que disfrutes usando esta aplicación de restaurante! 🍔✨
