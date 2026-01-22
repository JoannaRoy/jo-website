import {
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnEdgesChange,
  type OnNodesChange,
  type XYPosition,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeLabel: (nodeId: string, label: string) => void;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
};

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: { label: "React Flow Mind Map" },
      position: { x: 0, y: 0 },
      dragHandle: ".dragHandle",
    },
  ],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: "mindmap",
      data: { label: "New Node" },
      position,
      parentNode: parentNode.id,
      dragHandle: ".dragHandle",
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
      type: "mindmap",
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
}));

export default useStore;
