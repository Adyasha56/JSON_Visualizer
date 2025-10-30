import { Search } from 'lucide-react';

const SearchPanel = ({ searchPath, setSearchPath, onSearch, searchMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="text-2xl"></span>
        Search by Path
      </h2>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., $.user.name or items[0]"
          className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition-all font-mono text-sm shadow-inner"
        />
        <button
          onClick={onSearch}
          className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      {searchMessage && (
        <div className={`mt-4 p-3 rounded-xl text-sm font-semibold shadow-md ${
          searchMessage.includes('found!') 
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-800 dark:text-green-200 border-2 border-green-500' 
            : 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900 text-yellow-800 dark:text-yellow-200 border-2 border-yellow-500'
        }`}>
          {searchMessage.includes('found!')} {searchMessage}
        </div>
      )}
      
      <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-xl text-xs text-gray-700 dark:text-gray-300 border border-indigo-200 dark:border-indigo-800">
        <p className="font-bold mb-2 text-indigo-700 dark:text-indigo-300 text-sm">💡 Search Tips:</p>
        <p className="mb-1">* Objects: <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded font-mono text-indigo-600 dark:text-indigo-400">$.user.name</code></p>
        <p className="mb-1">*  Arrays: <code className="bg-white dark:bg-gray-900 px-2 py-0.5 rounded font-mono text-indigo-600 dark:text-indigo-400">$.items[0].name</code></p>
        <p>* Click nodes to copy their path!</p>
      </div>
    </div>
  );
};

export default SearchPanel;