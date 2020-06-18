import React, { useState } from 'react'

const LoadForm = props => {
	const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				props.updateAll()
				setUser(initialFormState)
			}}
		>
			<button>Load Messages</button>
		</form>
	)
}

export default LoadForm
