import Tag from '@/shared/ui/Tag';
import { Bookmark, ExternalLink } from 'lucide-react';
import { IPublicLinkEntry } from '../type';
import { generateModernTagColors, openInNewTab } from '@/shared/utils';
import { motion } from 'framer-motion';

function PublicLinkEntry({ category, title, link }: IPublicLinkEntry) {
  const { background, text } = generateModernTagColors(+category.color);
  return (
    <motion.li
      className="py-4 px-4 border-b border-dotted flex items-center justify-between"
      initial={{ backgroundColor: '#fff' }}
      whileHover={{ backgroundColor: '#f0f0f0' }}
      exit={{ backgroundColor: '#fff' }}
    >
      <div className="flex items-center gap-5">
        <Bookmark size={20} strokeWidth={1} className="cursor-pointer" />
        <div className="flex gap-12 items-center">
          <Tag name={category.name} background={background} text={text} />
          <div className="font-semibold">{title}</div>
          <div className="truncate w-[15rem]">{link}</div>
        </div>
      </div>
      <div onClick={() => openInNewTab(link)}>
        <ExternalLink size={20} strokeWidth={1} className="cursor-pointer" />
      </div>
    </motion.li>
  );
}

export default PublicLinkEntry;
