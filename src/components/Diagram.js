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
	function onElementClick(event, element) {
		if (element.type === "functionNode") {
			onFunctionNodeSelected(element)
		}
	}

	const onConnect = (params) => {
		console.log(params)
		if (params.sourceHandle === params.targetHandle) {
			setElements((els) => addEdge({ ...params, type: "custom" }, els))
		} else {
			setElements((els) => addEdge({ ...params, type: "problematic" }, els))
		}
	}
	const onElementsRemove = (elementsToRemove) =>
		setElements((els) => removeElements(elementsToRemove, els))

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

	return (
		<Box
			height="700px"
			width="100%"
			borderRadius="9px"
			border="2px"
			overflow="hidden"
		>
			<ReactFlow
				elements={elements}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				onElementClick={onElementClick}
				onElementsRemove={onElementsRemove}
				style={{ background: "white" }}
				snapToGrid={true}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				onEdgeUpdate={onEdgeUpdate}
				connectionLineComponent={ConnectionLine}
				deleteKeyCode={46} /* 'delete'-key */
			>
				<Controls />
				<Background />
			</ReactFlow>
		</Box>
	)
}
