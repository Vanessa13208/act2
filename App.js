import React, { useState } from 'react';
import './App.css';

// Datos de perfumes de lujo ampliados
const PERFUMES = [
  {
    id: 1,
    nombre: "Chanel N°5",
    marca: "Chanel",
    genero: "femenino",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Xx3WYOjWjDu29oKHI8dFDtP_xzbS8eY8UA&s",
    descripcion: "El perfume icónico con notas de jazmín y rosa.",
    precio: 5700,
    concentracion: "Eau de Parfum",
    tamanos: ["100ml", "200ml"]
  },
  {
    id: 2,
    nombre: "J'adore Dior",
    marca: "Dior",
    genero: "femenino",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzt50cvxq_26VWm1-3coi9WqUWPo0hnBpiQ&s",
    descripcion: "Fragancia floral con notas de frutas exóticas.",
    precio: 5300,
    concentracion: "Eau de Parfum",
    tamanos: ["30ml", "50ml", "80ml"]
  },
  {
    id: 3,
    nombre: "Black Opium",
    marca: "Yves Saint Laurent",
    genero: "femenino",
    imagen: "https://d1flfk77wl2xk4.cloudfront.net/Assets/67/175/L_p0217217567.jpg",
    descripcion: "Fragancia adictiva con notas de café y vainilla.",
    precio: 2500,
    concentracion: "Eau de Parfum",
    tamanos: ["30ml", "50ml"]
  },
  {
    id: 4,
    nombre: "La Vie Est Belle",
    marca: "Lancôme",
    genero: "femenino",
    imagen: "https://m.media-amazon.com/images/I/518ZxO7VdVL._AC_SX522_.jpg",
    descripcion: "Fragancia floral con notas de iris y vainilla.",
    precio: 1930,
    concentracion: "Eau de Parfum",
    tamanos: ["50", "100ml"]
  },
  {
    id: 5,
    nombre: "Flowerbomb",
    marca: "Viktor & Rolf",
    genero: "femenino",
    imagen: "https://m.media-amazon.com/images/I/61ZR3eNks5L.__AC_SX300_SY300_QL70_ML2_.jpg",
    descripcion: "Explosión floral con notas dulces y especiadas.",
    precio: 240,
    concentracion: "Eau de Parfum",
    tamanos: ["100ml"]
  },
  {
    id: 6,
    nombre: "MY HAY",
    marca: "Giorgio Armani",
    genero: "femenino",
    imagen: "https://m.media-amazon.com/images/I/61Q7us6hILL._AC_SX569_.jpg",
    descripcion: "Fragancia elegante con notas de grosella negra y vainilla.",
    precio: 2000,
    concentracion: "Eau de Parfum",
    tamanos: ["90ml"]
  },
  {
    id: 7,
    nombre: "Good Girl",
    marca: "Carolina Herrera",
    genero: "femenino",
    imagen: "https://m.media-amazon.com/images/I/41oa9XgzyiL._AC_SY879_.jpg",
    descripcion: "Fragancia seductora con notas de almendra y café.",
    precio: 2040,
    concentracion: "Eau de Parfum",
    tamanos: ["80ml"]
  },
  {
    id: 8,
    nombre: "Light Blue",
    marca: "Dolce & Gabbana",
    genero: "femenino",
    imagen: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSreUXVKUyG-eE0ZwjLRNggXYe9eTFS2SIpT50RemuC0irzjOU-STpVntPzEAVy7nMopphJ7TJt7I0IMD7G9r8HVfl-UUiBxKM-wJZgVFFWgcCwv3-w2G1USDbZZNs0wYQ4ah3sMEcr&usqp=CAc",
    descripcion: "Fragancia fresca con notas cítricas y de manzana.",
    precio: 1740,
    concentracion: "Eau de Toilette",
    tamanos: ["100ml"]
  }
];

// Métodos de pago (sin cambios)
const METODOS_PAGO = [
  {
    id: 'tarjeta',
    nombre: 'Tarjeta de crédito/débito',
    icono: '💳',
    descripcion: 'Paga con Visa, Mastercard o Amex'
  },
  {
    id: 'paypal',
    nombre: 'PayPal',
    icono: 'https://logos-world.net/wp-content/uploads/2020/04/PayPal-Logo.png',
    descripcion: 'Pago rápido y seguro'
  },
  {
    id: 'transferencia',
    nombre: 'Transferencia bancaria',
    icono: '🏦',
    descripcion: 'Pago directo desde tu banco'
  },
  {
    id: 'efectivo',
    nombre: 'Efectivo al recibir',
    icono: '💰',
    descripcion: 'Paga cuando recibas tu pedido'
  }
];

