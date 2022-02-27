import { getBezierPath, getMarkerEnd, getEdgeCenter } from "react-flow-renderer"

const foreignObjectSize = 40

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
	const [edgeCenterX, edgeCenterY] = getEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
	})
	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<foreignObject
				width={foreignObjectSize}
				height={foreignObjectSize}
				x={edgeCenterX - foreignObjectSize / 2}
				y={edgeCenterY - foreignObjectSize / 2}
				className="edgebutton-foreignobject"
				requiredExtensions="http://www.w3.org/1999/xhtml"
			>
				<div
					style={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
						background: "transparent",
						width: foreignObjectSize,
						height: foreignObjectSize,
					}}
				>
					<button
						className="edgebutton"
						onClick={(event) => data.onButtonClick(event, id)}
						style={{
							alignItems: "center",
							justifyContent: "center",
							background: "#eee",
							borderRadius: "50%",
							height: foreignObjectSize / 2,
							width: foreignObjectSize / 2,
							lineHeight: 1,
							cursor: "pointer",
						}}
					>
						×
					</button>
				</div>
			</foreignObject>
		</>
	)
}
