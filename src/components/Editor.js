import FunctionList from "./FunctionList"
import SettingsPanel from "./SettingsPanel"
import Diagram from "./Diagram"
import { useEffect, useState } from "react"

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
	const [elements, setElements] = useState(initialElements)
	const [lastUsedId, setLastUsedId] = useState(0)

	function getFunctions() {
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
	}

	useEffect(() => {
		getFunctions()
	}, [])

	function addNode(funcObj) {
		const newNode = {
			id: (lastUsedId + 1).toString(),
			type: "functionNode",
			position: { x: 150, y: 150 },
			data: { label: funcObj.name, funcType: funcObj.id },
		}
		setLastUsedId((prev) => prev + 1)
		setElements((es) => es.concat(newNode))
	}

	function onFunctionClicked(funcObj) {
		addNode(funcObj)
	}

	function onFunctionNodeSelected(element) {
		setActiveElement(element)
	}

	return (
		<div className="editor-container">
			<FunctionList functions={functions} onItemSelected={onFunctionClicked} />
			<Diagram
				elements={elements}
				onFunctionNodeSelected={onFunctionNodeSelected}
			/>
			<SettingsPanel element={activeElement} />
		</div>
	)
}
