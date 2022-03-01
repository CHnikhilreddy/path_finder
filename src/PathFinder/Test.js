import {useState,useRef} from 'react'
import {Button, Container, Slider, Typography} from '@material-ui/core'
import { getRandomHelper, getupdatedgrid } from './helperfunctions'

function Test() {
  const running = useRef()
  running.current = false
  const [starting_position,setStarting_position] = useState([8,28])
  const [target_position,setTarget_position] = useState([[9,7],[2,2]])
  const [change_position,setChange_position] = useState('wall')
  const [numRows,setNumRows] = useState(30)
  const numRowsRefs = useRef()
  numRowsRefs.current = numRows
  const [numCols,setNumCols] = useState(60)
  const numColsRefs = useRef()
  numColsRefs.current = numCols
  const [answer,setAnswer] = useState("not_done")
  const [grid,setGrid] = useState(()=>getrandom())

  function getrandom(){
    return getRandomHelper(numRowsRefs.current,numColsRefs.current,starting_position,target_position)
  }

  const changesatefunctin = (i,j,str)=>{
    setGrid((g)=>{
        var new_arr = JSON.parse(JSON.stringify(g))
        if(grid[i][j]==='start_position'){
            return new_arr
        }
        if(str === 'start_position'){
            new_arr[i][j] = new_arr[i][j]==='target'?'target':str
            new_arr[starting_position[0]][starting_position[1]] = 'free_space'
            setStarting_position([i,j])
            return new_arr
        }
        if(str === 'target'){
            if(new_arr[i][j] === 'start_position'){
                return new_arr
            }
            else{
                new_arr[i][j] = new_arr[i][j]===str?'free_space':str
                return new_arr
            }
        }
        new_arr[i][j] = new_arr[i][j]==='free_space'?str:'free_space'
        return new_arr
    }
    )
  }

  const startBFS = (arr,ans) =>{
    if(arr.length===0){
        setAnswer((s)=>{
            if(s==='ans_found'){return s}
            return "not_found"
        })
        return
    }
    var new_arr = []
    setGrid(g=>{
      var returned_object = getupdatedgrid(g,[],arr,ans)
      new_arr = returned_object.new_arr
      ans = returned_object.ans
      if(returned_object.ans){
          setAnswer('ans_found')
          console.log("ans_found")
      }
      return returned_object.new_grid
      }
    )
    setTimeout(()=>{startBFS(new_arr,ans)},10)
  }
  
  function callbfs(){
      return startBFS([[starting_position[0],starting_position[1],[[starting_position[0],starting_position[1]]]]],0)
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Button variant='contained' color='primary'
          onClick={()=>{callbfs()}}>Start</Button>
        <Button variant='contained' color={change_position === 'start_position'?'secondary':'primary'}
          onClick={()=>{setChange_position('start_position')}}>change the start position</Button>
        <Button variant='contained' color={change_position === 'target'?'secondary':'primary'} onClick={()=>{setChange_position('target')}}>add target positions</Button>
        <Button variant='contained' color={change_position === 'wall'?'secondary':'primary'} onClick={()=>{setChange_position('wall')}}>add or remove walls</Button>
        <Button variant='contained' color='primary' onClick={()=>{setGrid(getrandom())}}>Refresh</Button>
        <Slider
          defaultValue={30}
          getAriaValueText={(v)=>v}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={2}
          marks
          min={10}
          max={30}
          onChangeCommitted={(e,value)=>{
            setNumRows(value)
            numRowsRefs.current = value
            setGrid(getrandom())
          }}  
        />
        <Slider
          defaultValue={60}
          getAriaValueText={(v)=>v}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={3}
          marks
          min={30}
          max={60}
          onChangeCommitted={(e,value)=>{
            setNumCols(value)
            numColsRefs.current = value
            setGrid(getrandom())
          }}  
        />
        
        {answer==="not_found"?<Typography align='center' variant='h4'>Answer not found</Typography>
        :<></>}
        
      </Container>
      <Container>
        <div style={{
          display:"grid",
          gridTemplateColumns:`repeat(${numCols},20px)`,
          gridTemplateRows:`repeat(${numRows},20px)`}}>
        {grid.map((row,i)=> (
          row.map((col,j)=> (
            <div
            key={`${i}-${j}`}
            onClick={()=>{
              changesatefunctin(i,j,change_position)
            }}
            style={{
              border:"solid 1px black",
              backgroundColor:grid[i][j] === "start_position"?"red":grid[i][j] === "Running"?"orange":grid[i][j]==='target'?"green":grid[i][j]==='wall'?'black':grid[i][j]==='path'?'blue':grid[i][j]==='exposed_target'?'yellow':undefined}}>
              </div>)
      )))}
      </div>
      </Container>
    </div>
  );
}

export default Test;
