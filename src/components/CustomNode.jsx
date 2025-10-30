import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const getNodeStyle = () => {
    const baseStyle = "px-5 py-3 rounded-xl border-2 shadow-lg transition-all duration-300 min-w-[180px] backdrop-blur-sm";
    
    if (data.isHighlighted) {
      return `${baseStyle} bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-500 dark:to-amber-600 border-yellow-600 dark:border-yellow-400 scale-110 shadow-2xl shadow-yellow-500/50`;
    }
    
    switch (data.type) {
      case 'object':
        return `${baseStyle} bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 border-blue-500 dark:border-blue-400 hover:shadow-xl hover:scale-105`;
      case 'array':
        return `${baseStyle} bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-900 border-green-500 dark:border-green-400 hover:shadow-xl hover:scale-105`;
      case 'primitive':
        return `${baseStyle} bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900 dark:to-amber-900 border-orange-500 dark:border-orange-400 hover:shadow-xl hover:scale-105`;
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-500`;
    }
  };

  const getIcon = () => {
    switch (data.type) {
      case 'object':
        return '{}';
      case 'array':
        return '[]';
      case 'primitive':
        return '•';
      default:
        return '';
    }
  };

  return (
    <div className={getNodeStyle()} title={data.path}>
      {/* Top Handle - for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300">
          {getIcon()}
        </span>
        <div className="font-bold text-base text-gray-900 dark:text-gray-50">
          {data.label}
        </div>
      </div>
      {data.value !== undefined && (
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 px-2 py-1 bg-white/60 dark:bg-black/30 rounded-md">
          {String(data.value)}
        </div>
      )}
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono truncate opacity-75">
        {data.path}
      </div>

      {/* Bottom Handle - for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;