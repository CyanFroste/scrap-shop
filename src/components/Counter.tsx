import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm mx-auto">
      <div className="text-center">
        <span className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
          React Component
        </span>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
          Interactive State
        </h2>
      </div>

      <div className="text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 font-mono py-2">
        {count}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setCount((prev) => prev - 1)}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-100 font-medium rounded-lg transition-colors cursor-pointer"
        >
          - Decrement
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-100 font-medium rounded-lg transition-colors cursor-pointer"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          + Increment
        </button>
      </div>
    </div>
  );
}

