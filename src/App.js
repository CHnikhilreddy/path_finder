import {useState,useRef} from 'react'

const direction = [[1,0],[-1,0],[0,1],[0,-1]]
const numRows = 20
const numCols = 30

function App() {
  const running = useRef()
  running.current = false
  const [starting_position,setStarting_position] = useState([18,28])
  const [change_position,setChange_position] = useState('wall')
  const [grid,setGrid] = useState(()=>{
    const rows = []
    for(let i = 0;i<numRows;i++){
      rows.push(Array.from(Array(numCols),()=>Math.random()<0.3?'wall':'free_space'))
    }
    rows[starting_position[0]][starting_position[1]] = 'start_position'
    rows[2][2] = 'target'
    return rows 
  })

  const changesatefunctin = (i,j,str)=>{
    var new_arr = JSON.parse(JSON.stringify(grid))
    if(str === 'start_position'){
      new_arr[i][j] = new_arr[i][j]==='target'?'target':str
      new_arr[starting_position[0]][starting_position[1]] = 'free_space'
      setStarting_position([i,j])
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
      <button onClick={()=>{startBFS([[starting_position[0],starting_position[1],[[starting_position[0],starting_position[1]]]]])}}>Start</button>
      <button onClick={()=>{setChange_position('start_position')}}>change the start position</button>
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
    </div>
  );
}

export default App;
