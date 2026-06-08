import React from 'react';
import type { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
  colorTheme?: string;
}

export const MinimalistTemplate: React.FC<Props> = ({ data, colorTheme = 'blue' }) => {
  const { personalInfo, experience, education, projects, skills } = data;

  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    rose: 'text-rose-600',
    slate: 'text-slate-600',
  };

  const primaryColor = colorMap[colorTheme] || colorMap.blue;

  return (
    <div className="w-full h-full bg-white font-sans text-gray-800 p-12 text-sm leading-relaxed" style={{ minHeight: '297mm' }}>
      <header className="mb-8 text-center">
        <h1 className={`text-4xl font-light tracking-widest uppercase mb-2 ${primaryColor}`}>{personalInfo.fullName || 'YOUR NAME'}</h1>
        <h2 className="text-gray-500 tracking-widest uppercase text-sm mb-4">{personalInfo.jobTitle || 'JOB TITLE'}</h2>
        
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.address && <span>•</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 mt-1">
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.website && personalInfo.linkedin && <span>•</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.linkedin && personalInfo.github && <span>•</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 italic">"{personalInfo.summary}"</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${primaryColor} mb-4 border-b border-gray-200 pb-2`}>Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-xs text-gray-500 pt-1">
                  {exp.startDate} — {exp.endDate}
                </div>
                <div className="col-span-3">
                  <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                  <div className="text-gray-600 text-sm mb-2">{exp.company}</div>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${primaryColor} mb-4 border-b border-gray-200 pb-2`}>Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-xs text-gray-500 pt-1">
                  {edu.startDate} — {edu.endDate}
                </div>
                <div className="col-span-3">
                  <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                  <div className="text-gray-600 text-sm">{edu.institution}</div>
                  {edu.description && <p className="text-gray-500 text-xs mt-1">{edu.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${primaryColor} mb-4 border-b border-gray-200 pb-2`}>Projects</h3>
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{proj.title}</h4>
                  {proj.link && <span className="text-xs text-gray-400">— {proj.link}</span>}
                </div>
                <div className="text-xs text-gray-500 mb-2">{proj.technologies}</div>
                <p className="text-gray-600 text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3 className={`text-xs font-bold uppercase tracking-widest ${primaryColor} mb-4 border-b border-gray-200 pb-2`}>Skills</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-gray-700 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
