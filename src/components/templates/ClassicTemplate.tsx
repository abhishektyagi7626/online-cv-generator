import React from 'react';
import type { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
  colorTheme?: string;
}

export const ClassicTemplate: React.FC<Props> = ({ data, colorTheme = 'blue' }) => {
  const { personalInfo, experience, education, projects, skills } = data;

  const borderColorMap: Record<string, string> = {
    blue: 'border-blue-800',
    emerald: 'border-emerald-800',
    violet: 'border-violet-800',
    rose: 'border-rose-800',
    slate: 'border-slate-800',
  };

  const headerBorderColor = borderColorMap[colorTheme] || borderColorMap.blue;

  return (
    <div className="w-full h-full bg-white font-serif text-slate-800 p-12 text-[13px] leading-relaxed" style={{ minHeight: '297mm' }}>
      <header className={`mb-6 text-center border-b-[3px] ${headerBorderColor} pb-4`}>
        <h1 className="text-3xl font-bold uppercase mb-1 text-slate-900">{personalInfo.fullName || 'Your Name'}</h1>
        <h2 className="text-lg text-slate-700 italic mb-3">{personalInfo.jobTitle || 'Job Title'}</h2>
        
        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-700">
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.address && personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-700 mt-1">
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.website && personalInfo.linkedin && <span>|</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.linkedin && personalInfo.github && <span>|</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className={`text-sm font-bold uppercase text-slate-900 border-b border-slate-300 mb-2 pb-1`}>Professional Summary</h2>
          <p className="text-slate-700">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className={`text-sm font-bold uppercase text-slate-900 border-b border-slate-300 mb-2 pb-1`}>Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{exp.company}</h3>
                  <span className="text-slate-700">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="font-semibold italic text-slate-800 mb-1">{exp.position}</div>
                <p className="text-slate-700 whitespace-pre-line pl-4 list-disc">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className={`text-sm font-bold uppercase text-slate-900 border-b border-slate-300 mb-2 pb-1`}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                  <span className="text-slate-700">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="font-semibold italic text-slate-800">{edu.degree}</div>
                {edu.description && <p className="text-slate-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className={`text-sm font-bold uppercase text-slate-900 border-b border-slate-300 mb-2 pb-1`}>Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{proj.title} {proj.link && <span className="font-normal italic text-slate-600">({proj.link})</span>}</h3>
                </div>
                <div className="text-slate-700 italic text-xs mb-1">Technologies: {proj.technologies}</div>
                <p className="text-slate-700 pl-4">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className={`text-sm font-bold uppercase text-slate-900 border-b border-slate-300 mb-2 pb-1`}>Core Competencies</h2>
          <p className="text-slate-700">
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
