import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { Workspace } from "../stores/Workspace";
import { observer } from "mobx-react";

const ConsoleContainer = styled.div`
  height: 100vh;
  width: 600px;
  overflow: auto;
`;

const Pre = styled.pre`
  height: 100%;
  margin: 0;
  background-color: #252525;
  color: white;
  overflow: auto;
  font-family: inherit;
  color: #e8d1a4;
`;

class ConsolePanel extends React.Component<{ output: string }, {}> {
  preRef: any;
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.preRef);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const { output } = this.props;
    return (
      <ConsoleContainer>
        {
          <Pre
            ref={e => (this.preRef = e)}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        }
      </ConsoleContainer>
    );
  }
}

interface OutputProps {
  workspace: Workspace;
  children: any;
}

const SlidingPanel = styled.div`
  height: 100vh;
  width: 600px;
  background-color: black;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99999;
`;

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  cursor: pointer;
`;

function Output({ workspace, children }: OutputProps) {
  return (
    <div>
      {workspace.showOutputPanel && (
        <div>
          <Overlay
            onClick={() => {
              workspace.showOutputPanel = false;
            }}
          />
          <SlidingPanel>
            <ConsolePanel
              output={workspace.runner && workspace.runner.output}
            />
          </SlidingPanel>
        </div>
      )}
      {children}
    </div>
  );
}

export default observer(Output);
