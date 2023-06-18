import { Button } from "antd";
import Setting from "../view/setting/Setting";
import "./style.css";
import ChatGPTFloat from "../view/chatGptFloat/ChatGptFloat";
import { ChatGPTWeb } from "../view/chatGptWeb/ChatGptWeb";
import { createRef, useState } from "react";
import { HomeTwoTone, SettingTwoTone } from "@ant-design/icons";

export default function Routers() {
  const [currentView, setCurrentView] = useState<
    "chatGptView" | "settingView" | "chatGptFloat"
  >("chatGptView");

  const ChatGPTWebRef = createRef<any>();

  function goSetting() {
    setCurrentView("settingView");
  }
  function goChatGptView() {
    setCurrentView("chatGptView");
    ChatGPTWebRef.current.updateUserSetting();
  }
  (window as any).electronAPI.onRouterInit((_: any, value: string) => {
    if (value === "chatGptFloat") {
      setCurrentView("chatGptFloat");
    }
  });

  return (
    <>
      {currentView === "chatGptFloat" ? (
        <ChatGPTFloat />
      ) : (
        <>
          <div
            className="full-screen"
            style={{
              display: currentView === "chatGptView" ? "block" : "none",
            }}
          >
            <ChatGPTWeb ref={ChatGPTWebRef} />
            <Button
              shape="circle"
              className="set-btn"
              onClick={goSetting}
              size="large"
              icon={<SettingTwoTone />}
            />
          </div>
          <div
            className="full-screen"
            style={{
              display: currentView === "settingView" ? "block" : "none",
            }}
          >
            <Setting />
            <Button
              size="large"
              shape="circle"
              className="set-btn"
              onClick={goChatGptView}
              icon={<HomeTwoTone />}
            />
          </div>
        </>
      )}
    </>
  );
}
