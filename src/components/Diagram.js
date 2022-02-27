import ReactFlow, {
	Background,
	Controls,
	addEdge,
	removeElements,
	updateEdge,
} from "react-flow-renderer"
import FunctionNode from "./FunctionNode"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import CustomEdge from "./CustomEdge"
import ProblematicEdge from "./ProblematicEdge"
import ConnectionLine from "./ConnectionLine"

const nodeTypes = {
	functionNode: FunctionNode,
}
const edgeTypes = {
	custom: CustomEdge,
	problematic: ProblematicEdge,
}

const connectionLineStyle = { strokeWidth: "6px", stroke: "#319795" }

export default function Diagram({
	elements,
	onFunctionNodeSelected,
	setElements,
}) {
	const [rfInstance, setRfInstance] = useState(null)

	function onElementClick(event, element) {
		if (element.type === "functionNode") {
			onFunctionNodeSelected(element)
		}
	}

	function onEdgeButtonClick(event, id) {
		console.log("button clicked")
	}

	const onConnect = (params) => {
		console.log(params)
		if (params.sourceHandle === params.targetHandle) {
			setElements((els) =>
				addEdge(
					{
						...params,
						type: "custom",
						data: { onButtonClick: onEdgeButtonClick },
					},
					els
				)
			)
		} else {
			setElements((els) => addEdge({ ...params, type: "problematic" }, els))
			// setElements((els) => addEdge({ ...params, animated: true }, els))
		}
	}
	const onElementsRemove = (elementsToRemove) =>
		setElements((els) => removeElements(elementsToRemove, els))

	function onEdgeButtonClick(event, id) {
		setElements((els) =>
			removeElements([els.find((element) => element.id === id)], els)
		)
	}

	const onConnectStart = (param1, param2) => {
		console.log("1", param1)
		console.log("2", param2)
	}
	const onEdgeUpdate = (oldEdge, newConnection) => {
		if (newConnection.sourceHandle === newConnection.targetHandle) {
			setElements((els) =>
				updateEdge({ ...oldEdge, type: "custom" }, newConnection, els)
			)
		} else {
			setElements((els) =>
				updateEdge({ ...oldEdge, type: "problematic" }, newConnection, els)
			)
		}
	}

	// function onDiagramClicked() {
	// 	const selecteds = rfInstance
	// 		.getElements()
	// 		.filter((element) => element.data.isSelected === true)
	// 	console.log(selecteds.length)
	// }

	return (
		<Box
			height="700px"
			width="100%"
			borderRadius="7px"
			border="2px"
			borderColor="silver"
			overflow="hidden"
			margin="0px 20px"
		>
			<ReactFlow
				elements={elements}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				selectNodesOnDrag={false}
				elementsSelectable={true}
				// onElementClick={onElementClick}
				onElementsRemove={onElementsRemove}
				onLoad={setRfInstance}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				onEdgeUpdate={onEdgeUpdate}
				style={{ background: "white" }}
				snapToGrid={true}
				connectionLineComponent={ConnectionLine}
				deleteKeyCode={46} /* 'delete'-key */
				// onClick={onDiagramClicked}
			>
				<Controls />
				<Background />
			</ReactFlow>
		</Box>
	)
}
