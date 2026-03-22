// 🔥 IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 CONFIG
const firebaseConfig = {
apiKey: "TU_API_KEY",
authDomain: "TU_AUTH_DOMAIN",
projectId: "TU_PROJECT_ID",
storageBucket: "TU_BUCKET",
messagingSenderId: "TU_SENDER",
appId: "TU_APP_ID"
};

// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// CARGAR PRODUCTOS
// ==========================================

async function obtenerProductos() {

    const querySnapshot = await getDocs(collection(db, "productos"));

    const contenedorAlimentos = document.getElementById("productos-alimentos");
    const contenedorHigiene = document.getElementById("productos-higiene");

    querySnapshot.forEach((doc) => {

        const producto = doc.data();

        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen || 'imgtienda/default.png'}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion || ''}</p>
            <span class="precio">$${producto.precio}</span>
            <button class="btn-agregar">Agregar</button>
        `;

        if (producto.categoria === "alimentos") {
            contenedorAlimentos.appendChild(div);
        } else if (producto.categoria === "higiene") {
            contenedorHigiene.appendChild(div);
        }

    });

}

obtenerProductos();