import { Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react"

export default function FunctionList({ functions, onItemSelected }) {
	return (
		<Flex
			className="function-list"
			justifyContent="space-between"
			direction="column"
			width="250px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			<Flex direction="column" gap="2">
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
			<Flex direction="column" gap="2">
				<Button
					border="0px"
					bg="black"
					color="white"
					size="sm"
					key="input"
					onClick={() => {
						onItemSelected({ id: "input" })
					}}
				>
					Input
				</Button>

				<Button
					border="0px"
					bg="black"
					color="white"
					size="sm"
					key="output"
					onClick={() => {
						onItemSelected({ id: "output" })
					}}
				>
					Output
				</Button>
			</Flex>
		</Flex>
	)
}
