// ==========================================
// IMPORTS FIREBASE
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// ==========================================
// CONFIG FIREBASE (⚠️ REEMPLAZA CON TU CONFIG REAL)
// ==========================================

const firebaseConfig = {
apiKey: "TU_API_KEY",
authDomain: "TU_AUTH_DOMAIN",
projectId: "TU_PROJECT_ID",
storageBucket: "TU_BUCKET",
messagingSenderId: "TU_SENDER",
appId: "TU_APP_ID"
};


// ==========================================
// INICIALIZACIÓN
// ==========================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


// ==========================================
// ELEMENTOS DOM
// ==========================================

const inputImagen = document.getElementById("imagen");
const preview = document.getElementById("preview");


// ==========================================
// PREVIEW DE IMAGEN
// ==========================================

inputImagen.addEventListener("change", () => {

    const file = inputImagen.files[0];
    console.log("ARCHIVO SELECCIONADO:", file);

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }

});


// ==========================================
// GUARDAR PRODUCTO
// ==========================================

document.getElementById("guardar").addEventListener("click", async () => {

    console.log("CLICK OK 🔥");

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const descripcion = document.getElementById("descripcion").value;
    const categoria = document.getElementById("categoria").value;

    const file = inputImagen.files[0];

    console.log("DATOS:", { nombre, precio, descripcion, categoria });
    console.log("ARCHIVO:", file);

    if (!nombre || !precio || !file) {
        alert("Completa todos los campos");
        return;
    }

    try {

        console.log("SUBIENDO IMAGEN 🚀");

        const storageRef = ref(storage, "productos/" + Date.now() + "_" + file.name);

        await uploadBytes(storageRef, file);

        const urlImagen = await getDownloadURL(storageRef);

        console.log("URL IMAGEN:", urlImagen);

        console.log("GUARDANDO EN FIRESTORE...");

        await addDoc(collection(db, "productos"), {
            nombre,
            precio,
            imagen: urlImagen,
            descripcion,
            categoria
        });

        console.log("GUARDADO CORRECTO ✅");

        alert("Producto guardado 🚀");

        // LIMPIAR FORMULARIO
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
        inputImagen.value = "";
        preview.style.display = "none";

    } catch (error) {
        console.error("ERROR 🔴:", error);
        alert("Error al guardar producto");
    }

});