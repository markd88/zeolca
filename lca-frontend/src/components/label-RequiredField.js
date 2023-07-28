import React from 'react';

const App = (text) => () => {
  return (
    <div
    style={{
      marginBottom: 10,
      marginTop: 10,
      fontSize: 15,
    }}>
      <label>{text}</label>
      <label
      style={{
        color: 'red'
      }}>*</label>
    </div>
    
  )
}

export default App;