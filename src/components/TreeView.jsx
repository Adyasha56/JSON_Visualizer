import { useMemo } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const TreeView = ({ nodes, edges, onNodesChange, onEdgesChange, onNodeClick }) => {
  // Memoize nodeTypes to avoid re-creation warning
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="w-full h-full min-h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="dark:bg-gray-900"
          minZoom={0.1}
          maxZoom={2}
        >
          <Background 
            color="#6366f1" 
            gap={20} 
            size={1}
            className="dark:opacity-20"
          />
          <Controls 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TreeView;