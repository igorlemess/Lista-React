import './App.css';

import {useState, useEffect} from 'react'
import {BsTrash, BsBookmarkCheck, BsBookmarckCheckFill} from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {
  const [title,setTitle] = useState("")
  const [qtde,setQtde] = useState("")
  const [itens,setitens] = useState([])
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const item = {
      id: Math.random(),
      title,
      qtde,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST" , 
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json" ,
      },
    })

    setTitle("");
    setQtde("");
  }

  return (
    <div className="App">
      <div className="lista-header">
        <h1>Lista</h1>
      </div>
      
      <div className="form-lista">
        <h2>Insira um item:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">Nome do item</label>
            <input 
            type="text" 
            name="title" 
            placeholder="Nome do item" 
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
            />
          </div>
          <div className="form-control">
            <label htmlFor="qtde">Quantidade</label>
            <input 
            type="text" 
            name="qtde" 
            placeholder="Quantidade" 
            onChange={(e) => setQtde(e.target.value)}
            value={qtde || ""}
            required
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
      
      <div className="lista">
        <h2>Lista de itens:</h2>
        {itens.length === 0 && <p>Não há tarefas</p>}
      </div>
    </div>
  );
}

export default App;
