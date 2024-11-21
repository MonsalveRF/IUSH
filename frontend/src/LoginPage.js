import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import bgImage from './images/inicio.png';
import startupLogo from './images/logomapa.png';
import { BASE_URL } from './App';

const Contenedor = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(42, 158, 192, 0.2); 
    position: relative;
`;

const ImagenDeFondo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    opacity: 0.1;
`;

const Logo = styled.img`
    position: absolute;
    top: -55px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: auto;
`;

const ContenidoLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding: 30px;
    background: rgba(140, 184, 211, 0.7); 
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
`;

const Titulo = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Hint Vadodara', sans-serif;
`;

const Etiqueta = styled.label`
    display: block;
    margin-bottom: 5px;
    font-family: 'Hint Vadodara', sans-serif;
`;

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Hint Vadodara', sans-serif;
`;

const Entrada = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    font-family: 'Hint Vadodara', sans-serif;
`;

const Selector = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    margin-bottom: 20px;
`;

const Boton = styled.button`
    width: 50%;
    padding: 15px;
    background-color: #2c5c85;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Hint Vadodara', sans-serif;
    margin: 10px;
    word-wrap: break-word;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #8cb8d3;
    }

    &:active {
        background-color: #5f92bb;
    }
`;

const MensajeError = styled.p`
    color: red;
    font-family: 'Hint Vadodara', sans-serif;
    font-size: 14px;
    margin-top: 10px;
`;


const StartupLogo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 20px;
`;

const PaginaLogin = ({ navigate }) => {
    const [correo, setCorreo] = useState('');
    const [documentoIdentidad, setDocumentoIdentidad] = useState('');
    const [perfil, setPerfil] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        let ruta;
        if (perfil === 'administrador') {
            ruta = `${BASE_URL}/administrador/loginAdministrador/${documentoIdentidad}/${correo}`;
        } else if (perfil === 'evaluador') {
            ruta = `${BASE_URL}/evaluador/loginEvaluador/${documentoIdentidad}/${correo}`;
        } else {
            setError('Perfil no válido');
            setCargando(false);
            return;
        }

        console.log(`Ruta de API: ${ruta}`);

        try {
            const response = await axios.get(ruta);
            if (response.data && response.data.data) {
                localStorage.setItem('session', JSON.stringify({ perfil }));
                if (perfil === 'administrador') {
                    navigate('inicio_admin');
                } else if (perfil === 'evaluador') {
                    navigate('inicio_evaluador');
                }
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, intente de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <Contenedor>
                <ImagenDeFondo />
                <ContenidoLogin>
                    <StartupLogo 
                        src={startupLogo}
                        alt="Logo Startup IUSH" 
                        onError={() => console.error("No se pudo cargar startupiush.png")}
                    />
                    <Titulo>Iniciar sesión</Titulo>
                    <Etiqueta>Perfil</Etiqueta>
                    <Selector value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                        <option value="">Selecciona tu perfil</option>
                        <option value="administrador">Administrador</option>
                        <option value="evaluador">Evaluador</option>
                    </Selector>

                    <Etiqueta>Correo electrónico</Etiqueta>
                    <ContenedorInput>
                        <Entrada
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </ContenedorInput>

                    <Etiqueta>Documento de identidad</Etiqueta>
                    <ContenedorInput>
                        <Entrada
                            type="text"
                            placeholder="Ingresa tu documento de identidad"
                            value={documentoIdentidad}
                            onChange={(e) => setDocumentoIdentidad(e.target.value)}
                        />
                    </ContenedorInput>

                    {error && <MensajeError>{error}</MensajeError>}

                    <Boton onClick={manejarSubmit} disabled={cargando}>
                        {cargando ? 'Cargando...' : 'Acceder'}
                    </Boton>
                    <Boton onClick={() => navigate('home')}>Inicio</Boton>
                </ContenidoLogin>
            </Contenedor>
        </div>
    );
};

export default PaginaLogin;