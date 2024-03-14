export const cardAnimation = {
  exit: { opacity: 0, scale: 0.8 },
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

export const leftSideAnimation = {
  exit: { opacity: 0, x: '-100px' },
  initial: { opacity: 0, x: '-100px' },
  animate: { opacity: 1, x: 0 },
};

export const rightSideAnimation = {
  exit: { opacity: 0, x: '100px' },
  initial: { opacity: 0, x: '100px' },
  animate: { opacity: 1, x: 0 },
  transition: {
    opacity: { duration: 0.3, ease: 'easeInOut' },
    y: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const topAnimation = {
  exit: { opacity: 0, y: '-50px' },
  initial: { opacity: 0, y: '-50px' },
  animate: { opacity: 1, y: 0 },
};

export const bottomAnimation = {
  exit: { opacity: 0, y: '50px' },
  initial: { opacity: 0, y: '50px' },
  animate: { opacity: 1, y: 0 },
};
