// app/page.tsx
"use client";

import {
  useState,
  useCallback,
  useContext,
  createContext,
  useEffect,
} from "react";

import {
  ReactFlow,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  addEdge,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  MarkerType,
  Handle,
  Position,
  NodeProps,
  EdgeProps,
  BaseEdge,
  getStraightPath,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type FlowContextType = {
  onNodeLabelChange: (id: string, label: string) => void;
};

const FlowContext = createContext<FlowContextType | null>(null);

const commonNodeStyles = "flex items-center justify-center text-center";

// Default Rectangle Node
const DefaultNode = ({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const flowContext = useContext(FlowContext);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    flowContext?.onNodeLabelChange(id, label);
  }, [flowContext, id, label]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleBlur();
    },
    [handleBlur],
  );

  return (
    <div
      className={`${commonNodeStyles} bg-white border-2 border-blue-400 p-3 rounded`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full text-center border-none focus:ring-0"
        />
      ) : (
        <div>{label}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Circle Node
const CircleNode = ({ data, id }: NodeProps) => {
  // Similar editing logic as DefaultNode
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const flowContext = useContext(FlowContext);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    flowContext?.onNodeLabelChange(id, label);
  }, [flowContext, id, label]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleBlur();
    },
    [handleBlur],
  );

  return (
    <div
      className={`${commonNodeStyles} w-20 h-20 bg-green-100 rounded-full border-2 border-green-400`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full text-center bg-transparent border-none focus:ring-0"
        />
      ) : (
        <div className="p-2">{label}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Diamond Node (for decisions)
const DiamondNode = ({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const flowContext = useContext(FlowContext);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    flowContext?.onNodeLabelChange(id, label);
  }, [flowContext, id, label]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleBlur();
    },
    [handleBlur],
  );

  return (
    <div className="relative" style={{ width: "80px", height: "80px" }}>
      {/* Diamond shape container */}
      <div
        className={`${commonNodeStyles} absolute inset-0 bg-purple-100 border-2 border-purple-400`}
        style={{
          transform: "rotate(45deg)",
          width: "100%",
          height: "100%",
        }}
        onDoubleClick={() => setIsEditing(true)}
      />

      {/* Content container (not rotated) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isEditing ? (
          <input
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-4/5 text-center bg-transparent border-none focus:ring-0"
          />
        ) : (
          <div className="p-2 text-center">{label}</div>
        )}
      </div>

      {/* Handles - positioned exactly at diamond points */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ top: "-14px", left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ top: "50%", right: "-14px" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ bottom: "-14px", left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ top: "50%", left: "-14px" }}
      />
    </div>
  );
};

