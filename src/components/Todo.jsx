import React from "react";
import { HiTrash } from "react-icons/hi";

function Todo(props) {
  // console.log(props)
  return (
    <div className="text-blue-700 flex flex-col gap-5">
      <p className="border rounded flex gap-3 items-center h-14 bg-white px-2">
        <input
          type="checkbox"
          onClick={(event) => props.handleCheck(event, props.id, props.status)}
          name={props.name}
          checked={props.checked}
        />
        <span>{props.name}</span>
        {props.checked && (
          <HiTrash onClick={() => props.handleDelete(props.id)} />
        )}
      </p>
    </div>
  );
}
export default Todo;
