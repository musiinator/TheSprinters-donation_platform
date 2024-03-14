import { Text, Group, Divider, TextInput, Button } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import React,{useState,useEffect,useRef} from 'react';
import { AlignCenter } from 'react-feather';
import {bottomAnimation, cardAnimation} from "@/src/constants/animation.constants";

import { motion } from 'framer-motion';

const footerClasses = {
  footerStyles: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    display: 'flex', 
    bottom: '0', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '50%', // CHANGE THIS TO STRECH IT ACROSS THE PAGE
    margin: 'auto', 
  },
  linkStyles: {
    flex: '1', // Take up available space
    display: 'flex',
    padding: '8px',
    textDecoration: 'none',
    color: '#fff',
  },
  contactInfo: {
    flex: '1', // Take up available space
    textAlign: 'left', // Align contact to the left
    paddingLeft: '40px', // Padding for contact info
    maxWidth: '30%',
  },
};


function Footer() {
  const [showFooter, setShowFooter] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerMaxHeight = 100;

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    setShowFooter(scrolled > pageHeight - footerMaxHeight);
    setFooterHeight(footerMaxHeight - (pageHeight - scrolled));
    console.log(scrolled, pageHeight - footerMaxHeight, footerHeight);

  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('zoom', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const contactInfo = (
    <>
      <Text>Phone: 123-456-7890</Text>
      <Text>Email: example@example.com</Text>
    </>
  );

  return (
    <div id='Footer'>
    {showFooter && (
    <motion.div style={{...footerClasses.footerStyles,
                  height: `${footerHeight}px`}}
                  variants={bottomAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <div style={{...footerClasses.contactInfo,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: footerHeight >= 50 ? 'center' : 'flex-start',
                    }}>
        <Text>Contact Information</Text>
        {contactInfo}
      </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
            alignItems: 'center', // Center the links vertically
            flex: '1', // Take up available space
                    }}>
          
              <a href="/home" style={footerClasses.linkStyles}>
                Home
              </a>
              <a href="/about-us" style={footerClasses.linkStyles}>
                About Us
              </a>
              <a href="/home" style={footerClasses.linkStyles}>
                Community
              </a>
              <a href="/home" style={footerClasses.linkStyles}>
                Sign Up
              </a>
              {/* Add other links */}
            
          </div>
    </motion.div>
    )};
    </div>
  );
}

export default Footer;
