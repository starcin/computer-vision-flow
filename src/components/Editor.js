import FunctionList from "./FunctionList"
import SettingsPanel from "./SettingsPanel"
import Diagram from "./Diagram"
import { useEffect, useState } from "react"
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	HStack,
	VStack,
} from "@chakra-ui/react"
import SideBar from "./SideBar"
import {
	removeElements,
	updateEdge,
	getIncomers,
	addEdge,
} from "react-flow-renderer"

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

const defaultNodeOffsetX = 160
const maxUndo = 50

export default function Editor() {
	const [functions, setFunctions] = useState([])
	const [activeElement, setActiveElement] = useState(null)
	const [elements, setElements] = useState([])
	const [lastUsedId, setLastUsedId] = useState(0)
	const [rfInstance, setRfInstance] = useState(null)
	const [undoElementsStates, setUndoElementsStates] = useState([])
	const [alertState, setAlertState] = useState({
		isOpen: false,
		sourceType: null,
		targetType: null,
	})

	// Gets triggered when the alert is closed. Resets the state. (Not entirely necessary)
	const onAlertClose = () =>
		setAlertState({
			isOpen: false,
			sourceType: null,
			targetType: null,
		})

	// Load all the functions from json
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

	// Calculates a suitable Y coordinate to put a new node
	function getEmptySpace() {
		const flowElements = rfInstance.toObject().elements
		for (let y = 20; y < 1000; y = y + 100) {
			if (
				flowElements.find(
					(element) => "position" in element && element.position.y === y
				) === undefined
			) {
				return y
			}
		}
	}

	// Adds new node
	function addNode(funcObj) {
		updateUndoList()
		if (funcObj.id === "input") {
			const newNode = {
				id: (lastUsedId + 1).toString(),
				type: "inputNode",
				position: { x: defaultNodeOffsetX, y: getEmptySpace() },
				data: {
					label: "Input",
					funcType: funcObj.id,
					// in: funcObj.in,
					// out: funcObj.out,
					module: null,
					isSelected: false,
					onSelectedChanged: onNodeSelectedChanged,
					onDeleteClicked: onDeleteClicked,
				},
			}
			setLastUsedId((prev) => prev + 1)
			setElements((es) => es.concat(newNode))
		} else if (funcObj.id === "output") {
			const newNode = {
				id: (lastUsedId + 1).toString(),
				type: "outputNode",
				position: { x: defaultNodeOffsetX, y: getEmptySpace() },
				data: {
					label: "Output",
					funcType: funcObj.id,
					// in: funcObj.in,
					// out: funcObj.out,
					module: null,
					isSelected: false,
					onSelectedChanged: onNodeSelectedChanged,
					onDeleteClicked: onDeleteClicked,
				},
			}
			setLastUsedId((prev) => prev + 1)
			setElements((es) => es.concat(newNode))
		} else {
			const newNode = {
				id: (lastUsedId + 1).toString(),
				type: "functionNode",
				position: { x: defaultNodeOffsetX, y: getEmptySpace() },
				data: {
					label: funcObj.name,
					funcType: funcObj.id,
					in: funcObj.in,
					out: funcObj.out,
					module: null,
					isSelected: false,
					onSelectedChanged: onNodeSelectedChanged,
					onDeleteClicked: onDeleteClicked,
				},
			}
			setLastUsedId((prev) => prev + 1)
			setElements((es) => es.concat(newNode))
		}
	}

	function updateUndoList() {
		setUndoElementsStates((previousState) =>
			previousState.length < maxUndo
				? previousState.concat([rfInstance.toObject().elements])
				: previousState.slice(1).concat([rfInstance.toObject().elements])
		)
	}

	// Gets triggered when a node's internal "selected" property is changed
	function onNodeSelectedChanged(isSelected, id, data) {
		if (isSelected) {
			setActiveElement({ id, data })
		} else {
			if (
				rfInstance
					.toObject()
					.elements.find(
						(element) =>
							"data" in element &&
							"isSelected" in element.data &&
							element.data.isSelected === true
					) === undefined
			) {
				setActiveElement(null)
			}
		}
	}

	// Gets triggered when a function name is clicked on the menu
	function onFunctionClicked(funcObj) {
		addNode(funcObj)
	}

	// Gets triggered when a module is selected on the side bar
	function onModuleSelected(module) {
		console.log(module)
		setElements(
			elements.map((element) => {
				if (element.id === activeElement.id) {
					element.data = { ...element.data, module: module }
				}
				return element
			})
		)
	}

	// Gets triggered when connection completed. Chooses the correct edge type depending on the handle compatibility.
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
				updateUndoList()
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

	// Sent to custom nodes by addNode function. Gets triggered when x is clicked or delete key is pressed.
	function onDeleteClicked(event, id) {
		updateUndoList()
		setElements((els) =>
			removeElements([els.find((element) => element.id === id)], els)
		)
	}

	// Deletes edge. Gets triggered when the x on edge is clicked
	const onEdgeButtonClick = (event, id) => {
		updateUndoList()
		setElements((els) =>
			removeElements([els.find((element) => element.id === id)], els)
		)
	}

	// Deletes element. Gets triggered when the deleteKeyCode is pressed
	const onElementsRemove = (elementsToRemove) => {
		updateUndoList()
		setElements((els) => removeElements(elementsToRemove, els))
	}

	// Gets triggered when the connection of the edge is moved to another node
	const onEdgeUpdate = (oldEdge, newConnection) => {
		updateUndoList()
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

	function onUndoClicked() {
		if (undoElementsStates[undoElementsStates.length - 1]) {
			setElements(undoElementsStates[undoElementsStates.length - 1])
			setUndoElementsStates((previousState) => previousState.slice(0, -1))
		} else {
			console.log("no undo")
		}
	}

	function onRedoClicked() {}

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
			<VStack
				width="100%"
				margin="0px 20px"
				borderRadius="7px"
				border="2px"
				borderColor="silver"
				overflow="hidden"
			>
				<HStack w="100%" justify="start" p="2px 4px">
					<Button onClick={onUndoClicked} size="xs">
						Undo
					</Button>
					<Button onClick={onRedoClicked} size="xs">
						Redo
					</Button>
				</HStack>

				<Diagram
					elements={elements}
					setReactFlowInstance={setRfInstance}
					onEdgeUpdate={onEdgeUpdate}
					onElementsRemove={onElementsRemove}
					onConnect={onConnect}
				/>
			</VStack>

			<SideBar element={activeElement} onModuleSelected={onModuleSelected} />
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
		</Flex>
	)
}
