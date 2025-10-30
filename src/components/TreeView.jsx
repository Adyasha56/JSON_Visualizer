import { useMemo, useCallback } from 'react';
import ReactFlow, { Controls, Background, useReactFlow } from 'reactflow';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const DownloadButton = () => {
  const { getNodes } = useReactFlow();

  const onDownload = useCallback(() => {
    const nodesBounds = document.querySelector('.react-flow__viewport');
    
    if (nodesBounds) {
      toPng(nodesBounds, {
        backgroundColor: '#ffffff',
        width: nodesBounds.offsetWidth,
        height: nodesBounds.offsetHeight,
      })
        .then((dataUrl) => {
          const a = document.createElement('a');
          a.setAttribute('download', 'json-tree.png');
          a.setAttribute('href', dataUrl);
          a.click();
        })
        .catch((err) => {
          console.error('Failed to download image:', err);
        });
    }
  }, []);

  return (
    <button
      onClick={onDownload}
      className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg"
      title="Download as image"
    >
      <Download className="w-4 h-4" />
      Export
    </button>
  );
};

const TreeView = ({ nodes, edges, onNodesChange, onEdgesChange, onNodeClick }) => {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 relative">
      <div className="w-full h-full min-h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.3,
            includeHiddenNodes: false,
          }}
          className="dark:bg-gray-900"
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
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
          <DownloadButton />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TreeView;