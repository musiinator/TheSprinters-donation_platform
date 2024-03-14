import React, { useEffect, useState } from "react";
import { Modal, Card, Input, Button, Text, Group } from "@mantine/core";
import { IconMapPin, IconUser, IconPhone, IconCar } from '@tabler/icons-react';
import DeliveryComboBox from "./delivery-combo-box.component";
import { DeliveryInfo } from "@/src/interfaces/delivery-info.interface";
import { DeliveryCompany } from "@/src/enums/DeliveryCompany";

export interface PersonalInfoProps {
    onClose: () => void;
    onSubmit: (data: DeliveryInfo) => void;
    initialData: DeliveryInfo;
};

const classes = {
    groupStyles: {
        marginTop: "5%",  marginLeft: "10%", marginRight: "10%", width: "80%"
    },
    inputStyles: {
        width: "90%"
    },
    iconStyles: {
        marginRight: "5px"
    },
    errorMessageStyles: {
        color: 'red', marginTop: '10px', textAlign: 'center' as const,
    },
    buttonStyles: {
        background: 'linear-gradient(to right, #4CAF50, #8BC34A)', color: '#fff', width: 100, marginLeft: "40%", marginTop: "5%", marginBottom: "5%"
    },
};

const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ onSubmit, initialData }) => {
    const [id, setId] = useState(initialData.id || "");
    const [name, setName] = useState(initialData.name || "");
    const [address, setAddress] = useState(initialData.address || "");
    const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber || "");
    const [deliveryCompany, setDeliveryCompany] = useState(initialData.deliveryCompany || "");
    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect((): void => {
        setSlowTransitionOpened(true);
    }, []);

    const handleDeliveryCompanySelect = (company: string): void => {
        if (Object.values(DeliveryCompany).includes(company as DeliveryCompany)) {
            setDeliveryCompany(company as DeliveryCompany);
        } else {
            console.error("Invalid delivery company selected");
            // Handle the error appropriately
        }
    };
    

    const handleSubmit = (): void => {
        if (!name || !address || !phoneNumber || !deliveryCompany) {
            setErrorMessage("*Please fill out all fields.");
            return;
        }
        console.log("Name:", name);
        console.log("Address:", address);
        console.log("Phone:", phoneNumber);
        console.log("Delivery Company:", deliveryCompany);
        
        setSlowTransitionOpened(false);
        onSubmit({ id, name, address, phoneNumber, deliveryCompany });
    };

    return (
        <Modal onClose={() => setSlowTransitionOpened(false)} opened={slowTransitionOpened} transitionProps={{ transition: 'scale', duration: 600 }}>
            <Card>
                <Text align="center" weight={700} style={{ fontSize: "1.5rem" }}>
                    Personal Informations
                </Text>

                <Group style={classes.groupStyles}>
                    <IconUser style={classes.iconStyles} />
                    <Input
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                        placeholder="Full Name"
                        style={classes.inputStyles}

                    />
                </Group>

                <Group style={classes.groupStyles}>
                    <IconMapPin style={classes.iconStyles} />
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.currentTarget.value)}
                        placeholder="Address"
                        style={classes.inputStyles}
                    />
                </Group>

                <Group style={classes.groupStyles}>
                    <IconPhone style={classes.iconStyles} />
                    <Input
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.currentTarget.value)}
                        placeholder="Phone Number"
                        style={classes.inputStyles}

                    />
                </Group>

                <Group style={classes.groupStyles}>
                    <IconCar style={classes.iconStyles} />
                    <DeliveryComboBox onSelect={handleDeliveryCompanySelect} initialValue={deliveryCompany} />
                </Group>
                
                {errorMessage && (
                    <div style={classes.errorMessageStyles}>
                        {errorMessage}
                    </div>
                )}

                <Button onClick={handleSubmit} style={classes.buttonStyles}>
                    Submit
                </Button>

                
            </Card>
        </Modal>
    );
};

export default PersonalInfoComponent;
