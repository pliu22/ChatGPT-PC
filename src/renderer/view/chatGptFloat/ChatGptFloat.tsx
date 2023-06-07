import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Loader } from "../../components/loader";

const Container = styled.div`
  width: 100%;
  height: 98%;
  background-color: #fff;
  webview {
    width: 100%;
    height: 100%;
    display: inline-flex;
    position: fixed;
    background-color: #fff;
    opacity: 0;
  }
  .float-box {
    position: fixed;
    top: 30px;
    right: 50px;
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 0 10px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    cursor: pointer;
  }
`;

const DragBar = styled.div`
  position: fixed;
  top: 0;
  margin:0 35px;
  width: calc(100% - 70px);
  height: 44px;
  background-color: #cccccc00;
  -webkit-app-region: drag;
`;

export default function ChatGPTFloat() {
  // webviewDom
  let webviewRef = useRef<any>(null);

  const [showFloatBox, setShowFloatBox] = useState(false);

  const [promptList, setPromptList] = useState<any>();

  useEffect(() => {
    // update userSetting
    const userSetting = JSON.parse(
      window.localStorage.getItem("userSetting") || "{}"
    );
    setPromptList(userSetting?.chatGPT?.prompts);
  }, []);

  useEffect(() => {
    webviewRef.current.addEventListener("did-fail-load", (error: Error) => {
      console.log(error);
    });
    webviewRef.current.addEventListener("did-finish-load", (event: any) => {
      webviewRef.current.style.opacity = "1";
      webviewRef.current.openDevTools();
      // css
      webviewRef.current.insertCSS(`
          main > div:nth-child(3) > div[class~="px-3"] {
            visibility: hidden;
            height: 0px;
            padding: 5px;
          }
      `)
      webviewRef.current.addEventListener("ipc-message", (event: any) => {
        console.log("ipc-message", event);
      });
      setShowFloatBox(true);
    });
  });

  function assemblePrompt() {
    webviewRef.current.send("assemblePrompt", promptList[0].value);
    console.log("assemblePrompt 1");
  }

  return (
    <Container>
      <Loader />
      <webview
        nodeintegration
        ref={webviewRef}
        src="https://chat.openai.com/"
      ></webview>
      <DragBar />
      {/* {showFloatBox && (
        <div className="float-box" onClick={assemblePrompt}>
          翻译官
        </div>
      )} */}
    </Container>
  );
}
