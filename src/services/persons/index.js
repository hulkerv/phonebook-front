import axios from 'axios';

export const getAll = () => {
	return(
		axios
			.get('https://phonebook-hulker.herokuapp.com/api/persons')
			.then(response =>{
				const {data} = response;
				return data;
		})
	)
}

export const create = ({name, number, id}) => {
	return(
		axios
			.post('https://phonebook-hulker.herokuapp.com/api/persons', {name, number, id})
			.then(response => {
				const {data} = response;
				return data;
			})
	)
}