import ReactDOM from "react-dom/client";
import styled from "styled-components";
import Routers from "./router/router";
import { Provider } from "react-redux";
import store from "./store/store";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

function App() {
  return (
    // <Provider store={store}>
      <Wrapper>
        <Routers />
      </Wrapper>
    // </Provider>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
