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

const FormCrearEvaluador = ({ handleRegresar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        idIES: '',
        telefono: '',
        correo: '',
        idPais: '',
        documentoIdentidad: ''
    });

    const [searchTermNacionalidad, setSearchTermNacionalidad] = useState('');
    const [searchTermInstitucion, setSearchTermInstitucion] = useState('');
    const [filteredNacionalidades, setFilteredNacionalidades] = useState([]);
    const [filteredInstituciones, setFilteredInstituciones] = useState([]);
    const [isNacionalidadOptionsOpen, setIsNacionalidadOptionsOpen] = useState(false);
    const [isInstitucionOptionsOpen, setIsInstitucionOptionsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [instituciones, setInstituciones] = useState([]);

    const nacionalidadOptionsListRef = useRef(null);
    const institucionOptionsListRef = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const evaluadorData = {
            nombre: formData.nombre.toUpperCase(),
            idIES: formData.idIES,
            telefono: formData.telefono,
            correo: formData.correo,
            idPais: formData.idPais,
            documentoIdentidad: formData.documentoIdentidad
        };
        console.log('Datos a enviar:', evaluadorData);
        
        try {
            const response = await fetch(`${BASE_URL}/evaluador/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evaluadorData),
            });
            
            console.log('Estado de la respuesta:', response.status);
            console.log('Cabeceras de la respuesta:', Object.fromEntries(response.headers.entries()));
            
            const text = await response.text();
            console.log('Respuesta del servidor:', text);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            let result;
            try {
                result = JSON.parse(text);
                console.log('Evaluador creado exitosamente:', result);
                handleRegresar(); // Regresar a la pantalla anterior después de crear el evaluador
            } catch (parseError) {
                console.error('Error al parsear la respuesta como JSON:', parseError);
                throw new Error('La respuesta del servidor no es JSON válido');
            }
        } catch (error) {
            console.error('Error creando evaluador:', error);
            // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje al usuario
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

    const handleSearchChangeInstitucion = (e) => {
        const value = e.target.value;
        setSearchTermInstitucion(value);
        filterInstituciones(value);
    };

    const filterInstituciones = (searchTerm = '') => {
        const filteredList = instituciones.filter(ies =>
            ies.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!formData.idPais || ies.paisIES === formData.idPais)
        );
        setFilteredInstituciones(filteredList);
    };

    const handleOptionClickNacionalidad = (id, descripcion) => {
        setFormData(prevData => ({
            ...prevData,
            idPais: id
        }));
        setSearchTermNacionalidad(descripcion);
        setIsNacionalidadOptionsOpen(false);
        
        setFormData(prevData => ({ ...prevData, idIES: '' }));
        setSearchTermInstitucion('');
        filterInstituciones();
    };
    
    const handleOptionClickInstitucion = (id, nombre) => {
        setFormData(prevData => ({
            ...prevData,
            idIES: id
        }));
        setSearchTermInstitucion(nombre);
        setIsInstitucionOptionsOpen(false);
    };

    const toggleOptionsNacionalidad = () => {
        setIsNacionalidadOptionsOpen(!isNacionalidadOptionsOpen);
    };

    const toggleOptionsInstitucion = () => {
        setIsInstitucionOptionsOpen(!isInstitucionOptionsOpen);
    };

    const clearNacionalidad = () => {
        setFormData(prevData => ({
            ...prevData,
            idPais: '',
            idIES: ''
        }));
        setSearchTermNacionalidad('');
        setSearchTermInstitucion('');
        setFilteredNacionalidades(nacionalidades);
        setFilteredInstituciones(instituciones);
    };

    const clearInstitucion = () => {
        setFormData(prevData => ({
            ...prevData,
            idIES: ''
        }));
        setSearchTermInstitucion('');
        filterInstituciones();
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                nacionalidadOptionsListRef.current &&
                !nacionalidadOptionsListRef.current.contains(event.target) &&
                !event.target.closest('#searchInputNacionalidad')
            ) {
                setIsNacionalidadOptionsOpen(false);
            }
            if (
                institucionOptionsListRef.current &&
                !institucionOptionsListRef.current.contains(event.target) &&
                !event.target.closest('#searchInputInstitucion')
            ) {
                setIsInstitucionOptionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchNacionalidades = async () => {
            try {

                console.log('Iniciando solicitud a:', `${BASE_URL}/pais/obtener`);
                
                const response = await axios.get(`${BASE_URL}/pais/obtener`, {
                });

                console.log('Respuesta recibida:', response);

                if (response.data && Array.isArray(response.data.data)) {
                    setNacionalidades(response.data.data);
                    setFilteredNacionalidades(response.data.data);
                } else {
                    throw new Error('La respuesta no tiene el formato esperado');
                }
                
                // FIN: Bloque para obtención de datos reales
            } catch (error) {
                console.error('Error al obtener nacionalidades:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchInstituciones = async () => {
            try {

                const response = await axios.get(`${BASE_URL}/institucionesEducativas/obtenerInstitucionesEducativas`, {
                });

                console.log('Respuesta recibida:', response);

                if (response.data && Array.isArray(response.data.data)) {
                    setInstituciones(response.data.data);
                    setFilteredInstituciones(response.data.data);
                } else {
                    throw new Error('La respuesta no tiene el formato esperado');
                }
                
            } catch (error) {
                console.error('Error fetching instituciones:', error);
            }
        };

        fetchNacionalidades();
        fetchInstituciones();
    }, []);
    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="nombre">Nombre completo:</Label>
            <Input 
                id="nombre" 
                type="text" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese el nombre completo"
            />

            <Label htmlFor="documentoIdentidad">Documento de identidad:</Label>
            <Input 
                id="documentoIdentidad" 
                type="text" 
                value={formData.documentoIdentidad} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese el documento de identidad"
            />

            <Label htmlFor="telefono">Teléfono:</Label>
            <Input 
                id="telefono" 
                type="tel" 
                value={formData.telefono} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese el número de teléfono"
            />

            <Label htmlFor="correo">Correo electrónico:</Label>
            <Input 
                id="correo" 
                type="email" 
                value={formData.correo} 
                onChange={handleChange} 
                required 
                placeholder="Ingrese el correo electrónico"
            />

            <Label>País</Label>
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

            <Label>Institución a la que pertenece:</Label>
            <SelectContainer>
                <SearchInput 
                    id="searchInputInstitucion" 
                    type="text" 
                    value={searchTermInstitucion} 
                    onChange={handleSearchChangeInstitucion} 
                    onClick={toggleOptionsInstitucion} 
                    placeholder="Seleccione una institución..."  
                />
                <ClearButton onClick={clearInstitucion}>&times;</ClearButton>
                {isInstitucionOptionsOpen && (
                    <OptionsList ref={institucionOptionsListRef}>
                    {filteredInstituciones.length > 0 ? (
                        filteredInstituciones.map((ies) => (
                            <OptionItem key={ies._id} onClick={() => handleOptionClickInstitucion(ies._id, ies.nombre)}>
                                {ies.nombre}
                            </OptionItem>
                        ))
                    ) : (
                        <OptionItem>No hay resultados</OptionItem>
                    )}
                    </OptionsList>
                )}
            </SelectContainer>

            <ButtonContainer>
                <Button type="submit">Guardar</Button>
                <Button type="button" onClick={handleRegresar}>Regresar</Button>
            </ButtonContainer>
        </Form>
    );
};

export default FormCrearEvaluador;