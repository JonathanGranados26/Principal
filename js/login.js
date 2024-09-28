// Registro de Usuario
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  // Calcular el hash SHA-256 de la contraseña
  const password = formData.get("contraseña");
  const hashedPassword = await sha256(password);

  try {
    const response = await fetch(
      "https://sheet.best/api/sheets/8b4a2d7e-43c5-45fa-bf83-387aceaf34dc",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: formData.get("nombre"),
          Correo: formData.get("correo"),
          Contraseña: hashedPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al enviar los datos");
    }

    const responseData = await response.json();
    console.log(responseData);

    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Inicio de Sesión
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  try {
    const response = await fetch(
      "https://sheet.best/api/sheets/8b4a2d7e-43c5-45fa-bf83-387aceaf34dc",
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const usersData = await response.json();

    const user = usersData.find(
      (user) => user.Correo === formData.get("correo")
    );

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Comparar la contraseña cifrada almacenada en la base de datos con la contraseña plana ingresada por el usuario
    const hashedPassword = user.Contraseña;
    const password = formData.get("contraseña");
    const hashedPasswordInput = await sha256(password);

    if (hashedPassword === hashedPasswordInput) {
      // Generar token JWT
      const token = generateJWT(user.Correo);

      // Almacenar el token en el local storage o en una cookie
      localStorage.setItem("token", token);

      console.log("Inicio de sesión exitoso");
      setTimeout(() => {
        window.location.href = "inicio.html";
      }, 2000);
    } else {
      throw new Error("Contraseña incorrecta");
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
});

// Función para calcular el hash SHA-256 de una cadena
async function sha256(message) {
  const buffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedString = hashArray
    .map((byte) => ("00" + byte.toString(16)).slice(-2))
    .join("");
  return hashedString;
}

// Función para generar el token JWT es simulado tengo que usar la libreria )
function generateJWT(correo) {
  const payload = { correo: correo };
  // Generación de un token simulado como siempre :)
  const token = btoa(JSON.stringify(payload)); 
  return token;
}
