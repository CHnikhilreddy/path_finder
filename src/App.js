import { Container,Switch } from '@material-ui/core'
import { useState } from 'react'
import Algo from './PathFinder/Algo'
import Test from './PathFinder/Test'
import Test_V2 from './PathFinder/Test_V2'

function App(){
  const [text,setText] = useState('Test_V2')
  return(
    <>
  <Container>
    <Switch
      checked = {text==='Test_V2'?false:true}
      onChange={()=>{setText('Test_V2')}}
      name="checkedA"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
    <>Check for multiple target in order</>
    <Switch
    checked = {text==='Test'?false:true}
    onChange={()=>{setText('Test')}}
    name="checkedA"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
    <>Check for multiple target from starting position</>
    <Switch
    checked = {text==='Algo'?false:true}
    onChange={()=>{setText('Algo')}}
    name="checkedA"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
    <>Optimal way to target from source</>
  </Container>
    {text === 'Test_V2'?<Test_V2></Test_V2>:text === 'Test'?<Test/>:<Algo/>}
    </>
  )
}
export default App