// Resto del código del componente App (sin cambios)
function App() {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('todas');
  const [carrito, setCarrito] = useState([]);
  const [paso, setPaso] = useState(1);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState({});
  const [metodoPago, setMetodoPago] = useState('');
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precioFinal || item.precio), 0).toFixed(2);
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (perfume) => {
    const tamano = tamanoSeleccionado[perfume.id] || perfume.tamanos[0];
    const nuevoItem = {
      ...perfume,
      idCarrito: Date.now(),
      tamano,
      precioFinal: perfume.precio * (tamano === "200ml" ? 1.8 : tamano === "100ml" ? 1 : 0.5)
    };
    setCarrito([...carrito, nuevoItem]);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (idCarrito) => {
    setCarrito(carrito.filter(item => item.idCarrito !== idCarrito));
  };

  // Filtrar perfumes
  const perfumesFiltrados = PERFUMES.filter(perfume => {
    const coincideMarca = marcaSeleccionada === 'todas' || perfume.marca === marcaSeleccionada;
    return coincideMarca && perfume.genero === 'femenino';
  });

  // Obtener marcas únicas
  const marcas = ['todas', ...new Set(PERFUMES.map(p => p.marca))];

  // Calcular fecha de entrega (3-5 días hábiles)
  const calcularFechaEntrega = () => {
    const hoy = new Date();
    const diasEntrega = 3 + Math.floor(Math.random() * 3); // 3-5 días
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + diasEntrega);
    
    // Si es fin de semana, sumar días adicionales
    if (fecha.getDay() === 0) fecha.setDate(fecha.getDate() + 1);
    if (fecha.getDay() === 6) fecha.setDate(fecha.getDate() + 2);
    
    return fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  // Formatear fecha actual
  const fechaPedido = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCliente(prev => ({ ...prev, [name]: value }));
  };

  // Manejar selección de tamaño
  const handleTamanoChange = (perfumeId, tamano) => {
    setTamanoSeleccionado(prev => ({ ...prev, [perfumeId]: tamano }));
  };

  return (
    <div className="App">
      <header className="header-perfumes">
        <div className="logo-container">
          <h1>LUXE PARFUM</h1>
          <p>Perfumes de lujo para la mujer elegante</p>
        </div>
        <div className="carrito-icono" onClick={() => setPaso(2)}>
          🛒 {carrito.length > 0 && <span>{carrito.length}</span>}
        </div>
      </header>

      <main>
        {paso === 1 && (
          <div className="tienda-container">
            <div className="filtros">
              <h2>Nuestra colección</h2>
              <div className="filtro-marca">
                <label>Filtrar por marca:</label>
                <select 
                  value={marcaSeleccionada} 
                  onChange={(e) => setMarcaSeleccionada(e.target.value)}
                >
                  {marcas.map(marca => (
                    <option key={marca} value={marca}>
                      {marca === 'todas' ? 'Todas las marcas' : marca}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lista-perfumes">
              {perfumesFiltrados.map(perfume => (
                <div key={perfume.id} className="tarjeta-perfume">
                  <img src={perfume.imagen} alt={perfume.nombre} />
                  <h3>{perfume.nombre}</h3>
                  <p className="marca">{perfume.marca}</p>
                  <p className="descripcion">{perfume.descripcion}</p>
                  <p className="precio">${perfume.precio}</p>
                  
                  {perfume.tamanos.length > 1 && (
                    <div className="tamanos">
                      {perfume.tamanos.map(tamano => (
                        <button
                          key={tamano}
                          className={`tamano-btn ${tamanoSeleccionado[perfume.id] === tamano ? 'seleccionado' : ''}`}
                          onClick={() => handleTamanoChange(perfume.id, tamano)}
                        >
                          {tamano}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    className="boton-agregar"
                    onClick={() => agregarAlCarrito(perfume)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="pago-container">
            <h2>Finalizar compra</h2>
            <form className="formulario-pago">
              <div className="form-columnas">
                <div className="form-columna">
                  <h3>Información personal</h3>
                  <div className="grupo-formulario">
                    <label>Nombre completo*</label>
                    <input 
                      type="text" 
                      name="nombre"
                      value={datosCliente.nombre}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label>Email*</label>
                    <input 
                      type="email" 
                      name="email"
                      value={datosCliente.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label>Dirección*</label>
                    <input 
                      type="text" 
                      name="direccion"
                      value={datosCliente.direccion}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label>Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      value={datosCliente.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-columna">
                  <h3>Método de pago</h3>
                  <div className="metodos-pago">
                    {METODOS_PAGO.map(metodo => (
                      <div 
                        key={metodo.id}
                        className={`metodo-pago ${metodoPago === metodo.id ? 'seleccionado' : ''}`}
                        onClick={() => setMetodoPago(metodo.id)}
                      >
                        <div className="metodo-icono">
                          {metodo.icono.startsWith('http') ? (
                            <img src={metodo.icono} alt={metodo.nombre} />
                          ) : (
                            <span>{metodo.icono}</span>
                          )}
                        </div>
                        <div className="metodo-info">
                          <h4>{metodo.nombre}</h4>
                          <p>{metodo.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="resumen-compra">
                <h3>Resumen del pedido</h3>
                <div className="resumen-detalles">
                  <p><strong>Fecha del pedido:</strong> {fechaPedido}</p>
                  <p><strong>Fecha estimada de entrega:</strong> {calcularFechaEntrega()}</p>
                  <div className="productos-carrito">
                    {carrito.map(item => (
                      <div key={item.idCarrito} className="item-carrito">
                        <div className="info-producto">
                          <img src={item.imagen} alt={item.nombre} width="50" />
                          <div>
                            <p>{item.nombre} ({item.tamano})</p>
                            <p>${item.precioFinal.toFixed(2)}</p>
                          </div>
                        </div>
                        <button 
                          className="boton-eliminar"
                          onClick={() => eliminarDelCarrito(item.idCarrito)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="total-pago">
                    <span>Total:</span>
                    <span>${calcularTotal()} USD</span>
                  </div>
                </div>
              </div>

              <div className="botones-pago">
                <button 
                  type="button" 
                  className="boton-volver"
                  onClick={() => setPaso(1)}
                >
                  Volver
                </button>
                <button 
                  type="button" 
                  className="boton-confirmar"
                  onClick={() => setPaso(3)}
                  disabled={!metodoPago || !datosCliente.nombre || !datosCliente.email || !datosCliente.direccion}
                >
                  Confirmar compra
                </button>
              </div>
            </form>
          </div>
        )}

        {paso === 3 && (
          <div className="confirmacion-compra">
            <div className="tarjeta-confirmacion">
              <div className="confirmacion-icono">✓</div>
              <h2>¡Compra confirmada!</h2>
              <p className="confirmacion-mensaje">
                Gracias por tu compra, {datosCliente.nombre.split(' ')[0]}. Hemos enviado los detalles a {datosCliente.email}.
              </p>
              
              <div className="detalles-pedido">
                <h3>Detalles del envío</h3>
                <div className="detalles-grid">
                  <div>
                    <p><strong>Número de pedido:</strong></p>
                    <p>#{Math.floor(Math.random() * 1000000)}</p>
                  </div>
                  <div>
                    <p><strong>Fecha:</strong></p>
                    <p>{fechaPedido}</p>
                  </div>
                  <div>
                    <p><strong>Método de pago:</strong></p>
                    <p>{METODOS_PAGO.find(m => m.id === metodoPago)?.nombre}</p>
                  </div>
                  <div>
                    <p><strong>Fecha estimada de entrega:</strong></p>
                    <p>{calcularFechaEntrega()}</p>
                  </div>
                </div>
                
                <h3 className="productos-titulo">Productos</h3>
                <ul className="productos-lista">
                  {carrito.map(item => (
                    <li key={item.idCarrito}>
                      <img src={item.imagen} alt={item.nombre} />
                      <div>
                        <p>{item.nombre} ({item.tamano})</p>
                        <p>${item.precioFinal.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="total-final">
                  <span>Total:</span>
                  <span>${calcularTotal()} USD</span>
                </div>
              </div>
              
              <button 
                className="boton-continuar"
                onClick={() => {
                  setCarrito([]);
                  setPaso(1);
                  setMetodoPago('');
                  setDatosCliente({
                    nombre: '',
                    email: '',
                    direccion: '',
                    telefono: ''
                  });
                }}
              >
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer-perfumes">
        <div className="footer-contenido">
          <div className="footer-info">
            <h3>LUXE PARFUM</h3>
            <p>Perfumes de lujo para ocasiones especiales</p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
          </div>
          <div className="footer-contacto">
            <h3>Contacto</h3>
            <p>contacto@luxeparfum.com</p>
            <p>+52 55 1234 5678</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;