import React from 'react';
import styled from 'styled-components';
import { useState , useEffect, useRef } from 'react';
import bgImage from './images/infoemp.png'; 
import DatePicker from 'react-datepicker';
import startupLogo from './images/logomapa.png';
import 'react-datepicker/dist/react-datepicker.css';
import { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './App';
import logosImage from './images/logos.png';

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

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    width: 100%;
    max-width: 400px;
    position: relative;
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

const Option = styled.option`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: white;
    width: 50%;
`;

const DatePickerContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: #f9f9f9;
    color: black;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #213B6B;
    }

    .react-datepicker__input-container input {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        background: transparent;
    }
`;

const GlobalStyle = createGlobalStyle`
    .react-datepicker-wrapper, .react-datepicker__input-container {
        display: block;
        width: 100%;
    }

    .react-datepicker {
        font-family: 'Hint Vadodara', sans-serif;
    }
    .react-datepicker__header {
        background-color: #213B6B;
    }
    .react-datepicker__current-month, .react-datepicker__day-name {
        color: white;
    }
    .react-datepicker__day--selected {
        background-color: #213B6B;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Description = styled.p`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
`;

const SectorDescription = styled.p`
    font-family: 'Hint Vadodara', sans-serif;
    color: #213B6B;
    font-size: 0.9rem;
    margin-top: 5px;
    text-align: left;
    width: 100%;
    max-width: 400px;
`;

const LoadingMessage = styled.p`
    font-family: 'Hint Vadodara', sans-serif;
    color: #213B6B;
    font-size: 0.9rem;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(33, 59, 107, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalLogo = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 20px;
`;

const ModalText = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #213B6B;
`;

const ModalButton = styled(Button)`
    margin-top: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Hint Vadodara', sans-serif;
    background-color: #f9f9f9;
    resize: vertical;
    min-height: 100px;
`;

const CharCount = styled.div`
    font-size: 0.8rem;
    color: ${props => props.isExceeded ? 'red' : '#666'};
    text-align: right;
    width: 100%;
    max-width: 400px;
    margin-top: 5px;
`;

const FormPage = ({ navigate }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [sectores, setSectores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [descripcionSector, setDescripcionSector] = useState('');

    useEffect(() => {

        const fetchSectores = async () => {
            try {
                const response = await fetch(`${BASE_URL}/sectorEmprendimiento/obtenerSector`);
                const data = await response.json();
                setSectores(data.data || []);
            } catch (error) {
                console.error('Error fetching sectores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectores();
        
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        if (id === 'sectorIndustria') {
            const selectedSector = sectores.find(sector => sector._id === value);
            if (selectedSector) {
                setDescripcionSector(selectedSector.descripcion);
                setFormData(prevData => ({
                    ...prevData,
                    idSector: selectedSector._id
                }));
            }
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData((prevData) => ({
            ...prevData,
            fecha: date,
        }));
    };

    const handleTextAreaChange = (e) => {
        const { id, value } = e.target;
        if (value.length <= 500) {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idEmprendedor = localStorage.getItem('idEmprendedor');
        const idIES = localStorage.getItem('idIES');

        const formattedData = {
            idSector: formData.idSector || '',
            idIES: idIES || '',
            idEmprendedor: idEmprendedor || '',
            fecha: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
            descripcionIdea: formData.descripcionIdea || '',
            propuestaSolucion: formData.propuestaSolucion || '',
            respuestas: [
                { numeroPregunta: 1, respuestaPregunta: formData.ideaClara === 'si', etapa: "Idea" },
                { numeroPregunta: 2, respuestaPregunta: formData.investigacionesMercado === 'si', etapa: "Idea" },
                { numeroPregunta: 3, respuestaPregunta: formData.necesidadProblema === 'si', etapa: "Idea" },
                { numeroPregunta: 4, respuestaPregunta: formData.retroalimentacionClientes === 'si', etapa: "Idea" },
                { numeroPregunta: 5, respuestaPregunta: formData.propuestaValor === 'si', etapa: "Idea" },
                { numeroPregunta: 6, respuestaPregunta: formData.planNegocios === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 7, respuestaPregunta: formData.productosServicios === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 8, respuestaPregunta: formData.prototipoPrueba === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 9, respuestaPregunta: formData.competenciaAnalisis === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 10, respuestaPregunta: formData.publicoObjetivo === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 11, respuestaPregunta: formData.planFinanciero === 'si', etapa: "Desarrollo" },
                { numeroPregunta: 12, respuestaPregunta: formData.enElMercado === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 13, respuestaPregunta: formData.campañaMarketing === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 14, respuestaPregunta: formData.clientesUsuarios === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 15, respuestaPregunta: formData.canalDistribucion === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 16, respuestaPregunta: formData.presenciaEnLinea === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 17, respuestaPregunta: formData.estrategiasPrecios === 'si', etapa: "Lanzamiento Temprano" },
                { numeroPregunta: 18, respuestaPregunta: formData.ingresosConstantes === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 19, respuestaPregunta: formData.reinversionCrecimiento === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 20, respuestaPregunta: formData.contratandoEmpleados === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 21, respuestaPregunta: formData.ampliadoGama === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 22, respuestaPregunta: formData.metricasKPI === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 23, respuestaPregunta: formData.sistemasGestion === 'si', etapa: "Crecimiento" },
                { numeroPregunta: 24, respuestaPregunta: formData.baseClientes === 'si', etapa: "Madurez" },
                { numeroPregunta: 25, respuestaPregunta: formData.puntoEquilibrio === 'si', etapa: "Madurez" },
                { numeroPregunta: 26, respuestaPregunta: formData.fidelizacionClientes === 'si', etapa: "Madurez" },
                { numeroPregunta: 27, respuestaPregunta: formData.procesosEstandarizados === 'si', etapa: "Madurez" },
                { numeroPregunta: 28, respuestaPregunta: formData.analisisRendimiento === 'si', etapa: "Madurez" },
                { numeroPregunta: 29, respuestaPregunta: formData.costosControlados === 'si', etapa: "Funcionamiento Óptimo" },
                { numeroPregunta: 30, respuestaPregunta: formData.satisfaccionCliente === 'si', etapa: "Funcionamiento Óptimo" },
                { numeroPregunta: 31, respuestaPregunta: formData.equipoMotivado === 'si', etapa: "Funcionamiento Óptimo" },
                { numeroPregunta: 32, respuestaPregunta: formData.beneficiosConstantes === 'si', etapa: "Funcionamiento Óptimo" },
                { numeroPregunta: 33, respuestaPregunta: formData.mejorasContinuas === 'si', etapa: "Funcionamiento Óptimo" },
                { numeroPregunta: 34, respuestaPregunta: formData.expansionMercados === 'si', etapa: "Expansión" },
                { numeroPregunta: 35, respuestaPregunta: formData.sociosEstrategicos === 'si', etapa: "Expansión" },
                { numeroPregunta: 36, respuestaPregunta: formData.financiamientoExterno === 'si', etapa: "Expansión" },
                { numeroPregunta: 37, respuestaPregunta: formData.planExpansion === 'si', etapa: "Expansión" },
                { numeroPregunta: 38, respuestaPregunta: formData.patentesMarcas === 'si', etapa: "Expansión" },
                { numeroPregunta: 39, respuestaPregunta: formData.estrategiaSalida === 'si', etapa: "Expansión" },
            ],
    };


    console.log('Datos del formulario enviados:', formattedData);

// INICIO: Bloque de envío de datos al servidor
        // Descomentar este bloque cuando se implemente el envío real de datos
        
        try {
            const response = await fetch(`${BASE_URL}/informacionEmprendimiento/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
    
            const result = await response.json();
            console.log('Server response:', result);  
    
            if (response.ok) {
                // Si la respuesta es exitosa (status 200-299), mostramos el modal
                setShowModal(true);
            } else {
                // Si hay un error, lo mostramos en la consola
                console.error('Error al guardar el emprendimiento:', result.error || 'No se proporcionó un mensaje de error');
                // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            // Aquí también podrías mostrar un mensaje de error al usuario
        }
    
        
        // FIN: Bloque de envío de datos al servidor
};


return (
    <>
    <GlobalStyle />
    <Container>
        <BlurOverlay>
            <LogoMapaContainer>
                <LogoMapaImage src={startupLogo} alt="Logo Mapa" />
            </LogoMapaContainer>
            <LogoImage src={logosImage} alt="Logos" />
        </BlurOverlay>
        <ContentWrapper>
            <Content>
                <Description>Registro de emprendimiento</Description>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>

                    <Label>Descripción de la idea del negocio o del emprendimiento</Label>
                        <TextArea  id="descripcionIdea"  value={formData.descripcionIdea || ''}   onChange={handleTextAreaChange}  placeholder="Breve descripción de la necesidad o del problema identificado" maxLength={500} required />
                        <CharCount isExceeded={formData.descripcionIdea?.length === 500}>
                            {formData.descripcionIdea?.length || 0}/500
                        </CharCount>

                    <Label>Propuesta de solución al problema o necesidad identificada</Label>
                        <TextArea   id="propuestaSolucion"   value={formData.propuestaSolucion || ''} onChange={handleTextAreaChange}  placeholder="Breve descripción de la propuesta de solución"  maxLength={500} required />
                        <CharCount isExceeded={formData.propuestaSolucion?.length === 500}>
                            {formData.propuestaSolucion?.length || 0}/500
                        </CharCount>

                <Label>Fecha de creación del emprendimiento</Label>
                                <DatePickerContainer>
                                    <StyledDatePicker id="fecha" selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" placeholderText="Selecciona una fecha" showMonthDropdown showYearDropdown dropdownMode="select" />
                                </DatePickerContainer>

                    <Label>Sector o industria del emprendimiento</Label>
                        {loading ? (
                        <LoadingMessage>Cargando sectores...</LoadingMessage>
                            ) : (
                                <Select  id="sectorIndustria"  value={formData.idSector || ''}   onChange={handleChange}   required >
                                    <Option value="">Seleccionar</Option>
                                    {sectores.map((sec) => (
                                        <Option key={sec._id} value={sec._id}>{sec.sector}</Option>
                                    ))}
                                </Select>
                                )}
                                {descripcionSector && (
                                    <SectorDescription>{descripcionSector}</SectorDescription>
                                )}


                <Label>¿Tienes una idea clara y definida de tu emprendimiento?</Label>
                <Select id="ideaClara" value={formData.ideaClara || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has realizado investigaciones de mercado para validar tu idea?</Label>
                <Select id="investigacionesMercado" value={formData.investigacionesMercado || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has identificado una necesidad o problema específico que tu idea busca resolver?</Label>
                <Select id="necesidadProblema" value={formData.necesidadProblema || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has recibido retroalimentación de posibles clientes sobre tu idea?</Label>
                <Select id="retroalimentacionClientes" value={formData.retroalimentacionClientes || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes una propuesta de valor única para tu producto/servicio?</Label>
                <Select id="propuestaValor" value={formData.propuestaValor || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes un plan de negocios formal y detallado?</Label>
                <Select id="planNegocios" value={formData.planNegocios || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has definido tus productos o servicios específicos?</Label>
                <Select id="productosServicios" value={formData.productosServicios || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has realizado algún prototipo (versión preliminar del producto o servicio a ofrecer) o prueba piloto de tu producto/servicio?</Label>
                <Select id="prototipoPrueba" value={formData.prototipoPrueba || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has identificado a tu competencia y analizado sus fortalezas y debilidades?</Label>
                <Select id="competenciaAnalisis" value={formData.competenciaAnalisis || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes identificado tu público objetivo?</Label>
                <Select id="publicoObjetivo" value={formData.publicoObjetivo || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has elaborado un plan financiero y de costos?</Label>
                <Select id="planFinanciero" value={formData.planFinanciero || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu emprendimiento ya está en el mercado?</Label>
                <Select id="enElMercado" value={formData.enElMercado || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has realizado alguna campaña de marketing o promoción?</Label>
                <Select id="campañaMarketing" value={formData.campañaMarketing || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes clientes o usuarios que ya han adquirido tus productos/servicios?</Label>
                <Select id="clientesUsuarios" value={formData.clientesUsuarios || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes un canal de distribución definido?</Label>
                <Select id="canalDistribucion" value={formData.canalDistribucion || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu emprendimiento tiene una presencia en línea (sitio web, redes sociales)?</Label>
                <Select id="presenciaEnLinea" value={formData.presenciaEnLinea || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has definido tus estrategias de precios?</Label>
                <Select id="estrategiasPrecios" value={formData.estrategiasPrecios || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu emprendimiento ha empezado a generar ingresos constantes?</Label>
                <Select id="ingresosConstantes" value={formData.ingresosConstantes || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Estás reinvirtiendo en el crecimiento del negocio?</Label>
                <Select id="reinversionCrecimiento" value={formData.reinversionCrecimiento || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Estás contratando empleados o colaboradores?</Label>
                <Select id="contratandoEmpleados" value={formData.contratandoEmpleados || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has ampliado tu gama de productos/servicios desde el lanzamiento?</Label>
                <Select id="ampliadoGama" value={formData.ampliadoGama || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes métricas y KPIs definidos para medir el rendimiento de tu negocio?</Label>
                <Select id="metricasKPI" value={formData.metricasKPI || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has implementado sistemas de gestión y operación para mejorar la eficiencia?</Label>
                <Select id="sistemasGestion" value={formData.sistemasGestion || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu negocio ya tiene una base de clientes establecida?</Label>
                <Select id="baseClientes" value={formData.baseClientes || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has alcanzado un punto de equilibrio financiero?</Label>
                <Select id="puntoEquilibrio" value={formData.puntoEquilibrio || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Estás trabajando en la fidelización de tus clientes?</Label>
                <Select id="fidelizacionClientes" value={formData.fidelizacionClientes || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes procesos operativos estandarizados?</Label>
                <Select id="procesosEstandarizados" value={formData.procesosEstandarizados || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Realizas análisis regulares del rendimiento del negocio y ajustas tus estrategias en consecuencia?</Label>
                <Select id="analisisRendimiento" value={formData.analisisRendimiento || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu negocio opera de manera eficiente con costos controlados?</Label>
                <Select id="costosControlados" value={formData.costosControlados || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu negocio tiene una alta satisfacción del cliente?</Label>
                <Select id="satisfaccionCliente" value={formData.satisfaccionCliente || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes un equipo de trabajo bien establecido y motivado?</Label>
                <Select id="equipoMotivado" value={formData.equipoMotivado || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu negocio está generando beneficios constantes?</Label>
                <Select id="beneficiosConstantes" value={formData.beneficiosConstantes || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Realizas mejoras continuas en tus productos, servicios y procesos?</Label>
                <Select id="mejorasContinuas" value={formData.mejorasContinuas || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Estás considerando la expansión a nuevos mercados o segmentos?</Label>
                <Select id="expansionMercados" value={formData.expansionMercados || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu emprendimiento tiene socios estratégicos o alianzas?</Label>
                <Select id="sociosEstrategicos" value={formData.sociosEstrategicos || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Estás buscando o has conseguido financiamiento externo para la expansión?</Label>
                <Select id="financiamientoExterno" value={formData.financiamientoExterno || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tienes un plan de expansión a largo plazo?</Label>
                <Select id="planExpansion" value={formData.planExpansion || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Tu emprendimiento tiene patentes, registros de marca o derechos de autor?</Label>
                <Select id="patentesMarcas" value={formData.patentesMarcas || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <Label>¿Has desarrollado una estrategia de salida o sucesión para el negocio?</Label>
                <Select id="estrategiaSalida" value={formData.estrategiaSalida || ''} onChange={handleChange} required>
                    <Option value="">Seleccionar</Option>
                    <Option value="si">Sí</Option>
                    <Option value="no">No</Option>
                </Select>

                <ButtonContainer>
                                <Button type="submit">Registrar</Button>
                                <Button onClick={() => navigate('home')}>Cancelar</Button>
                            </ButtonContainer>
                        </Form>
                    </FormContainer>
                </Content>
            </ContentWrapper>
        </Container>

        {showModal && (
            <ModalOverlay>
                <ModalContent>
                    <ModalLogo src={startupLogo} alt="Logo Startup IUSH" />
                    <ModalText>Se ha registrado con éxito</ModalText>
                    <ModalButton onClick={() => navigate('home')}>Aceptar</ModalButton>
                </ModalContent>
            </ModalOverlay>
        )}
        </>
    );
};

export default FormPage;