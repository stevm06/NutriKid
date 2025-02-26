
const alimentos = {
    "2-3": [{
        nombre: "Arepa pequeña",
        categoria: "Cereal",
        calorias: 150,
        proteinas: 3,
        imagen: "assets/img/arepa.jpeg" // https://www.example.com/arepa.jpg
    },
    {
        nombre: "Lulo pequeño",
        categoria: "Fruta",
        calorias: 40,
        proteinas: 0.8,
        imagen: "assets/img/lulo.jpg" // https://www.example.com/lulo.jpg
    },
    {
        nombre: "Mango biche",
        categoria: "Fruta",
        calorias: 60,
        proteinas: 0.5,
        imagen: "assets/img/mango-biche.jpeg" // https://www.example.com/mango-biche.jpg
    },
    {
        nombre: "Quesito antioqueño",
        categoria: "Lácteo",
        calorias: 80,
        proteinas: 5,
        imagen: "assets/img/quesito-antioqueño.jpg" // https://www.example.com/quesito.jpg
    }
    ],
    "4-8": [{
        nombre: "Huevo cocido",
        categoria: "Proteína",
        calorias: 85,
        proteinas: 6,
        imagen: "assets/img/huevo.jpeg" // https://www.example.com/huevo.jpg
    },
    {
        nombre: "Pandebono",
        categoria: "Cereal",
        calorias: 200,
        proteinas: 5,
        imagen: "assets/img/pandebono.jpg" // https://www.example.com/pandebono.jpg
    },
    {
        nombre: "Chontaduro",
        categoria: "Fruta",
        calorias: 120,
        proteinas: 2,
        imagen: "assets/img/chontaduro.jpg" // https://www.example.com/chontaduro.jpg
    },
    {
        nombre: "Bocadillo veleño",
        categoria: "Fruta",
        calorias: 100,
        proteinas: 0.5,
        imagen: "assets/img/bocadillo.jpg" // https://www.example.com/bocadillo.jpg
    }
    ],
    "9-13": [{
        nombre: "Empanada colombiana",
        categoria: "Proteína",
        calorias: 250,
        proteinas: 8,
        imagen: "assets/img/empanada.jpeg" // https://www.example.com/empanada.jpg
    },
    {
        nombre: "Guayaba entera",
        categoria: "Fruta",
        calorias: 60,
        proteinas: 1.2,
        imagen: "assets/img/guayaba.jpg" // https://www.example.com/guayaba.jpg
    },
    {
        nombre: "Patacón con hogao",
        categoria: "Vegetal",
        calorias: 180,
        proteinas: 2,
        imagen: "assets/img/patacon.jpg" // https://www.example.com/patacon.jpg
    },
    {
        nombre: "Leche entera Colanta",
        categoria: "Lácteo",
        calorias: 150,
        proteinas: 8,
        imagen: "assets/img/colanta.png" // https://www.example.com/colanta.jpg
    }
    ],
    _comunes: [{
        nombre: "Agua de panela",
        categoria: "Bebida",
        calorias: 80,
        proteinas: 0.2,
        imagen: "assets/img/aguapanela.jpg" // https://www.example.com/panela.jpg
    },
    {
        nombre: "Yogur Alpina",
        categoria: "Lácteo",
        calorias: 120,
        proteinas: 6,
        imagen: "assets/img/yogourt.png" // https://www.example.com/yogur-alpina.jpg
    },
    {
        nombre: "Jugo de maracuyá",
        categoria: "Bebida",
        calorias: 90,
        proteinas: 0.3,
        imagen: "assets/img/maracuya.jpg" // https://www.example.com/maracuya.jpg
    },
    {
        nombre: "Aguacate",
        categoria: "Fruta",
        calorias: 160,
        proteinas: 2,
        imagen: "assets/img/aguacate.jpg" // https://www.example.com/aguacate.jpg
    }
    ]
};

// Variables globales
let nevera = [];
let lonchera = [];

// Funciones principales
function getAlimentosCompletos(edad) {
    return [...alimentos[edad], ...alimentos._comunes];
}

