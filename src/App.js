import React, { Component } from 'react';
import styled from 'styled-components'
const dim = 25

const Item = styled.span`
  border: 1px solid black;
  width: ${dim+'px'};
  height: ${dim+'px'};
  background-color: ${props => (props.item === 0 ? 'white': 'black')}
`

const Container = styled.div`
  width: ${props => props.cols * dim + 'px'};
  height: ${props => props.rows * dim + 'px'};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`}
`
function fillWithData(grid){
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[0].length; j++){
      grid[i][j] = Math.floor(Math.random() * Math.floor(2))
    }
  }
  return grid
}

function make2DArray(cols, rows) {
  let arr = new Array(cols)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows)
  }
  return arr
}

function computeNeighbors(grid, x, y) {
  let sum = 0;
  for(var i = -1; i < 2; i++) {
    for(var j = -1; j < 2; j++) {
      sum += grid[(x + i + grid.length) % grid.length][(y + j + grid[0].length) % grid[0].length] 
    }
  }
  sum -= grid[x][y]
  return sum
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      grid: fillWithData(make2DArray(props.cols, props.rows))
    }
    this.computeNextState = this.computeNextState.bind(this)
  }
  
  computeNextState(state){
    //  0 -> 3 live -> 1
    // 1 -> < 2 live || > 3 live -> 0
    const {grid} = state
    const next = make2DArray(this.props.cols, this.props.rows)
    for(var i = 0 ; i < grid.length; i++) {
      for(var j = 0; j < grid[0].length; j++) {
        
          let neighbors = computeNeighbors(grid, i, j)
          if (neighbors == 3 && grid[i][j] == 0) {
            next[i][j] = 1
          }
          else if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3) ) {
            next[i][j] = 0
          }
          else {
            next[i][j] = grid[i][j]
          }
        }
    }

    return {grid: next}
  }
  componentDidMount(){
    this.interval = setInterval(() => {
      const nextState = this.computeNextState(this.state)
      this.setState(nextState)
    }
      , 1000/10)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    console.log(this.state)
    return (
      <Container {...this.props}>
        {this.state.grid.map((row, i) => {
          return row.map((item, j) => <Item item={item} key={`${i}${j}`}></Item>)
        })}
      </Container>
    );
  }
}

export default App;
