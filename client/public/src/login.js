// Estilos del formulario
const container = document.getElementById("container")
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login")

registerBtn.addEventListener("click", () => {
  container.classList.add("active")
})

loginBtn.addEventListener("click", () => {
  container.classList.remove("active")
})

// Cargamos los usuarios del JSON
let users = [];
async function cargarUsuarios() {
  const response = await fetch('./data/users.json');
  const data = await response.json();
  data.users.forEach(usuario => {
    users.push(usuario)
  })
}
async function iniciarApp() {
  try {
    await cargarUsuarios();
    console.log(users);

    // Continúa con el resto de tu código aquí.
    if (users) {
      // Tu código para trabajar con los usuarios.
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

iniciarApp();


let spanError = document.createElement("span")
spanError.classList.add("span-error")

document.querySelector(".signUp").addEventListener("click", async () => {
  let nombreR = document.querySelector("input[id=nombreR]").value;
  let correoR = document.querySelector("input[id=correoR]").value;
  let contraseñaR = document.querySelector("input[id=contraseñaR]");

  if(!nombreR || !correoR || !contraseñaR.value) {
    spanError.textContent="Por favor rellena todos los campos";
    contraseñaR.after(spanError);
    return;
  } else {
    const data = {
      nombre: nombreR,
      correo: correoR,
      contraseña: contraseñaR.value
    }
    
    try {
      const response = await fetch('/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        // El usuario se registró con éxito
        console.log('Usuario registrado con éxito');
        localStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = 'index.html';
      } else if(response.status===400) {
        spanError.textContent="El correo ya esta en uso, inicia sesion";
        contraseñaR.after(spanError);
        return;
      } else {
      console.error('Error al registrar usuario');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
});

document.querySelector(".signIn").addEventListener("click", iniciarSesion)

function iniciarSesion() {
  let correo = document.querySelector("input[id=correoI]").value;
  let contraseña = document.querySelector("input[id=contraseñaI]")
  let usuario;
  
  for (let user of users) {
    if (user.correo === correo) {
      if (user.contraseña === contraseña.value) {
        usuario = user;
        break; // Detiene el bucle cuando se encuentra un usuario válido.
      } else {
        spanError.textContent = "Contraseña incorrecta"
        contraseña.after(spanError)
        return; // Detiene la función si la contraseña es incorrecta.
      }
    }
  }

  if(!usuario) {
    spanError.textContent="No existe ningun usuario con ese correo";
    contraseña.after(spanError)
  } else {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = 'index.html';
  }
}

/*
async function register(correo, nombre, contraseña) {
  // Crear un nuevo objeto de usuario
  const nuevoUsuario = {
    correo: correo,
    nombre: nombre,
    contraseña: contraseña
  };

  // Agregar el nuevo usuario a la matriz
  users.push(nuevoUsuario);

  // Guardar la matriz actualizada de usuarios en el archivo JSON
  await guardarUsuariosEnJSON();

  // Opcional: Puedes realizar otras acciones después del registro si es necesario.
  // Por ejemplo, redirigir al usuario a la página de inicio después de registrarse.
}

async function guardarUsuariosEnJSON() {
  // Guarda la matriz actualizada de usuarios en el archivo JSON
  const dataToSave = { users: users };
  const jsonData = JSON.stringify(dataToSave);

  fs.writeFile('users.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error al guardar usuarios en el archivo JSON:', err);
    } else {
      console.log('Usuario registrado exitosamente');
    }
  });
}*/