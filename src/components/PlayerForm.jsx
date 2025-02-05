import axios from "axios";
import { useState, useEffect } from "react";
const PlayerForm = () => {

  const [addedPlayer, setAddedPlayer] = useState({
    name: "",
    email: "",
    color: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    color: ""
  })

  const handleImputChange = (e) => {
    const target = e.target;
    const name = target.name;
console.log(e.target)
    setAddedPlayer({
      ...addedPlayer,
      [name]: target.value,
    });
  }

  const handleInputChangeColor = (e) => {
    const target = e.target;
    const options = target.options
    setAddedPlayer({
        ...addedPlayer,
        color: options[target.selectedIndex].innerText,
    });
  }

  const savePlayer = (eventObj) => {
    console.log('player saved')
  }

  const resetForm = () => {
    setAddedPlayer({
      name: "",
      email: "",
      color: ""
    });
    setErrors({
      name: "",
      email: "",
      color: ""
    })
  }

  const validateForm = (e) => {
    e.preventDefault()

    savePlayer()
    resetForm()
  }
  console.log(addedPlayer)
  return (
    <div className="container lg">
      <form onSubmit={validateForm}>
        <div className="mb-3">
          <label htmlFor="player-name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="player-name" aria-describedby="emailHelp" value={addedPlayer.name} onChange={handleImputChange}/>
          <div id="nameHelp" className="form-text">Choose your username.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="player-email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="player-email" aria-describedby="emailHelp" value={addedPlayer.email} onChange={handleImputChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="player-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="player-password" />
        </div> */}
        <div className="mb-3">
          <label htmlFor="player-color" className="form-label">Color</label>
          <select className="form-select form-select-lg mb-3" aria-label=".form-select-sm example" id="player-color" onChange={handleInputChangeColor}  defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>Choose your color...</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  )
}

export default PlayerForm;