import React, { useState, useEffect } from 'react';
import {Filter} from './Filter';
import {PersonForm} from './PersonForm';
import {Persons} from './Persons';
import {create as createNewNote, getAll as getAllNotes} from './services/persons/'

const App = () => {
	
  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ findName, setFindName ] = useState('');
  const [loading, setLoading] = useState(false);
	
	useEffect(()=>{
		setLoading(true);
		getAllNotes().then((persons) => {
			setPersons(persons)
			setLoading(false)
		})
	}, [])

  	const handleChange = {
		name: (e) => {
			setNewName(e.target.value)
		},
		number: (e) => {
			setNewNumber(e.target.value)
		}
	}
	
	const handleSubmit = (e) => {
		
		e.preventDefault()
		
		const findName = persons.find(personName => personName.name === newName)
	    const findNumber = persons.find(personNumber => personNumber.number === newNumber)
				
		if(findName){
			return alert(`${newName} is already exist` );
		}else if(findNumber){
			return alert(`The number ${newNumber} is already exist` );
		}
		const nameToAddToState = {
			name: newName,
			number: newNumber,
        };
			
        createNewNote(nameToAddToState)
            .then(newPerson=>setPersons(prevPersons => prevPersons.concat(newPerson)))
        setNewName('');
        setNewNumber('');
	};
	const handleFilter = (e) => {
		setFindName(e.target.value);
	}
	
	const filterValue = persons.filter((person) =>{
		if(findName === ""){
			return person
		}else if(person.name.toLowerCase().includes(findName.toLowerCase())){
			return person
		};
		return null
	});
	
  return (
    <div>
      <h2>Phonebook</h2>
      	<div>
      		<Filter handleFilter={handleFilter} findName={findName}/>
      	</div>
      <h2>Add a new</h2>
      <div>
      	<PersonForm handleSubmit={handleSubmit} handleChange={handleChange} newName={newName} newNumber={newNumber}/>
      </div>
      <h2>Numbers</h2>
      {loading ? 'Cargando...' : ""}
	  <table>
	  	<tbody>
	  		<tr>
      			<td><strong>Name</strong></td>
      			<td><strong>  Number</strong></td>
      		</tr>
      		{filterValue.map(person => <Persons key={person.number} person={person}/>)}
	  	</tbody>
	  </table>
    </div>
  )
}

export default App
