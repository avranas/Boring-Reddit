import { useState } from "react";

const OptionsMenu = (props) => {
  
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  return (
    <div className="options-menu">
      <button onClick={handleChange}>
        button
      </button>
      {
        open ? <h2>Options Menu is open</h2>
        : <h2>Options Menu is closed</h2>
      }
    </div>
  );
}

export default OptionsMenu;
