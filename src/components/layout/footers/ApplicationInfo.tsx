import { LAST_UPDATE, VERSION } from '@/constants';
import { FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiReactquery, SiTailwindcss } from 'react-icons/si';

export const ApplicationInfo = () => {
  const techStack = [
    { icon: <SiNextdotjs />, name: 'Next.js 14' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiReactquery />, name: 'React Query' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  ];

  return (
    <footer className="w-full dark:bg-background-primary-dark border-t dark:border-border-divider-dark flex flex-col items-start">
      <div className="my-[20px] mx-0 w-full">
        <p className="text-[14px] mb-[16px] dark:text-text-tertiary-dark">
          A service for effortless link storage and sharing.
        </p>
      </div>
      <div className="my-[20px] mx-0 w-full">
        <h3 className="text-[16px] font-semibold mb-[12px] dark:text-text-primary-dark">Tech Stack</h3>
        <div className="grid gap-[12px] grid-cols-2">
          {techStack.map((tech, index) => (
            <div className="flex items-center gap-2 text-[14px] dark:text-text-tertiary-dark" key={index}>
              <svg className="w-[16px] h-[16px]"> {tech.icon}</svg>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="my-[20px] mx-0 w-full">
        <h3 className="text-[16px] font-semibold mb-[12px] dark:text-text-primary-dark">Links & Resources</h3>
        <div className="flex flex-col gap-2">
          <a
            className="flex items-center gap-2 text-[12px] no-underline transition-color duration-200 dark:text-text-tertiary-dark"
            href="https://github.com/Samgyeopsalandsoju/linkjoa_frontend"
            target="_blank"
          >
            <svg className="w-[16px] h-[16px]">
              <FaGithub />
            </svg>
            GitHub Repository
          </a>
          <a
            className="flex items-center gap-2 text-[12px] no-underline transition-color duration-200 dark:text-text-tertiary-dark"
            href="https://hyunbin-kim.notion.site/clipVault-1801acfb02348009bdece4eacaf9e90b"
            target="_blank"
          >
            <svg className="w-[16px] h-[16px]">
              <FaBook />
            </svg>
            Documentation
          </a>
          <a
            className="flex items-center gap-2 text-[12px] no-underline transition-color duration-200 dark:text-text-tertiary-dark"
            href="mailto:hyunbin.kim.3376@gamil.com"
          >
            <svg className="w-[16px] h-[16px]">
              <FaEnvelope />
            </svg>
            Contact
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[4px] text-center flex-1 w-full">
        <span className="text-[12px] dark:text-text-tertiary-dark">v{VERSION}</span>
        <p className="text-[12px] dark:text-text-primary-dark">© 2025 clipVault. All rights reserved.</p>
        <span className="text-[12px] dark:text-text-tertiary-dark">Last updated: {LAST_UPDATE}</span>
      </div>
    </footer>
  );
};
