import {useState} from "react";
import {motion} from "framer-motion";
import {cardAnimation} from "@/src/constants/animation.constants";
import {Card, Input, PasswordInput, TextInput} from "@mantine/core";

interface ICompanySignUpProps {
    handleSignUp: (email: string, password: string) => void
}
export const CompanySignUp = (props: ICompanySignUpProps) => {
    const {handleSignUp} = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [domain, setDomain] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")

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
                <Input.Label>Domain</Input.Label>
                <TextInput/>
                <Input.Label>Description</Input.Label>
                <TextInput/>
                <Input.Label>Location</Input.Label>
                <TextInput/>
            </Card>
        </motion.div>
    )
}