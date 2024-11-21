import React from 'react';
import styled from 'styled-components';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import FormEmp from './FormEmp';
import FormEmprendedor from './FormEmprendedor';
import FormCrearEvaluador from './FormCrearEvaluador';
import AsignacionEmprendimientos from './AsignacionEmprendimiento';
import InicioEmprendedor from './InicioEmprendedor';
import InicioAdmin from './InicioAdmin';
import HabeasData from './Habeasdata';
import FormCrearIES from './FormCrearIES';
export const BASE_URL = 'http://localhost:4000';


const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  background-color: #f0f0f0; /* Cambia el color de fondo según tu preferencia */
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      {currentPage === 'home' && <HomePage navigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage navigate={handleNavigate} />}
      {currentPage === 'registro_emp' && <FormEmp navigate={handleNavigate} />}
      {currentPage === 'registro_emprendedor' && <FormEmprendedor navigate={handleNavigate} />}
      {currentPage === 'crear_evaluador' && <FormCrearEvaluador navigate={handleNavigate} />}
      {currentPage === 'asignar_emprendimiento' && <AsignacionEmprendimientos navigate={handleNavigate} />}
      {currentPage === 'inicio_emprendedor' && <InicioEmprendedor navigate={handleNavigate} />}
      {currentPage === 'inicio_admin' && <InicioAdmin navigate={handleNavigate} />}
      {currentPage === 'habeasdata' && <HabeasData navigate={handleNavigate} />}
      {currentPage === 'crearies' && <FormCrearIES navigate={handleNavigate} />}
    </Container>
  );
};

export default App;

