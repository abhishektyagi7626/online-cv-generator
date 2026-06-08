import React from 'react';
import type { Experience } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: uuidv4(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: string) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {data.map((exp) => (
          <div key={exp.id} className="p-4 border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 rounded-md relative group transition-colors">
            <button
              onClick={() => handleRemove(exp.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="MM/YYYY or Present"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No experience added yet.</p>
        )}
      </div>
    </div>
  );
};
