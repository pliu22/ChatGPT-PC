import { Button } from "antd";
import Setting from "../view/setting/Setting";
import "./style.css";
import ChatGPTFloat from "../view/chatGptFloat/ChatGptFloat";
import { ChatGPTWeb } from "../view/chatGptWeb/ChatGptWeb";
import { createRef, useState } from "react";
import { BackwardFilled, HomeOutlined, HomeTwoTone, SettingFilled, SettingTwoTone } from "@ant-design/icons";

export default function Routers() {
  const [currentView, setCurrentView] = useState<"chatGptView" | "settingView">(
    "chatGptView"
  );

  const ChatGPTWebRef = createRef<any>();

  if (window.location.pathname === "/gptFloat") {
    return <ChatGPTFloat />;
  }
  function goSetting() {
    setCurrentView("settingView");
  }
  function goChatGptView() {
    setCurrentView("chatGptView");
    ChatGPTWebRef.current.updateUserSetting();
  }
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
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
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
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
  );
}
