import { Flex, Image } from "@chakra-ui/react"
import logo from "../assets/The_LOGO.png"

export default function Header({ functions, onItemSelected }) {
	return (
		<Flex className="header">
			<Image src={logo} />
		</Flex>
	)
}
