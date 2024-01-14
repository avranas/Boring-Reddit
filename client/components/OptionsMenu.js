import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getInitialThreadLimit,
  getInitialCommentsOn,
  getInitialHideNsfw,
} from "../slices/optionsSlice";

const OptionsMenu = (props) => {
  const [open, setOpen] = useState(false);
  const [threadLimit, setThreadLimit] = useState(getInitialThreadLimit());
  const [commentsOn, setCommentsOn] = useState(getInitialCommentsOn());
  const [hideNSFW, setHideNSFW] = useState(getInitialHideNsfw());

  const dispatch = useDispatch();
  const maxThreads = 25;

  const expand = () => {
    setOpen(true);
  };

  const close = (e) => {
    setOpen(false);
  };

  const handleChangeComments = (e) => {
    const commentsOn = e.target.checked;
    setCommentsOn(commentsOn);
    dispatch({ type: "options/setCommentsOn", payload: { commentsOn } });
  };

  const handleChangeNSFW = (e) => {
    const hideNSFW = e.target.checked;
    setHideNSFW(hideNSFW);
    dispatch({ type: "options/setHideNSFW", payload: { hideNSFW } });
  };

  const handleChangeThreadLimit = (e) => {
    let value = Number(e.target.value);
    if (value < 1) {
      value = 1;
    } else if (value > 25) {
      value = maxThreads;
    }
    setThreadLimit(value);
    dispatch({ type: "options/setThreadLimit", payload: { value } });
  };

  useEffect(() => {
    const handleClick = (e) => {
      const isDropdownButton = e.target.matches("[data-dropdown-button]");
      if (!isDropdownButton && e.target.closest("[data-dropdown") !== null)
        return;
      if (isDropdownButton) {
        if (open) {
          close();
        } else {
          expand();
        }
      } else {
        close();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div id="options" data-testid="options-menu">
      <button
        id="options-button"
        data-dropdown-button
        data-testid="options-menu-button"
      >
        Options
      </button>
      {open && (
        <div id="options-menu" data-dropdown>
          <div>
            <label htmlFor="thread-limit">Thread Limit:</label>
            <br />
            <input
              data-testid="thread-limit-input"
              type="number"
              id="thread-limit"
              name="thread-limit"
              min="1"
              max={maxThreads}
              defaultValue={threadLimit}
              onChange={handleChangeThreadLimit}
            />
          </div>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Comments On
          </label>
          <div className="form-check form-switch">
            <input
              data-testid="comment-switch"
              className="form-check-input"
              type="checkbox"
              role="switch"
              name="comments-on"
              id="comments-on"
              checked={commentsOn}
              onChange={handleChangeComments}
            />
          </div>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Hide NSFW
          </label>
          <div className="form-check form-switch">
            <input
              data-testid="nsfw-switch"
              className="form-check-input"
              type="checkbox"
              role="switch"
              name="hide-nsfw"
              id="hide-nsfw"
              checked={hideNSFW}
              onChange={handleChangeNSFW}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
