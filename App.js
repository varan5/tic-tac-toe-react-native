import React from 'react'
import { StyleSheet, Button, View, TouchableOpacity, Alert } from 'react-native'
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'
import Title from './src/components/Title'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
  ,
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame()
  }

  initializeGame = () => {
    this.setState({gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    })
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col]
    switch(value) {
      case 1: return  <Icon name="close" style={styles.tileX} /> 
      case -1: return  <Icon name="circle-outline" style={styles.tile0} />
      default: <View></View>
    }
  }

  getWinner = () => {
    const NUM_TILES = 3
    let sum = 0
    let array = this.state.gameState

    // Checking whether all the rows are the same
    for (let i = 0; i < NUM_TILES; i++) {
      sum = array[i][0] + array[i][1] + array[i][2]
      if (sum === 3)
        return 1
      else if (sum === -3)
        return -1
    }

    // Checking whether all the columns are the same
    for (let i = 0; i < NUM_TILES; i++) {
      sum = array[0][i] + array[1][i] + array[2][i]
      if (sum === 3)
        return 1
      else if (sum === -3)
        return -1
    }

    // Checking whether the diagonals are the same

    // Checking the right diagonal condition 
    sum = array[0][0] + array[1][1] + array[2][2]
    if (sum === 3)
      return 1
    else if (sum === -3)
      return -1

    // Checking the left diagonals condition
    sum = array[0][2] + array[1][1] + array[2][0]
    if (sum === 3)
      return 1
    else if (sum === -3)
      return -1

    return 0    // No winner is found, hence lets return 0
  }
 
  onTilePress = (row, col) => {
    let currentPlayer = this.state.currentPlayer
    
    // Checking the override condition and preventing to override existing value with a new value
    let value = this.state.gameState[row][col]
    if (value !== 0)
      return    // No need to do anything

    // Set the correct tile
    let array = this.state.gameState.slice()
    array[row][col] = currentPlayer
    this.setState({gameState: array})

    // Switch to other player
    let nextPlayer = (currentPlayer == 1) ? -1 : 1
    this.setState({currentPlayer: nextPlayer})

    // Check the winners 
    let winner = this.getWinner() 
    if (winner === 1) {
      Alert.alert('Player 1 is the Winner !')
      this.initializeGame()
    }
    else if (winner === -1) {
      Alert.alert('Player 2 is the Winner !')
      this.initializeGame()
    }
  }

  onNewGamePress = () => {
    this.initializeGame()
  }

  render() {
    return (
      <View style={styles.container}>

        <Title />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0}]} >
           {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0}]} >
            {this.renderIcon(0, 1)}  
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0}]} >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0}]} >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile]} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0}]} >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0}]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0}]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0}]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.space}/>
        <Button style={styles.newGameButton} title="New Game" color="#007580" onPress={this.onNewGamePress}/>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5, 
    borderColor: '#007580',
    width: 100,
    height: 100,
  },
  tileX: {
    color: '#e9896a',
    fontSize: 60,
    paddingLeft: 10
  },
  tile0: {
    marginLeft: 10,
    color: '#96bb7c',
    fontSize: 60,
  },
  space: {
    paddingTop: 50
  },
})

export default App