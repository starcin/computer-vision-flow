import FunctionList from "./FunctionList"
import SettingsPanel from "./SettingsPanel"
import Diagram from "./Diagram"
import { useEffect, useState } from "react"
import { Flex } from "@chakra-ui/react"
import SideBar from "./SideBar"

const initialElements = [
	{
		id: "A",
		type: "input", // input node
		data: { label: "Input Node" },
		position: { x: 250, y: 25 },
	},
	// default node
	{
		id: "B",
		// you can also pass a React component as a label
		data: { label: <div>Default Node</div> },
		position: { x: 100, y: 125 },
	},
	{
		id: "C",
		type: "output", // output node
		data: { label: "Output Node" },
		position: { x: 250, y: 250 },
	},
	// animated edge
	{ id: "e1-2", source: "A", target: "B", animated: true },
	{ id: "e2-3", source: "B", target: "C" },
]

export default function Editor() {
	const [functions, setFunctions] = useState([])
	const [activeElement, setActiveElement] = useState(null)
	const [elements, setElements] = useState([])
	const [lastUsedId, setLastUsedId] = useState(0)

	useEffect(() => {
		fetch("databases/functions.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (myJson) {
				setFunctions(myJson.functions)
			})
	}, [])

	function onFunctionNodeSelected(element) {
		setActiveElement(element)
	}

	function onNodeSelectedChanged(isSelected, data) {
		if (isSelected) {
			console.log("selected")
			setActiveElement({ data })
		} else {
			console.log(elements)
		}
	}

	function addNode(funcObj) {
		const newNode = {
			id: (lastUsedId + 1).toString(),
			type: "functionNode",
			position: { x: 150, y: 150 },
			data: {
				label: funcObj.name,
				funcType: funcObj.id,
				in: funcObj.in,
				out: funcObj.out,
				module: null,
				isSelected: false,
				onSelectedChanged: onNodeSelectedChanged,
			},
		}
		setLastUsedId((prev) => prev + 1)
		setElements((es) => es.concat(newNode))
	}

	function onFunctionClicked(funcObj) {
		addNode(funcObj)
	}

	function onModuleSelected(module) {
		setElements(
			elements.map((element) => {
				if (element.id === activeElement.id) {
					element.data = { ...element.data, module: module }
				}
				return element
			})
		)
	}

	return (
		<Flex
			className="editor-container"
			direction="row"
			// background="rebeccapurple"
			// width="1200px"
			margin="50px auto"
			maxWidth="1400px"
		>
			<FunctionList functions={functions} onItemSelected={onFunctionClicked} />
			<Diagram
				elements={elements}
				// onFunctionNodeSelected={onFunctionNodeSelected}
				setElements={setElements}
			/>

			<SideBar element={activeElement} onModuleSelected={onModuleSelected} />
		</Flex>
	)
}
