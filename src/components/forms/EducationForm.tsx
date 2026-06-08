import React from 'react';
import type { Education } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: uuidv4(),
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div className="space-y-6">
        {data.map((edu) => (
          <div key={edu.id} className="p-4 border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 rounded-md relative group transition-colors">
            <button
              onClick={() => handleRemove(edu.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="University Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="YYYY or Expected YYYY"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description (Optional)</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="GPA, Honors, Coursework..."
                />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No education added yet.</p>
        )}
      </div>
    </div>
  );
};
