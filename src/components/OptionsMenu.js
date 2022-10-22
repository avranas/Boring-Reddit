import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInitialThreadLimit, getInitialCommentsOn } from '../slices/optionsSlice';

const OptionsMenu = (props) => {
  
  const [ open, setOpen ] = useState(false);
  const [ threadLimit, setThreadLimit ] = useState(getInitialThreadLimit());
  const [ commentsOn, setCommentsOn ] = useState(getInitialCommentsOn());
  const dispatch = useDispatch();
  const maxThreads = 25;

  const expand = () => {
    setOpen(true);
  }

  const close = (e) => {
    setOpen(false);
  }

  const handleChangeComments = (e) => {
    const commentsOn = e.target.checked
    setCommentsOn(commentsOn);
    dispatch({ type: 'options/setCommentsOn', payload: { commentsOn }});
  }

  const handleChangeThreadLimit = (e) => {
    let value = Number(e.target.value);
    if ( value < 1) {
      value = 1
    } else if ( value > 25) {
      value = maxThreads;
    }
    setThreadLimit(value);
    dispatch({ type: 'options/setThreadLimit', payload: { value }});
  }

  useEffect(() => {
    const handleClick = e => {
      const isDropdownButton = e.target.matches('[data-dropdown-button]')
      if (!isDropdownButton && e.target.closest('[data-dropdown') !== null) return;
      if (isDropdownButton) {
        if (open) {
          close();
        } else {
          expand();
        }
      } else {
        close();
      } 
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  //TODO NEXT: 
    //Understand the above code better
    //Learn about react-transition-group
    //Make the dropdown menu transition work

  return (
    <div id="options">
      <button id="options-button" data-dropdown-button>
        Options
      </button>
      {open &&
        <div id="options-menu" data-dropdown>
          <div>
            <label htmlFor="thread-limit">Thread Limit:</label><br/>
            <input
              type="number"
              id="thread-limit"
              name="thread-limit"
              min="1"
              max={maxThreads}
              defaultValue={threadLimit}
              onChange={handleChangeThreadLimit}
            />
          </div>
            <label class="form-check-label" for="flexSwitchCheckDefault">Comments On</label>
          <div class="form-check form-switch">
            <input 
              class="form-check-input"
              type="checkbox"
              role="switch"
              name="comments-on"
              id="comments-on"
              checked={commentsOn}
              onChange={handleChangeComments}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default OptionsMenu;
