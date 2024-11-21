import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BASE_URL } from './App';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;

const Label = styled.label`
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
    width: 100%;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: #f9f9f9;
`;

const SelectContainer = styled.div`
    width: 100%;
    position: relative;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: #f9f9f9;
    box-sizing: border-box;
    cursor: pointer;
`;

const OptionsList = styled.div`
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 10;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const OptionItem = styled.div`
    padding: 10px;
    cursor: pointer;
    color: black;
    &:hover {
        background-color: #67157D;
        color: white;
    }
`;

const ClearButton = styled.span`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    font-size: 18px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
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

    const FormCrearInstitucion = ({ handleRegresar }) => {
        const [formData, setFormData] = useState({
            nombre: '',
            paisIES: '',
            regionDepartamento: '',
            nombreLiderIES: '',
            correoContacto: '',
            telefonoContacto: '',
            urlOficial: ''
        });
    
        const [searchTermNacionalidad, setSearchTermNacionalidad] = useState('');
        const [filteredNacionalidades, setFilteredNacionalidades] = useState([]);
        const [isNacionalidadOptionsOpen, setIsNacionalidadOptionsOpen] = useState(false);
        const [nacionalidades, setNacionalidades] = useState([]);
    
        const nacionalidadOptionsListRef = useRef(null);
    
        const handleChange = (e) => {
            const { id, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [id]: value
            }));
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const dataToSend = {
                nombre: formData.nombre.toUpperCase(),
                paisIES: formData.paisIES,
                regionDepartamento: formData.regionDepartamento.trim(),
                nombreLiderIES: formData.nombreLiderIES.toUpperCase(),
                correoContacto: formData.correoContacto.toLowerCase().trim(),
                telefonoContacto: formData.telefonoContacto.trim(),
                urlOficial: formData.urlOficial.trim()
            };
            
            console.log('Datos a enviar:', dataToSend);
            
            try {
                const response = await fetch(`${BASE_URL}/institucionesEducativas/crear`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log('Institución creada exitosamente:', result);
                handleRegresar();
            } catch (error) {
                console.error('Error creando institución:', error);
            }
        };
    
        const handleSearchChangeNacionalidad = (e) => {
            const value = e.target.value;
            setSearchTermNacionalidad(value);
            setFilteredNacionalidades(
                nacionalidades.filter(nac =>
                    nac.descripcion.toLowerCase().includes(value.toLowerCase())
                )
            );
        };
    
        const handleOptionClickNacionalidad = (id, descripcion) => {
            setFormData(prevData => ({
                ...prevData,
                paisIES: id
            }));
            setSearchTermNacionalidad(descripcion);
            setIsNacionalidadOptionsOpen(false);
        };
    
        const toggleOptionsNacionalidad = () => {
            setIsNacionalidadOptionsOpen(!isNacionalidadOptionsOpen);
        };
    
        const clearNacionalidad = () => {
            setFormData(prevData => ({
                ...prevData,
                paisIES: ''
            }));
            setSearchTermNacionalidad('');
            setFilteredNacionalidades(nacionalidades);
        };
    
        useEffect(() => {
            const fetchNacionalidades = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/pais/obtener`);
                    if (response.data && Array.isArray(response.data.data)) {
                        setNacionalidades(response.data.data);
                        setFilteredNacionalidades(response.data.data);
                    } else {
                        throw new Error('La respuesta no tiene el formato esperado');
                    }
                } catch (error) {
                    console.error('Error al obtener nacionalidades:', error);
                }
            };
    
            fetchNacionalidades();
        }, []);
    
        return (
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="nombre">Nombre de la institución:</Label>
                <Input id="nombre" type="text" value={formData.nombre} onChange={handleChange} required placeholder="Ingrese el nombre de la institución" />
    
                <Label>País:</Label>
                <SelectContainer>
                    <SearchInput 
                        id="searchInputNacionalidad" 
                        type="text" 
                        value={searchTermNacionalidad} 
                        onChange={handleSearchChangeNacionalidad} 
                        onClick={toggleOptionsNacionalidad} 
                        placeholder="Seleccione un país..." 
                    />
                    <ClearButton onClick={clearNacionalidad}>&times;</ClearButton>
                    {isNacionalidadOptionsOpen && (
                        <OptionsList ref={nacionalidadOptionsListRef}>
                            {filteredNacionalidades.length > 0 ? (
                                filteredNacionalidades.map((nac) => (
                                    <OptionItem key={nac._id} onClick={() => handleOptionClickNacionalidad(nac._id, nac.descripcion)}>
                                        {nac.descripcion}
                                    </OptionItem>
                                ))
                            ) : (
                                <OptionItem>No hay resultados</OptionItem>
                            )}
                        </OptionsList>
                    )}
                </SelectContainer>
    
                <Label htmlFor="regionDepartamento">Región/Departamento:</Label>
                <Input id="regionDepartamento" type="text" value={formData.regionDepartamento} onChange={handleChange} required placeholder="Ingrese la región o departamento" />
    
                <Label htmlFor="nombreLiderIES">Nombre del líder de la IES:</Label>
                <Input id="nombreLiderIES" type="text" value={formData.nombreLiderIES} onChange={handleChange} required placeholder="Ingrese el nombre del líder" />
    
                <Label htmlFor="correoContacto">Correo de contacto:</Label>
                <Input id="correoContacto" type="email" value={formData.correoContacto} onChange={handleChange} required placeholder="ejemplo@dominio.com" />
    
                <Label htmlFor="telefonoContacto">Teléfono de contacto:</Label>
                <Input id="telefonoContacto" type="tel" value={formData.telefonoContacto} onChange={handleChange} required placeholder="Ingrese el número de teléfono" />
    
                <Label htmlFor="urlOficial">URL oficial:</Label>
                <Input id="urlOficial" type="url" value={formData.urlOficial} onChange={handleChange} required placeholder="https://www.ejemplo.com" />
    
                <ButtonContainer>
                    <Button type="submit">Crear</Button>
                    <Button type="button" onClick={handleRegresar}>Regresar</Button>
                </ButtonContainer>
            </Form>
        );
    };
    
    export default FormCrearInstitucion;
    

    
    