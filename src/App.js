import './App.css';

import { useState, useEffect } from 'react'
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [qtde, setQtde] = useState("")
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false)

      setItens(res);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const item = {
      id: Math.random(),
      title,
      qtde,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    }
    )

    setItens((prevState) => [...prevState, item])

    setTitle("");
    setQtde("");
  }

  const handleDelete = async (id) => {

    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setItens((prevState) => prevState.filter((item) => item.id !== id))
  }

  const handleEdit = async (item) => {
    item.done = !item.done;

    const data = await fetch(API + "/todos" + item.id, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setItens((prevState) => 
    prevState.map((i) => (i.id === data.id ? (i = data) : i))
    )
  }


function Lista() {
    const lista = itens.map(item =>
      <div className="lista-itens" key={item.id}>
        <h3 className={item.done ? "item-done" : ""}>{item.title}</h3>
        <p>Quantidade: {item.qtde}</p>
        <div className="actions">
          <span onClick={() => handleEdit(item)}>
            {!item.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
          </span>
          <BsTrash onClick={() => handleDelete(item.id)} />
        </div>
      </div>)

    return <div>{lista}</div>
  }

  if (loading) {
    return <p>Carregando...</p>
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
              id="title"
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
              id="qtde"
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
        {Lista()}
      </div>
    </div>
  );
}

export default App;
