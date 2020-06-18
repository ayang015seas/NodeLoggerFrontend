import React, { useState, Fragment, Component } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import LoadForm from './forms/LoadForm'
import UserTable from './tables/UserTable'
import axios from 'axios'

var number = 1;

const App = () => {
	var usersData = [];
	// var usersData = [
	// 	{ id: 1, name: 'Tania', username: 'floppydiskette' },
	// 	{ id: 2, name: 'Craig', username: 'siliconeidolon' },
	// 	{ id: 3, name: 'Ben', username: 'benisphere' },
	// ]
 
	var user1 = { id: 4, name: 'Ben', username: 'benisphere' };

	axios.get('http://localhost:3001/').then(res => {
		var response = res.data;

		for (var record in response) {
			console.log(response[record])
			if (response[record].length > 5) {
				usersData.push({id: number, name: 'Error', username: response[record]});
				number++;
			}
		}
	    // usersData.push({id: 4, name: res.data, username: res.data})
		// console.log(res.data);
	})


	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	var [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations

	const updateAll = () => {
		setEditing(false)
		console.log("HIT USERS")
		console.log(users.length)
		console.log(usersData.length)

		setUsers([...usersData])
	}

	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>Server Log Prototype</h1>
			<div className="flex-row">
				<h2>View Logs</h2>
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Log</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
						</Fragment>
					)}
				</div>
			</div>
			<div className="flex-row"> 
				<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />

			</div>
			<div className="flex-row">
				<div className="flex-large">
					<LoadForm updateAll={updateAll}/>
				</div>
			</div>
		</div>
	)
}

export default App


/*
const App = () => {
	var usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
	]
 
	var user1 = { id: 4, name: 'Ben', username: 'benisphere' };

	axios.get('http://localhost:3001/').then(res => {
	    usersData.push({id: 4, name: res.data, username: res.data})	
		console.log(res.data);
	})

	// Data


	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		number--;
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const loadAll = () => {
		setEditing(false);
		setUsers([user]);
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>Server Log Prototype</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Log</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add Logs</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
			</div>
			<div className="flex-row">
				<div className="flex-large">
					<h2>View Logs</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

*/