function mostrarModal() {
    const edad = document.getElementById('edad').value;
    const alimentosCompletos = getAlimentosCompletos(edad);
    // En la función mostrarModal:
    const modalContent = alimentosCompletos.map(alimento => `
<div class="col-6 mb-2">
<div class="card food-card" onclick="agregarNevera('${alimento.nombre}')">
    <img src="${alimento.imagen}" class="card-img-top" alt="${alimento.nombre}">
    <div class="card-body">
        <h6>${alimento.nombre}</h6>
        <small class="text-muted">${alimento.categoria}</small>
    </div>
</div>
</div>
`).join('');
    document.getElementById('lista-alimentos-modal').innerHTML = modalContent;
    new bootstrap.Modal(document.getElementById('modalNevera')).show();
}

function agregarNevera(nombre) {
    if (!nevera.includes(nombre)) {
        nevera.push(nombre);
        actualizarNevera();
        actualizarRecomendaciones();
    }
}

function actualizarNevera() {
    const inventario = document.getElementById('alimentos-disponibles');
    inventario.innerHTML = nevera.map(item => `
<div class="col-6 mb-2">
    <div class="card food-card">
        <div class="card-body p-2 d-flex justify-content-between">
            <span>${item}</span>
            <button class="btn btn-sm btn-danger" onclick="eliminarAlimento('${item}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</div>
`).join('');
    actualizarEstadisticas();
}



function eliminarAlimento(nombre) {
    // Verificar si es el último alimento
    if (nevera.length === 1 && nevera[0] === nombre) {
        mostrarConfirmacion(
            "¿Estás seguro de eliminar el último alimento de la nevera?",
            () => {
                nevera = nevera.filter(item => item !== nombre);
                actualizarNevera();
                actualizarRecomendaciones();
            }
        );
    } else {
        nevera = nevera.filter(item => item !== nombre);
        actualizarNevera();
        actualizarRecomendaciones();
    }
}

function actualizarRecomendaciones() {
    const edad = document.getElementById('edad').value;
    const recomendacionesDiv = document.getElementById('lista-recomendaciones');
    const alimentosRecomendados = getAlimentosCompletos(edad).filter(alimento =>
        nevera.includes(alimento.nombre)
    );

    // Actualizar metas nutricionales
    const metas = {
        "2-3": {
            calorias: 200,
            proteinas: 5
        },
        "4-8": {
            calorias: 280,
            proteinas: 8
        },
        "9-13": {
            calorias: 320,
            proteinas: 10
        }
    };
    document.getElementById('meta-calorias').textContent = metas[edad].calorias;
    document.getElementById('meta-proteinas').textContent = metas[edad].proteinas;

    recomendacionesDiv.innerHTML = alimentosRecomendados.map(alimento => `
<div class="col-6 col-md-4 mb-2">
    <div class="card food-card h-100" onclick="agregarLonchera('${alimento.nombre}', ${alimento.calorias}, ${alimento.proteinas})">
        <div class="card-body">
            <h6>${alimento.nombre}</h6>
            <small class="text-muted">${alimento.categoria}</small>
            <div class="mt-2">
                <span class="badge bg-success">${alimento.calorias} kcal</span>
                <span class="badge bg-primary">${alimento.proteinas}g prot</span>
            </div>
        </div>
    </div>
</div>
`).join('');

    actualizarResumenNutricional();
}

function agregarLonchera(nombre, calorias, proteinas) {
    lonchera.push({
        nombre,
        calorias,
        proteinas
    });
    actualizarLonchera();
}

