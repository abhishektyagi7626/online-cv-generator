import { useState, useRef } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, Project } from './types';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { Download, FileText, Trash2, LayoutTemplate, Moon, Sun } from 'lucide-react';

import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { SkillsForm } from './components/forms/SkillsForm';

import { ModernTemplate } from './components/templates/ModernTemplate';
import { MinimalistTemplate } from './components/templates/MinimalistTemplate';
import { ClassicTemplate } from './components/templates/ClassicTemplate';

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    website: '',
    linkedin: '',
    github: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
};

const dummyData: ResumeData = {
  personalInfo: {
    fullName: 'Abhishek Tyagi',
    jobTitle: 'Full Stack Developer',
    email: 'abhishek.tyagi@example.com',
    phone: '+91 98765 43210',
    address: 'New Delhi, India',
    summary: 'Passionate Full Stack Developer with experience in building scalable web applications. Strong expertise in modern web technologies including React, Node.js, and modern CSS frameworks. Proven track record of solving complex problems and delivering high-quality products.',
    website: 'abhishektyagi.dev',
    linkedin: 'linkedin.com/in/abhishektyagi',
    github: 'github.com/abhishektyagi7626',
  },
  experience: [
    {
      id: uuidv4(),
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '• Led the frontend team in developing a high-performance SaaS product.\n• Improved initial load times by 40% through code splitting and lazy loading.\n• Mentored junior developers and established code review best practices.',
    },
    {
      id: uuidv4(),
      company: 'Web Solutions Co.',
      position: 'Frontend Developer',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      description: '• Developed and maintained various client websites.\n• Collaborated closely with designers and backend engineers to deliver features on time.\n• Integrated RESTful APIs and optimized state management using Redux.',
    }
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2013',
      endDate: 'May 2017',
      description: 'Graduated with honors (3.8 GPA). Relevant coursework in algorithms, data structures, and web development.',
    }
  ],
  projects: [
    {
      id: uuidv4(),
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with real-time inventory management and secure payment integration.',
      link: 'github.com/alexj/ecommerce',
      technologies: 'React, Node.js, MongoDB, Stripe',
    },
    {
      id: uuidv4(),
      title: 'Task Management App',
      description: 'A collaborative task management tool featuring real-time updates and drag-and-drop interfaces.',
      link: 'github.com/alexj/task-app',
      technologies: 'React, Firebase, Tailwind CSS',
    }
  ],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'GraphQL', 'Redux', 'Jest', 'Git/GitHub'],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [template, setTemplate] = useState<string>('modern');
  const [themeColor, setThemeColor] = useState<string>('blue');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const element = componentRef.current;
    if (!element) return;
    
    const opt = {
      margin:       0,
      filename:     `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_CV.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const handleFillDummyData = () => {
    setResumeData(dummyData);
  };

  const handleClearData = () => {
    setResumeData(initialData);
  };

  const themeColors = [
    { id: 'blue', name: 'Blue', colorClass: 'bg-blue-600' },
    { id: 'emerald', name: 'Emerald', colorClass: 'bg-emerald-600' },
    { id: 'violet', name: 'Violet', colorClass: 'bg-violet-600' },
    { id: 'rose', name: 'Rose', colorClass: 'bg-rose-600' },
    { id: 'slate', name: 'Slate', colorClass: 'bg-slate-800' },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors ${darkMode ? 'dark bg-slate-900' : 'bg-slate-100'}`}>
      {/* LEFT PANEL - FORMS */}
      <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] p-6 md:overflow-y-auto h-auto md:h-screen bg-white dark:bg-slate-800 shadow-2xl z-10 flex flex-col custom-scrollbar transition-colors">
        <header className="mb-8 border-b pb-6 dark:border-slate-700 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
                <FileText size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors">CV Maker</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Build and download your professional resume.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="md:hidden flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition shadow-md text-sm font-medium"
              title="Download PDF"
            >
              <Download size={18} />
              <span>PDF</span>
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleFillDummyData}
            className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium shadow-sm"
          >
            <FileText size={18} /> Fill Dummy Data
          </button>
          <button
            onClick={handleClearData}
            className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium border border-red-100"
          >
            <Trash2 size={18} /> Clear All
          </button>
        </div>

        <div className="mb-6 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <LayoutTemplate size={16} /> Choose Template
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {['modern', 'minimalist', 'classic'].map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-3 py-2 rounded-md capitalize transition text-sm font-medium border ${
                  template === t
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Theme Color
          </h2>
          <div className="flex gap-3">
            {themeColors.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeColor(theme.id)}
                className={`w-8 h-8 rounded-full ${theme.colorClass} border-2 transition-all ${
                  themeColor === theme.id ? 'border-slate-900 dark:border-white scale-110 shadow-md' : 'border-transparent hover:scale-105'
                }`}
                title={theme.name}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2 pb-10">
          <PersonalInfoForm 
            data={resumeData.personalInfo} 
            onChange={(data: PersonalInfo) => setResumeData({ ...resumeData, personalInfo: data })} 
          />
          <ExperienceForm 
            data={resumeData.experience} 
            onChange={(data: Experience[]) => setResumeData({ ...resumeData, experience: data })} 
          />
          <EducationForm 
            data={resumeData.education} 
            onChange={(data: Education[]) => setResumeData({ ...resumeData, education: data })} 
          />
          <ProjectsForm 
            data={resumeData.projects} 
            onChange={(data: Project[]) => setResumeData({ ...resumeData, projects: data })} 
          />
          <SkillsForm 
            data={resumeData.skills} 
            onChange={(data: string[]) => setResumeData({ ...resumeData, skills: data })} 
          />
        </div>
      </div>

      {/* RIGHT PANEL - PREVIEW */}
      <div className="w-full md:w-[55%] lg:w-[60%] xl:w-[65%] bg-slate-200 dark:bg-slate-900 h-auto md:h-screen md:overflow-y-auto flex flex-col custom-scrollbar relative transition-colors">
        <div className="sticky top-0 bg-slate-200/90 dark:bg-slate-900/90 backdrop-blur-sm z-20 p-4 border-b border-slate-300 dark:border-slate-700 flex justify-between items-center shadow-sm transition-colors">
          <div className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Preview
          </div>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
        
        <div className="flex-1 p-8 flex justify-center pb-20">
          <div className="w-full max-w-[210mm] shadow-2xl transition-all duration-300 origin-top" style={{ minHeight: '297mm' }}>
            <div ref={componentRef} className="w-full h-full bg-white">
              {template === 'modern' && <ModernTemplate data={resumeData} colorTheme={themeColor} />}
              {template === 'minimalist' && <MinimalistTemplate data={resumeData} colorTheme={themeColor} />}
              {template === 'classic' && <ClassicTemplate data={resumeData} colorTheme={themeColor} />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default App;
