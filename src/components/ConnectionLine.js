export default ({
	sourceX,
	sourceY,
	sourcePosition,
	targetX,
	targetY,
	targetPosition,
	connectionLineType,
	connectionLineStyle,
}) => {
	return (
		<g>
			<path
				fill="none"
				stroke="#319795"
				strokeWidth={8}
				className="animated"
				d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${targetX} ${sourceY} ${targetX},${targetY}`}
			/>
			<circle
				cx={targetX}
				cy={targetY}
				fill="#fff"
				r={3}
				stroke="#222"
				strokeWidth={1.5}
			/>
		</g>
	)
}
