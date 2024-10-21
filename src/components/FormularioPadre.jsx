// src/components/FormularioPadre.js
import React, { useState } from 'react';
import { db } from '../firebase'; // Asegúrate de importar tu instancia de Firestore
import { collection, addDoc } from 'firebase/firestore';
import { mostrarAlerta, mostrarError, mostrarLlenadoFormulario } from './AlertaEnvio'; // Importar las funciones de alerta
import { calcularEdad } from './CalcularEdad'; // Asegúrate de importar calcularEdad

const FormularioPadre = () => {
    const [dni, setDni] = useState('');
    const [numeroHijos, setNumeroHijos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [hijos, setHijos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!dni || !numeroHijos || !direccion || !fechaNacimiento || !edad || hijos.some(hijo => !hijo.dni || !hijo.nombre || !hijo.edad || !hijo.fechaNacimiento)) {
            mostrarLlenadoFormulario();
            return;
        }

        // Crear un objeto con los datos del padre
        const padreData = {
            dni,
            numeroHijos,
            direccion,
            fechaNacimiento,
            edad,
            hijos,
        };

        try {
            // Agregar el objeto a la colección "padres" en Firestore
            const docRef = await addDoc(collection(db, 'padres'), padreData);
            console.log("Documento escrito con ID: ", docRef.id);
            mostrarAlerta();  // Mostrar alerta de éxito
            resetForm();  // Limpiar el formulario
        } catch (error) {
            console.error("Error al agregar el documento: ", error);
            mostrarError(""); // Mostrar alerta de error
        }
    };

    // Función para limpiar el formulario después del envío
    const resetForm = () => {
        setDni('');
        setNumeroHijos('');
        setDireccion('');
        setFechaNacimiento('');
        setEdad('');
        setHijos([]);
    };

    // Manejar el cambio en el número de hijos
    const handleNumeroHijosChange = (e) => {
        const value = e.target.value;
        setNumeroHijos(value);
        setHijos(Array.from({ length: value }, () => ({ dni: '', nombre: '', edad: '', fechaNacimiento: '' })));
    };

    // Manejar los cambios en los datos de los hijos
    const handleHijoChange = (index, field, value) => {
        const newHijos = [...hijos];
        newHijos[index][field] = value;
        setHijos(newHijos);
    };

    const handleHijoFechaNacimientoChange = (index, value) => {
        handleHijoChange(index, 'fechaNacimiento', value);
        const edadHijo = calcularEdad(value);
        handleHijoChange(index, 'edad', edadHijo); // Calcula la edad automáticamente
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded bg-white shadow-md">
            <h2 className="text-lg font-bold mb-4">Formulario de Inscripción del Padre</h2>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">DNI</label>
                <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Número de Hijos</label>
                <select
                    value={numeroHijos}
                    onChange={handleNumeroHijosChange}
                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Seleccione</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Dirección</label>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Fecha de Nacimiento</label>
                <input
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => {
                        setFechaNacimiento(e.target.value);
                        setEdad(calcularEdad(e.target.value)); // Calcula la edad automáticamente
                    }}
                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Edad</label>
                <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly // Campo de edad solo de lectura porque se calcula automáticamente
                />
            </div>

            {hijos.map((hijo, index) => (
                <div key={index} className="border rounded p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">Hijo {index + 1}</h3>
                    <div className="flex items-center mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">DNI</label>
                        <input
                            type="text"
                            value={hijo.dni}
                            onChange={(e) => handleHijoChange(index, 'dni', e.target.value)}
                            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Nombre</label>
                        <input
                            type="text"
                            value={hijo.nombre}
                            onChange={(e) => handleHijoChange(index, 'nombre', e.target.value)}
                            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Edad</label>
                        <input
                            type="number"
                            value={hijo.edad}
                            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            readOnly // Edad calculada automáticamente
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            value={hijo.fechaNacimiento}
                            onChange={(e) => handleHijoFechaNacimientoChange(index, e.target.value)}
                            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
            ))}

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar
            </button>
        </form>
    );
};

export default FormularioPadre;
