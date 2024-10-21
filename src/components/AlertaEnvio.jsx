// src/components/AlertaEnvio.js
import Swal from 'sweetalert2';

export const mostrarAlerta = () => {
    Swal.fire({
        title: '¡Envío exitoso!',
        text: 'La información ha sido enviada correctamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
};

export const mostrarLlenadoFormulario = ()=> {
    Swal.fire({
        title: 'Error',
        text: 'Todos los campos deben estar completos.',
        icon: 'error',
        confirmButtonText: 'Ok'
    });
};

export const mostrarError = () => {
    Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la información. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
