import { Button, message } from "antd";
import Setting from "../view/setting/Setting";
import "./style.css";
import ChatGPTFloat from "../view/chatGptFloat/ChatGptFloat";
import { ChatGPTWeb } from "../view/chatGptWeb/ChatGptWeb";
import { createRef, useState } from "react";
import { HomeTwoTone, SettingTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectTheme } from "../store/themeSlice";

export default function Routers() {
  const [currentView, setCurrentView] = useState<
    "chatGptView" | "settingView" | "chatGptFloat"
  >("chatGptView");

  const [messageApi, contextHolder] = message.useMessage();
  const ChatGPTWebRef = createRef<any>();

  const theme = useSelector(selectTheme);

  function goSetting() {
    setCurrentView("settingView");
  }

  let isChangedSetting = false;
  function goChatGptView() {
    if (isChangedSetting) {
      messageApi.open({
        type: "error",
        content: "有未保存的设置",
      });
      return;
    }
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
      {contextHolder}
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
              className={"set-btn" + (theme === "dark" ? " set-btn-dark" : "")}
              onClick={goSetting}
              size="large"
              icon={
                <SettingTwoTone
                  twoToneColor={theme === "dark" ? "#40414f" : "#a4a5a1"}
                />
              }
            />
          </div>
          <div
            className="full-screen"
            style={{
              display: currentView === "settingView" ? "block" : "none",
            }}
          >
            <Setting
              onChangeSetting={() => {
                isChangedSetting = true;
              }}
              onSaveSetting={() => {
                isChangedSetting = false;
              }}
            />
            <Button
              size="large"
              shape="circle"
              className={"set-btn" + (theme === "dark" ? " set-btn-dark" : "")}
              onClick={goChatGptView}
              icon={
                <HomeTwoTone
                  twoToneColor={theme === "dark" ? "#40414f" : "#a4a5a1"}
                />
              }
            />
          </div>
        </>
      )}
    </>
  );
}
