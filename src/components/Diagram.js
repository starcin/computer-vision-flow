import ReactFlow, {
	Background,
	Controls,
	addEdge,
	removeElements,
	updateEdge,
	getIncomers,
} from "react-flow-renderer"
import { useEffect, useState } from "react"
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
} from "@chakra-ui/react"
import CustomEdge from "./CustomEdge"
import ProblematicEdge from "./ProblematicEdge"
import ConnectionLine from "./ConnectionLine"
import FunctionNode from "./FunctionNode"
import InputNode from "./InputNode"
import OutputNode from "./OutputNode"

const nodeTypes = {
	functionNode: FunctionNode,
	inputNode: InputNode,
	outputNode: OutputNode,
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
	setParentRfInstance,
}) {
	const [alertState, setAlertState] = useState({
		isOpen: false,
		sourceType: null,
		targetType: null,
	})
	const [rfInstance, setRfInstance] = useState(null)

	function setReactFlowInstances(instance) {
		setParentRfInstance(instance)
		setRfInstance(instance)
	}

	// Triggered when the alert is closed. Resets the state. (Not entirely necessary)
	const onAlertClose = () =>
		setAlertState({
			isOpen: false,
			sourceType: null,
			targetType: null,
		})

	//Triggered when en element is clicked (not active at the moment)
	function onElementClick(event, element) {
		if (element.type === "functionNode") {
			onFunctionNodeSelected(element)
		}
	}

	// Triggered when connection completed. Chooses the correct edge type depending on the handle compatibility.
	const onConnect = (params) => {
		// Check if the target is already has a connection
		if (
			getIncomers(
				rfInstance
					.toObject()
					.elements.find((element) => element.id === params.target),
				elements
			).length === 0
		) {
			// Check if types match
			if (
				params.sourceHandle === params.targetHandle ||
				params.sourceHandle === "any" ||
				params.targetHandle === "any"
			) {
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
				setAlertState({
					isOpen: true,
					sourceType: params.sourceHandle,
					targetType: params.targetHandle,
				})
				// setElements((els) => addEdge({ ...params, type: "problematic" }, els))
				// setElements((els) => addEdge({ ...params, animated: true }, els))
			}
		}
	}

	// Triggered when the connection is created but still floating
	const onConnectStart = (param1, param2) => {
		// console.log("1", param1)
		// console.log("2", param2)
	}

	// Triggered when the connection of the edge is moved to another node
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

	// Deletes edge. Triggered when the x on edge is clicked
	function onEdgeButtonClick(event, id) {
		setElements((els) =>
			removeElements([els.find((element) => element.id === id)], els)
		)
	}

	// Deletes element. Triggered when the deleteKeyCode is pressed
	const onElementsRemove = (elementsToRemove) =>
		setElements((els) => removeElements(elementsToRemove, els))

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
				onLoad={setReactFlowInstances}
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
			<AlertDialog
				isOpen={alertState.isOpen}
				// leastDestructiveRef={cancelRef}
				onClose={onAlertClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Data types are incompatible
						</AlertDialogHeader>

						<AlertDialogBody>
							{/* {`The source is ${alertState.sourceType} but the target expects ${alertState.targetType}`} */}
							The source is <strong>{alertState.sourceType}</strong> but the
							target expects <strong>{alertState.targetType}</strong>
						</AlertDialogBody>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	)
}
