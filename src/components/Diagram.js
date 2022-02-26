import ReactFlow from "react-flow-renderer"
import FunctionNode from "./FunctionNode"
import { useEffect, useState } from "react"

const nodeTypes = {
	functionNode: FunctionNode,
}

export default function Diagram({ elements, onFunctionNodeSelected }) {
	function onElementClick(event, element) {
		console.log("click", element)
		if (element.type === "functionNode") {
			onFunctionNodeSelected(element)
		}
	}

	console.log(elements)

	return (
		<div style={{ height: 300, width: 500 }}>
			<ReactFlow
				elements={elements}
				nodeTypes={nodeTypes}
				onElementClick={onElementClick}
			/>
		</div>
	)
}
