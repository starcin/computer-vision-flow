import { Badge, Box, Flex, Heading, HStack, Tag } from "@chakra-ui/react"

export default function ModuleCard({ module, onClick }) {
	return (
		<Box
			as="button"
			onClick={() => {
				onClick(module)
			}}
			p="4px 4px"
			border="1px"
			borderRadius="7px"
			bg="transparent"
		>
			<Heading size="sm" marginBottom=".5rem">
				{module.name}
			</Heading>
			<Flex justifyContent="space-between">
				<HStack>
					{module.tags.map((tag) => (
						<Tag size="sm" key={tag}>
							{tag}
						</Tag>
					))}
				</HStack>
				<Badge>
					<i>{module.supplier}</i>
				</Badge>
			</Flex>
		</Box>
	)
}
