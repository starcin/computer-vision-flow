import { Box, Checkbox, Flex, Heading, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ModuleCard from "./ModuleCard"

export default function SideBar({ element, onModuleSelected }) {
	const [modules, setModules] = useState([])
	const [suitableModules, setSuitableModules] = useState([])
	const [suitableFilters, setSuitableFilters] = useState([])
	const [activeFilters, setActiveFilters] = useState([])
	const [filteredModules, setFilteredModules] = useState([])
	const [selectedModule, setSelectedModule] = useState(null)

	useEffect(() => {
		fetch("databases/modules.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (myJson) {
				setModules(myJson.modules)
			})
	}, [])

	useEffect(() => {
		if (!element) return
		setSuitableModules(
			modules.filter((module) => module.function === element.data.funcType)
		)
	}, [element, modules])

	useEffect(() => {
		const filters = []
		suitableModules.forEach((module) => {
			module.tags.forEach((tag) => {
				if (filters.indexOf(tag) === -1) {
					filters.push(tag)
				}
			})
		})
		setSuitableFilters(filters)
		setFilteredModules(suitableModules)
	}, [suitableModules])

	function onFilterChange(event) {
		if (event.target.checked) {
			if (activeFilters.indexOf(event.target.id) === -1) {
				setActiveFilters(activeFilters.concat(event.target.id))
			}
		} else {
			setActiveFilters(
				activeFilters.filter((filter) => filter !== event.target.id)
			)
		}
	}

	useEffect(() => {
		if (activeFilters === []) {
			setFilteredModules(suitableModules)
		} else {
			setFilteredModules(
				suitableModules.filter((module) => {
					let retval = true
					activeFilters.forEach((filter) => {
						if (module.tags.indexOf(filter) === -1) {
							// console.log("filtered out")
							retval = false
						}
					})
					return retval
				})
			)
		}
	}, [activeFilters])

	function onSelectionChange(module) {
		setSelectedModule(module)
		onModuleSelected(module)
	}

	if (element == null) {
		return <></>
	}

	return (
		<Flex
			direction="column"
			gap="1rem"
			minWidth="250px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			<Heading size="md">{element.data.label}</Heading>
			<Flex direction="column">
				{suitableFilters.map((filter) => (
					<Checkbox
						colorScheme="teal"
						key={element.id + filter}
						id={filter}
						onChange={onFilterChange}
					>
						{filter}
					</Checkbox>
				))}
			</Flex>
			<Flex direction="column" gap="8px">
				{filteredModules.map((module) => (
					<ModuleCard
						module={module}
						onClick={onSelectionChange}
						key={module.name}
						value={module.name}
					/>
				))}
			</Flex>
			{/* <Select
				borderColor="white"
				borderWidth="2px"
				focusBorderColor="teal"
				focus
				size="sm"
				placeholder="Select Module"
				margin="1rem 0"
				variant="filled"
				bg="white"
				color="teal"
				onChange={onSelectionChange}
			>
				{filteredModules.map((module) => (
					<option key={module.name} value={module.name}>
						{module.name}
					</option>
				))}
			</Select> */}
		</Flex>
	)
}
