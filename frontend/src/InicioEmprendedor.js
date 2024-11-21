import React from 'react';
import styled from 'styled-components';
import bgImage from './images/infogeneral.png'; 

const BlurOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(33, 59, 107, 0.4); /* azul */
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 20px;
    position: relative;
    z-index: 1;
    width: 90%; /* 90% del BlurOverlay */
    margin: 0 auto;
    height: 90%;
`;

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
`;

const Logo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 5px;
`;

const Description = styled.p`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Hint Vadodara', sans-serif;
    color: white;
`;

const FormContainer = styled.div`
    width: 90%; /* Ajuste para que ocupe el 90% del ancho de la pantalla */
    height: 70vh;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto; /* Hacer que el contenido sea desplazable */
    max-width: 90%;
`;

const TableWrapper = styled.div`
    overflow-x: auto;
    margin-top: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    background-color: #213B6B;
    color: white;
    padding: 10px;
    border: 1px solid #ccc;
`;

const TableData = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    color: black;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
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
    background: #213B6B;
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
        background: #67157D;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const InicioEmprendedor = ({ navigate }) => {
    const handleInicioClick = () => {
        navigate('home');
    };

    const handleFormEmpClick = () => {
        navigate('registro_emp');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Datos simulados del servidor
    const emprendimientos = {
        "ok": true,
        "data": [
            {
                "_id": "668c61018d8f55efe288c3e6",
                "nombreEmprendimiento": "Creación ABCD",
                "idSector": "6670ce4c7acec2e5e71a96d6",
                "idEmprendedor": "667122b65ba165739d204893",
                "fecha": "2020/01/31",
                "respuestas": [
                    {
                        "idPregunta": "6679e2892c652ff30f7ce53f",
                        "respuestaPregunta": true,
                        "_id": "668c61018d8f55efe288c3e7"
                    },
                    {
                        "idPregunta": "6679e2a02c652ff30f7ce541",
                        "respuestaPregunta": true,
                        "_id": "668c61018d8f55efe288c3e8"
                    },
                    {
                        "idPregunta": "6679e2af2c652ff30f7ce543",
                        "respuestaPregunta": true,
                        "_id": "668c61018d8f55efe288c3e9"
                    },
                    {
                        "idPregunta": "6679e2d12c652ff30f7ce545",
                        "respuestaPregunta": true,
                        "_id": "668c61018d8f55efe288c3ea"
                    }
                ]
            },
            {
                "_id": "668c61b78d8f55efe288c3ec",
                "nombreEmprendimiento": "Creación QWER",
                "idSector": "6670ce887acec2e5e71a96d8",
                "idEmprendedor": "667122b65ba165739d204893",
                "fecha": "2020/10/31",
                "respuestas": [
                    {
                        "idPregunta": "6679e2892c652ff30f7ce53f",
                        "respuestaPregunta": true,
                        "_id": "668c61b78d8f55efe288c3ed"
                    },
                    {
                        "idPregunta": "6679e2a02c652ff30f7ce541",
                        "respuestaPregunta": true,
                        "_id": "668c61b78d8f55efe288c3ee"
                    },
                    {
                        "idPregunta": "6679e2af2c652ff30f7ce543",
                        "respuestaPregunta": true,
                        "_id": "668c61b78d8f55efe288c3ef"
                    },
                    {
                        "idPregunta": "6679e2d12c652ff30f7ce545",
                        "respuestaPregunta": false,
                        "_id": "668c61b78d8f55efe288c3f0"
                    }
                ]
            },
            {
                "_id": "668c61eb8d8f55efe288c3f2",
                "nombreEmprendimiento": "Creación ZCVB",
                "idSector": "6670ce9f7acec2e5e71a96da",
                "idEmprendedor": "667123845ba165739d204896",
                "fecha": "2021/03/31",
                "respuestas": [
                    {
                        "idPregunta": "6679e2892c652ff30f7ce53f",
                        "respuestaPregunta": true,
                        "_id": "668c61eb8d8f55efe288c3f3"
                    },
                    {
                        "idPregunta": "6679e2a02c652ff30f7ce541",
                        "respuestaPregunta": true,
                        "_id": "668c61eb8d8f55efe288c3f4"
                    },
                    {
                        "idPregunta": "6679e2af2c652ff30f7ce543",
                        "respuestaPregunta": false,
                        "_id": "668c61eb8d8f55efe288c3f5"
                    },
                    {
                        "idPregunta": "6679e2d12c652ff30f7ce545",
                        "respuestaPregunta": false,
                        "_id": "668c61eb8d8f55efe288c3f6"
                    }
                ]
            }
        ],
        "message": "Todo ok",
        "error": null
    };

    return (
        <div>
            <Container>
                <BlurOverlay>
                    <Content>
                        <Logo src="logo_blanco.png" alt="Logo" />
                        <Description>Formulario de registro de emprendimientos</Description>

                        <FormContainer>
                            <TableWrapper>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>Nombre del Emprendimiento</TableHeader>
                                            <TableHeader>ID Sector</TableHeader>
                                            <TableHeader>ID Emprendedor</TableHeader>
                                            <TableHeader>Fecha</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emprendimientos.data.map((emprendimiento) => (
                                            <TableRow key={emprendimiento._id}>
                                                <TableData>{emprendimiento.nombreEmprendimiento}</TableData>
                                                <TableData>{emprendimiento.idSector}</TableData>
                                                <TableData>{emprendimiento.idEmprendedor}</TableData>
                                                <TableData>{emprendimiento.fecha}</TableData>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </Table>
                            </TableWrapper>
                        </FormContainer>
                        <ButtonContainer>
                                <Button onClick={handleFormEmpClick}>Registrar</Button>
                                <Button onClick={handleInicioClick}>Cancelar</Button>
                            </ButtonContainer>
                    </Content>
                </BlurOverlay>
            </Container>
        </div>
    );
};

export default InicioEmprendedor;
