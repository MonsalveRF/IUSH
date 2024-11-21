import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import bgImage from './images/infogeneral.png';
import axios from 'axios';
import { BASE_URL } from './App';
import logosImage from './images/logos.png';
import logoMapaImage from './images/logomapa.png';

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const BlurOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 35%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const LogoMapaContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
    margin-top: 10%;
`;

const LogoMapaImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
`;

const LogoImage = styled.img`
    max-width: 100%;
    max-height: 30%;
    margin-bottom: 5vh;
`;

const ContentWrapper = styled.div`
    position: absolute;
    left: 40%;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 600px;
`;

const FormContainer = styled.div`
    width: 100%;
    height: 70vh;
    background: rgba(202, 202, 217, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
    width: 100%;
    max-width: 400px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: #f9f9f9;
`;

const SelectContainer = styled.div`
    width: 100%;
    max-width: 400px;
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

const Description = styled.p`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Button = styled.button`
    width: 150px;
    height: 50px;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: none;
    background-color: #2c5c85;
    box-shadow: 0px 4px 8px rgba(101, 91, 127, 0.3);
    color: white;
    font-family: 'Hint Vadodara', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    word-wrap: break-word;
    margin: 10px;
    transition: background 0.3s;

    &:hover {
        background-color: #8cb8d3;
    }

    &:active {
        background-color: #5f92bb;
    }
`;


const FormEmprendedor = ({ navigate }) => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        pais: '',
        ciudadResidencia: '',
        documentoIdentidad: '',
        correoElectronicoPersonal: '',
        correoElectronicoInstitucional: '',
        numeroTelefono: '',
        idIES: '',
        programaAcademico: ''
    });
    
    const [searchTermNacionalidad, setSearchTermNacionalidad] = useState('');
    const [searchTermInstitucion, setSearchTermInstitucion] = useState('');
    const [filteredNacionalidades, setFilteredNacionalidades] = useState([]);
    const [filteredInstituciones, setFilteredInstituciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [instituciones, setInstituciones] = useState([]);
    const [isNacionalidadOptionsOpen, setIsNacionalidadOptionsOpen] = useState(false);
    const [isInstitucionOptionsOpen, setIsInstitucionOptionsOpen] = useState(false);

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
        const dataToSend = {
            nombres: formData.nombreEmprendedor.toUpperCase(),
            apellidos: formData.apellidoEmprendedor.toUpperCase(),
            pais: formData.pais,
            ciudadResidencia: formData.ciudadResidencia,
            documentoIdentidad: formData.documentoIdentidad,
            correoElectronicoPersonal: formData.correoPersonal,
            correoElectronicoInstitucional: formData.correoInstitucional,
            numeroTelefono: formData.telefono,
            idIES: formData.idIES,
            programaAcademico: formData.programaAcademico
        };
        
        console.log("Datos del emprendedor a enviar:");
        console.log(JSON.stringify(dataToSend, null, 2));
    
        console.log("Enviando datos al servidor...");


        try {
            const response = await fetch(`${BASE_URL}/informacionGeneral/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
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
            } catch (parseError) {
                console.error('Error al parsear la respuesta como JSON:', parseError);
                throw new Error('La respuesta del servidor no es JSON válido');
            }
    
            if (result.data && result.data._id) {
                localStorage.setItem('idEmprendedor', result.data._id);
                localStorage.setItem('idIES', formData.idIES);
                navigate('registro_emp');
            } else {
                console.error('Error: No se recibió _id del servidor');
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }

    };
    
    const handleBack = () => {
        navigate('home');
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
            (!formData.pais || ies.paisIES === formData.pais)
        );
        setFilteredInstituciones(filteredList);
    }; //filtro

    const handleOptionClickNacionalidad = (id, descripcion) => {
        setFormData(prevData => ({
            ...prevData,
            pais: id
        }));
        setSearchTermNacionalidad(descripcion);
        setIsNacionalidadOptionsOpen(false);
        
        // reseteo de instituciones en base al pais
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
            pais: '',
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
        <Container>
            <BlurOverlay>
                <LogoMapaContainer>
                    <LogoMapaImage src={logoMapaImage} alt="Logo Mapa" />
                </LogoMapaContainer>
                <LogoImage src={logosImage} alt="Logos" />
            </BlurOverlay>
            <ContentWrapper>
                <Content>
                    <Description>Registro para nuevos emprendedores</Description>
                    <FormContainer>
                        <Form onSubmit={handleSubmit}>
                        <Label>Nombre del emprendedor:</Label>
                        <Input  id="nombreEmprendedor" type="text" value={formData.nombreEmprendedor} onChange={handleChange} required placeholder="Ingrese su nombre"/>
    
                        <Label>Apellido del emprendedor:</Label>
                        <Input id="apellidoEmprendedor" type="text" value={formData.apellidoEmprendedor} onChange={handleChange} required placeholder="Ingrese su apellido"/>
    
                        <Label>Nacionalidad</Label>
                        <SelectContainer>
                            <SearchInput id="searchInputNacionalidad" type="text" value={searchTermNacionalidad} onChange={handleSearchChangeNacionalidad} onClick={toggleOptionsNacionalidad} placeholder="Buscar nacionalidad..." />
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
    
                        <Label>Ciudad de residencia:</Label>
                        <Input id="ciudadResidencia" type="text" value={formData.ciudadResidencia} onChange={handleChange} required placeholder="Ingrese su ciudad de residencia"/>
    
                        <Label>Documento de identidad:</Label>
                        <Input id="documentoIdentidad" type="text" value={formData.documentoIdentidad} onChange={handleChange} required placeholder="Ingrese su documento de identidad"/>
    
                        <Label>Correo electrónico personal:</Label>
                        <Input id="correoPersonal" type="email" value={formData.correoPersonal} onChange={handleChange} required placeholder="Ingrese su correo electrónico personal"/>
    
                        <Label>Correo electrónico institucional:</Label>
                        <Input id="correoInstitucional" type="email" value={formData.correoInstitucional} onChange={handleChange} required placeholder="Ingrese su correo electrónico institucional"/>
    
                        <Label>Teléfono:</Label>
                        <Input id="telefono" type="text" value={formData.telefono} onChange={handleChange} required placeholder="Ingrese su número de teléfono"/>
    
                        <Label>Nombre de la institución educativa a la que pertenece:</Label>
                        <SelectContainer>
                            <SearchInput id="searchInputInstitucion" type="text" value={searchTermInstitucion} onChange={handleSearchChangeInstitucion} onClick={toggleOptionsInstitucion} placeholder="Buscar institución..."  />
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
                                    <OptionItem>No existe institución educativa registrada asociada al pais seleccionado</OptionItem>
                                )}
                            </OptionsList>
                            )}
                        </SelectContainer>
    
                        <Label>Programa académico al que pertenece:</Label>
                        <Input id="programaAcademico" type="text" value={formData.programaAcademico} onChange={handleChange} required placeholder="Ingrese el programa académico"/>
    
                        <ButtonContainer>
                                <Button type="submit">Guardar</Button>
                                <Button type="button" onClick={handleBack}>Regresar</Button>
                            </ButtonContainer>
                        </Form>
                    </FormContainer>
                </Content>
            </ContentWrapper>
        </Container>
    );
};

export default FormEmprendedor;