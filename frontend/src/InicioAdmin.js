import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from './images/admin.png'; 
import startupLogo from './images/logomapa.png';
import FormCrearEvaluador from './FormCrearEvaluador';
import AsignacionEmprendimiento from './AsignacionEmprendimiento';
import ListarEvaluadores from './ListarEvaluadores';
import ListarEmprendimientos from './ListarEmprendimientos';
import FormCrearIES from './FormCrearIES';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const BlurOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(42, 158, 192, 0.2); 
    backdrop-filter: blur(15px);
    display: flex;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: white;
    padding: 20px;
    position: relative;
    z-index: 1;
    margin-left: 290px;
`;


const Description = styled.p`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
`;

const FormContainer = styled.div`
    width: 90%;
    max-width: 1000px;
    height: auto;
    min-height: 70vh;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    display: ${props => props.visible ? 'block' : 'none'};
`;

const SidePanel = styled.div`
    width: 250px;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 30px);
    overflow-y: auto;
    position: fixed;
    left: 10px;
    top: 15px;
    bottom: 15px;
`;

const MenuOption = styled.button`
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
const HomeButton = styled(MenuOption)`
    margin-top: auto;
    background: ${props => props.active ? '#5f92bb' : '#2c5c85'};

    &:hover {
        background: #8cb8d3;
    }
`;

const StartupLogo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 20px;
`;

const InicioAdmin = ({ navigate }) => {
    const [formVisible, setFormVisible] = useState(false);
    const [activeForm, setActiveForm] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [setStartupLogoError] = useState(false);

    const handleStartupLogoError = () => {
        console.error("No se pudo cargar startupiush.png");
        setStartupLogoError(true);
    };

    const handleMenuClick = (form) => {
        setFormVisible(true);
        setActiveForm(form);
        setActiveOption(form);
    };

    const handleRegresarClick = () => {
        setFormVisible(false);
        setActiveForm(null);
        setActiveOption(null);
    };

    return (
        <Container>
            <BlurOverlay>
                <SidePanel>
                        <StartupLogo 
                            src = {startupLogo}
                            alt="Logo Startup IUSH" 
                            onError={handleStartupLogoError}
                        />
                    <MenuOption 
                        onClick={() => handleMenuClick('crearies')}
                        active={activeOption === 'crearies'}
                    >
                        Crear IES
                    </MenuOption>    
                    <MenuOption 
                        onClick={() => handleMenuClick('crear_evaluador')}
                        active={activeOption === 'crear_evaluador'}
                    >
                        Crear evaluador
                    </MenuOption>
                    <MenuOption 
                        onClick={() => handleMenuClick('listar_evaluadores')}
                        active={activeOption === 'listar_evaluadores'}
                    >
                        Listar evaluadores
                    </MenuOption>
                    <MenuOption 
                        onClick={() => handleMenuClick('asignar_emprendimiento')}
                        active={activeOption === 'asignar_emprendimiento'}
                    >
                        Asignar evaluador
                    </MenuOption>
                    <MenuOption 
                        onClick={() => handleMenuClick('listar_emprendimientos')}
                        active={activeOption === 'listar_emprendimientos'}
                    >
                        Listar emprendimientos
                    </MenuOption>
                    <MenuOption disabled>Informes</MenuOption>
                    <HomeButton onClick={() => navigate('home')}> Salir </HomeButton>
                </SidePanel>
                <Content>
                    <Description>Bienvenido administrador</Description>
                    <FormContainer visible={formVisible}>
                        {activeForm === 'crear_evaluador' && (
                            <FormCrearEvaluador handleRegresar={handleRegresarClick} />
                        )}
                        {activeForm === 'asignar_emprendimiento' && (
                            <AsignacionEmprendimiento navigate={handleRegresarClick} />
                        )}
                        {activeForm === 'listar_evaluadores' && (
                            <ListarEvaluadores />
                        )}
                        {activeForm === 'listar_emprendimientos' && (
                            <ListarEmprendimientos />
                        )}
                        {activeForm === 'crearies' && (
                            <FormCrearIES handleRegresar={handleRegresarClick} />
                        )}
                    </FormContainer>
                </Content>
            </BlurOverlay>
        </Container>
    );
};

export default InicioAdmin;