function actualizarLonchera() {
    const loncheraDiv = document.getElementById('lonchera');
    loncheraDiv.innerHTML = lonchera.map((item, index) => `
        <div class="col-12 mb-2">
            <div class="card">
                <div class="card-body p-2 d-flex justify-content-between">
                    <div>
                        <span>${item.nombre}</span>
                        <small class="text-muted ms-2">${item.calorias} kcal</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-info me-1" onclick="mostrarReceta('${item.nombre}')">
                            RECETA
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarDeLonchera(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    actualizarResumenNutricional();

    // Si la lonchera está vacía, resetear el panel de recetas
    if (lonchera.length === 0) {
        cerrarRecetas();
    }
}



// Función para actualizar el panel con la receta seleccionada
function mostrarReceta(nombreAlimento) {
const recetas = {
"Arepa pequeña": {
    imagen: "assets/img/arepa.jpeg",
    ingredientes: ["Harina de maíz", "Agua", "Sal"],
    preparacion: "Mezclar los ingredientes hasta formar una masa homogénea, hacer pequeñas arepas y asarlas en una sartén hasta que estén doradas."
},
"Lulo pequeño": {
    imagen: "assets/img/lulo.jpg",
    ingredientes: ["Lulo", "Agua", "Azúcar", "Hielo"],
    preparacion: "Licuar el lulo con agua y azúcar al gusto, colar si es necesario y servir con hielo."
},
"Mango biche": {
    imagen: "assets/img/mango-biche.jpeg",
    ingredientes: ["Mango verde", "Limón", "Sal"],
    preparacion: "Pelar y cortar el mango en rodajas, agregar jugo de limón y espolvorear sal al gusto."
},
"Quesito antioqueño": {
    imagen: "assets/img/quesito-antioqueño.jpg",
    ingredientes: ["Leche", "Cuajo", "Sal"],
    preparacion: "Se consume solo o acompañado de arepa, pan o chocolate caliente."
},
"Huevo cocido": {
    imagen: "assets/img/huevo.jpeg",
    ingredientes: ["Huevo", "Agua", "Sal"],
    preparacion: "Hervir el huevo en agua durante 10 minutos, pelar y servir con sal."
},
"Pandebono": {
    imagen: "assets/img/pandebono.jpg",
    ingredientes: ["Harina de maíz", "Almidón de yuca", "Queso", "Huevo", "Leche"],
    preparacion: "Mezclar todos los ingredientes hasta obtener una masa homogénea, formar bolitas y hornear a 180°C por 20 minutos."
},
"Chontaduro": {
    imagen: "assets/img/chontaduro.jpg",
    ingredientes: ["Chontaduro", "Sal", "Miel"],
    preparacion: "Se cocina en agua con sal por 1 hora y se come con miel o sal al gusto."
},
"Bocadillo veleño": {
    imagen: "assets/img/bocadillo.jpg",
    ingredientes: ["Guayaba", "Azúcar"],
    preparacion: "Se cocina la pulpa de guayaba con azúcar hasta obtener una pasta espesa que se moldea en bloques."
},
"Empanada colombiana": {
    imagen: "assets/img/empanada.jpeg",
    ingredientes: ["Masa de maíz", "Papa", "Carne o pollo", "Cebolla", "Comino"],
    preparacion: "Preparar la masa con maíz, rellenar con papa y carne, cerrar y freír en aceite caliente."
},
"Guayaba entera": {
    imagen: "assets/img/guayaba.jpg",
    ingredientes: ["Guayaba"],
    preparacion: "Se consume cruda o en jugos y dulces."
},
"Patacón con hogao": {
    imagen: "assets/img/patacon.jpg",
    ingredientes: ["Plátano verde", "Aceite", "Sal", "Tomate", "Cebolla"],
    preparacion: "Freír el plátano aplastado hasta dorar y acompañar con hogao (salsa de tomate y cebolla)."
},
"Leche entera Colanta": {
    imagen: "assets/img/colanta.png",
    ingredientes: ["Leche"],
    preparacion: "Se consume sola, con café o con chocolate."
},
"Agua de panela": {
    imagen: "assets/img/aguapanela.jpg",
    ingredientes: ["Panela", "Agua", "Limón (opcional)"],
    preparacion: "Disolver la panela en agua caliente, se puede servir fría o caliente con limón."
},
"Yogur Alpina": {
    imagen: "assets/img/yogourt.png",
    ingredientes: ["Leche", "Cultivos lácticos", "Azúcar"],
    preparacion: "Se consume directamente como postre o acompañado de frutas."
},
"Jugo de maracuyá": {
    imagen: "assets/img/maracuya.jpg",
    ingredientes: ["Maracuyá", "Agua", "Azúcar"],
    preparacion: "Licuar la pulpa con agua y azúcar, colar y servir frío."
},
"Aguacate": {
    imagen: "assets/img/aguacate.jpg",
    ingredientes: ["Aguacate"],
    preparacion: "Se consume solo, en ensaladas o en guacamole."
}
};

const listaRecetas = document.getElementById('lista-recetas');

if (recetas[nombreAlimento]) {
const receta = recetas[nombreAlimento];

listaRecetas.innerHTML = `
    <li class="list-group-item">
        <h6><strong>${nombreAlimento}</strong></h6>
        <img src="${receta.imagen}" alt="${nombreAlimento}" class="img-fluid mb-2" style="max-height: 150px;">
        <h6>Ingredientes:</h6>
        <ul class="mb-2">
            ${receta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
        </ul>
        <h6>Preparación:</h6>
        <p>${receta.preparacion}</p>
    </li>
`;
} else {
listaRecetas.innerHTML = `
    <li class="list-group-item text-muted">No hay receta disponible para este alimento.</li>
`;
}
}

function cerrarRecetas() {
    const listaRecetas = document.getElementById('lista-recetas');
    listaRecetas.innerHTML = `
        <li class="list-group-item text-muted">Selecciona alimentos de TU LONCHERA para ver recetas</li>
    `;
}



function eliminarDeLonchera(index) {
    lonchera.splice(index, 1);
    actualizarLonchera();
}

function actualizarResumenNutricional() {
    const total = lonchera.reduce((acc, item) => ({
        calorias: acc.calorias + item.calorias,
        proteinas: acc.proteinas + item.proteinas
    }), {
        calorias: 0,
        proteinas: 0
    });

    const edad = document.getElementById('edad').value;
    const metas = {
        "2-3": {
            calorias: 200,
            proteinas: 5
        },
        "4-8": {
            calorias: 280,
            proteinas: 8
        },
        "9-13": {
            calorias: 320,
            proteinas: 10
        }
    };

    const resumen = document.getElementById('resumen-nutricional');
    resumen.innerHTML = `
<div class="alert ${total.calorias > metas[edad].calorias ? 'alert-danger' : 'alert-success'}">
    Calorías: ${total.calorias}/${metas[edad].calorias} kcal
</div>
<div class="alert ${total.proteinas > metas[edad].proteinas ? 'alert-danger' : 'alert-info'}">
    Proteínas: ${total.proteinas}/${metas[edad].proteinas}g
</div>
`;
}

function vaciarLonchera() {
    // Verificar si hay elementos en la lonchera
    if (lonchera.length > 0) {
        mostrarConfirmacion(
            "¿Estás seguro de vaciar la lonchera?",
            () => {
                lonchera = [];
                actualizarLonchera();
                cerrarRecetas();
            }
        );
    }
}

function mostrarConfirmacion(mensaje, accionConfirmada) {
    // Mostrar el mensaje en el modal
    document.getElementById('confirmacionMensaje').textContent = mensaje;

    // Configurar el botón de confirmación
    const confirmarBtn = document.getElementById('confirmarAccion');
    confirmarBtn.onclick = () => {
        accionConfirmada(); // Ejecutar la acción confirmada
        bootstrap.Modal.getInstance(document.getElementById('confirmacionModal')).hide(); // Cerrar el modal
    };

    // Mostrar el modal
    const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    confirmacionModal.show();
}

// Funciones adicionales
function actualizarEstadisticas() {
    document.getElementById('contador-alimentos').textContent = nevera.length;
}

function guardarProgreso() {
    localStorage.setItem('nutrikids-nevera', JSON.stringify(nevera));
    localStorage.setItem('nutrikids-lonchera', JSON.stringify(lonchera));
}

function cargarProgreso() {
    // Cargar la nevera desde localStorage (opcional, si quieres mantener los alimentos disponibles)
    nevera = JSON.parse(localStorage.getItem('nutrikids-nevera')) || [];

    // Inicializar la lonchera como un arreglo vacío (sin productos)
    lonchera = [];

    // Actualizar la interfaz
    actualizarNevera();
    actualizarLonchera(); // Esto asegura que la lonchera se muestre vacía
    actualizarRecomendaciones();
}

function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toast.innerHTML = `
<div class="d-flex">
    <div class="toast-body">${mensaje}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
</div>`;
    document.body.appendChild(toast);
    new bootstrap.Toast(toast, {
        delay: 2000
    }).show();
}


function masinformacion() {
    var myModal = new bootstrap.Modal(document.getElementById('infoModal'));
    myModal.show();
}

function abrirEnlace(url) {
    window.open(url, '_blank');
}
