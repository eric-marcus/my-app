import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Form (props) {
  const [userName, setUserName] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('do submit')
    fetchData();
  };
  const fetchData = () => {
    fetch(`https://api.github.com/users/${userName}`)
    .then(resp => { resp.json()
      .then((data) => { props.updata(data);
      })
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={userName}
          onChange={event => {
            console.log(event.target.value);
            setUserName(event.target.value)}}
          placeholde='github username'
          required
        />
        <button>Add card</button>
      </form>
    </div>
  );
}



function CardList (props) {
  console.log(props.data);
  return(
    <div>
      {/* <Card {...props}/> */}
      {props.data.map(item => <Card {...item}/>)}
    </div>
  )
}

function Card (props) {
  const data = props;
  return (
    <div>
      {/* <img src={data.avatar_url}></img> */}
      {/* <img src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'></img> */}
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '125%'}}>{data.name}</div>
        <div>{data.company}</div>
      </div>
    </div>
    
  )
}

function App (props) {
  const [data, setData] = useState([]);
  const updata = (newData) => {
    setData([...data, newData],
    )
  }
  return (
    <div>
      <Form updata={updata} />
      <CardList data={data}/>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App title='github profile cards'/>
  </React.StrictMode>
);

