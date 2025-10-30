import { MarkerType } from 'reactflow';

// Build tree structure from JSON
export const buildTree = (data) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const traverse = (obj, currentPath, parent, currentLevel) => {
    const id = `node-${nodeId++}`;
    const position = {
      x: nodeId * 250,
      y: currentLevel * 120,
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
        style: { stroke: '#94a3b8' },
      });
    }
  };

  traverse(data, '$', null, 0);

  // Layout nodes properly
  const layoutNodes = layoutTree(nodes, edges);
  return { nodes: layoutNodes, edges };
};

// Simple tree layout algo
const layoutTree = (nodes, edges) => {
  const nodeMap = new Map(nodes.map(n => [n.id, { ...n, children: [] }]));
  
  edges.forEach(edge => {
    const parent = nodeMap.get(edge.source);
    if (parent) {
      parent.children.push(edge.target);
    }
  });

  const calculatePosition = (nodeId, x = 0, y = 0, visited = new Set()) => {
    if (visited.has(nodeId)) return x;
    visited.add(nodeId);

    const node = nodeMap.get(nodeId);
    if (!node) return x;

    node.position = { x, y };

    let currentX = x;
    node.children.forEach((childId) => {
      currentX = calculatePosition(childId, currentX, y + 120, visited);
      currentX += 250;
    });

    if (node.children.length > 0) {
      const firstChild = nodeMap.get(node.children[0]);
      const lastChild = nodeMap.get(node.children[node.children.length - 1]);
      node.position.x = (firstChild.position.x + lastChild.position.x) / 2;
    }

    return node.position.x;
  };

  const roots = nodes.filter(n => !edges.some(e => e.target === n.id));
  roots.forEach(root => calculatePosition(root.id));

  return Array.from(nodeMap.values());
};