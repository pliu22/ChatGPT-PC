import { useEffect, useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/themeSlice";

const Wrapper = styled.div`
  padding: 24px;
  overflow-y: scroll;
  height: 100%;
  .setting-title {
    span {
      color: #343541;
      font-size: 30px;
      font-weight: bold;
    }
    // 分割线
    span:after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: #66666650;
      margin: 10px 0 16px 0;
      border-radius: 1px;
    }
  }
  .prompts {
    display: flex;
    flex-direction: column;
    .prompt-box {
      background-color: #f7f7f8;
      // 向下的卡片阴影
      box-shadow: 0 2px 8px #66666650;
      border: #66666650 1px solid;
      border-radius: 8px;
      padding: 8px 12px;
      position: relative;
      margin-bottom: 12px;
      div:first-child {
        font-size: 16px;
        font-weight: bold;
        color: #343541;
      }
      button {
        position: absolute;
        top: 4px;
        right: 6px;
      }
    }
  }
  .last-box {
    margin-bottom: 30px;
  }
  .save-btn {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 50%;
    left: 25%;
  }
  &[class~="dark"] {
    background-color: #343541;
    .setting-title {
      span {
        color: #f7f7f8;
      }
    }
    &::-webkit-scrollbar-track {
      background: #343541 !important;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #8e9aa748;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #a7a7a8;
    }
    .prompt-box,
    .prompts > button:last-child,
    .save-btn {
      background-color: #343541;
      border: #66666650 1px solid;
      color: #f7f7f8 ;
    }
    .prompts button:last-child,
    .save-btn {
      background-color: #40414f;
      border: 0;
      box-shadow: 0 2px 0 #40414f19;
    }
    .prompts button:last-child:hover,
    .save-btn:hover {
      background-color: #515263;
    }
  }
`;

const Title = styled.div`
  text-align: left;
  color: #343541;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export default function Setting() {
  // antd message
  const [messageApi, contextHolder] = message.useMessage();

  const [userSetting, setuserSetting] = useState<any>();
  useEffect(() => {
    setuserSetting(
      JSON.parse(window.localStorage.getItem("userSetting") || "{}")
    );
  }, []);

  // add new gpt prompt model
  const [isNewModelModalOpen, setIsNewModelModalOpen] = useState(false);
  const [newModelObject, setNewModelObject] = useState<{
    name: string;
    value: string;
  }>({
    name: "",
    value: "",
  });
  function changeNewModelName(event: any) {
    setNewModelObject({
      ...newModelObject,
      name: event.target.value,
    });
  }
  function changeNewModelValue(event: any) {
    setNewModelObject({
      ...newModelObject,
      value: event.target.value,
    });
  }
  const handleNewModelOk = () => {
    userSetting.chatGPT.prompts.push(newModelObject);
    setuserSetting(userSetting);
    setIsNewModelModalOpen(false);
    setNewModelObject({
      name: "",
      value: "",
    });
  };
  const handleNewModelCancel = () => {
    setIsNewModelModalOpen(false);
  };

  // remove gpt prompt model
  function removeModel(index: number) {
    userSetting.chatGPT.prompts.splice(index, 1);
    setuserSetting({
      ...userSetting,
    });
  }

  // save user setting
  function saveUserSetting() {
    window.localStorage.setItem("userSetting", JSON.stringify(userSetting));
    // ipc from render to main process
    // @ts-ignore
    window.electronAPI.saveUserSetting(userSetting);
    messageApi.success("保存成功");
  }

  const theme = useSelector(selectTheme);
  return (
    <Wrapper className={theme === "dark" ? "dark" : ""}>
      <div className="setting-title">
        <span>ChatGPT</span>
      </div>
      <div className="prompts">
        {userSetting?.chatGPT?.prompts?.map((item: any, index: number) => {
          return (
            <div className="prompt-box">
              <div>{item.name}</div>
              <div>{item.value}</div>
              <Button
                danger
                size="small"
                type="text"
                onClick={() => {
                  removeModel(index);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          );
        })}
        <Button
          style={{
            margin: "10px 0",
          }}
          block
          onClick={() => {
            setIsNewModelModalOpen(true);
          }}
        >
          添加新模型
        </Button>
      </div>
      <div className="last-box"></div>
      <Button
        className="save-btn"
        type="primary"
        size="large"
        onClick={saveUserSetting}
        block
      >
        保存
      </Button>
      <Modal
        title="新模型"
        open={isNewModelModalOpen}
        onOk={handleNewModelOk}
        onCancel={handleNewModelCancel}
        style={{
          textAlign: "center",
        }}
      >
        <div>
          <Title>模型名称:</Title>
          <Input onChange={changeNewModelName} />
        </div>
        <div>
          <Title>模型prompt值:</Title>
          <TextArea onChange={changeNewModelValue} />
        </div>
      </Modal>
      {contextHolder}
    </Wrapper>
  );
}
