import {useState} from "react";
import {Button, Container, Input, MantineTheme, PasswordInput, Text, TextInput, useMantineTheme} from "@mantine/core";
import Link from "next/link";
import {useWindowDimensions} from "@/src/hooks/use-window-dimensions.hook";

interface ILoginProps {
    handleLogin: (email: string, password: string) => void
}

const loginComponentClasses = (isMobile: boolean, theme: MantineTheme) => ({
    loginComponentContainer: {
        margin: '0',
        width: '100%'
    },
    loginComponentTitle: {
        textAlign: 'center',
        fontSize: theme.fontSizes.xl,
        paddingBottom: theme.spacing.lg
    },
    link: {
        textDecoration: 'none',
        alignSelf: 'end',
    }
})

export const Login = (props: ILoginProps) => {
    const {handleLogin} = props
    const {isMobile} = useWindowDimensions()
    const theme = useMantineTheme()
    const classes = loginComponentClasses(isMobile, theme)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container style={classes.loginComponentContainer}>
            <Text style={classes.loginComponentTitle}>
                Welcome back!
            </Text>
            <form onSubmit={() => handleLogin(username, password)} style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Input.Label>
                    Email
                </Input.Label>
                <TextInput onChange={e => setUsername(e.currentTarget.value)}/>
                <Input.Label>
                    Password
                </Input.Label>
                <PasswordInput onChange={e => setPassword(e.currentTarget.value)}/>
                <Link href='/forgot-password' passHref style={classes.link}>
                    <Text>
                        Forgot Password?
                    </Text>
                </Link>
                <Button onClick={() => handleLogin(username, password)}>
                    Sign in
                </Button>
            </form>
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexFlow: 'wrap',
                }}>
                <Text>
                    Don't have an account?
                </Text>
                <Link href='/sign-up' passHref style={classes.link}>
                    <Text>
                        Sign-up now!
                    </Text>
                </Link>
            </Container>
        </Container>
    )

}