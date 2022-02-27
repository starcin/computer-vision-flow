import { Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react"

export default function FunctionList({ functions, onItemSelected }) {
	return (
		<Flex
			className="function-list"
			gap="2"
			padding="8px 8px"
			width="250px"
			border="2px"
			borderRadius="9px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			{functions.map((f) => {
				return (
					<Button
						size="sm"
						colorScheme="teal"
						key={f.id}
						onClick={() => {
							onItemSelected(f)
						}}
					>
						{f.name}
					</Button>
				)
			})}
		</Flex>
	)
}
