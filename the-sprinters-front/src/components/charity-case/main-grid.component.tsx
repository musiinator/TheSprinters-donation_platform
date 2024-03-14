import { SimpleGrid } from '@mantine/core';
import { useEffect } from 'react';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import { CharityCaseCard } from './charity-case-card.component';
import { useWindowDimensions } from '@/src/hooks/use-window-dimensions.hook';

const styleClasses = (isMobile: boolean) => {
  if (isMobile) {
    return {
      paddingTop: '100px',
      maxWidth: '80vw',
      marginBottom: '150px',
      maxHeight: '50vh',
      margin: '0 auto',
    };
  }
  return {
    paddingTop: '100px',
    marginBottom: '150px',
    maxWidth: '55vw',
    maxHeight: '140vh',
    margin: '0 auto',
  };
};

export default function CharityGrid({ charityCases }: { charityCases: CharityCase[] }) {
  const { isMobile } = useWindowDimensions();

  return (
    <SimpleGrid cols={1} spacing="1.5rem" style={styleClasses(isMobile)}>
      {charityCases.map((charityCase) => (
        <CharityCaseCard charityCase={charityCase} key={charityCase.id} />
      ))}
    </SimpleGrid>
  );
}
