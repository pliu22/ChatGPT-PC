import { Input } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import { PropsWithRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../sideButton/context";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/themeSlice";
import { customPromptValue } from "../../../main/script/model";

const Wrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  .search-input:hover {
    border-color: #66666695 !important;
  }
  .prompt-box {
    box-sizing: content-box;
    height: 100px;
    width: 100%;
    border-bottom: 8px solid #eeeeee60;
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
  &[class~="dark"] {
    background-color: #343541;
    .prompt-box {
      background-color: #40414f;
      border-bottom: 8px solid #40414f;
    }
    .search-input {
      background-color: #40414f;
      border: #66666650 1px solid;
      color: #f7f7f8;
      input {
        background-color: #40414f;
        color: #f7f7f8;
      }
    }
    .search-input:hover {
      border: #9d9d9d50 1px solid;
    }
    color: #f7f7f8;
  }
`;

export function PrompList(
  props: PropsWithRef<{
    list: any;
    showFloatBox: boolean;
    onAssemblePrompt: (value: customPromptValue) => void;
  }>
) {
  const [promptList, setPromptList] = useState([]);
  useEffect(() => {
    setPromptList(props.list);
  }, [props.list]);
  function onSearch(val: string) {
    setPromptList(
      props.list?.filter((prop: { name: string; value: string }) => {
        return prop.name?.includes(val) || prop.value?.includes(val);
      })
    );
  }

  // closeDrawer context
  const { closeDrawer } = useContext(Context);
  return (
    <Wrapper className={useSelector(selectTheme) === "dark" ? "dark" : ""}>
      {props.showFloatBox && (
        <div className="float-box">
          <Input
            className="search-input"
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            suffix={<FilterTwoTone />}
          />
          {promptList?.map((item: any) => {
            return (
              <div
                onClick={() => {
                  props.onAssemblePrompt({
                    prompt: item.value as string,
                    isNeedSend: item.isNeedSend as boolean,
                  });
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
