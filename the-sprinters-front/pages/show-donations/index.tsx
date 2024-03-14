import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Table, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { rightSideAnimation } from '@/src/constants/animation.constants';
import { Donation, itemsForDonationMap } from '@/src/interfaces/donation.interface';
import { useAppDispatch, useAppSelector } from '@/src/hooks/general.hook';
import useStorage from '@/src/hooks/use-storage.hook';
import { ACCOUNT } from '@/src/constants/general.constants';
import { StorageType } from '@/src/enums/StorageType';
import { getDonationsByUsername } from '@/src/common/redux/reducers/donation/donation.reducer';

// const donations: Donation[] = [
//   {
//     id: 1,
//     familyName: 'Creanga',
//     donationDate: new Date(),
//     items: {
//       food: 2,
//       clothes: 3,
//       toys: 4,
//     },
//     deliveryMethod: 'personal',
//     personalInfo: {
//       name: 'John',
//       deliveryCompany: 'Cargus',
//       phoneNumber: '0745123456',
//       address: 'Str. Mihai Eminescu, nr. 1, Bucuresti, Romania',
//     },
//   },
//
//   {
//     id: 2,
//     familyName: 'Creanga',
//     donationDate: new Date(),
//     items: {
//       food: 2,
//       clothes: 4,
//       toys: 4,
//     },
//     deliveryMethod: 'personal',
//     personalInfo: {
//       name: 'John',
//       deliveryCompany: 'Cargus',
//       phoneNumber: '0745123456',
//       address: 'Str. Mihai Eminescu, nr. 1, Bucuresti, Romania',
//     },
//   },
//   {
//     id: 3,
//     familyName: 'Creanga',
//     donationDate: new Date(),
//     items: {
//       food: 2,
//       clothes: 4,
//       toys: 4,
//     },
//     deliveryMethod: 'personal',
//     personalInfo: {
//       name: 'John',
//       deliveryCompany: 'Cargus',
//       phoneNumber: '0745123456',
//       address: 'Str. Mihai Eminescu, nr. 1, Bucuresti, Romania',
//     },
//   },
//   {
//     id: 4,
//     familyName: 'Creanga',
//     donationDate: new Date(),
//     items: {
//       food: 2,
//       clothes: 4,
//       toys: 4,
//     },
//     deliveryMethod: 'personal',
//     personalInfo: {
//       name: 'John',
//       deliveryCompany: 'Cargus',
//       phoneNumber: '0745123456',
//       address: 'Str. Mihai Eminescu, nr. 1, Bucuresti, Romania',
//     },
// },
// ];

function ShowDonationPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showRows, setShowRows] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const donations = useAppSelector((state) => state.donationsReducer.donations);
  const { getItem } = useStorage();
  const account = getItem(ACCOUNT, StorageType.LOCAL);

  useEffect(() => {
    dispatch(getDonationsByUsername(JSON.parse(account).username));
  }, [dispatch]);

  useEffect(() => {
    if (donations.length > 0) console.log(donations[0].charityCase);
  }, []);

  const donationsTableData = donations.map((donation) => ({
    id: donation.deliveryInfo.id,
    familyName: donation.charityCase.familyName,
    donationDate: donation.donationDate,
    deliveryMethod: donation.deliveryMethod,
    detailsButton: (
      <Button
        onClick={() => {
          open();
          setSelectedDonation(donation);
          setModalOpen(true);
        }}
      >
        See Details
      </Button>
    ),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      if (showRows < donationsTableData.length) {
        setShowRows((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [showRows, donationsTableData.length]);

  return (
    <>
      <Table
        style={{
          margin: '0 auto',
          marginTop: '100px',
          width: '80%',
          marginLeft: '13rem',
          borderCollapse: 'separate',
          borderSpacing: '0 10px',
        }}
      >
        <Table.Thead>
          <Table.Tr style={{ background: '#f4f4f4' }}>
            <Table.Th
              style={{
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Id
            </Table.Th>
            <Table.Th
              style={{
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Family Name
            </Table.Th>
            <Table.Th
              style={{
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Date
            </Table.Th>
            <Table.Th
              style={{
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Delivery Method
            </Table.Th>
            <Table.Th
              style={{
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Details
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <AnimatePresence>
          {donationsTableData.slice(0, showRows).map((donation, index) => (
            <motion.tr
              key={donation.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={rightSideAnimation}
              style={{
                textAlign: 'center',
                background: hoveredRow === index ? 'rgb(30,144,255,0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <Table.Td>{donation.id}</Table.Td>
              <Table.Td style={{ textTransform: 'uppercase' }}>{donation.familyName}</Table.Td>
              <Table.Td> {donation.donationDate}</Table.Td>
              <Table.Td style={{ textTransform: 'uppercase' }}>{donation.deliveryMethod}</Table.Td>
              <Table.Td style={{ textTransform: 'uppercase' }}>{donation.detailsButton}</Table.Td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </Table>

      {modalOpen && selectedDonation && (
        <Modal
          opened={opened}
          size="lg"
          onClose={close}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 30,
            borderRadius: 12,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#f7f7f7',
            color: '#333',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Table style={{ width: '100%' }}>
              <Table.Tbody>
                <Table.Tr style={{ borderBottom: '2px solid #ddd' }}>
                  <Table.Th
                    style={{
                      padding: '10px 0',
                      color: '#555',
                      textAlign: 'center',
                    }}
                  >
                    Item
                  </Table.Th>
                  <Table.Th
                    style={{
                      padding: '10px 0',
                      color: '#555',
                      textAlign: 'center',
                    }}
                  >
                    Item Name
                  </Table.Th>
                  <Table.Th
                    style={{
                      padding: '10px 0',
                      color: '#555',
                      textAlign: 'center',
                    }}
                  >
                    Quantity
                  </Table.Th>
                </Table.Tr>
                {selectedDonation.items.map((item) => (
                  <Table.Tr key={item.name} style={{ borderBottom: '1px solid #eee' }}>
                    <Table.Td style={{ padding: '10px 0' }}>
                      <img
                        src={itemsForDonationMap[item.name]}
                        style={{
                          width: '3rem',
                          height: '3rem',
                        }}
                        alt={`Image for ${item}`}
                      />
                    </Table.Td>
                    <Table.Td style={{ padding: '10px 0' }}>{item.name.toUpperCase()}</Table.Td>
                    <Table.Td style={{ padding: '10px 0' }}>{item.quantity}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          <div style={{ paddingBottom: '1.2rem' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 10,
                color: '#007bff',
              }}
            >
              Personal Info:
            </Text>
            <Text>Name: {selectedDonation.deliveryInfo.name}</Text>
            <Text>Delivery Company: {selectedDonation.deliveryInfo.deliveryCompany}</Text>
            <Text>Phone: {selectedDonation.deliveryInfo.phoneNumber}</Text>
            <Text>Address: {selectedDonation.deliveryInfo.address}</Text>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ShowDonationPage;
