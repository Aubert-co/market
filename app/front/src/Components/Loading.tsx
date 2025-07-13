import styled, { keyframes } from 'styled-components';

// Animação personalizada (movimento lateral)
const slide = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
`;

const LoadingDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
 
  z-index: 9999;

  .loading-text {
    color: orange;
    font-size: 1.5rem;
    font-weight: bold;
    animation: ${slide} 1.5s ease-in-out infinite;
  }
`;

export const Loading = () => {
  return (
    <LoadingDiv>
      <span className="loading-text">Carregando...</span>
    </LoadingDiv>
  );
};
