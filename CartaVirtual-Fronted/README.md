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

## 📊 Datos de Ejemplo

### Categorías

La aplicación muestra las siguientes categorías en el menú principal:

1. **Todos** (🍔) - Muestra todos los productos
2. **Hamburguesas** (🍔) - Nuestra selección de hamburguesas artesanales
3. **Clásicas** (🍟) - Las hamburguesas tradicionales de siempre
4. **Bebidas** (🥤) - Refrescos y jugos naturales
5. **Combos** (🍱) - Combos especiales con hamburguesa, papas y bebida
6. **Postres** (🍰) - Deliciosos postres caseros
7. **Ensaladas** (🥗) - Opciones saludables y frescas
8. **Infantil** (👶) - Menú especial para los más pequeños

```sql
-- Insertar categorías
INSERT INTO `categorias` (`nombre`, `descripcion`, `imagen`, `orden`, `activo`) VALUES
('Hamburguesas', 'Nuestra selección de hamburguesas artesanales', 'images/images (14).jpeg', 1, 1),
('Clásicas', 'Las hamburguesas tradicionales de siempre', 'images/images (15).jpeg', 2, 1),
('Bebidas', 'Refrescos y jugos naturales', 'images/images (12).jpeg', 3, 1),
('Combos', 'Combos especiales con hamburguesa, papas y bebida', 'images/images (16).jpeg', 4, 1),
('Postres', 'Deliciosos postres caseros', 'images/download (20).jpeg', 5, 1),
('Ensaladas', 'Opciones saludables y frescas', 'images/images (17).jpeg', 6, 1),
('Infantil', 'Menú especial para los más pequeños', 'images/images (18).jpeg', 7, 1);
```

### Hamburguesas y Productos

```sql
-- Hamburguesas
INSERT INTO `hamburguesas` (`categoria_id`, `nombre`, `descripcion`, `precio`, `imagen`, `ingredientes`, `destacado`) VALUES
(1, 'Clásica Peruana', 'Carne de res, queso andino, lechuga, tomate y salsa de ají amarillo', 22.50, '/images/images (14).jpeg', 'Carne de res, Queso andino, Lechuga, Tomate, Salsa de ají amarillo', 1),
(1, 'Criolla Deluxe', 'Doble carne, queso cheddar, cebolla caramelizada y salsa criolla', 28.90, '/images/images (15).jpeg', 'Doble carne, Queso cheddar, Cebolla caramelizada, Salsa criolla', 1),
(1, 'Parrillera', 'Carne a la parrilla, queso fundido, champiñones y panceta crujiente', 26.50, '/images/images (13).jpeg', 'Carne a la parrilla, Queso fundido, Champiñones, Panceta', 1),
(1, 'Pollo Crispy', 'Pechuga empanizada, lechuga, tomate y mayonesa de ají amarillo', 21.90, '/images/images (11).jpeg', 'Pechuga empanizada, Lechuga, Tomate, Mayonesa de ají amarillo', 1),
(1, 'Vegetariana Andina', 'Hamburguesa de quinua, palta, queso fresco y salsa de huacatay', 20.50, '/images/images (12).jpeg', 'Hamburguesa de quinua, Palta, Queso fresco, Salsa de huacatay', 1),
(1, 'La Especial de la Casa', 'Trozos de lomo saltado, cebolla, tomate y papas fritas sobre la hamburguesa', 29.90, '/images/images (13).jpeg', 'Lomo saltado, Cebolla, Tomate, Papas fritas', 1),
(1, 'Parrillera Especial', 'Doble carne, doble queso, huevo, jamón, tocino y salsa BBQ', 32.50, '/images/images (14).jpeg', 'Doble carne, Doble queso, Huevo, Jamón, Tocino, Salsa BBQ', 1),
(1, 'Choripán Burger', 'Chorizo argentino, chimichurri, lechuga y tomate', 24.90, '/images/images (15).jpeg', 'Chorizo argentino, Chimichurri, Lechuga, Tomate', 1);

-- Combos
INSERT INTO `combos` (`categoria_id`, `nombre`, `descripcion`, `precio`, `imagen`, `ingredientes`, `destacado`) VALUES
(2, 'Combo Familiar', '4 hamburguesas clásicas, papas fritas familiares y 4 gaseosas', 89.90, '/images/images (16).jpeg', '4 hamburguesas clásicas, Papas fritas familiares, 4 gaseosas', 1),
(2, 'Combo Personal', '1 hamburguesa a elección, papas fritas y gaseosa personal', 28.50, '/images/images (17).jpeg', '1 hamburguesa, Papas fritas, Gaseosa personal', 1);

-- Bebidas y Postres
INSERT INTO `productos` (`categoria_id`, `nombre`, `descripcion`, `precio`, `imagen`, `ingredientes`, `destacado`) VALUES
(3, 'Hamburguesa de Carne', 'Selección de frutas de temporada', 8.50, '/images/images (18).jpeg', 'Mezcla de frutas frescas', 1),
(4, 'Hamburguesa con Mayonesa', 'Delicioso helado de lúcuma con salsa de chocolate', 12.00, '/images/download (20).jpeg', 'Helado de lúcuma, Salsa de chocolate', 1);
```

### Estructura de Carpetas para Imágenes

```
public/
└── images/
    ├── banner.png
    ├── download (20).jpeg  # Postres
    ├── images (8).jpeg
    ├── images (9).jpeg
    ├── images (10).jpeg    # Categoría Hamburguesas
    ├── images (11).jpeg    # Pollo Crispy
    ├── images (12).jpeg    # Vegetariana Andina
    ├── images (13).jpeg    # Parrillera / Especial de la Casa
    ├── images (14).jpeg    # Clásica Peruana / Parrillera Especial
    ├── images (15).jpeg    # Criolla Deluxe / Choripán Burger
    ├── images (16).jpeg    # Combo Familiar
    ├── images (17).jpeg    # Combo Personal
    ├── images (18).jpeg    # Bebidas
    └── logo1.png
```

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
