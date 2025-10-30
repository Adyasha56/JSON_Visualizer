import { Play, Trash2 } from 'lucide-react';

const JsonInput = ({ jsonInput, setJsonInput, onVisualize, onClear, error }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex-1 flex flex-col border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="text-2xl"></span>
        JSON Input
      </h2>
      
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="flex-1 w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 resize-none transition-all shadow-inner"
      />
      
      {error && (
        <div className="mt-4 p-4 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 border-2 border-red-400 dark:border-red-600 text-red-800 dark:text-red-200 rounded-xl text-sm font-semibold shadow-lg">
           {error}
        </div>
      )}
      
      <div className="flex gap-3 mt-5">
        <button
          onClick={onVisualize}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <Play className="w-5 h-5" />
          Visualize Tree
        </button>
        <button
          onClick={onClear}
          className="px-5 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JsonInput;