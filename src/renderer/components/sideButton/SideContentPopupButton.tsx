import { LeftCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

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
  }
`;

// 可隐藏的侧边栏
export function SideContentPopupButton(props: PropsWithChildren) {
  return (
    <Wrapper>
      <Button shape="round" icon={<LeftCircleTwoTone />} />
      <div className="content">{props.children}</div>
    </Wrapper>
  );
}
