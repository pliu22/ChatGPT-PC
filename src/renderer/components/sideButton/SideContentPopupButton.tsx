import { LeftCircleTwoTone } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { Context } from "./context";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/themeSlice";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 30vh;
  .content {
    position: fixed;
    z-index: 777;
    visibility: hidden;
  }
  & > button {
    padding: 4px 20px 4px 4px !important;
    transform: translateX(17px);
    .anticon.anticon-left-circle {
      font-size: 23px !important;
    }
    transition: all 0.3s;
  }
  & > button:hover {
    transform: translateX(13px);
    border-color: #66666695 !important;
  }
  &[class~="dark"] {
    & > button {
      background-color: #202123;
      border: #66666650 1px solid;
      color: #f7f7f8;
    }
    & > button:hover {
      border: #9d9d9d50 1px solid;
    }
  }
`;

// 可隐藏的侧边栏
export function SideContentPopupButton(
  props: PropsWithChildren<{
    onInit?: (compObj: { hideDrawer: () => void }) => void;
  }>
) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    props.onInit?.({
      hideDrawer: onClose,
    });
  };
  const onClose = () => {
    setOpen(false);
    console.log("onClose");
  };

  const theme = useSelector(selectTheme);

  return (
    <Wrapper className={theme === "dark" ? "dark" : ""}>
      <Button
        shape="round"
        icon={
          <LeftCircleTwoTone
            twoToneColor={theme === "dark" ? "#40414f" : "#a4a5a1"}
          />
        }
        onClick={showDrawer}
      />
      <Drawer
        headerStyle={{
          display: "none",
        }}
        bodyStyle={{
          padding: 0,
        }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Context.Provider value={{ closeDrawer: onClose }}>
          <div className="content">{props.children}</div>
        </Context.Provider>
      </Drawer>
    </Wrapper>
  );
}
