import React, { Component } from 'react';
import { FlatList, Text, StyleSheet,View } from 'react-native';

const rows = [
  {
    id: 0, 
    text: 'View',
    newRow: [
    {id: 0, text: 'View'},
    {id: 1, text: 'Text'},
    {id: 2, text: 'Image'},
    {id: 3, text: 'ScrollView'},
    {id: 4, text: 'ListView'},
    ]
  },
  {id: 1, text: 'Text',
    newRow: [
    {id: 0, text: 'View'},
    {id: 1, text: 'Text'},
    {id: 2, text: 'Image'},
    {id: 3, text: 'ScrollView'}, 
    {id: 4, text: 'ListView'},
    ]
  },
  {id: 2, text: 'Image'},
  {id: 3, text: 'ScrollView'},
  {id: 4, text: 'ListView'},
  
]

// const rowsNewRow = rows[i].newRow

const extractKey = ({newRow}) => newRow

export default class App extends Component {
    
    renderItem = ({item}) => {
      let items = [];
     
      if( item.newRow && item.id===1) {
        items = item.newRow.map(row => {
          return <Text>{row.text}</Text>
        })
      } 

      return (
        <View>
         
          {items}
        </View>
      )
    }

  
  render(
    
  ) {
    return (
      <View  style={styles.container}>
      <FlatList
        style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    flexDirection: 'column'
  },
})
