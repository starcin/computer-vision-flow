import FunctionList from "./components/FunctionList"
import SettingsPanel from "./components/SettingsPanel"
import Diagram from "./components/Diagram"
import { useEffect, useState } from "react"

function App() {
	const [functions, setFunctions] = useState([])

	function getFunctions() {
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
	}

	useEffect(() => {
		getFunctions()
	}, [])

	return (
		<div className="App">
			<div className="editor-container">
				<FunctionList functions={functions} />
				<Diagram />
				<SettingsPanel />
			</div>
		</div>
	)
}

export default App
