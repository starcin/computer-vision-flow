import ReactFlow, { Background, Controls } from "react-flow-renderer"
import { Box } from "@chakra-ui/react"
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
	setReactFlowInstance,
	onEdgeUpdate,
	onEdgeButtonClick,
	onElementsRemove,
	onConnect,
}) {
	return (
		<Box height="700px" width="100%">
			<ReactFlow
				elements={elements}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				selectNodesOnDrag={false}
				elementsSelectable={true}
				onElementsRemove={onElementsRemove}
				onLoad={setReactFlowInstance}
				onConnect={onConnect}
				onEdgeUpdate={onEdgeUpdate}
				style={{ background: "white" }}
				snapToGrid={true}
				connectionLineComponent={ConnectionLine}
				deleteKeyCode={46} /* 'delete'-key */
			>
				<Controls />
				<Background />
			</ReactFlow>
		</Box>
	)
}
