import { useState } from "react";
import { useDispatch } from "react-redux";
import { getInitialThreadLimit, getInitialCommentsOff } from '../slices/optionsSlice';

const OptionsMenu = (props) => {
  
  const [ open, setOpen ] = useState(false);
  const [ threadLimit, setThreadLimit ] = useState(getInitialThreadLimit());
  const [ commentsOff, setCommentsOff ] = useState(getInitialCommentsOff());
  const dispatch = useDispatch();

  const toggleMenuOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const handleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'options/setThreadLimit', payload: { threadLimit }});
    dispatch({ type: 'options/setCommentsOff', payload: { commentsOff }});
  }

  const handleChangeComments = (e) => {
    setCommentsOff(e.target.checked);
  }

  const handleChangeThreadLimit = (e) => {
    let value = e.target.value
    if ( value < 1) {
      value = 1
    }
    setThreadLimit(Number(value));
  }



  return (
    <div>
      <div className="options-button">
        <button onClick={toggleMenuOpen}>
          Options
        </button>
      </div>
      {open && 
      <div className="options-menu">
        <label htmlFor="thread-limit">Thread Limit:</label><br/>
        <input type="number" id="thread-limit" name="thread-limit" min="1" max="25" defaultValue={threadLimit} onChange={handleChangeThreadLimit}/><br/>
        <label htmlFor="comments-off">Comments Off:</label><br/>
        <input type="checkbox" id="comments-off" name="comments-off" checked={commentsOff} onChange={handleChangeComments}/><br/>
        <button id="submit-options" onClick={handleSubmit}>Apply</button>
      </div>
      }
    </div>
  );
}

export default OptionsMenu;
