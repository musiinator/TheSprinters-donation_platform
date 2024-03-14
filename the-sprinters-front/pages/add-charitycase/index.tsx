import React, { useState, useReducer } from 'react';
import {
  Container,
  Title,
  Group,
  Button,
  Image,
  rem,
  useMantineTheme,
  TextInput,
  FileInput,
  Slider,
  Input,
} from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import PersonListModal from '@/src/components/charity-case/charity-case-person-list';
import { GenderEnum, Person } from '@/src/interfaces/person.interface';
import { NextRouter, useRouter } from 'next/router';
import ValidationPopup from '@/src/components/ValidationPopup';
import { useAppDispatch, useAppSelector } from '@/src/hooks/general.hook';
import { saveCharityCase } from '@/src/common/redux/reducers/authentication/add-charity-case.reducer';
import { Organization } from '@/src/interfaces/organization';
import { RootState } from '@/src/common/redux/store';
import useStorage from '@/src/hooks/use-storage.hook';
import { ACCOUNT } from '@/src/constants/general.constants';
import { StorageType } from '@/src/enums/StorageType';

export interface FormData {
  familyName: string;
  familyImage: string;
  nrChildren: number;
  nrBoys: number;
  nrGirls: number;
  organization: Organization;
  city: string;
  county: string;
  country: string;
  persons: Person[];
}

const AddCharityCasePageClasses = (theme) => ({
  containerStyles: {
    paddingTop: rem(80),
    position: 'relative',
    borderRadius: rem(8),
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
    background: theme.white,
    width: 'auto',
    marginTop: '60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
  },

  titleStyles: {
    marginBottom: rem(20),
    textAlign: 'center',
    color: theme.colors.blue[5],
  },

  formContainer: {
    maxWidth: rem(800), // Adjusted the max width for two columns
    margin: 'auto',
  },

  buttonStyles: {
    borderRadius: '8px',
    fontSize: '18px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '60px',
    margin: '50px',
    transition: 'background-color 0.5s ease',
    width: '100%',
  },
  imageStyles: {
    marginBottom: '30px',
    padding: "20%",
    marginLeft: "10px"
  },
  backgroundStyles: {
    backgroundImage: 'url(https://cf.ltkcdn.net/family/images/orig/200821-2121x1414-family.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.2,
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  sliderStyles: {
    width: '100%',
    marginTop: '5px',
  },
  track: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.red[1] : theme.colors.blue[1],
  },
  buttonFormStyles: {
    marginTop: '45px',
  }
});

