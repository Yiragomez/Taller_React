import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type Usuario } from '../context/PokemonContext';

export const RegistroUsuario: React.FC = () => {
  const { resgistrarEntrenador } = usePokemon();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDeIdentificacion, setNumeroDeIdentificacion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [numeroDeCelular, setNumeroDeCelular] = useState('');
  const [datosPersonales, setDatosPersonales] = useState(false);

  const eventoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!datosPersonales) {
      alert('Aceptar política de privacidad');
      return;
    }

   const nuevo: Usuario = {
        id: Date.now(),
        nombreCompleto: `${nombre} ${apellido}`,
        lugarDeNacimiento: {
            tipo: pais,
            ciudad: ciudad,
        },
        tipoDocumento: {
            tipo: tipoDocumento,
            numero: numeroDeIdentificacion,
        },
        fechaNacimiento,
        numeroDeCelular,
        datosPersonales,
        fechaRegistro: new Date().toLocaleDateString(),
    };

    resgistrarEntrenador(nuevo);
    navigate('/pokemon');
  };

  return (
    <div>
      <header>
        <h2>Registro de Entrenadores</h2>
      </header>

      <div>
        <form id="FormularioRegistro" action="#" onSubmit={eventoSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text"id="nombre"value={nombre}onChange={(e) => setNombre(e.target.value)}name="nombre"placeholder="Carlos"required/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <br />
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} name="apellido" placeholder="Perez" required/>
          </div>

          <div>
            <label htmlFor="pais">Pais:</label>
            <br />
            <select id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} required>
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="Colombia">Colombia</option>
              <option value="Canada">Canada</option>
              <option value="Venezuela">Venezuela</option>
            </select>
          </div>

          <br />

          <div>
            <label htmlFor="ciudad">Ciudad:</label>
            <br />
            <select id="ciudad" name="ciudad" value={ciudad}onChange={(e) => setCiudad(e.target.value)} required>
              <option value="" disabled>
                Seleccione una opción
              </option>

              {pais === 'Colombia' && (
                <>
                  <option value="Bogotá D.C.">Bogotá D.C.</option>
                  <option value="Medellín">Medellín</option>
                  <option value="Cali">Cali</option>
                  <option value="Barranquilla">Barranquilla</option>
                  <option value="Cartagena">Cartagena</option>
                </>
              )}

              {pais === 'Canada' && (
                <>
                  <option value="Toronto">Toronto</option>
                  <option value="Montréal">Montréal</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Calgary">Calgary</option>
                  <option value="Edmonton">Edmonton</option>
                </>
              )}

              {pais === 'Venezuela' && (
                <>
                  <option value="Caracas">Caracas</option>
                  <option value="Maracaibo">Maracaibo</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Barquisimeto">Barquisimeto</option>
                  <option value="Barcelona">Barcelona</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label>Tipo de documento</label>
            <br />
            <select id="tipo_documento" name="tipo_documento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required >
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div>
            <label>Número de Identificación:</label>
            <br />
            <input type="text" id="numero_identificacion" name="numero_identificacion" value={numeroDeIdentificacion} onChange={(e) => setNumeroDeIdentificacion(e.target.value)} placeholder="1233489498" required/>
          </div>

          <div>
            <label>Fecha de Nacimiento:</label>
            <br />
            <input type="date"  id="fecha_nacimiento" name="fecha_nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required/>
          </div>

          <div>
            <label>Número de Celular:</label>
            <br />
            <input type="tel" id="celular" name="celular" value={numeroDeCelular} onChange={(e) => setNumeroDeCelular(e.target.value)} placeholder="000 000 00 00" required />
          </div>

          <div>
            <input type="checkbox" id="datos_personales" checked={datosPersonales} onChange={(e) => setDatosPersonales(e.target.checked)} name="politica_datos" required/>
            <label htmlFor="datos_personales">
              Acepto la política de tratamiento de datos personales.
            </label>
          </div>

          <button type="submit" className="btn-submit">
            Enviar Registro
          </button>
        </form>
      </div>
    </div>
  );
};