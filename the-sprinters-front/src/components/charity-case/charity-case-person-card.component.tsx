import React, { useState } from 'react';
import { Card, createTheme, TextInput, NumberInput, Textarea, Checkbox, MantineProvider } from "@mantine/core";
import { GenderEnum, Person } from '@/src/interfaces/person.interface';

interface PersonCardProps {
    data: Person;
    onChange: (updatedPerson: Person) => void;
};

const classes = {
    cardStyles: {
      padding: '60px',
      backgroundColor: '#fff',
      borderRadius: '20px',
      border: '2px solid #ccc',
      boxShadow: '2px 29px 29px rgba(0, 0, 0, 0.2)',
    },
  };

  const theme = createTheme({
    cursorType: 'pointer',
  });

 

const PersonCard: React.FC<PersonCardProps> = ({ data, onChange}: PersonCardProps) => {
    const [firstNameValue, setFirstName] = useState(data.firstName);
    const [lastNameValue, setLastName] = useState(data.lastName);
    const [ageValue, setAge] = useState<number | string>(data.age);
    const [descriptionValue, setDescription] = useState(data.description);
    const [childValue, setChild] = useState<boolean>(data.child);

    const [checked, setChecked] = useState(false);
    
    const handleAgeChange = (value: number | string) => {
        setAge(value);
        handleInputChange('age', value);
    };

    const handleChildChange = (value: boolean) => {
        setChild(value);
        handleInputChange('child', value);
    }

    const handleInputChange = (name: keyof Person, value: string | number | boolean): void => {
        const updatedPerson = { ...data, [name]: value };
        onChange(updatedPerson);
      };

    return (
        <Card  style={classes.cardStyles}>
            <div style={{ marginBottom: '12px' }}>
            <TextInput
                variant='filled'
                label="First Name"
                placeholder="Type first name..."
                value={firstNameValue}
                onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                    handleInputChange('firstName', event.currentTarget.value);
                  }}
                style={{ marginBottom: '8px' }}
                required
            />
            <TextInput
                variant='filled'
                label="Last Name"
                placeholder="Type last name..."
                value={lastNameValue}
                onChange={(event) => {
                    setLastName(event.currentTarget.value);
                    handleInputChange('lastName', event.currentTarget.value);
                  }}
                style={{ marginBottom: '8px' }}
                required
            />
            <NumberInput
                variant='filled'
                label="Age"
                placeholder="Enter age..."
                value={ageValue}
                onChange={(event) => handleAgeChange(event)}
                style={{ marginBottom: '8px' }}
                required
            />
            <Textarea
                variant='filled'
                label="Description"
                placeholder="Type description..."
                value={descriptionValue}
                autosize
                minRows={3}
                maxRows={4}
                onChange={(event) => {
                    setDescription(event.currentTarget.value);
                    handleInputChange('description', event.currentTarget.value);
                  }}
                required
            />
            <MantineProvider theme={theme}>
                <Checkbox
                    label="Is a child"
                    checked={childValue}
                    radius="lg"
                    size="md"
                    onChange={(event) => {
                        handleChildChange(event.currentTarget.checked); 
                        setChecked(event.currentTarget.checked);
                    }}
                    style={{ marginTop: '10px' }}
                    wrapperProps={{
                        onClick: () => setChecked((c) => !c),
                    }}
                />
            </MantineProvider>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {data.gender === GenderEnum.MALE && (
                        <img
                        src="person-gender/man_gender.png"
                        alt="Boy"
                        style={{ width: '60px', height: '60px' }}
                        />
                    )}

                {data.gender === GenderEnum.FEMALE && (
                    <img
                    src="person-gender/female_gender.png"
                    alt="Girl"
                    style={{ width: '60px', height: '60px' }}
                    />
                )}
        </div>
    </Card>
    );
};

export default PersonCard;