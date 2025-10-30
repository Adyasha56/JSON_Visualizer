import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import JsonInput from './JsonInput';
import SearchPanel from './SearchPanel';
import TreeView from './TreeView';
import { buildTree } from '../utils/treeBuilder';

// Sample JSON
const SAMPLE_JSON = {
  user: {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    address: {
      street: "123 Main St",
      city: "New York",
      zipcode: "10001"
    },
    hobbies: ["reading", "gaming", "coding"]
  },
  items: [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 }
  ],
  active: true,
  count: null
};

const JsonTreeVisualizer = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(SAMPLE_JSON, null, 2));
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState('');
  const [searchPath, setSearchPath] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  // Generate tree
  const handleVisualize = useCallback(() => {
    setError('');
    setSearchMessage('');
    
    try {
      const jsonData = JSON.parse(jsonInput);
      const { nodes: newNodes, edges: newEdges } = buildTree(jsonData);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
    }
  }, [jsonInput, setNodes, setEdges]);

  // Search functionality
  const handleSearch = useCallback(() => {
    setSearchMessage('');
    if (!searchPath.trim()) {
      setSearchMessage('Please enter a search path');
      return;
    }

    const foundNode = nodes.find(node => 
      node.data.path.toLowerCase() === searchPath.toLowerCase()
    );

    if (foundNode) {
      setNodes(nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: node.id === foundNode.id,
        },
      })));
      setSearchMessage('Match found !)');
    } else {
      setNodes(nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: false,
        },
      })));
      setSearchMessage('No match found');
    }
  }, [searchPath, nodes, setNodes]);

  // Clear/Reset
  const handleClear = useCallback(() => {
    setJsonInput('');
    setNodes([]);
    setEdges([]);
    setError('');
    setSearchPath('');
    setSearchMessage('');
  }, [setNodes, setEdges]);

  // Copy path on node click
  const onNodeClick = useCallback((event, node) => {
    navigator.clipboard.writeText(node.data.path);
    alert(`Path copied: ${node.data.path}`);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-160px)]">
      {/* Left Panel */}
      <div className="lg:col-span-1 flex flex-col space-y-6">
        <JsonInput
          jsonInput={jsonInput}
          setJsonInput={setJsonInput}
          onVisualize={handleVisualize}
          onClear={handleClear}
          error={error}
        />
        
        <SearchPanel
          searchPath={searchPath}
          setSearchPath={setSearchPath}
          onSearch={handleSearch}
          searchMessage={searchMessage}
        />
      </div>

      {/* Right Panel - Tree */}
      <TreeView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
      />
    </div>
  );
};

export default JsonTreeVisualizer;