import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ISliderProps } from '../data/types/slider';
import { motion } from 'framer-motion';

function Slider<T>({ current, GAP, SHOWN_COUNT, PADDING, renderItem, data }: ISliderProps<T>) {
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // 슬라이드 카드 너비 계산
  useEffect(() => {
    const calculateDimension = () => {
      if (current) {
        const totalGap = GAP * (SHOWN_COUNT - 1);
        const totalWidth = current.offsetWidth;
        const width = (totalWidth - totalGap - PADDING * 2) / SHOWN_COUNT;

        setCardWidth(width);
        setCardHeight(width * 0.8);
      }
    };
    calculateDimension();
    window.addEventListener('resize', calculateDimension);

    return () => {
      window.removeEventListener('resize', calculateDimension);
    };
  }, []);

  console.log(currentIndex);

  // 다음 슬라이드로 이동
  const handleNext = () => {
    if (currentIndex < data.length - SHOWN_COUNT) {
      setCurrentIndex((prev) => prev + SHOWN_COUNT);
      const canMove = cardWidth * SHOWN_COUNT + GAP * SHOWN_COUNT;
      setTranslateX((prev) => prev - canMove);
    }
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - SHOWN_COUNT);
      const canMove = cardWidth * SHOWN_COUNT + GAP * SHOWN_COUNT;
      setTranslateX((prev) => prev + canMove);
    }
  };

  return (
    <div className="relative w-full flex items-center">
      {/* 이전 버튼 */}
      {currentIndex !== 0 && (
        <motion.button
          onClick={handlePrev}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10  hover:bg-black/80 p-2  bottom-0 text-white rounded-br-[8px] rounded-tr-[8px]`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: PADDING - GAP, height: cardHeight }}
        >
          <ChevronLeft size={50} />
        </motion.button>
      )}

      {/* 슬라이드 카드 목록 */}
      <div
        className="flex gap-[5px] items-center"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.3s ease-in-out',
          paddingLeft: PADDING,
        }}
      >
        {data.map((item, index) => (
          <div key={index}>{renderItem(item, cardWidth, cardHeight)}</div>
        ))}
      </div>
      {/* 다음 버튼 */}

      {currentIndex < data.length - SHOWN_COUNT && (
        <motion.button
          onClick={handleNext}
          disabled={currentIndex >= data.length - SHOWN_COUNT}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10  hover:bg-black/80 p-2  bottom-0 text-white rounded-bl-[8px] rounded-tl-[8px]`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: PADDING - GAP, height: cardHeight }}
        >
          <ChevronRight size={50} />
        </motion.button>
      )}
    </div>
  );
}

export default Slider;