// Rounded Rectangle Node
const RoundedNode = ({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const flowContext = useContext(FlowContext);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    flowContext?.onNodeLabelChange(id, label);
  }, [flowContext, id, label]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleBlur();
    },
    [handleBlur],
  );

  return (
    <div
      className={`${commonNodeStyles} bg-orange-100 border-2 border-orange-400 p-4 rounded-lg`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full text-center border-none focus:ring-0"
        />
      ) : (
        <div>{label}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Add this new type definition after the FlowContextType
type DrawingEdge = {
  points: { x: number; y: number }[];
};

// Add this new custom edge component before the nodeTypes definition
const DrawingEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps<DrawingEdge>) => {
  if (!data?.points) {
    const [path] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
    return <BaseEdge path={path} />;
  }

  const pathPoints = data.points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  return (
    <path
      d={pathPoints}
      fill="none"
      stroke="#333"
      strokeWidth={2}
      className="react-flow__edge-path"
    />
  );
};

// Update the nodeTypes definition to include the new edge type
const edgeTypes = {
  drawing: DrawingEdge,
};

const nodeTypes = {
  default: DefaultNode,
  circle: CircleNode,
  diamond: DiamondNode,
  rounded: RoundedNode,
};

const initialNodes: Node[] = [
  // {
  //   id: '1',
  //   position: { x: 0, y: 0 },
  //   data: { label: 'Start' },
  //   type: 'default',
  // },
  // {
  //   id: '2',
  //   position: { x: 200, y: 200 },
  //   data: { label: 'Decision' },
  //   type: 'diamond',
  // },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export default function DiagramEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodeLabelChange = useCallback(
    (id: string, label: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label } } : node,
        ),
      );
    },
    [setNodes],
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "step",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: Date.now().toString(),
        position,
        data: { label: `${type} Node` },
        type: type,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  // Add these new states
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawingEdge, setCurrentDrawingEdge] = useState<Edge | null>(
    null,
  );
  const [isPenToolActive, setIsPenToolActive] = useState(false);

  // Add these new handlers
  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!isPenToolActive || !reactFlowInstance) return;

      // Prevent panning while drawing
      event.preventDefault();
      event.stopPropagation();

      const bounds = (event.target as HTMLElement).getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newEdge: Edge = {
        id: `drawing-${Date.now()}`,
        source: `drawing-${Date.now()}-source`,
        target: `drawing-${Date.now()}-target`,
        type: "drawing",
        data: {
          points: [position],
        },
        // Add these properties to prevent edge interactions
        interactionWidth: 0,
        focusable: false,
        deletable: false,
      };

      setCurrentDrawingEdge(newEdge);
      setIsDrawing(true);
      setEdges((eds) => [...eds, newEdge]);
    },
    [isPenToolActive, reactFlowInstance, setEdges],
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDrawing || !reactFlowInstance || !currentDrawingEdge) return;

      // Prevent panning while drawing
      event.preventDefault();
      event.stopPropagation();

      const bounds = (event.target as HTMLElement).getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === currentDrawingEdge.id) {
            const points = [...(edge.data?.points || []), position];
            return {
              ...edge,
              data: { ...edge.data, points },
            };
          }
          return edge;
        }),
      );
    },
    [isDrawing, currentDrawingEdge, reactFlowInstance, setEdges],
  );

  const onMouseUp = useCallback(() => {
    setIsDrawing(false);
    setCurrentDrawingEdge(null);
  }, []);

  // Add this new component above the FlowPage component
  const NodePreview = ({ type }: { type: string }) => {
    const getPreview = () => {
      const baseStyle = "w-16 h-16 flex items-center justify-center text-xs";

      switch (type) {
        case "default":
          return (
            <div
              className={`${baseStyle} bg-white border-2 border-blue-400 p-2 rounded`}
            >
              Rectangle
            </div>
          );
        case "circle":
          return (
            <div
              className={`${baseStyle} bg-green-100 border-2 border-green-400 rounded-full`}
            >
              Circle
            </div>
          );
        case "diamond":
          return (
            <div
              className={`${baseStyle} bg-purple-100 border-2 border-purple-400 transform rotate-45`}
            >
              <div className="transform -rotate-45">Diamond</div>
            </div>
          );
        case "rounded":
          return (
            <div
              className={`${baseStyle} bg-orange-100 border-2 border-orange-400 rounded-lg`}
            >
              Rounded
            </div>
          );
        default:
          return <div className={baseStyle}>{type}</div>;
      }
    };

    return (
      <div className="p-2 mb-2  rounded hover:bg-gray-100 cursor-move">
        {getPreview()}
      </div>
    );
  };

  return (
    <FlowContext.Provider value={{ onNodeLabelChange }}>
      <div className="flex h-screen">
        <aside className="w-32 p-4  border-r">
          <div className="mb-4 font-bold">Nodes</div>
          <div className="space-y-4">
            {["default", "circle", "diamond", "rounded"].map((nodeType) => (
              <div
                key={nodeType}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", nodeType);
                  event.dataTransfer.effectAllowed = "move";
                }}
              >
                <NodePreview type={nodeType} />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              className={`p-2 rounded ${isPenToolActive ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              onClick={() => setIsPenToolActive(!isPenToolActive)}
            >
              ✏️ Pen Tool
            </button>
          </div>
        </aside>

        <div className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            panOnScroll={true}
            panOnDrag={!isPenToolActive}
            style={{
              cursor: isPenToolActive ? "crosshair" : "default",
            }}
          // snapToGrid={true}
          // snapGrid={[10, 10]}
          // defaultEdgeOptions={{
          //   type: 'step',
          //   markerEnd: { type: MarkerType.ArrowClosed },
          // }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </FlowContext.Provider>
  );
}
