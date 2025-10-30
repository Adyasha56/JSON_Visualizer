import { MarkerType } from 'reactflow';

// Build tree structure from JSON
export const buildTree = (data) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const traverse = (obj, currentPath, parent, currentLevel) => {
    const id = `node-${nodeId++}`;
    const position = {
      x: 0, // Will be calculated by layout algorithm
      y: currentLevel * 150, // Increased vertical spacing
    };

    if (obj === null) {
      nodes.push({
        id,
        type: 'custom',
        position,
        data: {
          label: currentPath.split('.').pop() || currentPath.split('[')[0],
          value: 'null',
          type: 'primitive',
          path: currentPath,
          isHighlighted: false,
        },
      });
    } else if (Array.isArray(obj)) {
      nodes.push({
        id,
        type: 'custom',
        position,
        data: {
          label: `${currentPath.split('.').pop() || currentPath.split('[')[0]} []`,
          type: 'array',
          path: currentPath,
          isHighlighted: false,
        },
      });

      obj.forEach((item, index) => {
        const childPath = `${currentPath}[${index}]`;
        traverse(item, childPath, id, currentLevel + 1);
      });
    } else if (typeof obj === 'object') {
      const label = currentPath === '$' ? 'root' : currentPath.split('.').pop();
      nodes.push({
        id,
        type: 'custom',
        position,
        data: {
          label: `${label} {}`,
          type: 'object',
          path: currentPath,
          isHighlighted: false,
        },
      });

      Object.keys(obj).forEach((key) => {
        const childPath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;
        traverse(obj[key], childPath, id, currentLevel + 1);
      });
    } else {
      nodes.push({
        id,
        type: 'custom',
        position,
        data: {
          label: currentPath.split('.').pop() || currentPath.split('[')[0],
          value: obj,
          type: 'primitive',
          path: currentPath,
          isHighlighted: false,
        },
      });
    }

    if (parent) {
      edges.push({
        id: `edge-${parent}-${id}`,
        source: parent,
        target: id,
        type: 'smoothstep',
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    }
  };

  traverse(data, '$', null, 0);

  // Improved layout algorithm
  const layoutNodes = improvedLayout(nodes, edges);
  return { nodes: layoutNodes, edges };
};

// Improved tree layout algorithm with better spacing
const improvedLayout = (nodes, edges) => {
  const nodeMap = new Map(nodes.map(n => [n.id, { ...n, children: [] }]));
  
  // Build parent-child relationships
  edges.forEach(edge => {
    const parent = nodeMap.get(edge.source);
    if (parent) {
      parent.children.push(edge.target);
    }
  });

  // Group nodes by level
  const levelMap = new Map();
  nodes.forEach(node => {
    const level = node.position.y;
    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }
    levelMap.get(level).push(node.id);
  });

  const NODE_WIDTH = 200; // Increased horizontal spacing
  const HORIZONTAL_SPACING = 80; // Gap between sibling nodes
  
  // Calculate positions level by level
  const calculatePosition = (nodeId, offsetX = 0, visited = new Set()) => {
    if (visited.has(nodeId)) return offsetX;
    visited.add(nodeId);

    const node = nodeMap.get(nodeId);
    if (!node) return offsetX;

    if (node.children.length === 0) {
      // Leaf node
      node.position.x = offsetX;
      return offsetX + NODE_WIDTH + HORIZONTAL_SPACING;
    }

    // Calculate children positions first
    let childX = offsetX;
    const childPositions = [];
    
    node.children.forEach(childId => {
      const startX = childX;
      childX = calculatePosition(childId, childX, visited);
      const childNode = nodeMap.get(childId);
      childPositions.push(childNode.position.x);
    });

    // Center parent over children
    if (childPositions.length > 0) {
      const minChildX = Math.min(...childPositions);
      const maxChildX = Math.max(...childPositions);
      node.position.x = (minChildX + maxChildX) / 2;
    }

    return childX;
  };

  // Find root nodes (nodes with no incoming edges)
  const roots = nodes.filter(n => !edges.some(e => e.target === n.id));
  
  let globalX = 0;
  roots.forEach(root => {
    globalX = calculatePosition(root.id, globalX, new Set());
  });

  return Array.from(nodeMap.values());
};