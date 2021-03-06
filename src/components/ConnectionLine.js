export default ({
	sourceX,
	sourceY,
	sourcePosition,
	targetX,
	targetY,
	targetPosition,
	connectionLineType,
	connectionLineStyle,
	isProblematic = false,
}) => {
	return (
		<g>
			<path
				fill="none"
				stroke={isProblematic ? "red" : "#999"}
				strokeWidth={1}
				className="animated"
				d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${targetX} ${sourceY} ${targetX},${targetY}`}
			/>
			<circle cx={targetX} cy={targetY} fill="#999" r={3} />
		</g>
	)
}
