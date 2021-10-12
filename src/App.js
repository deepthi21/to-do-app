import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import TodoList from "./components/TodoList";
import Notification from './components/Notification';
import './App.css'

function App() {
  // TODO: write as context API
  const [notification, setNotification] = useState(null);

  return (
    <div className="App">
      <AppBar position="static">
        <Typography data-testid="header" variant="h6" style={{padding:'5px'}}>
          My Todos 
        </Typography>
      </AppBar>
      <TodoList setNotification={setNotification} />
      {notification && <Notification notification={notification}/>}
    </div>
  );
}

export default App;
