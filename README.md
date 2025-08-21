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
