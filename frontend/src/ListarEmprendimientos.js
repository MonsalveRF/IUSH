import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { BASE_URL } from './App';

const TableContainer = styled.div`
    max-width: 1000px;
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
    padding: 12px 15px;
    text-align: left;
`;

const Td = styled.td`
    background-color: rgba(33, 59, 107, 0.05);
    color: #333;
    padding: 12px 15px;
    border-bottom: 1px solid #ccc;
`;

const Tr = styled.tr`
    &:last-child td {
        border-bottom: none;
    }
`;

const ListarEmprendimientos = () => {
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responseInfo, setResponseInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Iniciando fetchData');
            try {
                const url = `${BASE_URL}/informacionEmprendimiento/obtener`;
                console.log('Realizando petición GET a:', url);
                setLoading(true);
                const response = await axios.get(url);
                console.log('Respuesta completa:', response);

                setResponseInfo({
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                    config: response.config
                });

                if (!response.data) {
                    console.error('No se recibieron datos en la respuesta');
                    throw new Error('No se recibieron datos del servidor');
                }

                console.log('Datos recibidos:', response.data);
                console.log('Datos completos recibidos:', JSON.stringify(response.data, null, 2));


                if (!response.data.ok) {
                    console.error('La respuesta indica que no fue exitosa:', response.data);
                    throw new Error('La respuesta del servidor indica un error');
                }

                if (!Array.isArray(response.data.data)) {
                    console.error('Los datos recibidos no son un array:', response.data.data);
                    throw new Error('Formato de datos inesperado para emprendimientos');
                }

                console.log('Datos de emprendimientos procesados:', response.data.data);
                setEmprendimientos(response.data.data);
            } catch (err) {
                console.error('Error en la petición:', err);
                setError('Error al cargar los datos: ' + err.message);
            } finally {
                console.log('Finalizando fetchData, estado de loading:', false);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log('Estado actual:', { loading, error, emprendimientosCount: emprendimientos.length, responseInfo });

    if (loading) return <p>Cargando emprendimientos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>Fecha</Th>
                        <Th>Estado</Th>
                        <Th>Sector</Th>
                        <Th>Emprendedor</Th>
                        <Th>IES</Th>
                        <Th>País</Th>
                    </tr>
                </thead>
                <tbody>
                    {emprendimientos.length > 0 ? (
                        emprendimientos.map((emprendimiento, index) => {
                            console.log('Renderizando emprendimiento:', emprendimiento);
                            return (
                                <Tr key={index}>
                                    <Td>{emprendimiento.fecha}</Td>
                                    <Td>{emprendimiento.estado}</Td>
                                    <Td>{emprendimiento.sector?.sector || 'N/A'}</Td>
                                    <Td>{`${emprendimiento.infoEmprendedor?.nombres || ''} ${emprendimiento.infoEmprendedor?.apellidos || ''}`}</Td>
                                    <Td>{emprendimiento.IES?.nombre || 'N/A'}</Td>
                                    <Td>{emprendimiento.pais?.descripcion || 'N/A'}</Td>
                                </Tr>
                            );
                        })
                    ) : (
                        <Tr>
                            <Td colSpan="6">No se encontraron emprendimientos. Verifique la respuesta del servidor arriba.</Td>
                        </Tr>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default ListarEmprendimientos;