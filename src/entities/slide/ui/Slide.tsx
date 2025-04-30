import { generateModernTagColors } from '@/shared/utils';
import { motion } from 'framer-motion';
import { ISlideProps } from '../model/type';

export const Slide = ({ category, forkedCount, id, title, cardWidth, cardHeight }: ISlideProps) => {
  const { background, text, border } = generateModernTagColors(+category.color);
  return (
    <motion.div
      key={id}
      className="border rounded-[8px]"
      whileHover={{ scale: 1.2 }}
      style={{ width: cardWidth, height: cardHeight, background, borderColor: border }}
    >
      <h2 className="p-4" style={{ color: text }}>
        {title}
      </h2>
      <span className="p-4">{category.name}</span>
      <span>{forkedCount}</span>
    </motion.div>
  );
};
