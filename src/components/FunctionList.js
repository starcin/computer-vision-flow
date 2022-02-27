import { Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react"

export default function FunctionList({ functions, onItemSelected }) {
	return (
		<Flex
			className="function-list"
			gap="2"
			width="250px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			{functions.map((f) => {
				return (
					<Button
						border="1px"
						bg="transparent"
						size="sm"
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
