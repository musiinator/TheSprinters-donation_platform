import {ActionIcon, Avatar, Button, Card, Flex, Group, HoverCard, Text} from '@mantine/core';
import Image from 'next/image';
import {IconClipboardHeart, IconHeart, IconMapPin} from '@tabler/icons-react';
import {useEffect, useState} from 'react';
import {NextRouter, useRouter} from 'next/router';
import {CharityCase} from '@/src/interfaces/charity-case.interfaces';
import {useWindowDimensions} from '@/src/hooks/use-window-dimensions.hook';
import {GenderEnum} from '@/src/interfaces/person.interface';
import {leftSideAnimation, rightSideAnimation, topAnimation} from "@/src/constants/animation.constants";

const {motion} = require('framer-motion')

const styleClasses = (isMobile: boolean) => {
    if (!isMobile) {
        return {
            'flex-card': {
                flexDirection: 'row',
            },
            'flex-card-image': {
                objectFit: 'cover',
            },
            'flex-card-right': {
                flexDirection: 'column',
            },
            'flex-card-right-group-title': {
                paddingLeft: '14.8rem',
                gap: '0.6rem',
            },
            'family-text': {
                fontSize: '1.3rem',
                fontWeight: 'bold',
                letterSpacing: '0.2rem',
                textTransform: 'uppercase',
                lineHeight: '1.5rem',
            },
            'flex-card-right-flex-other': {
                flexDirection: 'row',
                paddingLeft: '1.5rem',
                paddingTop: '2rem',
                alignItems: 'center',
                gap: '2rem',
            },
            'flex-card-right-flex-other-flex-other-descr': {
                flexDirection: 'column',
                width: '15rem',
                height: '9rem',
                gap: '0.6rem',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
            },
            'flex-card-right-flex-other-flex-other-buttons': {
                flexDirection: 'column',
                gap: '0.5rem',
                width: '21rem',
                marginLeft: '1.5rem',
            },
        };
    }

    return {
        'flex-card': {
            flexDirection: 'column',
        },
        'flex-card-image': {
            objectFit: 'cover',
            marginLeft: '5rem',
            marginTop: '1rem',
        },
        'flex-card-right': {
            flexDirection: 'column',
        },
        'flex-card-right-group-title': {
            marginTop: '2rem',
            gap: '0.6rem',
            alignItems: 'center',
            paddingLeft: '0.5rem',
            justifyContent: 'center',
        },
        'family-text': {
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: '0.2rem',
            textTransform: 'uppercase',
            lineHeight: '1.5rem',
        },
        'flex-card-right-flex-other': {
            flexDirection: 'column',
            marginTop: '1rem',
            alignItems: 'center',
            gap: '2rem',
        },
        'flex-card-right-flex-other-flex-other-descr': {
            flexDirection: 'column',
            width: '100%',
            gap: '0.6rem',
            paddingLeft: '15vw',
            alignItems: 'flex-start',
        },
        'flex-card-right-flex-other-flex-other-buttons': {
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            marginBottom: '1rem',
        },
        buttons: {
            margin: '0 2rem',
        },
    };
};

