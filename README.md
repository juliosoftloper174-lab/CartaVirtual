# 🍔 Burguer Peru - Aplicación de Restaurante

¡Hola! 👋 Esta es una aplicación web moderna para un restaurante de hamburguesas peruanas. Es como un menú digital donde los clientes pueden ver las hamburguesas, agregarlas a un carrito de compras y hacer pedidos.

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
