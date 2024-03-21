import { useState } from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";

const InputForm = ({
  initialValue = "",
  label = "",
  handleSubmit,
  handleClose,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      onReset={handleClose}
      className="flex flex-nowrap items-center gap-2"
    >
      <input
        type="text"
        placeholder="value"
        className="rounded-md"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="bg-green-400 hover:bg-green-500 duration-200 rounded-md p-1">
        <IoCheckmark className="icon" />
      </button>
      <button
        type="reset"
        className="bg-red-400 hover:bg-red-500 duration-200 rounded-md p-1"
      >
        <IoCloseOutline className="icon" />
      </button>
    </form>
  );
};

export default InputForm;
