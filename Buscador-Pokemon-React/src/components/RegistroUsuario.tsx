import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type Usuario } from '../context/PokemonContext';

export const RegistroUsuario: React.FC = () => {
  const { entrenadores, entrenadorActivo, resgistrarEntrenador, seleccionarEntrenador } = usePokemon();
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
    <div className="registro-container">
      <header>
        <h2>Registro de Entrenadores</h2>
      </header>

      <div className="cambiar-entrenador">
        <form id="FormularioRegistro" action="#" onSubmit={eventoSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text"id="nombre"value={nombre}onChange={(e) => setNombre(e.target.value)}name="nombre"placeholder="Carlos"required/>
            </div>
          </div>

          <div className="lista-entrenadores">
            <label htmlFor="apellido">Apellido:</label>
            <br />
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} name="apellido" placeholder="Perez" required/>
          </div>

          <div>
            <label htmlFor="pais">Pais:</label>
            <br />
            <select id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} required>
              <option value="" disabled>Selelccionar</option>
              <option value="169 - Colombia">Colombia</option>
              <option value="149 - Canada">Canada</option>
              <option value="850 - Venezuela">Venezuela</option>
            </select>
          </div>

          <br />

          <div>
            <label htmlFor="ciudad">Ciudad:</label>
            <br />
            <select id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required>
              <option value="" disabled>Seleccione una opción</option>
              <optgroup label="Colombia">
                <option value="11001 - Bogotá D.C.,">Bogotá D.C.</option>
                <option value="05001 - Medellin">Medellín</option>
                <option value="76001 - Cali">Cali</option>
                <option value="08001 - Barranquilla">Barranquilla</option>
                <option value="13001 - Cartagena">Cartagena</option>
              </optgroup>
              <optgroup label="Canada">
                <option value="3520005 - Toronto">Toronto</option>
                <option value="2466023 - Montrèal">Montrèal</option>
                <option value="5915022 - Vancouver">Vancouver</option>
                <option value="4806016 - Calgary">Calgary</option>
                <option value="4811061 - Edmonton">Edmonton</option>
              </optgroup>
              <optgroup label="Venezuela">
                <option value="01001 - Caracas">Caracas</option>
                <option value="24001 - Maracaibo">Maracaibo</option>
                <option value="08001 - Valencia">Valencia</option>
                <option value="11001 - Barquisimeto">Barquisimeto</option>
                <option value="02001 - Barcelona">Barcelona</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label htmlFor="tipo_documento">Tipo de Documento:</label>
            <br />
            <select id="tipo_documento" name="tipo_documento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="CE">CE</option>
              <option value="PAS">PAS</option>
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

        {entrenadores.length > 0 && (
  <div className="cambiar-entrenador">

    <h3>🔄 Cambiar entrenador</h3>

    <div className="lista-entrenadores">

      {entrenadores.map((user) => (

        <button
          key={user.id}
          type="button"
          className={`btn-entrenador ${
            entrenadorActivo?.id === user.id ? 'activo' : ''
          }`}
          onClick={() => seleccionarEntrenador(user)}
        >
          {user.nombreCompleto}
        </button>

      ))}

    </div>

  </div>
)}
    </div>
  );
};