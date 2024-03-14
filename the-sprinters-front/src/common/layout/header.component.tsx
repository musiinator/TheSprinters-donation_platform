import {
  Group,
  Button,
  Text,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Autocomplete,
  Select,
  Card,
  Flex,
  BackgroundImage,
  AppShell,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconPlus, IconSearch } from '@tabler/icons-react';
import { NextRouter, useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { useWindowDimensions } from '@/src/hooks/use-window-dimensions.hook';
import { cardAnimation, topAnimation } from '@/src/constants/animation.constants';
import { useAppDispatch, useAppSelector } from '@/src/hooks/general.hook';
import { logout } from '@/src/common/redux/reducers/authentication/authentication.reducer';
import { setInput } from '@/src/common/redux/reducers/charity-case/charity-case.reducer';
import useStorage from '@/src/hooks/use-storage.hook';
import { ACCOUNT } from '@/src/constants/general.constants';
import { StorageType } from '@/src/enums/StorageType';

const { motion } = require('framer-motion');

const headerClassses = (isMobile: boolean) => ({
  cardStyles: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: rem(6),
  },
  headerStyles: {
    height: rem(60),
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  linkStyles: {
    padding: '2%',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: '18px',
    paddingRight: '18px',
    fontWeight: 500,
    fontSize: '15px',
    cursor: 'pointer',
  },
  groupButtonStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  logoContainerStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  iconStyles: {
    width: rem(20),
    height: rem(20),
    marginTop: rem(2),
    marginRight: rem(5),
  },
  flexStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
});

function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router: NextRouter = useRouter();
  const { isMobile } = useWindowDimensions();
  const classes = headerClassses(isMobile);
  const [isHoveredAboutUs, setIsHoveredAboutUs] = useState(false);
  const [isHoveredMyAccount, setIsHoveredMyAccount] = useState(false);
  const [isHoveredNewCase, setIsHoveredNewCase] = useState(false);
  const [isHoveredLogOut, setIsHoveredLogOut] = useState(false);
  const { getItem } = useStorage();
  const [isHoveredShowDonations, setIsHoveredShowDonations] = useState(false);

  const loggedInUser = getItem(ACCOUNT, StorageType.LOCAL);
  const loggedInUserType = loggedInUser ? JSON.parse(loggedInUser).userType : '';
  console.log(loggedInUserType);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  const handleNavigation = (path: string): void => {
    router.push(path);
  };

  const handleInputChanged = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    dispatch(setInput(value));
  };

  const handleLogOut = () => {
    router.push('/');
    dispatch(logout());
  };

  const handleLogIn = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div>
      <motion.div
        variants={topAnimation}
        initial="initial"
        animate="animate"
        transition={{
          ease: 'easeOut',
          duration: 0.5,
        }}
        exit="exit"
      >
        <header style={classes.headerStyles}>
          {isMobile ? (
            <Group h="100%" justify="space-between">
              <Group
                style={classes.logoContainerStyles}
                onClick={() => (window.location.href = '/')}
              >
                <img src="donation.png" alt="Logo" height={40} />
                <Text>CHANGE LIVES!</Text>
              </Group>
              <Burger opened={drawerOpened} onClick={toggleDrawer} />
              <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                title="Menu"
                hiddenFrom="sm"
              >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                  <Divider my="sm" />

                  <Group style={classes.groupButtonStyle}>
                    {isAuthenticated ? (
                      <>
                        <Autocomplete
                          style={{
                            width: 850,
                          }}
                          placeholder="Search charity cases"
                          leftSection={<IconSearch />}
                          onInput={(event) => {
                            handleInputChanged(event);
                          }}
                        />
                        {loggedInUserType.toLowerCase() === 'organisation' ? (
                          <Button
                            onClick={() => handleNavigation('/add-charitycase')}
                            variant="filled"
                            color=""
                            style={{
                              color: isHoveredNewCase ? 'white' : '#0095ff',
                              backgroundColor: isHoveredNewCase ? '#0095ff' : 'white',
                              border: '2px solid #0095ff',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={() => {
                              setIsHoveredNewCase(true);
                            }}
                            onMouseLeave={() => {
                              setIsHoveredNewCase(false);
                            }}
                          >
                            <IconPlus
                              style={{
                                filter: isHoveredNewCase ? 'invert(0)' : '',
                              }}
                            >
                            </IconPlus>
                            New case
                          </Button>
                        ) : (
                          <></>
                        )}
                        <Card
                          shadow="sm"
                          radius="md"
                          style={{
                            ...classes.cardStyles,
                            backgroundColor: isHoveredAboutUs ? '#20b2aa' : 'white',
                          }}
                          onMouseEnter={() => setIsHoveredAboutUs(true)}
                          onMouseLeave={() => setIsHoveredAboutUs(false)}
                          onClick={() => handleNavigation('/about-us')}
                        >
                          <Flex>
                            <img
                              style={{
                                ...classes.iconStyles,
                                filter: isHoveredAboutUs ? 'invert(1)' : 'invert(0)',
                              }}
                              src="about-us/icon.png"
                            >
                            </img>
                            <Text style={{ color: isHoveredAboutUs ? 'white' : 'black' }}>
                              About us
                            </Text>
                          </Flex>
                        </Card>
                        <Card
                          shadow="sm"
                          radius="md"
                          variant="gradient"
                          style={{
                            ...classes.cardStyles,
                            backgroundColor: isHoveredMyAccount ? '#ff8c00' : 'white',
                          }}
                          onMouseEnter={() => setIsHoveredMyAccount(true)}
                          onMouseLeave={() => setIsHoveredMyAccount(false)}
                          onClick={() => handleNavigation('')}
                        >
                          <Flex>
                            <img
                              style={{
                                ...classes.iconStyles,
                                filter: isHoveredMyAccount ? 'invert(1)' : 'invert(0)',
                              }}
                              src="my-account/icon.png"
                            >
                            </img>
                            <Text style={{ color: isHoveredMyAccount ? 'white' : 'black' }}>
                              My account
                            </Text>
                          </Flex>
                        </Card>
                        <Button
                          onClick={handleLogOut}
                          variant="outline"
                          color="red"
                          style={{
                            border: '2px solid red',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.backgroundColor = 'red';
                            event.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.backgroundColor = 'white';
                            event.currentTarget.style.color = 'red';
                          }}
                        >
                          <IconLogout
                            style={{
                              marginRight: '3px',
                              filter: isHoveredLogOut ? 'invert(1)' : 'invert(0)',
                            }}
                          />
                          Log out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="gradient"
                          gradient={{
                            from: 'blue',
                            to: 'cyan',
                            deg: 45,
                          }}
                          onClick={handleLogIn}
                        >
                          Log in
                        </Button>
                        <Button
                          variant="gradient"
                          gradient={{
                            from: 'blue',
                            to: 'cyan',
                            deg: 45,
                          }}
                          onClick={handleSignUp}
                        >
                          Sign up
                        </Button>
                      </>
                    )}
                  </Group>
                </ScrollArea>
              </Drawer>
            </Group>
          ) : (
            <Group h="100%" justify="space-between">
              <div style={classes.logoContainerStyles} onClick={() => (window.location.href = '/')}>
                <img src="donation.png" alt="Logo" height={40} />
                <Text>CHANGE LIVES!</Text>
              </div>
              <Group style={classes.groupButtonStyle}>
                {isAuthenticated ? (
                  <>
                    <Autocomplete
                      style={{
                        width: 850,
                      }}
                      placeholder="Search charity cases"
                      leftSection={<IconSearch />}
                      onInput={(event) => {
                        handleInputChanged(event);
                      }}
                    />
                    {loggedInUserType.toLowerCase() === 'organization' ? (
                      <Button
                        onClick={() => handleNavigation('/add-charitycase')}
                        variant="filled"
                        color=""
                        style={{
                          color: isHoveredNewCase ? 'white' : '#0095ff',
                          backgroundColor: isHoveredNewCase ? '#0095ff' : 'white',
                          border: '2px solid #0095ff',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={() => {
                          setIsHoveredNewCase(true);
                        }}
                        onMouseLeave={() => {
                          setIsHoveredNewCase(false);
                        }}
                      >
                        <IconPlus
                          style={{
                            filter: isHoveredNewCase ? 'invert(0)' : '',
                          }}
                        >
                        </IconPlus>
                        New case
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Card
                      shadow="sm"
                      radius="md"
                      style={{
                        ...classes.cardStyles,
                        backgroundColor: isHoveredAboutUs ? '#20b2aa' : 'white',
                      }}
                      onMouseEnter={() => setIsHoveredAboutUs(true)}
                      onMouseLeave={() => setIsHoveredAboutUs(false)}
                      onClick={() => handleNavigation('/about-us')}
                    >
                      <Flex>
                        <img
                          style={{
                            ...classes.iconStyles,
                            filter: isHoveredAboutUs ? 'invert(1)' : 'invert(0)',
                          }}
                          src="about-us/icon.png"
                        >
                        </img>
                        <Text style={{ color: isHoveredAboutUs ? 'white' : 'black' }}>
                          About us
                        </Text>
                      </Flex>
                    </Card>
                    <Card
                      shadow="sm"
                      radius="md"
                      style={{
                        ...classes.cardStyles,
                        backgroundColor: isHoveredShowDonations ? '#F6C324' : 'white',
                      }}
                      onMouseEnter={() => setIsHoveredShowDonations(true)}
                      onMouseLeave={() => setIsHoveredShowDonations(false)}
                      onClick={() => handleNavigation('/show-donations')}
                    >
                      <Flex>
                        <img
                          style={{
                            ...classes.iconStyles,
                            filter: isHoveredShowDonations ? 'invert(1)' : 'invert(0)',
                          }}
                          src="about-us/icon.png"
                        >
                        </img>
                        <Text style={{ color: isHoveredShowDonations ? 'white' : 'black' }}>
                          My donations
                        </Text>
                      </Flex>
                    </Card>
                    <Card
                      shadow="sm"
                      radius="md"
                      variant="gradient"
                      style={{
                        ...classes.cardStyles,
                        backgroundColor: isHoveredMyAccount ? '#ff8c00' : 'white',
                      }}
                      onMouseEnter={() => setIsHoveredMyAccount(true)}
                      onMouseLeave={() => setIsHoveredMyAccount(false)}
                      onClick={() => handleNavigation('')}
                    >
                      <Flex>
                        <img
                          style={{
                            ...classes.iconStyles,
                            filter: isHoveredMyAccount ? 'invert(1)' : 'invert(0)',
                          }}
                          src="my-account/icon.png"
                        >
                        </img>
                        <Text style={{ color: isHoveredMyAccount ? 'white' : 'black' }}>
                          My account
                        </Text>
                      </Flex>
                    </Card>
                    <Button
                      onClick={handleLogOut}
                      variant="outline"
                      color="red"
                      style={{
                        border: '2px solid red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.backgroundColor = 'red';
                        event.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = 'white';
                        event.currentTarget.style.color = 'red';
                      }}
                    >
                      <IconLogout
                        style={{
                          marginRight: '3px',
                          filter: isHoveredLogOut ? 'invert(1)' : 'invert(0)',
                        }}
                      />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="gradient"
                      gradient={{
                        from: 'blue',
                        to: 'cyan',
                        deg: 45,
                      }}
                      onClick={handleLogIn}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="gradient"
                      gradient={{
                        from: 'blue',
                        to: 'cyan',
                        deg: 45,
                      }}
                      onClick={handleSignUp}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Group>
            </Group>
          )}
        </header>
      </motion.div>
    </div>
  );
}

export default Header;
