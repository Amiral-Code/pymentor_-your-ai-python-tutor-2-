
import React from 'react';
import { LessonModule, Topic } from '../types';
import { useUserStore } from '../stores/useUserStore';

interface SidebarProps {
  modules: LessonModule[];
  selectedTopicId: string | null;
  onSelectTopic: (moduleId: string, topicId: string, isPremiumLocked: boolean) => void;
  completedTopics: Record<string, boolean>;
}

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 ${className}`}>
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ modules, selectedTopicId, onSelectTopic, completedTopics }) => {
  const { isPremiumUser } = useUserStore();

  const [expandedModules, setExpandedModules] = React.useState<Record<string, boolean>>(() => {
    if (modules.length > 0) {
      const firstModuleId = modules[0].id;
      if (selectedTopicId) {
        for (const module of modules) {
          if (module.topics.some(topic => topic.id === selectedTopicId)) {
            return { [module.id]: true };
          }
        }
      }
      return { [firstModuleId]: true };
    }
    return {};
  });

  React.useEffect(() => {
    if (selectedTopicId) {
      for (const module of modules) {
        if (module.topics.some(topic => topic.id === selectedTopicId)) {
          if (!expandedModules[module.id]) {
             setExpandedModules(prev => ({ ...prev, [module.id]: true }));
          }
          break; 
        }
      }
    }
  }, [selectedTopicId, modules, expandedModules]);


  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  return (
    <aside className="w-full bg-slate-50 border-r border-slate-300 p-4 overflow-y-auto flex-shrink-0 h-full custom-scrollbar">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Lessons</h2>
      <nav>
        <ul>
          {modules.map((module) => {
            const moduleIsLocked = !!module.isPremium && !isPremiumUser;
            return (
            <li key={module.id} className="mb-3">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center"
                title={moduleIsLocked ? `${module.title} (Premium Content)` : module.title}
              >
                <span className={`font-medium flex items-center ${moduleIsLocked ? 'opacity-70' : ''}`}>
                  {moduleIsLocked && <LockIcon className="mr-1.5 text-yellow-500" />}
                  {module.title}
                </span>
                <svg 
                    className={`w-5 h-5 transform transition-transform text-slate-500 ${expandedModules[module.id] ? 'rotate-90' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              {expandedModules[module.id] && (
                <ul className="mt-1 pl-3 border-l-2 border-slate-300">
                  {module.topics.map((topic) => {
                    const topicIsEffectivelyLocked = moduleIsLocked; // Topics inherit lock status from module
                    return (
                    <li key={topic.id} className="my-0.5">
                      <button
                        onClick={() => onSelectTopic(module.id, topic.id, topicIsEffectivelyLocked)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-100 flex items-center justify-between ${
                          topicIsEffectivelyLocked ? 'opacity-60 cursor-default' : ''
                        } ${
                          selectedTopicId === topic.id && !topicIsEffectivelyLocked
                            ? 'bg-blue-500 text-white font-semibold shadow-sm'
                            : `text-slate-600 ${!topicIsEffectivelyLocked ? 'hover:bg-slate-200 hover:text-slate-800 focus:bg-slate-200' : ''}`
                        }`}
                        disabled={topicIsEffectivelyLocked && selectedTopicId !== topic.id} // Allow re-clicking selected locked topic if it was somehow selected
                        title={topicIsEffectivelyLocked ? `${topic.title} (Premium - Requires Upgrade)` : topic.title}
                      >
                        <span className="flex items-center">
                            {topicIsEffectivelyLocked && selectedTopicId !== topic.id && <LockIcon className="mr-1.5 text-yellow-500 flex-shrink-0" />}
                            {topic.title}
                        </span>
                        {completedTopics[topic.id] && !topicIsEffectivelyLocked && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2 text-green-400 flex-shrink-0">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4-5.5a.75.75 0 00-.121-.992z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </li>
                  )})}
                </ul>
              )}
            </li>
          )})}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;