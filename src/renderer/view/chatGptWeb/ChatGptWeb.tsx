import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { SideContentPopupButton } from "../../components/sideButton/SideContentPopupButton";
import { PrompList } from "../../components/promptList/PromptList";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  webview {
    width: 100%;
    height: 100%;
    display: inline-flex;
    position: fixed;
    background-color: #fff;
    opacity: 0;
  }
`;

export const ChatGPTWeb = forwardRef((_, ref) => {
  // webviewDom
  let webviewRef = useRef<any>(null);

  const [showFloatBox, setShowFloatBox] = useState(false);

  const [promptList, setPromptList] = useState<any>();

  // load userSetting
  useEffect(() => {
    updateUserSetting();
  }, []);

  // update userSetting
  const updateUserSetting = () => {
    console.log("updateUserSetting");
    const userSetting = JSON.parse(
      window.localStorage.getItem("userSetting") || "{}"
    );
    setPromptList(userSetting?.chatGPT?.prompts);
  };

  useImperativeHandle(ref, () => ({ updateUserSetting }));

  useEffect(() => {
    webviewRef.current.addEventListener("did-fail-load", (error: Error) => {
      console.log(error);
    });
    webviewRef.current.addEventListener("did-finish-load", (event: any) => {
      console.log("loaded", event);
      // change webview opacity
      webviewRef.current.style.opacity = "1";
      // webviewRef.current.openDevTools();
      webviewRef.current.addEventListener("ipc-message", (event: any) => {
        console.log("ipc-message", event);
        // Prints "xxxx"
      });
      if (webviewRef.current.getURL() === "https://chat.openai.com/") {
        setShowFloatBox(true);
      } else {
        const timer = setInterval(() => {
          if (webviewRef.current.getURL() === "https://chat.openai.com/") {
            setShowFloatBox(true);
            clearInterval(timer);
          }
        }, 1000);
      }
    });
  });

  function assemblePrompt(value?: string) {
    webviewRef.current.send("assemblePrompt", value);
    console.log("assemblePrompt 1");
  }

  return (
    <Wrapper>
      <Loader theme="dark" />
      <webview
        nodeintegration
        ref={webviewRef}
        src="https://chat.openai.com/"
      ></webview>
      <SideContentPopupButton>
        <PrompList
          list={promptList}
          showFloatBox={showFloatBox}
          onAssemblePrompt={assemblePrompt}
        />
      </SideContentPopupButton>
    </Wrapper>
  );
});
