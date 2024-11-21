import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from './images/habeasdata.png';
import pdfFile from './docs/hd.pdf';
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
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const PDFViewer = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const Description = styled.p`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Hint Vadodara', sans-serif;
    color: black;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const Label = styled.label`
    font-family: 'Hint Vadodara', sans-serif;
    color: white;
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
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
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

const LogoImage = styled.img`
    max-width: 100%;
    max-height: 30%;
    margin-bottom: 5vh; 
`;

const LogoMapaImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
`;

const HabeasData = ({ navigate }) => {
    const [accepted, setAccepted] = useState(false);

    const handleCheckboxChange = (e) => {
        setAccepted(e.target.checked);
    };

    const handleNext = () => {
        if (accepted) {
            navigate('registro_emprendedor');
        }
    };

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
                    <Description>Política de protección y tratamiento de datos personales</Description>
                    <FormContainer>
                        <PDFViewer src={pdfFile} title="Habeas Data PDF" />
                    </FormContainer>
                    <CheckboxContainer>
                        <Checkbox 
                            type="checkbox" 
                            id="acceptTerms" 
                            checked={accepted} 
                            onChange={handleCheckboxChange}
                        />
                        <Label htmlFor="acceptTerms">Acepto los términos y condiciones</Label>
                    </CheckboxContainer>
                    <Button onClick={handleNext} disabled={!accepted}>
                        Siguiente
                    </Button>
                </Content>
            </ContentWrapper>
        </Container>
    );
};

export default HabeasData;