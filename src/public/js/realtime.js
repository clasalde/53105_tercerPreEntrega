const socket = io();

socket.on("productos", (data) => {
  //console.log(data);
  renderProductos(data);
});

//Función para renderizar nuestros productos:

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  productos.docs.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // card.innerHTML = `
    //                 <p> ${item.title} </p>
    //                 <p> ${item.price} </p>
    //                 <button> Eliminar </button>
    //                 `;

    card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="${item.description}">
            <div class="card-body d-flex flex-column">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                <div class="d-flex justify-content-between">
                    <p class="card-text">Precio</p>
                    <p class="card-text">$ ${item.price}</p>
                </div>
                <button class="btn btn-primary">Eliminar</button>
            </div>
        </div>
        `;

    contenedorProductos.appendChild(card);
    //Agregamos el evento al boton de eliminar:
    card.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item._id);
    });
  });
};

const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
};

//Agregamos productos del formulario:

document.getElementById("btnEnviar").addEventListener("click", () => {
  agregarProducto();
});

const agregarProducto = () => {
  const producto = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("agregarProducto", producto);
};
