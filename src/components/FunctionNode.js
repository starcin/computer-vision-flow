import { Box } from "@chakra-ui/react"
import React, { memo } from "react"

import { Handle } from "react-flow-renderer"

export default memo(({ data, isConnectable }) => {
	return (
		<Box
			bg="white"
			border="1px"
			borderRadius="9px"
			padding="5px 9px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			<Handle
				type="target"
				position="top"
				id={data.in}
				style={{
					background: "#38B2AC",
					height: "15px",
					width: "15px",
					top: "-9px",
				}}
				onConnect={(params) => console.log("handle onConnect", params)}
				isConnectable={isConnectable}
			/>
			<div>
				<strong>{data.label}</strong>
			</div>
			<label>
				{data.module ? (
					data.module
				) : (
					<span style={{ color: "red" }}>Select a module</span>
				)}
			</label>
			<Handle
				type="source"
				position="bottom"
				id={data.out}
				style={{
					background: "#285E61",
					height: "15px",
					width: "15px",
					bottom: "-9px",
				}}
				isConnectable={isConnectable}
			/>
		</Box>
	)
})
