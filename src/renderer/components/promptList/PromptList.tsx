import { Input } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import { PropsWithRef, useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../sideButton/context";

const Wrapper = styled.div`
  .prompt-box {
    height: 116px;
    width: 100%;
    overflow: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
    background-color: #eeeeee60;
    color: 202123;
    margin-top: 14px;
    border-radius: 5px;
    cursor: pointer;
    padding: 8px;
    & > div:first-child {
      font-size: 16px;
      white-space: nowrap;
      margin-bottom: 4px;
    }
    & > div:nth-child(2) {
      font-size: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 4;

      -webkit-box-orient: vertical;
    }
    transition: all 0.5s;
    animation: box-show 1s;
  }
  .prompt-box:hover {
    transform: scale(1.02);
  }
  @keyframes box-show {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
    }
  }
`;

export function PrompList(
  props: PropsWithRef<{
    list: any;
    showFloatBox: boolean;
    onAssemblePrompt: (value: string) => void;
  }>
) {
  const [promptList, setPromptList] = useState([]);
  useEffect(() => {
    setPromptList(props.list);
  }, []);
  function onSearch(val: string) {
    setPromptList(
      props.list?.filter((prop: { name: string; value: string }) => {
        return prop.name?.includes(val) && prop.value?.includes(val);
      })
    );
  }

  // closeDrawer context
  const { closeDrawer } = useContext(Context);
  return (
    <Wrapper>
      {props.showFloatBox && (
        <div className="float-box">
          <Input
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            suffix={<FilterTwoTone />}
          />
          {promptList?.map((item: any) => {
            return (
              <div
                onClick={() => {
                  props.onAssemblePrompt(item.value as string);
                  closeDrawer();
                }}
                className="prompt-box"
              >
                <div>{item.name}</div>
                <div>{item.value}</div>
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
}
