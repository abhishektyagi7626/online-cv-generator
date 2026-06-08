import React from 'react';
import type { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe, Briefcase, Code } from 'lucide-react';

interface Props {
  data: ResumeData;
  colorTheme?: string;
}

export const ModernTemplate: React.FC<Props> = ({ data, colorTheme = 'blue' }) => {
  const { personalInfo, experience, education, projects, skills } = data;

  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    rose: 'text-rose-600',
    slate: 'text-slate-600',
  };

  const headerColorMap: Record<string, string> = {
    blue: 'bg-slate-900',
    emerald: 'bg-emerald-900',
    violet: 'bg-violet-900',
    rose: 'bg-rose-900',
    slate: 'bg-slate-900',
  };

  const accentTextMap: Record<string, string> = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
    slate: 'text-slate-400',
  };

  const primaryColor = colorMap[colorTheme] || colorMap.blue;
  const headerColor = headerColorMap[colorTheme] || headerColorMap.blue;
  const accentColor = accentTextMap[colorTheme] || accentTextMap.blue;

  return (
    <div className="w-full h-full bg-white font-sans text-slate-800 text-sm leading-relaxed" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <header className={`${headerColor} text-white p-8`}>
        <h1 className="text-3xl font-bold uppercase tracking-wider">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <h2 className={`text-xl ${accentColor} mt-1`}>{personalInfo.jobTitle || 'Job Title'}</h2>
        
        <div className="flex flex-wrap gap-4 mt-4 text-slate-300 text-xs">
          {personalInfo.email && <div className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.address}</div>}
          {personalInfo.website && <div className="flex items-center gap-1"><Globe size={14} /> {personalInfo.website}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1"><Briefcase size={14} /> {personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="flex items-center gap-1"><Code size={14} /> {personalInfo.github}</div>}
        </div>
      </header>

      <div className="flex">
        {/* Left Column (Main Content) */}
        <div className="w-2/3 p-8">
          {personalInfo.summary && (
            <section className="mb-6">
              <h3 className={`text-lg font-bold text-slate-900 border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wide`}>Profile</h3>
              <p className="text-slate-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-6">
              <h3 className={`text-lg font-bold text-slate-900 border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wide`}>Experience</h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-slate-800">{exp.position}</h4>
                      <span className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className={`${primaryColor} font-medium text-sm mb-1`}>{exp.company}</div>
                    <p className="text-slate-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-6">
              <h3 className={`text-lg font-bold text-slate-900 border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wide`}>Projects</h3>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-slate-800">{proj.title}</h4>
                      {proj.link && <span className={`text-xs ${primaryColor}`}>{proj.link}</span>}
                    </div>
                    <div className="text-xs text-slate-500 mb-1 italic">{proj.technologies}</div>
                    <p className="text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-1/3 bg-slate-50 p-8 border-l border-slate-200">
          {skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-300 pb-1 mb-3 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-slate-200 text-slate-700 px-2 py-1 rounded-sm text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-300 pb-1 mb-3 uppercase tracking-wide">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold text-slate-800">{edu.degree}</h4>
                    <div className={`${primaryColor} text-sm`}>{edu.institution}</div>
                    <div className="text-xs text-slate-500 mb-1">{edu.startDate} - {edu.endDate}</div>
                    {edu.description && <p className="text-slate-600 text-xs mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
