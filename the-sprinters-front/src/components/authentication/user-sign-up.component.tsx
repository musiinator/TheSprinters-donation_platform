import {useState} from "react";
import {Card, TextInput, Input, PasswordInput} from "@mantine/core";
import {cardAnimation} from "@/src/constants/animation.constants";

const { motion } = require('framer-motion');

interface IUserSignUpProps {
    handleSignUp: (email: string, password: string) => void
}
export const UserSignUp = (props: IUserSignUpProps) => {
    const {handleSignUp} = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    return (
        <motion.div
            variants={cardAnimation}
            initial="initial"
            animate="animate"
            exit="exit">
            <Card>
                <Input.Label>Username</Input.Label>
                <TextInput/>
                <Input.Label>Password</Input.Label>
                <PasswordInput/>
                <Input.Label>Confirm Password</Input.Label>
                <PasswordInput/>
                <Input.Label>Email</Input.Label>
                <TextInput/>
                <Input.Label>Last Name</Input.Label>
                <TextInput/>
                <Input.Label>First Name</Input.Label>
                <TextInput/>
            </Card>
        </motion.div>
    )
}