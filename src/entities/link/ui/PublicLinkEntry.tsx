import Tag from '@/shared/ui/Tag';
import { Bookmark, ExternalLink } from 'lucide-react';
import { IPublicLinkEntry } from '../type';
import { generateModernTagColors, openInNewTab } from '@/shared/utils';
import { motion } from 'framer-motion';
import { useBreakpoint } from '@/shared/hooks/useBreakPoint';

function PublicLinkEntry({ category, title, link }: IPublicLinkEntry) {
  const breakpoint = useBreakpoint();

  const { background, text } = generateModernTagColors(+category.color);
  return (
    <motion.li
      className="py-6 md:p-4 border-b border-dotted flex items-center justify-between"
      initial={{ backgroundColor: '#fff' }}
      whileHover={{ backgroundColor: '#f0f0f0' }}
      exit={{ backgroundColor: '#fff' }}
    >
      <div className="flex items-center gap-2 md:gap-5">
        <Bookmark size={24} strokeWidth={1} className="cursor-pointer" />
        <div className="flex gap-4 md:gap-12 items-center">
          <Tag name={category.name} background={background} text={text} />
          <div className="font-semibold truncate w-[15rem] md:w-auto lg:w-auto">{title}</div>

          {/** 모바일 버전에서는 링크 표시 안함 */}
          {breakpoint !== 'mobile' && (
            <div className="truncate md:w-[8rem] lg:w-[20rem] text-xs">{link}</div>
          )}
        </div>
      </div>
      <div onClick={() => openInNewTab(link)}>
        <ExternalLink size={20} strokeWidth={1} className="cursor-pointer" />
      </div>
    </motion.li>
  );
}

export default PublicLinkEntry;
