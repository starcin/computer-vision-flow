import { getBezierPath, getMarkerEnd } from "react-flow-renderer"

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	// style = { stroke: "#319795", strokeWidth: "1px" },
	style,
	data,
	arrowHeadType = "arrow",
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