export default function AddCharityCasePage() {
  const theme = useMantineTheme();
  const classes = AddCharityCasePageClasses(theme);
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const [imageValue, setImageValue] = useState<string>('');
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [validationPopup, setValidationPopup] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isPersonalListModalOpen, setIsPersonalListModalOpen] = useState(false);
  const authentication = useAppSelector((state: RootState) => state.authentication.isAuthenticated);
  const convertToOrganization = (data: any) => {
    return {
        name: data, 
        domain: "",
        description: "",
        location: "",
        email: "",
        logo: ""
    };
};
  const { getItem } = useStorage();
  const loggedInUser = getItem(ACCOUNT, StorageType.LOCAL);
  console.log(loggedInUser ? JSON.parse(loggedInUser).username : null)
  const organizationData: Organization = convertToOrganization(loggedInUser ? JSON.parse(loggedInUser).username : "")
  const [formData, setFormData] = useState<FormData>({
    familyName: '',
    familyImage: '',
    nrChildren: 0,
    nrBoys: 0,
    nrGirls: 0,
    organization: organizationData,
    city: '',
    county: '',
    country: '',
    persons: [],
  });

  

  const sliderReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'setNumberOfBoys':
        return { 
          ...state, 
          nrBoys: action.value, 
          nrChildren: action.value + state.nrGirls,
        };
      case 'setNumberOfGirls':
        return { 
          ...state, 
          nrGirls: action.value, 
          nrChildren: state.nrBoys + action.value,
        };
      default:
        return state;
    }
  };

  const [sliderState, dispatchSlider] = useReducer(sliderReducer, {
    nrBoys: 0,
    nrGirls: 0,
    nrChildren: 0,
  });

  const updatePersons = (nrBoys: number, nrChildren: number): void => {

        setFormData((prevData) => {
          const oldLength = prevData.persons.length;
          const newLength = nrChildren;
  
          if (newLength != oldLength) {
            // Add new persons if the new length is bigger than the old one 
            const newPersons = Array.from({ length: newLength }, (_, index) => ({
              firstName: '',
              lastName: '',
              age: 0,
              description: '',
              child: true,
              gender: index < nrBoys ? GenderEnum.MALE : GenderEnum.FEMALE,
              charityCaseId: 1,
            }));
            return { ...prevData, persons: newPersons };
          }
          return prevData; // If lengths are equal, no change needed
        });
}

  const handleSliderMouseDown = () => {
    setIsSliderDragging(true);
  }

  const handleSliderMouseUp = () => {
    setIsSliderDragging(false);
    updatePersons(sliderState.nrBoys, sliderState.nrChildren);
    formData.nrBoys = sliderState.nrBoys;
    formData.nrGirls = sliderState.nrGirls;
    formData.nrChildren = sliderState.nrChildren;
  }
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePersonDetailsButtonPressed = (): void => {
    console.log(isPersonalListModalOpen)
    formData.familyImage = imageValue ? imageValue : '';
    
    setIsPersonalListModalOpen(true);
  };

  const handlePersonDetailsSubmit = (personData: Person[]): void => {
      setFormData((prevData) => ({ ...prevData, persons: personData }));
  };


  const handleSubmit = (submittedFormData: FormData) : void => {
    console.log("Submitted form data:", submittedFormData)
    console.log("Organization:", submittedFormData.organization)
    const isFormDataValid = submittedFormData.familyName &&
                          submittedFormData.familyImage &&
                          submittedFormData.nrChildren > 0 &&
                          submittedFormData.city &&
                          submittedFormData.county &&
                          submittedFormData.country &&
                          submittedFormData.persons.length > 0 &&
                          submittedFormData.persons.every(person => 
                            person.firstName && person.lastName && person.age > 0
    );

    if (!isFormDataValid) {
      setValidationPopup({
        type: 'error',
        message: 'Please fill in all the fields before submitting!',
      });
      return;
    } else {
      setValidationPopup({
        type: 'success',
        message: 'Form submitted successfully!',
      });
      dispatch(saveCharityCase(submittedFormData));
      router.push('/')
    }
  }
  

  const imageIcon = <IconPhoto size={24} />;

  return (      
    <Container size="lg" style={classes.containerStyles}>
       <div
        style={classes.backgroundStyles}
        >
      </div>
      <Title order={1} style={classes.titleStyles}>
        Add Charity Case
        <Image 
          src="https://cdn-icons-png.flaticon.com/512/10184/10184706.png" 
          style={classes.imageStyles}
          />
      </Title>

      <div style={classes.formContainer}>
        <form>
          {/* Use Grid or Flexbox styling for a two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <TextInput
              label="Family name"
              placeholder="Family name"
              value={formData.familyName}
              onChange={handleInputChange}
              name="familyName"
              required
            />

            <TextInput
              label="Family image"
              rightSection={imageIcon}
              placeholder="Image URL"
              onChange={(e) => setImageValue(e.currentTarget.value)}
              name="familyImage"
              required
              style={{ width: '220px' }}
              />
              <label style={{ marginBottom: '8px' }}>Number of boys: {formData.nrBoys}</label>
              <Slider
                onChange={(value) => dispatchSlider({ type: 'setNumberOfBoys', value })}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                color="cyan"
                min={0}
                max={10}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                ]}
                style={{ marginTop: '10px' }}
                size={10}
              />
              <label style={{ marginBottom: '8px' }}>Number of girls: {formData.nrGirls}</label>
              <Slider
                onChange={(value) => dispatchSlider({ type: 'setNumberOfGirls', value })}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                color="red"
                min={0}
                max={10}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                ]}
                style={{ marginTop: '10px' }}
                size={10}
              />
            <TextInput
              label="City"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
              name="city"
              required
            />

            <TextInput
              label="County"
              placeholder="Enter county"
              value={formData.county}
              onChange={handleInputChange}
              name="county"
              required
            />

            <TextInput
              label="Country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleInputChange}
              name="country"
              required
            />

            <Button 
              style={classes.buttonFormStyles} 
              disabled={!formData.nrChildren} 
              onClick={handlePersonDetailsButtonPressed}>
              Enter person details
            </Button>
          </div>
          {isPersonalListModalOpen && (
              <PersonListModal
                onClose={() => setIsPersonalListModalOpen(false)}
                onSubmit={(personData) => {
                  console.log('Submitted person data:', personData);
                  handlePersonDetailsSubmit(personData);
                  setIsPersonalListModalOpen(false);
                }}
                initialData={formData.persons}
              />
          )}
          <Group justify="center" align="center">
            <Button 
              style={classes.buttonStyles}
              disabled={!formData.nrChildren}
              onClick={() => handleSubmit(formData)}>
              Submit
            </Button>
          </Group>
          {validationPopup &&
            <ValidationPopup
                
                type={validationPopup.type}
                message={validationPopup.message}
                onClose={() => setValidationPopup(null)}
            />
          }
        </form>
      </div>
    </Container>
  );
}

