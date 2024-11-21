import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { BASE_URL } from './App';

const TableContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #213B6B;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'Hint Vadodara', sans-serif;
    font-size: 14px;
`;

const Th = styled.th`
    background-color: #213B6B;
    color: white;
    padding: 10px;
    text-align: left;
`;

const Td = styled.td`
    background-color: rgba(33, 59, 107, 0.05);
    color: #333;
    padding: 8px;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: none;
    }
`;

const ListarEvaluadores = () => {
    const [evaluadores, setEvaluadores] = useState([]);
    const [ies, setIes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [evaluadoresResponse, iesResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/evaluador/obtener`),
                    axios.get(`${BASE_URL}/institucionesEducativas/obtenerInstitucionesEducativas`)
                ]);

                console.log('Respuesta Evaluadores:', evaluadoresResponse.data);
                console.log('Respuesta IES:', iesResponse.data);
                
                if (evaluadoresResponse.data && Array.isArray(evaluadoresResponse.data.data)) {
                    setEvaluadores(evaluadoresResponse.data.data);
                } else {
                    throw new Error('Formato de datos inesperado de la API de evaluadores');
                }

              
                let iesData = iesResponse.data;
                if (iesResponse.data && iesResponse.data.data) {
                    iesData = iesResponse.data.data;
                }

                if (Array.isArray(iesData)) {
                    const iesMap = {};
                    iesData.forEach(institucion => {
                        if (institucion && institucion._id && institucion.nombre) {
                            iesMap[institucion._id] = institucion.nombre;
                        }
                    });
                    setIes(iesMap);
                } else {
                    console.error('Estructura de datos de IES inesperada:', iesData);
                    throw new Error('Formato de datos inesperado de la API de instituciones educativas');
                }
            } catch (err) {
                console.error('Error completo:', err);
                setError('Error al cargar los datos: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>; 

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>Nombre</Th>
                        <Th>Teléfono</Th>
                        <Th>Correo</Th>
                        <Th>IES</Th>
                    </tr>
                </thead>
                <tbody>
                    {evaluadores.length > 0 ? (
                        evaluadores.map((evaluador) => (
                            <tr key={evaluador._id}>
                                <Td>{evaluador.nombre}</Td>
                                <Td>{evaluador.telefono}</Td>
                                <Td>{evaluador.correo}</Td>
                                <Td>
                                    {evaluador.idIES 
                                        ? (ies[evaluador.idIES] || 'IES no encontrada') 
                                        : 'No especificado'}
                                </Td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <Td colSpan="4">No hay evaluadores disponibles</Td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default ListarEvaluadores;