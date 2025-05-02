import { Card } from '@/shared/ui/card';
import { COLOR_LIST } from '../model/constant';
import { motion } from 'framer-motion';

export const ColorPicker = ({ color, setColor }: { color: string; setColor: (color: string) => void }) => {
  return (
    <Card className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 p-3 lg:justify-between gap-3">
      {COLOR_LIST.map((item) => {
        return (
          <motion.div
            key={item}
            className="rounded-full w-7 h-7 cursor-pointer justify-self-center"
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundColor: item,
              boxShadow: item === color ? '0px 2px 10px rgba(0, 0, 0, 0.9)' : 'none',
              scale: item === color ? 1.1 : 1,
            }}
            onClick={() => setColor(item)}
          />
        );
      })}
    </Card>
  );
};
