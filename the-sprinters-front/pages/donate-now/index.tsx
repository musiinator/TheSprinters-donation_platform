import React, { useEffect, useState } from "react";
import { Card, Image, Text, Flex, Button, Textarea, Switch, useMantineTheme, rem, Modal } from "@mantine/core";
import { IconAssembly, IconMan, IconMapPin, IconPackageExport } from '@tabler/icons-react';
import { NextRouter, useRouter } from "next/router";
import { CharityCase } from "@/src/interfaces/charity-case.interfaces";
import ValidationPopup from "@/src/components/ValidationPopup";
import PersonalInfoComponent from "@/src/components/donate-now/personal-info-component";
import { ADDITIONAL_INFORMATION } from "@/src/constants/general.constants";
import { useAppDispatch } from "@/src/hooks/general.hook";
import { donateNow } from "@/src/common/redux/reducers/authentication/donation.reducer";
import { DeliveryInfo } from "@/src/interfaces/delivery-info.interface";
import { Donation } from "@/src/interfaces/donation.interface";
import { DeliveryCompany } from "@/src/enums/DeliveryCompany";
import { DeliveryMethod } from "@/src/enums/DeliveryMethod";

const classes = {
    mainContainer: {
      display: "flex",
      backgroundColor: "#f0f0f0",
    },
    secondContainer: {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
        maxWidth: "800px",
        margin: "100px auto 50px auto", // Top, Right, Bottom, Left
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: rem(8),
    },
    welcomeText: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#3E4095',
        textAlign: 'center', 
    },
    donationItemsContainer: {
        marginTop: 30,
        justifyContent: "center", 
    },
    donationItemCard: {
        padding: "5px",
    },
    additionalInfoText: {
        marginTop: 70,
        textAlign: "center", 
    },
    additionalInfoTextarea: {
        marginTop: "10px",
        width: "100%", 
        height: "90px",
    },
    deliveryMethodSwitchContainer: {
        justifyContent: "center", 
        marginTop: "20px",
    },
    donateNowButtonContainer: {
        height: 70,
        justifyContent: "center", 
        marginTop: "20px",
    },
    donateNowButton: {
      background: 'linear-gradient(to right, #FFC107, #FF9800)', color: '#fff', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' as const,
    },
    leftDecrementButton: {
        background: 'linear-gradient(to top right, #FFC707, #FF9800)', color: '#fff', marginRight: '6px', marginLeft: '14px',
    },
    rightIncrementButton: {
        background: 'linear-gradient(to right, #4CAF50, #8BC34A)', color: '#fff', marginLeft: '6px',
    },
    switchButtonStyles: { marginLeft: "10px" },
  };

const DonateNowPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();
    const router: NextRouter = useRouter();
    const [note, setNote] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.PERSONAL);
    const [charityCase, setCharityCase] = useState<CharityCase>();
    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        id: "",
        name: "",
        address: "",
        phoneNumber: "",
        deliveryCompany: "CARGUS" as DeliveryCompany,
    });
    const donationItems = [
        { id: 1, name: "Clothes", image: "donate-now/clothes.png" },
        { id: 2, name: "Food", image: "donate-now/food.png" },
        { id: 3, name: "Toys", image: "donate-now/toys.png" },
        { id: 4, name: "Books", image: "donate-now/books.png" },
        { id: 5, name: "Shoes", image: "donate-now/shoes.png" },
        { id: 6, name: "Electronics", image: "donate-now/electronics.png" },
    ];
    const [donation, setDonation] = useState<Donation>({
        note: "",
        donationDate: "",
        deliveryMethod: DeliveryMethod.PERSONAL,
        items: donationItems.map((item) => ({ name: item.name, quantity: 0 })),
        deliveryInfo: deliveryInfo,
        charityCase: charityCase,
    } as Donation);
    const [validationPopup, setValidationPopup] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handlePersonalInfoSubmit = (data: DeliveryInfo): void => {
        setDonation(prevDonation => ({
            ...prevDonation,
            deliveryInfo: data,
        }));
    };

    const handleSwitchChange = (): void => {
        setDonation(prevDonation => {
            const newDeliveryMethod = prevDonation.deliveryMethod === DeliveryMethod.PERSONAL ? DeliveryMethod.COURIER : DeliveryMethod.PERSONAL;
            setIsPersonalInfoOpen(newDeliveryMethod === DeliveryMethod.COURIER);
            return {
                ...prevDonation,
                deliveryMethod: newDeliveryMethod,
            };
        });
    };

    useEffect((): void => {
        const charityCaseData = router.query.charityCase as string;
        if (charityCaseData) {
            const parsedCharityCase = JSON.parse(charityCaseData);
            setDonation(prevDonation => ({
                ...prevDonation,
                charityCase: parsedCharityCase,
            }));
        }
    }, [router.query.charityCase]);

    const handleIncrement = (itemName: string): void => {
        console.log(itemName);
        setDonation(prevDonation => ({
            ...prevDonation,
            items: prevDonation.items.map(item =>
                item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
            ),
        }));
    };

    const handleDecrement = (itemName: string): void => {
        setDonation(prevDonation => ({
            ...prevDonation,
            items: prevDonation.items.map(item =>
                item.name === itemName ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            ),
        }));
    };

    const PersonalDelivery: React.JSX.Element = (
        <IconMan
            style={{ width: rem(30), height: rem(25) }}
            stroke={2.5}
            color={theme.colors.green[5]}
        />
    );

    const CourierDelivery: React.JSX.Element = (
        <IconMapPin
            style={{ width: rem(20), height: rem(20) }}
            stroke={2.5}
            color={theme.colors.red[7]}
        />
    );

    function handleOnDonateNowClick(donation: Donation): void {
        setDonation(prevDonation => ({
            ...prevDonation,
            note: note,
            // ... other fields if needed
        }));
        console.log(donation);
        // TODO: Send the data to the backend or something
        const atLeastOneItemValid = donation.items.some(item => item.quantity > 0);
        // validate that if switch button is on courier delivery, then personal info is filled
        const isPersonalInfoValid = donation.deliveryMethod === DeliveryMethod.PERSONAL || 
                               (donation.deliveryMethod === DeliveryMethod.COURIER && 
                                donation.deliveryInfo.name !== "" && 
                                donation.deliveryInfo.address !== "" && 
                                donation.deliveryInfo.phoneNumber !== "");

        if (atLeastOneItemValid && isPersonalInfoValid) {
            // TODO: Send the data to the backend or perform other actions
            console.log(note)
            console.log("Donation successful! Sending data to the backend...");
            //dispatch the donation
            dispatch(donateNow(donation));
            setValidationPopup({ type: 'success', message: 'Hooray! Your donation has been submitted successfully. Thank you for making a positive impact!' });
            //redirect to main url
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            console.error("Error: At least one item must have a count greater than 0.");
            setValidationPopup({ type: 'error', message: `Please select at least one item to donate. Don't forget to finish the personal information form. Your generosity makes a difference!` });
        }
    };



    function handleNoteChange(value: string): void {
        setNote(value);
        setDonation(prevDonation => ({
            ...prevDonation,
            note: value,
        }));
    };

    return (
        <div style={classes.mainContainer}>

            {/* Main content */}
            <div style={classes.secondContainer}>
                <Text style={classes.welcomeText}>
                    🌟 Welcome to the Heart of Giving: {charityCase?.familyName}'s Family Donation Page 🌟
                </Text>

                {/* Donation items - first line */}
                <Flex style={classes.donationItemsContainer} gap="10%">
                    {donationItems.slice(0, 3).map((item) => (
                        <Card key={item.id} style={classes.donationItemCard}>
                            <Image src={item.image} alt={item.name} width={150} height={150} style={classes.donationItemImage} />
                            <Text align="center" style={{ marginTop: "8px" }}>
                                {item.name}
                            </Text>
                            <Flex style={classes.donationItemCountContainer}>
                                <Button onClick={() => handleDecrement(item.name)} style={classes.leftDecrementButton} >-</Button>
                                <Text style={{ margin: "6px", fontSize: "14px" }}>
                                    {donation.items.find(i => i.name === item.name)?.quantity || 0}
                                </Text>
                                <Button onClick={() => handleIncrement(item.name)} style={classes.rightIncrementButton}>+</Button>
                            </Flex>
                        </Card>
                    ))}
                </Flex>

                {/* Donation items - second line */}
                <Flex style={classes.donationItemsContainer} gap="10%">
                    {donationItems.slice(3, 6).map((item) => (
                        <Card key={item.id} style={classes.donationItemCard}>
                        <Image src={item.image} alt={item.name} width={150} height={150} style={classes.donationItemImage} />
                            <Text align="center" style={{ marginTop: "8px" }}>
                                {item.name}
                            </Text>
                            <Flex style={classes.donationItemCountContainer}>
                                <Button onClick={() => handleDecrement(item.name)} style={classes.leftDecrementButton} >-</Button>
                                <Text style={{ margin: "0 8px" }}>
                                    {donation.items.find(i => i.name === item.name)?.quantity || 0}
                                </Text>
                                <Button onClick={() => handleIncrement(item.name)} style={classes.rightIncrementButton}>+</Button>
                            </Flex>
                        </Card>
                    ))}
                </Flex>

                {/* Additional information */}
                <Text style={classes.additionalInfoText}>
                    Have anything specific in mind? Share additional details with us:
                </Text>

                <Textarea
                    value={note}
                    onChange={(event) => handleNoteChange(event.currentTarget.value)}
                    placeholder={ADDITIONAL_INFORMATION}
                    style={classes.additionalInfoTextarea}
                />

                {/* Delivery method */}
                <Flex style={classes.deliveryMethodSwitchContainer} >
                    <Text>Choose your method of delivery: </Text>
                    <Switch
                        size="lg"
                        color="dark.4"
                        onLabel={CourierDelivery}
                        offLabel={PersonalDelivery}
                        style={classes.switchButtonStyles}
                        onChange={handleSwitchChange}
                    />
                    <div style={{ marginLeft: 10 }}> {`${donation.deliveryMethod}.`} </div>
                </Flex>

                {/* Personal info modal for courier delivery */}
                {isPersonalInfoOpen && (
                    <PersonalInfoComponent
                        onClose={() => { setIsPersonalInfoOpen(false) }}
                        onSubmit={handlePersonalInfoSubmit}
                        initialData={deliveryInfo}
                    />
                )}

                {/* Donate now button */}
                <Flex style={classes.donateNowButtonContainer} align="center">
                    <Button
                        onClick={() => handleOnDonateNowClick(donation)}
                        style={classes.donateNowButton}
                    >
                        Donate Now
                    </Button>
                </Flex>
            </div>

            {/* Validation popup */}
            {validationPopup && (
                    <ValidationPopup
                        type={validationPopup.type}
                        message={validationPopup.message}
                        onClose={() => setValidationPopup(null)}
                    />
                )}
        </div>
    );
};

export default DonateNowPage;
