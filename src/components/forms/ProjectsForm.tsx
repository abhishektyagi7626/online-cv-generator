import React from 'react';
import type { Project } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: uuidv4(),
        title: '',
        description: '',
        link: '',
        technologies: '',
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.map((proj) => (
          <div key={proj.id} className="p-4 border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 rounded-md relative group transition-colors">
            <button
              onClick={() => handleRemove(proj.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleChange(proj.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                    placeholder="E-commerce App"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Link</label>
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => handleChange(proj.id, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                    placeholder="github.com/your/project"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Technologies Used</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => handleChange(proj.id, 'technologies', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                  placeholder="Describe the project and your role..."
                />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No projects added yet.</p>
        )}
      </div>
    </div>
  );
};
