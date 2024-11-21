import React from 'react';
import styled from 'styled-components';
import bgImage from './images/inicio.png'; 
import logosImage from './images/logos.png';
import logoMaps from './images/logomapa.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

const MenuBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoMaps = styled.img`
    max-width: 40vw;
    max-height: 40vh;    
    margin-top: -2rem;
    margin-left: 0rem;
    position: absolute;
    top: 72px; 
    left: 2rem;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    background: #2c5c85;
    color: white;
    font-family: 'Hint Vadodara', sans-serif;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #8cb8d3;
    }
`;

const RegisterLink = styled.a`
    color: #2c5c85;
    text-decoration: none;
    font-family: 'Hint Vadodara', sans-serif;
    font-size: 16px;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
        text-decoration: underline;
    }
`;

const LogoImage = styled.img`
    position: absolute;
    bottom: 2vh;
    left: 2vw;
    max-width: 30vw;
    max-height: 30vh;
`;

const HomePage = ({ navigate }) => {
    const handleLoginClick = () => {
        navigate('login');
    };

    const handleHabeasdataClick = () => {
        navigate('habeasdata');
    };

    return (
        <Container>
            <MenuBar>
                <RegisterLink onClick={handleHabeasdataClick}>Registrar emprendedor</RegisterLink>
                <Button onClick={handleLoginClick}>Login</Button>
            </MenuBar>
            <Content>
                <LogoMaps src={logoMaps} alt="Logo Maps" />
                <LogoImage src={logosImage} alt="Logos" />
            </Content>
        </Container>
    );
};

export default HomePage;
