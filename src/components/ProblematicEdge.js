import { getBezierPath, getMarkerEnd } from "react-flow-renderer"

export default function ProblematicEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = { stroke: "#e53e3e", strokeWidth: "1px" },
	data,
	arrowHeadType = "arrow",
	// arrowStyle = { stroke: "#e53e3e", strokeWidth: "1px" },
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
				// arrowStyle={arrowStyle}
			/>
		</>
	)
}
