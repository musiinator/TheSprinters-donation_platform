import { createTheme, MantineTheme } from '@mantine/core';

// @ts-ignore
export const theme = createTheme({
  /* Put your mantine theme override here */
  fontSizes: {
    colorScheme: 'light',
    xs: 18,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 27,
  },
  spacing: {
    xs: 10,
    sm: 12,
    md: 15,
    lg: 20,
    xl: 30,
  },
  components:{
    InputWrapper:{
      styles: (theme: MantineTheme) => ({
        root:{
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
        }
      })
    },
    CheckBox:{
      styles: (theme: MantineTheme) => ({
        label:{
          paddingRight: theme.spacing.xs,
          paddingLeft: theme.spacing.xs,
        },
      })
    }
  },
  colors:{
    // Pearl
    Pearl:['#F4EDEA', '#E1D8D5', '#CEC3C0', '#BBADAB', '#A89797', '#958282', '#827D6E', '#6F6759', '#5C5244', '#493D30'],

    // Light Lavender
    LightLavender:['#E6E6FA', '#CDCDF4', '#B4B4EE', '#9B9BF3', '#8282ED', '#6969E7', '#5050E1', '#3737DB', '#1E1ED5', '#0505D0'],

// Use these arrays as needed in your Mantine styles.
  },
  // Customize other theme properties as needed
});
