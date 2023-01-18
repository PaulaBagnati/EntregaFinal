document.addEventListener(
  "DOMContentLoaded",
  function () {
    let selectCuotas = document.getElementById("cuota");
    var cuotas = [3, 6, 12];

    cuotas.forEach(function (cuota) {
      var opcion = document.createElement("option");
      opcion.setAttribute("value", cuota);
      opcion.text = cuota;
      selectCuotas.appendChild(opcion);
    });

    let selectBancos = document.getElementById("banco");
    const bancos = fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        data.list.forEach(function (banco) {
          var opcion2 = document.createElement("option");
          opcion2.setAttribute("value", banco.bank);
          opcion2.text = banco.bank + " - " + banco.city;
          selectBancos.appendChild(opcion2);
        });
      });

    var datosPersonales = {}; //Recopilacion de datos personales LocalStorage

    //Botón siguiente en Nombre/Apellido
    document.getElementById("NomApe").addEventListener("click", function (e) {
      e.preventDefault();

      let dni = document.getElementById("DNI");
      let nombre = document.getElementById("nombre");
      let apellido = document.getElementById("apellido");

      //   Validaciones
      if (dni.value == "") {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, ingrese su Documento",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            dni.focus();
          }
        });
      } else if (nombre.value == "") {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, ingrese su nombre",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            nombre.focus();
          }
        });
      } else if (apellido.value == "") {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, ingrese su apellido",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            apellido.focus();
          }
        });
      } else {
        if (localStorage.getItem("DNI") == dni.value) {
          // Validacion (la misma persona no puede pedir dos prestamos simultaneos)
          Swal.fire({
            text: "Crédito solicitado",
            icon: "error",
            html:
              "<p align='justify'>Hola " +
              localStorage.getItem("Nombre") +
              " " +
              localStorage.getItem("Apellido") +
              "<br> Ya contás con un crédito solicitado! <br> Podrás solicitar otro cuando termines con el crédito actual, muchas gracias por entender</p>",
            confirmButtonColor: "#784eb8",
            confirmButtonText: "Aceptar",
          }).then(function (result) {
            if (result.value) {
              return;
            }
          });
        } else {
          datosPersonales.dni = dni.value;
          datosPersonales.nombre = nombre.value;
          datosPersonales.apellido = apellido.value;

          document.getElementById("cardNomApe").classList.add("filter");
          document.getElementById("cardEdad").classList.remove("filter");

          document.getElementById("edad").removeAttribute("disabled");
          document.getElementById("nombre").setAttribute("readonly", true);
          document.getElementById("apellido").setAttribute("readonly", true);
          document.getElementById("NomApe").removeAttribute("href");
        }
      }
    });

    document.getElementById("Edad").addEventListener("click", function (e) {
      e.preventDefault();

      let edad = document.getElementById("edad");

      if (edad.value == "") {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, ingrese su edad",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            nombre.focus();
          }
        });
      } else if (edad.value < 18) {
        Swal.fire({
          text: "Debe ser mayor a 18 años para solicitar el prestamo",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            nombre.focus();
          }
        });
      } else {
        datosPersonales.edad = edad.value;

        document.getElementById("cardEdad").classList.add("filter");
        document.getElementById("cardEmail").classList.remove("filter");

        document.getElementById("edad").setAttribute("readonly", true);
        document.getElementById("email").removeAttribute("disabled");
        document.getElementById("Edad").removeAttribute("href");
      }
    });

    document.getElementById("Email").addEventListener("click", function (e) {
      e.preventDefault();

      let email = document.getElementById("email");

      if (email.value == "") {
        alert("Datos faltantes");
      } else if (!email.value.includes("@")) {
        alert("El campo Email debe tener un formato válido");
      } else {
        datosPersonales.email = email.value;

        document.getElementById("cardEmail").classList.add("filter");
        document.getElementById("cardBanco").classList.remove("filter");

        document.getElementById("email").setAttribute("readonly", true);
        document.getElementById("banco").removeAttribute("disabled");
        document.getElementById("Email").removeAttribute("href");

        if (
          datosPersonales.dni &&
          datosPersonales.nombre &&
          datosPersonales.apellido &&
          datosPersonales.edad &&
          datosPersonales.email
        ) {
          localStorage.setItem("DNI", datosPersonales.dni);
          localStorage.setItem("Nombre", datosPersonales.nombre);
          localStorage.setItem("Apellido", datosPersonales.apellido);
          localStorage.setItem("edad", datosPersonales.edad);
          localStorage.setItem("email", datosPersonales.email);
        }
      }
    });

    document.getElementById("Bancos").addEventListener("click", function (e) {
      e.preventDefault();

      if (selectBancos.value == "" || selectBancos.value == 0) {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, seleccione su banco",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            nombre.focus();
          }
        });
      } else {
        document.getElementById("cardBanco").classList.add("filter");
        document.getElementById("cardCuotas").classList.remove("filter");

        document.getElementById("banco").setAttribute("readonly", true);
        document.getElementById("cuota").removeAttribute("disabled");
        document.getElementById("Bancos").removeAttribute("href");
      }
    });

    document.getElementById("Cuotas").addEventListener("click", function (e) {
      e.preventDefault();

      if (selectCuotas.value == 0) {
        Swal.fire({
          title: "Datos faltantes",
          text: "Por favor, seleccione cantidad de cuotas",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            nombre.focus();
          }
        });
      } else {
        document.getElementById("cardCuotas").classList.add("filter");
        document.getElementById("cardMonto").classList.remove("filter");

        document.getElementById("cuota").setAttribute("readonly", true);
        document.getElementById("monto").removeAttribute("disabled");
        document.getElementById("submit").removeAttribute("disabled");
        document.getElementById("Cuotas").removeAttribute("href");
      }
    });

    document.getElementById("submit").addEventListener("click", function (e) {
      e.preventDefault();

      let monto = document.getElementById("monto");

      if (monto.value < 10000 || monto.value > 100000) {
        Swal.fire({
          text: "Por favor, ingrese un monto dentro del rango permitido",
          icon: "info",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        }).then(function (result) {
          if (result.value) {
            monto.focus();
          }
        });
      } else {
        localStorage.setItem("banco", selectBancos.value);
        localStorage.setItem("cuota", selectCuotas.value);
        localStorage.setItem("monto", monto.value);

        document.getElementById("cardMonto").classList.add("filter");
        document.getElementById("monto").setAttribute("readonly", true);

        Swal.fire({
          title: "Solicitud satisfactoria",
          html:
            " Gracias " +
            localStorage.getItem("Nombre") +
            " " +
            localStorage.getItem("Apellido") +
            " el crédito que solicitaste por $" +
            localStorage.getItem("monto") +
            " a devolver en " +
            localStorage.getItem("cuota") +
            " cuotas, a depositar en el Banco " +
            localStorage.getItem("banco") +
            ", ha sido preaprobado.  <br> <br> EN BREVE NOS COMUNICAREMOS CON USTED!!!",
          icon: "success",
          confirmButtonColor: "#784eb8",
          confirmButtonText: "Aceptar",
        });
      }
    });
  },
  false
);
