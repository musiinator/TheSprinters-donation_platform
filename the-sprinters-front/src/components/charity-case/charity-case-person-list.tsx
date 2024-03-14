import { Modal, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PersonCard from './charity-case-person-card.component';
import { Person } from '@/src/interfaces/person.interface';
import ValidationPopup from '../ValidationPopup';

interface PersonListModalProps {
    onClose: () => void;
    onSubmit: (personData: Person[]) => void;
    initialData: Person[];
}

const classes = {
    buttonStyles: {
        background: 'linear-gradient(to right, #4CAF50, #8BC34A)', color: '#fff', width: "60%", marginLeft: "20%", marginBottom: "5%", marginTop: "5%"
    },
    errorMessageStyles: {
        color: 'red', marginTop: '10px', textAlign: 'center' as const,
    },
};

const PersonListModal: React.FC<PersonListModalProps> = ({onSubmit, onClose, initialData}) => {
  
    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [personData, setPersonData] = useState<Person[]>(initialData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationPopup, setValidationPopup] = useState<{ type: 'success' | 'error', message: string } | null>(null);


    const handlePersonDataChange = (index: number, updatedPerson: Person): void => {
        const updatedPersonData = [...personData];
        updatedPersonData[index] = updatedPerson;
        setPersonData(updatedPersonData);
    };

    const handleSubmit = (): void => {
        // verify each Person has all fields filled out
        personData.forEach((person) => {
            if (person.firstName === '' || person.lastName === '' || person.age === 0 || person.description === '') {
                setValidationPopup({ type: 'error', message: 'Please fill out all fields.' });
                return;
            }
        });
        setSlowTransitionOpened(false);
        onSubmit(personData);
    }

    useEffect((): void => {
        setSlowTransitionOpened(true);
    }, []);

  return (
    <>
      <Modal 
        centered 
        onClose={() => onClose()} 
        opened={slowTransitionOpened} 
        shadow='xl'
        size="45%" 
        transitionProps={{ 
                transition: 'slide-up', 
                duration: 500 
            }} 
        overlayProps={{
                style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.70)'
                }
            }} 
        closeButtonProps={{
                style: {
                        color: 'darkcyan',
                        marginRight: '10px', 
                        marginTop: '10px'
                    },
                title: 'Close', 
                size: "xl"
            }} 
        withOverlay >
            {personData.map((person, index) => (
                <div style={{margin: '8%'}}>
                    <PersonCard
                        data={person}
                        onChange={(updatedPerson) => handlePersonDataChange(index, updatedPerson)}
                    />
                </div>
                ))}
            {errorMessage &&
                <ValidationPopup
                    type={validationPopup.type}
                    message={validationPopup.message}
                    onClose={() => setValidationPopup(null)}
                />
            }
            <Button onClick={handleSubmit} style={classes.buttonStyles}>
                Save
            </Button>
      </Modal>

    </>
  );
}

export default PersonListModal;