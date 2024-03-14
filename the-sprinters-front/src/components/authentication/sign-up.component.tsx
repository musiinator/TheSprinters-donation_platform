import {useState} from "react";
import {
    Button,
    Checkbox,
    Container,
    Input,
    MantineTheme,
    PasswordInput,
    Text,
    TextInput,
    useMantineTheme
} from "@mantine/core";
import {useWindowDimensions} from "@/src/hooks/use-window-dimensions.hook";
import {cardAnimation} from "@/src/constants/animation.constants";

const {motion} = require('framer-motion');

interface ISignUpProps {
    handleSignUp: (email: string, password: string, userType: string) => void
}

const signUpComponentClasses = (isMobile: boolean, theme: MantineTheme) => ({
    signUpComponentContainer: {
        marginTop: '100px',
        width: '40%'
    },
    signUpComponentTitle: {
        textAlign: 'center',
        fontSize: theme.fontSizes.xl,
        paddingBottom: theme.spacing.lg
    },
    link: {
        textDecoration: 'none',
        alignSelf: 'end',
    },
    signUpBottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpCheckboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10px'
    },
    signUpInput: {
        input: {
            height: '40px'
        }
    },
    signUpButton: {
        width: '100%',
        height: '40px',
        marginTop: '20px'
    }
})

export const SignUp = (props: ISignUpProps) => {
    const {handleSignUp} = props
    const {isMobile} = useWindowDimensions()
    const theme = useMantineTheme()
    const classes = signUpComponentClasses(isMobile, theme)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isCompany, setIsCompany] = useState(false)
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const validateInputs = () => {
        if (username === "") {
            setUsernameError("Please type your username here")
        } else {
            setUsernameError("")
        }
        if (password === "") {
            setPasswordError("Please type your passsord here")
        } else {
            setPasswordError("")
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError("This does not match with the password")
        } else {
            setConfirmPasswordError("")
        }
    }

    const handleSubmit = () => {
        validateInputs()
        if (usernameError === "" && passwordError === "" && confirmPasswordError === "") {
            const userType = isCompany ? "ORGANIZATION" : "USER"
            handleSignUp(username, password, userType)
        }
    }

    return (
        <Container style={classes.signUpComponentContainer}>
            <motion.div
                variants={cardAnimation}
                initial="initial"
                animate="animate"
                exit="exit">
                <Text style={classes.signUpComponentTitle}>
                    Register for The Sprinters!
                </Text>
                <Input.Label>Username</Input.Label>
                <TextInput placeholder="Your Username here" styles={classes.signUpInput} error={usernameError}
                           onChange={(event) => setUsername(event.currentTarget.value)}/>
                <Input.Label>Password</Input.Label>
                <PasswordInput placeholder="Your Password here" styles={classes.signUpInput} error={passwordError}
                               onChange={(event) => setPassword(event.currentTarget.value)}/>
                <Input.Label>Confirm Password</Input.Label>
                <PasswordInput placeholder="Confirm Password" styles={classes.signUpInput}
                               error={confirmPasswordError}
                               onChange={(event) => setConfirmPassword(event.currentTarget.value)}/>
                <div style={classes.signUpBottomContainer}>
                    <div style={classes.signUpCheckboxContainer}>
                        <Checkbox checked={isCompany}
                                  onChange={(event) => setIsCompany(event.currentTarget.checked)}
                                  style={{
                                      paddingRight: '10px'
                                  }}/>
                        <Text>Register as a company</Text>
                    </div>
                    <Button style={classes.signUpButton} onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
            </motion.div>
        </Container>
    )

}