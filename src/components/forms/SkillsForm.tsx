import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ data, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !data.includes(inputValue.trim())) {
      onChange([...data, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Skills</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
          placeholder="e.g., React, TypeScript, Team Leadership"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition flex items-center gap-1"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 transition-colors"
          >
            <span className="text-sm text-slate-700 dark:text-slate-300">{skill}</span>
            <button
              onClick={() => handleRemove(skill)}
              className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-1 focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-2 w-full">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};
