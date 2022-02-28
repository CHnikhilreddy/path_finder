import {useState,useRef} from 'react'
import {Button, Container, Slider} from '@material-ui/core'

const direction = [[1,0],[-1,0],[0,1],[0,-1]]
// const numCols = 60

function App() {
  const running = useRef()
  running.current = false
  const [starting_position,setStarting_position] = useState([8,28])
  const [target_position,setTarget_position] = useState([2,2])
  const [change_position,setChange_position] = useState('wall')
  const [numRows,setNumRows] = useState(30)
  const numRowsRefs = useRef()
  numRowsRefs.current = numRows
  const [numCols,setNumCols] = useState(60)
  const numColsRefs = useRef()
  numColsRefs.current = numCols
  const [grid,setGrid] = useState(()=>getrandom())
  function getrandom(){
    const rows = []
    for(let i = 0;i<numRowsRefs.current;i++){
      rows.push(Array.from(Array(numColsRefs.current),()=>Math.random()<0.3?'wall':'free_space'))
    }
    rows[starting_position[0]][starting_position[1]] = 'start_position'
    rows[target_position[0]][target_position[1]] = 'target'
    return rows
  }

  const changesatefunctin = (i,j,str)=>{
    var new_arr = JSON.parse(JSON.stringify(grid))
    if(grid[i][j]==='target'){
      return
    }
    if(grid[i][j]==='start_position'){
      return
    }
    if(str === 'start_position'){
      new_arr[i][j] = new_arr[i][j]==='target'?'target':str
      new_arr[starting_position[0]][starting_position[1]] = 'free_space'
      setStarting_position([i,j])
    }
    else if(str === 'target'){
      new_arr[i][j] = new_arr[i][j]==='start_position'?'start_position':str
      new_arr[target_position[0]][target_position[1]] = 'free_space'
      setTarget_position([i,j])
    }
    else{
      new_arr[i][j] = new_arr[i][j]==='free_space'?str:'free_space'
    }
    setGrid(new_arr)
  }

  const getpath = (grid_arr,path_arr)=>{
    for(let i in path_arr){
      grid_arr[path_arr[i][0]][path_arr[i][1]] = grid_arr[path_arr[i][0]][path_arr[i][1]] ==='Running'?'path':grid_arr[path_arr[i][0]][path_arr[i][1]]
    }
    return grid_arr
  }

  const startBFS = (arr) =>{
    if(arr.length===0){
      return
    }
    var answer = false
    var new_arr = []
    setGrid(g=>{
      var new_grid = JSON.parse(JSON.stringify(g))
        for(let i in arr){
          for(let j in direction){
            let x = arr[i][0] + direction[j][0]
            let y = arr[i][1] + direction[j][1]
            if(x>=0 && y>=0 && x<new_grid.length && y<new_grid[0].length){
              if(new_grid[x][y] === "free_space"){
                  new_grid[x][y] = 'Running'
                  let path = JSON.parse(JSON.stringify(arr[i][2]))
                  path.push([x,y])
                  new_arr.push([x,y,path])
              }
              else if(new_grid[x][y] === 'target'){
                new_arr = []
                let path = JSON.parse(JSON.stringify(arr[i][2]))
                path.push([x,y])  
                answer = true
                return getpath(new_grid,path)
              }
            }
          }
        }
        if(answer === true){
          console.log("answer found")
          return
        }
        return new_grid
      }
    )
    setTimeout(()=>{startBFS(new_arr)},100)
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Button variant='contained' color='primary'
          onClick={()=>{startBFS([[starting_position[0],starting_position[1],[[starting_position[0],starting_position[1]]]]])}}>Start</Button>
        <Button variant='contained' color='primary'
          onClick={()=>{setChange_position('start_position')}}>change the start position</Button>
        <Button variant='contained' color='primary' onClick={()=>{setChange_position('target')}}>change the target position</Button>
        <Button variant='contained' color='primary' onClick={()=>{setChange_position('wall')}}>add or remove walls</Button>
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
              backgroundColor:grid[i][j] === "start_position"?"red":grid[i][j] === "Running"?"orange":grid[i][j]==='target'?"green":grid[i][j]==='wall'?'black':grid[i][j]==='path'?'blue':undefined}}>
              </div>)
      )))}
      </div>
      </Container>
    </div>
  );
}

export default App;
