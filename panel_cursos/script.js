const formCurso = document.getElementById('formCurso');
const nombreCurso = document.getElementById('nombreCurso');
const docenteCurso = document.getElementById('docenteCurso');
const duracionCurso = document.getElementById('duracionCurso');
const listaCursos = document.getElementById('listaCursos');
const contadorCursos = document.getElementById('contadorCursos');
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.seccion');

const errorNombre = document.getElementById('errorNombre');
const errorDocente = document.getElementById('errorDocente');
const errorDuracion = document.getElementById('errorDuracion');

function actualizarContador() {
  const total = document.querySelectorAll('.tarjeta-curso').length;
  contadorCursos.textContent = `📊 Cursos disponibles: ${total}`;
}

function limpiarErrores() {
  errorNombre.textContent = '';
  errorDocente.textContent = '';
  errorDuracion.textContent = '';
}

function validarFormulario() {
  limpiarErrores();
  let valido = true;

  if (nombreCurso.value.trim() === '') {
    errorNombre.textContent = 'El nombre del curso es obligatorio.';
    valido = false;
  } else if (nombreCurso.value.trim().length < 3) {
    errorNombre.textContent = 'Debe tener mínimo 3 caracteres.';
    valido = false;
  }

  if (docenteCurso.value.trim() === '') {
    errorDocente.textContent = 'El docente es obligatorio.';
    valido = false;
  } else if (docenteCurso.value.trim().length < 5) {
    errorDocente.textContent = 'Debe tener mínimo 5 caracteres.';
    valido = false;
  }

  if (duracionCurso.value.trim() === '') {
    errorDuracion.textContent = 'La duración es obligatoria.';
    valido = false;
  }

  return valido;
}

function asignarEventoEliminar(boton) {
  boton.addEventListener('click', function () {
    this.parentElement.remove();
    actualizarContador();
  });
}

document.querySelectorAll('.btn-eliminar').forEach(asignarEventoEliminar);

formCurso.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const tarjeta = document.createElement('article');
  tarjeta.classList.add('tarjeta-curso');

  tarjeta.innerHTML = `
    <h4>📌 ${nombreCurso.value.trim()}</h4>
    <p><strong>🧑‍🏫 Docente:</strong> ${docenteCurso.value.trim()}</p>
    <p><strong>⏱️ Duración:</strong> ${duracionCurso.value.trim()}</p>
    <button class="btn-eliminar">🗑️ Eliminar</button>
  `;

  listaCursos.appendChild(tarjeta);

  const nuevoBotonEliminar = tarjeta.querySelector('.btn-eliminar');
  asignarEventoEliminar(nuevoBotonEliminar);

  actualizarContador();
  formCurso.reset();
  limpiarErrores();
});

botonesNav.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const seccionObjetivo = boton.getAttribute('data-seccion');

    botonesNav.forEach(function (btn) {
      btn.classList.remove('activo');
    });

    secciones.forEach(function (seccion) {
      seccion.classList.remove('visible');
    });

    boton.classList.add('activo');
    document.getElementById(seccionObjetivo).classList.add('visible');
  });
});

actualizarContador();
