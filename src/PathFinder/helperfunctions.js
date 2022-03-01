const direction = [[1,0],[-1,0],[0,1],[0,-1]]

const getRandom = (r,c,start,target)=>{
    const rows = []
    for(let i = 0;i<r;i++){
        rows.push(Array.from(Array(c),()=>Math.random()<0.2?'wall':'free_space'))
    }
    rows[start[0]][start[1]] = 'start_position'
    rows[target[0][0]][target[0][1]] = 'target'
    rows[target[1][0]][target[1][1]] = 'target'
    return rows
}
const getRandom_v2 = (r,c,start,target)=>{
    const rows = []
    for(let i = 0;i<r;i++){
        rows.push(Array.from(Array(c),()=>Math.random()<0.2?['wall','wall']:['free_space','free_space']))
    }
    rows[start[0]][start[1]] = ['start_position','start_position']
    rows[target[0][0]][target[0][1]] = ['target','target']
    rows[target[1][0]][target[1][1]] = ['target','target']
    return rows
}
const getpath = (grid_arr,path_arr)=>{
    for(let i in path_arr){
      grid_arr[path_arr[i][0]][path_arr[i][1]] = grid_arr[path_arr[i][0]][path_arr[i][1]] ==='Running'?'path':grid_arr[path_arr[i][0]][path_arr[i][1]]
    }
    return grid_arr
}
const getpath_v2 = (grid_arr,path_arr)=>{
    for(let i in path_arr){
      grid_arr[path_arr[i][0]][path_arr[i][1]] = grid_arr[path_arr[i][0]][path_arr[i][1]][0] ==='Running'?['path','Running']:grid_arr[path_arr[i][0]][path_arr[i][1]]
    }
    return grid_arr
}
const getupdatedgrid = (g,new_arr,arr,ans)=>{
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
            let path = JSON.parse(JSON.stringify(arr[i][2]))
            path.push([x,y])
            new_arr.push([x,y,path])
            ans +=1
            new_grid =  getpath(new_grid,path)
            new_grid[x][y] = 'exposed_target'
            break
          }
        }
      }
    }
    return {ans,new_grid,new_arr}
}

const getupdatedgrid_V2 = (g,new_arr,arr,ans)=>{
    var path = []
    var new_grid = JSON.parse(JSON.stringify(g))
    for(let i in arr){
      for(let j in direction){
        let x = arr[i][0] + direction[j][0]
        let y = arr[i][1] + direction[j][1]
        if(x>=0 && y>=0 && x<new_grid.length && y<new_grid[0].length){
          if(new_grid[x][y][1] === "free_space"){
              if(new_grid[x][y][1] === "free_space"){
                  new_grid[x][y] = new_grid[x][y][0]==="free_space"?["Running","Running"]:[new_grid[x][y][0],"Running"]
              }
              let path = JSON.parse(JSON.stringify(arr[i][2]))
              path.push([x,y])
              new_arr.push([x,y,path])
          }
          else if(new_grid[x][y][0] === 'target'){
            path = JSON.parse(JSON.stringify(arr[i][2]))
            ans = true
            new_grid[x][y] = ['exposed_target','exposed_target_new']
            new_grid =  getpath_v2(new_grid,path)
            break
          }
        }
      }
    }
    return {ans,new_grid,new_arr,path}
}

module.exports = {
    direction: direction,
    getRandomHelper: getRandom,
    getupdatedgrid:getupdatedgrid,
    getupdatedgrid_v2:getupdatedgrid_V2,
    getpath,
    getRandom_v2
}