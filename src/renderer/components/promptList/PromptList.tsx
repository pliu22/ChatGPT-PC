import { PropsWithRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    
`

export function PrompList(
  props: PropsWithRef<{
    list: any;
    showFloatBox: boolean;
    onAssemblePrompt: (value: string) => void;
  }>
) {
  return (
    <Wrapper>
      {props.showFloatBox && (
        <div className="float-box">
          {props.list.map((item: any) => {
            return (
              <div
                onClick={() => {
                    props.onAssemblePrompt(item.value as string);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
}
