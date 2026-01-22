import {
  Controls,
  type Node,
  type NodeOrigin,
  type OnConnectEnd,
  type OnConnectStart,
  Panel,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import { shallow } from "zustand/shallow";

import "@xyflow/react/dist/style.css";
import { useCallback, useRef } from "react";
import { PageGrid } from "@/components/item-grids";
import MindMapEdge from "@/pages/mind_map/MindMapEdge";
import MindMapNode from "@/pages/mind_map/MindMapNode";
import useStore, { type RFState } from "@/pages/mind_map/mind-map-store";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const defaultEdgeOptions = {
  type: "mindmap",
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

// this places the node origin in the center of a node
const nodeOrigin: NodeOrigin = [0.5, 0.5];

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );

  const { screenToFlowPosition } = useReactFlow();

  const getChildNodePosition = useCallback(
    (event: MouseEvent, parentNode?: Node) => {
      if (!parentNode) {
        return;
      }

      const panePosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
      return {
        x:
          panePosition.x -
          parentNode.position.x +
          (parentNode.width || 150) / 2,
        y:
          panePosition.y -
          parentNode.position.y +
          (parentNode.height || 40) / 2,
      };
    },
    [screenToFlowPosition]
  );

  const connectingNodeId = useRef<string | null>(null);

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const targetIsPane = (event.target as Element).classList.contains(
        "react-flow__pane"
      );
      const node = (event.target as Element).closest(".react-flow__node");

      if (node) {
        node.querySelector("input")?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodes.find((n) => n.id === connectingNodeId.current);
        const childNodePosition = getChildNodePosition(
          event as MouseEvent,
          parentNode
        );

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [addChildNode, getChildNodePosition, nodes]
  );

  return (
    <PageGrid columns={0}>
      <div className="fixed inset-0 h-screen w-screen m-0 z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeOrigin={nodeOrigin}
          defaultEdgeOptions={defaultEdgeOptions}
          nodesDraggable
          nodesConnectable
          elementsSelectable
          fitView
        >
          <Controls showInteractive={false} />
          <Panel position="top-left">React Flow Mind Map</Panel>
        </ReactFlow>
      </div>
    </PageGrid>
  );
}

export default Flow;
