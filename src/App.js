import { createContext, useState } from 'react';
import './App.css';
import Task from './components/task';
import TaskInput from './components/taskInput';
import { ethers } from 'ethers'
import abi from './abi.json'

export const InputContext = createContext(null);

const contractAddress = "0xAFB43df719395b90A8bf6D4Cf3555BbC85C5771E";

function App() {

  const [account,setAccount] = useState("0x");
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')

  async function connect(){
    if(window.ethereum.isMetaMask){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts  = await provider.send("eth_requestAccounts",[]);
      const contract = new ethers.Contract(contractAddress,abi,provider)
      setAccount(accounts[0])
	  setTodos(await contract.getUser(accounts[0]))
    }
  }

  async function add(accnt,text){
	if(window.ethereum.isMetaMask){
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(contractAddress,abi,signer)
	  	console.log(await contract.addItem(accnt,text))
	  }
  }

  async function edit(accnt,text,idx){
	if(window.ethereum.isMetaMask){
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(contractAddress,abi,signer)
	  	await contract.editItem(accnt,idx,text)
	  }
  }

  async function remove(accnt,idx){
	if(window.ethereum.isMetaMask){
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(contractAddress,abi,signer)
	  	await contract.removeItem(accnt,idx)
	  }
  }

  return (
    <div className="container">
        <InputContext.Provider value={{input,setInput,todos,setTodos,account,add,edit,remove}}>
          <div className='app'>
			<div className='app-main'>
				<h1>Web3 Todo List</h1>
            	<button onClick={connect} className='connect-mask-btn'>Connect to Metamask</button>
				<TaskInput/>
			</div>
			<div className='tasks-parent'>
				<div className={`tasks`} style={{padding:todos.length>0?'20px':'0px'}}>
					{
						todos.length>0
						?
						todos.map((todo,index)=>(
							<Task content={todo} index={index} key={index}/>
						))
						:
						<h2 style={{textAlign:'center'}}>{account==="0x"?"Connect to MetaMask":"You have no pending tasks"}</h2>
					}
				</div>
            </div>
          </div>
        </InputContext.Provider>
    </div>
  );
}

export default App;
