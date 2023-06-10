import ReactDOM from "react-dom/client";
import styled from "styled-components";
import Routers from "./router/router";


const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

function App() { 
  return (
    <Wrapper>
       <Routers/> 
    </Wrapper>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
