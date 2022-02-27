import { getBezierPath, getMarkerEnd } from "react-flow-renderer"

export default function ProblematicEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = { stroke: "#e53e3e", strokeWidth: "8px" },
	data,
	arrowHeadType,
	markerEndId,
}) {
	const edgePath = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	})
	const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
		</>
	)
}
