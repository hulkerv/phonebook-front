export const PersonForm = ({handleSubmit, handleChange, newName, newNumber}) => (
	<form onSubmit={handleSubmit}>
        <div>
          <input id="name" onChange={handleChange.name} type="text" placeholder="Add Name..." value={newName}/>
          <input id="number" onChange={handleChange.number} type="number" placeholder="Add Number..." value={newNumber}/>
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
)