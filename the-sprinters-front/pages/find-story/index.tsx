import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Image,
  Text,
  Group,
  Avatar,
  Card,
  BackgroundImage,
  Button,
  Textarea,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import { Person } from '@/src/interfaces/person.interface';
import { STORY_CONTACT_MESSAGE, STORY_ENCOURAGE_MESSAGE } from '@/src/constants/general.constants';
import { MessageSquare } from 'react-feather';
import { IconBox } from '@tabler/icons-react';

const FindStoryPage: React.FC = () => {
  const router = useRouter();
  const [charityCase, setCharityCase] = useState<CharityCase | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);
  const [textOverflows, setTextOverflows] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charityCaseData: CharityCase = JSON.parse(router.query.charityCaseData as string);
        setCharityCase(charityCaseData);
      } catch (error) {
        console.error('Error fetching charity case data:', error);
      }
    };

    if (router.query.charityCaseData) {
      fetchData();
    }
  }, [router.query.charityCaseData]);

  if (!charityCase) {
    return <div>Loading...</div>;
  }

  const { familyName, organization, city, county, familyImage, persons } = charityCase;

  const toggleDescription = (index: number): void => {
    setExpandedDescriptions((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const handleTextOverflow = (index: number): void => {
    setTextOverflows((prev) => {
      const updatedOverflows = [...prev];
      updatedOverflows[index] = !prev[index];
      return updatedOverflows;
    });
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '$f0f0f0',
        }}
      >
      <Container
        size="lg"
        style={{
          width: '100%',
          paddingTop: 50,
        }}
      >
        <Card shadow="lg" radius="md" style={{ padding: 40 }}>
          <Group
            style={{
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <Avatar
              src={organization.logo}
              radius="xl"
              style={{
                width: '10%',
                height: '10%',
              }}
            />
            <div>
              <Text
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {organization.name}
              </Text>
              <Text
                style={{
                  fontSize: '1rem',
                  color: '#333',
                }}
              >
                {organization.description}
              </Text>
            </div>
          </Group>

          <Title
            order={1}
            style={{
              textAlign: 'center',
              marginBottom: 20,
              marginTop: 20,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            This is the story of the {familyName} family from {city}, {county}.
          </Title>
          <Image
            src={familyImage}
            alt={familyName}
            style={{
              width: '90%',
              height: '70%',
              borderRadius: 8,
              marginBottom: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 30,
              marginTop: 20,
            }}
          >
            {persons.map((person: Person, index: number) => (
              <Card
                key={index}
                shadow="lg"
                radius="md"
                style={{
                  width: 'calc(33.33% - 20px)',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  padding: 10,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Avatar
                  size="lg"
                  color="black"
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {person.firstName.toUpperCase()}
                </Avatar>
                <div>
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 10,
                    }}
                  >
                    {person.age} {Number(person.age) > 1 ? 'years' : 'year'} old | {person.gender} |{' '}
                    {person.child ? 'Child' : 'Adult'}
                  </Text>
                  <Text
                    id={`description-${index}`}
                    style={{
                      textAlign: 'justify',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                    }}
                  >
                    {expandedDescriptions.includes(index)
                      ? person.description
                      : truncateText(person.description, 175)}
                  </Text>
                  {textOverflows[index] && (
                    <Text
                      onClick={() => toggleDescription(index)}
                      style={{
                        color: '#0070f3',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      {expandedDescriptions.includes(index) ? 'Read Less' : 'Read More'}
                    </Text>
                  )}
                  {!expandedDescriptions.includes(index) &&
                    !textOverflows[index] &&
                    person.description.length > 175 && (
                      <Text
                        style={{
                          color: '#0070f3',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onMouseMove={() => handleTextOverflow(index)}
                      >
                        Read More
                      </Text>
                    )}
                </div>
              </Card>
            ))}
          </div>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            padding: 20,
            fontSize: '1.2rem',
            color: '#333',
            marginTop: 20,
          }}
        >
          {STORY_CONTACT_MESSAGE}{' '}
          <a
            href={`mailto:${organization.email}`}
            style={{
              color: '#0070f3',
              textDecoration: 'underline',
            }}
          >
            {organization.email}
          </a>
        </Text>
          <Text
            style={{
              textAlign: 'center',
              padding: 20,
              fontSize: '1.2rem',
              color: '#333',
            }}
          >
            {STORY_ENCOURAGE_MESSAGE}
          </Text>
          <div
          style={{textAlign: 'center'}}>
          <Button
            onClick={() =>
              router.push({
                pathname: '/donate-now',
                query: { charityCase: JSON.stringify(charityCase) },
              })
            }
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '10px',
            }}
          >
          <Text>
            Proceed to Donation
          </Text>
          </Button>
          </div>
        </Card>
      </Container>
      </div>
    </>
  );
};

export default FindStoryPage;
