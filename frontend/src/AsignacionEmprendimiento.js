import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { BASE_URL } from './App';


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #213B6B;
    margin-bottom: 20px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    background: ${props => props.disabled ? '#ccc' : props.active ? '#5f92bb' : '#2c5c85'};
    color: white;
    border: none;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.6 : 1};
    transition: background-color 0.3s ease;

    &:hover {
        background: ${props => props.disabled ? '#ccc' : '#8cb8d3'};
    }
    `;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
`;

const Th = styled.th`
    background-color: #213B6B;
    color: white;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 6px;
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const CheckboxInput = styled.input`
    margin-right: 5px;
`;

const AsignacionEmprendimiento = () => {
    const [evaluadores, setEvaluadores] = useState([]);
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [selectedEvaluador, setSelectedEvaluador] = useState('');
    const [selectedEmprendimientos, setSelectedEmprendimientos] = useState([]);
    const [disabledEvaluadores, setDisabledEvaluadores] = useState([]);
    const [disabledEmprendimientos, setDisabledEmprendimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvaluadores();
    }, []);

    useEffect(() => {
        if (selectedEvaluador) {
            fetchEmprendimientos(selectedEvaluador);
        } else {
            setEmprendimientos([]);
        }
    }, [selectedEvaluador]);

    const fetchEvaluadores = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/evaluador/obtener`);
            console.log('Evaluadores response:', response.data);
            if (response.data && Array.isArray(response.data.data)) {
                setEvaluadores(response.data.data);
            } else {
                throw new Error('Unexpected data format from Evaluadores API');
            }
        } catch (error) {
            console.error('Error al obtener evaluadores:', error);
            setError('Error al cargar los evaluadores');
        } finally {
            setLoading(false);
        }
    };

    const fetchEmprendimientos = async (evaluadorId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/evaluador/listarProyectosNoAsociados/${evaluadorId}`);
            console.log('Emprendimientos response:', response.data);
            if (response.data && Array.isArray(response.data)) {
                setEmprendimientos(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                setEmprendimientos(response.data.data);
            } else {
                throw new Error('Unexpected data format from Emprendimientos API');
            }
        } catch (error) {
            console.error('Error al obtener emprendimientos:', error);
            setError('Error al cargar los emprendimientos');
        } finally {
            setLoading(false);
        }
    };

    const handleEvaluadorChange = (e) => {
        const newEvaluadorId = e.target.value;
        setSelectedEvaluador(newEvaluadorId);
        setSelectedEmprendimientos([]);
    };

    const handleEmprendimientoChange = (emprendimientoId) => {
        setSelectedEmprendimientos(prev =>
            prev.includes(emprendimientoId)
                ? prev.filter(id => id !== emprendimientoId)
                : [...prev, emprendimientoId]
        );
    };

    const handleAsignar = async () => {
        if (selectedEvaluador && selectedEmprendimientos.length > 0) {
            const asignacionData = {
                evaluadorId: selectedEvaluador,
                emprendimientosIds: selectedEmprendimientos
            };

            try {
                const response = await axios.post(`${BASE_URL}/asignarEvaluador/crear`, asignacionData);
                console.log('Asignación exitosa:', response.data);

                setDisabledEvaluadores(prev => [...prev, selectedEvaluador]);
                setDisabledEmprendimientos(prev => [...prev, ...selectedEmprendimientos]);

                setSelectedEvaluador('');
                setSelectedEmprendimientos([]);
            } catch (error) {
                console.error('Error al asignar emprendimientos:', error);
                setError('Error al asignar emprendimientos');
            }
        } else {
            setError('Debes seleccionar un evaluador y al menos un emprendimiento');
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <FormContainer>
            <Title>Asignar Evaluadores</Title>
            <Select
                value={selectedEvaluador}
                onChange={handleEvaluadorChange}
            >
                <option value="">Seleccione un evaluador</option>
                {evaluadores.length > 0 && evaluadores.map(evaluador => (
                    <option
                        key={evaluador._id}
                        value={evaluador._id}
                        disabled={disabledEvaluadores.includes(evaluador._id)}
                    >
                        {evaluador.nombre}
                    </option>
                ))}
            </Select>
            {selectedEvaluador && (
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Sel.</Th>
                                <Th>Fecha</Th>
                                <Th>Estado</Th>
                                <Th>Sector</Th>
                                <Th>Emprendedor</Th>
                                <Th>IES</Th>
                                <Th>País</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprendimientos.map((emprendimiento) => (
                                <Tr key={emprendimiento._id}>
                                    <Td>
                                        <CheckboxInput
                                            type="checkbox"
                                            checked={selectedEmprendimientos.includes(emprendimiento._id)}
                                            onChange={() => handleEmprendimientoChange(emprendimiento._id)}
                                            disabled={disabledEmprendimientos.includes(emprendimiento._id)}
                                        />
                                    </Td>
                                    <Td>{emprendimiento.fecha}</Td>
                                    <Td>{emprendimiento.estado}</Td>
                                    <Td>{emprendimiento.sector?.sector}</Td>
                                    <Td>{`${emprendimiento.infoEmprendedor?.nombres} ${emprendimiento.infoEmprendedor?.apellidos}`}</Td>
                                    <Td>{emprendimiento.IES?.nombre}</Td>
                                    <Td>{emprendimiento.pais?.descripcion}</Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
            <Button onClick={handleAsignar}>Asignar</Button>
        </FormContainer>
    );
};

export default AsignacionEmprendimiento;