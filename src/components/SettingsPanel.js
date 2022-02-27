import { useState, useEffect } from "react"

export default function SettingsPanel({ element }) {
	const [state, setTheState] = useState()
	const [settings, setSettings] = useState([])
	const [settingFormats, setSettingFormats] = useState([])

	useEffect(() => {
		fetch("databases/settings.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (myJson) {
				setSettingFormats(myJson.settings)
			})
	}, [])

	useEffect(() => {
		if (element && element.settings) {
			console.log("element settings: ", element.settings)
			setSettings(element.settings)
		} else if (element) {
			setSettings(
				settingFormats
					.find((sf) => sf.id === element.data.funcType)
					.settings.map((s) => ({ name: s.name, value: s.defvalue }))
			)
		}
	}, [element, settingFormats])

	function handleChange(e) {
		setTheState({ value: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
	}

	if (element == null) {
		return <div>Settings Will Be Shown Here</div>
	}

	return (
		<form onSubmit={handleSubmit}>
			{settingFormats
				.find((sf) => sf.id === element.data.funcType)
				.settings.map((s) => (
					<div key={element.id + s.name}>
						<label>{s.name}</label>
						{s.type === "drop-down" ? (
							<select value={settings.find((st) => st.name === s.name).value}>
								{s.options.map((opt) => (
									<option value={opt}>{opt}</option>
								))}
							</select>
						) : s.type === "checkbox" ? (
							<input
								type="checkbox"
								checked={
									settings.find((st) => st.name === s.name).value === "true"
								}
							/>
						) : s.type === "text" ? (
							<input
								type="text"
								placeholder={settings.find((st) => st.name === s.name).value}
							/>
						) : (
							<></>
						)}
					</div>
				))}

			<input type="submit" value="Submit" />
		</form>
	)
}