export function CharityCaseCard({charityCase}: { charityCase: CharityCase }) {
    const {isMobile} = useWindowDimensions();
    const router: NextRouter = useRouter();
    const classes = styleClasses(isMobile);
    const [infoCase, setInfoCase] = useState({
        minAge: 0,
        maxAge: 0,
        nrGirls: 0,
        nrBoys: 0,
    });

    useEffect(() => {
        if (charityCase.persons) {
            setInfoCase({
                minAge: charityCase.persons.reduce(
                    (min, p) => (Number(p.age) < min && p.child ? p.age : min),
                    100
                ),
                maxAge: charityCase.persons.reduce(
                    (max, p) => (Number(p.age) > max && p.child ? p.age : max),
                    0
                ),
                nrBoys: charityCase.persons.reduce(
                    (nr, p) => (p.gender === GenderEnum.MALE && p.child ? nr + 1 : nr),
                    0
                ),
                nrGirls: charityCase.persons.reduce(
                    (nr, p) => (p.gender === GenderEnum.FEMALE && p.child ? nr + 1 : nr),
                    0
                ),
            });
        }
    }, []);

    const handleOnFindStoryClicked = async (
        path: string,
        charityCase: CharityCase
    ): Promise<void> => {
        try {
            await router.push({
                pathname: path,
                query: {charityCaseData: JSON.stringify(charityCase)},
            });
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleOnDonateNowClicked = (path: string): void => {
        console.log('Donate-now button clicked');
        router.push({
            pathname: path,
            query: {charityCase: JSON.stringify(charityCase)},
        });
    };

    return (
        <motion.div
            variants={charityCase.id % 2 === 0 ? leftSideAnimation : rightSideAnimation}
            initial="initial"
            animate="animate"
            transition={{ ease: "easeOut", duration: 0.7 }}
            exit="exit"
        >
            <Card shadow="md" radius="md" withBorder p="lg">
                {/*---------CONTAINER CARD-------------*/}

                <Flex style={classes['flex-card']}>
                    <Image
                        src={charityCase.familyImage}
                        alt={charityCase.familyName}
                        width="280"
                        height="250"
                        style={classes['flex-card-image']}
                    />

                    {/*----CONTAINER TEXT CARD--------*/}

                    <Flex style={classes['flex-card-right']}>
                        <Group style={classes['flex-card-right-group-title']}>
                            <HoverCard width={220} shadow="md" withArrow openDelay={150} closeDelay={400}>
                                <HoverCard.Target>
                                    <Avatar src={charityCase.organization.logo} radius="xl"/>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Group gap="xs">
                                        <Avatar src={charityCase.organization.logo} radius="xl"/>
                                        <Text>{charityCase.organization.name}</Text>
                                    </Group>
                                </HoverCard.Dropdown>
                            </HoverCard>

                            <Text style={classes['family-text']}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                {charityCase.familyName}'s Family
                            </Text>
                        </Group>

                        {/*-------CONTAINER DESCRIERE CARD DESCR+BUTOANE--------------*/}

                        <Flex style={classes['flex-card-right-flex-other']}>
                            {/*----------CONTAINER DESCR-------------*/}
                            <Flex style={classes['flex-card-right-flex-other-flex-other-descr']}>
                                <Group style={{gap: '0.4rem'}}>
                                    <ActionIcon color="#466a04">
                                        <IconMapPin/>
                                    </ActionIcon>
                                    <Text>
                                        {charityCase.city}, {charityCase.county}
                                    </Text>
                                </Group>
                                <Group style={{gap: '0.4rem'}}>
                                    <ActionIcon color="#dcbd08">
                                        <IconClipboardHeart/>
                                    </ActionIcon>
                                    <Text>
                                        {charityCase.nrChildren} Children: {infoCase.minAge}-{infoCase.maxAge} years
                                    </Text>
                                </Group>
                                <Group style={{gap: '0.4rem'}}>
                                    {infoCase.nrGirls > 0 && (
                                        <>
                                            <ActionIcon color="pink">
                                                <IconHeart/>
                                            </ActionIcon>
                                            <Text>
                                                {infoCase.nrGirls} {infoCase.nrGirls > 1 ? 'Girls' : 'Girl'}
                                            </Text>
                                        </>
                                    )}
                                    {infoCase.nrBoys > 0 && (
                                        <>
                                            <ActionIcon color="blue">
                                                <IconHeart/>
                                            </ActionIcon>
                                            <Text>
                                                {infoCase.nrBoys} {infoCase.nrBoys > 1 ? 'Boys' : 'Boy'}
                                            </Text>
                                        </>
                                    )}
                                </Group>
                            </Flex>

                            {/*--------CONTAINER BUTOANE----------------*/}
                            <Flex style={classes['flex-card-right-flex-other-flex-other-buttons']}>
                                <Button
                                    color="#20b2aa"
                                    style={classes.buttons}
                                    onClick={() => {
                                        console.log('clicked');
                                        handleOnFindStoryClicked('/find-story', charityCase);
                                    }}
                                >
                                    <Text
                                        style={{
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Find their story
                                    </Text>
                                </Button>
                                <Button
                                    style={classes.buttons}
                                    color="#ff8c00"
                                    onClick={() => handleOnDonateNowClicked('/donate-now')}
                                >
                                    <Text style={{textTransform: 'uppercase'}}>Donate Now</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </motion.div>
    );
}
