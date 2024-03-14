import React from 'react';
import { useState } from 'react';
import { Container, Title, Text, Group, Button, Image, rem, useMantineTheme, Badge, MantineTheme } from '@mantine/core';
import { Info, Users, Activity, Heart, User } from 'react-feather';
import { NextRouter, useRouter } from 'next/router';

const AboutUsPageClasses = (isMobile: boolean, theme: MantineTheme) => ({
  containerStyles: {
    paddingTop: rem(80),
    position: 'relative',
    borderRadius: rem(8),
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.4)',
    backgroundColor: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    zIndex: 1,
    padding: rem(40),
  },

  titleStyles: {
    fontSize: rem(50),
    marginBottom: rem(80),
    textAlign: 'center',
    color: theme.colors.blue[5],
    margin: rem(80),
  },

  textStyles: {
    marginBottom: rem(20),
    fontSize: rem(20),
    textAlign: 'justify',
    margin: rem(15),
  },

  buttonStyles: {
    borderRadius: '8px',
    fontSize: '20px',
    padding: '9px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: rem(30),
    width: '50%',
    height: '50px',
  },

  imageStyles: {
    width: '100%',
    margin: rem(50),
    borderRadius: rem(8),
  },

  backgroundImageStyles: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: rem(8),
    opacity: 0.6,
    zIndex: -1,
  },
  aboutUsContainerStyles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  column: {
    flex: '1 1 100%',
    width: '100%',
    maxWidth: '400px', // Adjust the width of each column as needed
    margin: rem(20),
  },
});
export default function AboutUsPage() {
  const [hovered, setHovered] = useState(false);
  
  const router: NextRouter = useRouter();
  
  const theme = useMantineTheme();
  const classes = AboutUsPageClasses(false, theme);

  function handleJoinUsClicked(): void {
    console.log('Join Us clicked')
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <>
      <div style={classes.backgroundImageStyles}>
        <Image src={`about-us/nationalities.png`} alt="Background Image" style={classes.backgroundImageStyles} />
      </div>

      <Container size="xl" style={classes.containerStyles}>
        <Title order={1} style={classes.titleStyles} >
          Welcome to CHANGE LIVES!
        </Title>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: rem(20) , padding: 10}}>
          <Image src="about-us/about-us-main.png" alt="About" style={classes.imageStyles} height={380}  />
          <Text style={classes.textStyles}>
              At CHANGE LIVES, we are on a mission o make a difference. Our commitment is to create positive change and foster generosity 
              within communities. Whether you are here to contribute by donating goods or seeking assistance, we invite you to join us in building a network 
              of support.
          </Text>
        </div>
        
        <div style={classes.aboutUsContainerStyles}>
          <div style={classes.column}>
            {/* Who are we? */}
            <Title order={2}>
              WHO ARE WE
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: rem(20) }}>
              <Text style={classes.textStyles}>
                We are a passionate team committed to making a positive impact on the lives of individuals and communities. Our
                mission is to foster generosity and create positive change through the donation of goods.
              </Text>
            </div>
          </div>
            
          <div style={classes.column}>
              {/* What do we do? */}
              <Title order={2}>
                WHAT DO WE DO
              </Title>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: rem(20) }}>
                
                <Text style={classes.textStyles}>
                  At CHANGE LIVES!, we connect donors with individuals and organizations facing hardships. Whether you have items
                  to give or are seeking assistance, our platform is designed to streamline the process and make a meaningful
                  impact.
                </Text>
              </div>
          </div>
            
          <div style={classes.column}>
              {/* Our Values */}
              <Title order={2}>
                OUR VALUES
              </Title>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: rem(20) }}>
                  
                  <Text style={classes.textStyles}>
                    Our values are rooted in community, generosity, and positive change. We believe that by coming together and
                    supporting one another, we can make a difference in the lives of those who need it most.
                  </Text>
                </div>
          </div>
        </div>
        <Group justify="center" align="center">
          <Button
            onClick={() => handleJoinUsClicked()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              ...classes.buttonStyles,
              backgroundColor: hovered ? theme.colors.teal[5] : theme.colors.red[5],
            }}
          >
            Join Us
          </Button>
        </Group>
      </Container>
    </>
  );
};