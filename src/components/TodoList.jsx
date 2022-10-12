import React, { useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [show, setShow] = useState(false);

  const [todo, setTodo] = useState({
    name: "",
    status: false,
  });

  // console.log("todo ", todo);

  const [todoList, setTodoList] = useState([]);
  // console.log("things to do ", todoList);

  const [done, setDone] = useState([]);
  // console.log("thigns done ", done);

  // to do
  function handleAdd() {
    // console.log("add handle clicked...");
    setTodo({});
    setShow((prevShow) => !prevShow);
  }

  function handleChange(event) {
    const {name,value} = event.target
    // console.log(todo[name])
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    if (!/\S/.test(todo.name)) {
      // Didn't find something other than a space which means it's empty
      return
    }

    console.log("submit handle is clicked!");
      setTodo(function (prevTodo) {
        return { ...prevTodo};
      });
      setTodoList(function (prevTodoList) {
        return [...prevTodoList, { ...todo, status: false }];
      });
      setShow((prevShow) => !prevShow);
  }

  function handleCancel() {
    // console.log("Cancel handle is clicked...");
    setTodoList(function (prevTodoList) {
      return [...prevTodoList];
    });
    setShow((prevShow) => !prevShow);
  }

  function handleCheck(event, tid, tstatus) {
    // console.log(
    //   "check handle clicked of todo having tid and status namely ",
    //   tid,
    //   tstatus
    // );
    if (tstatus === false) {
      // console.log("checked ", event.target.checked);
      let newThingsdone = [...done];
      for (let i = 0; i < todoList.length; i++) {
        const task = todoList[i];
        // console.log('task inside handlecheck is ',task)
        if (task.name === tid) {
          newThingsdone.push({ ...task, status: event.target.checked });
          // console.log('things done inside checkhandle ',newThingsdone)
          const newTodoList = [...todoList];
          // console.log('deleted item ',todoList[i])
          newTodoList.splice(i, 1);
          setTodoList(newTodoList);
          // console.log('updated todo list ',newTodoList)
        }
      }
      setDone(newThingsdone);
    }
    if (tstatus === true) {
      // console.log("checked ", event.target.checked);
      let newTodoList = [...todoList];
      for (let i = 0; i < done.length; i++) {
        const task = done[i];
        if (task.name === tid) {
          newTodoList.push({ ...task, status: event.target.checked });
          const newThingsdone = [...done];
          newThingsdone.splice(i, 1);
          setDone(newThingsdone);
        }
      }
      setTodoList(newTodoList);
    }
  }

  function handleDelete(tid) {
    setDone(function (prevDone) {
      let newDone = [...prevDone];
      for (let i = 0; i < prevDone.length; i++) {
        const task = prevDone[i];
        if (task.name === tid) {
          prevDone.splice(i, 1);
        }
      }
      return newDone;
    });
  }

  let todoListElement = todoList.map(function (task) {
    // console.log('current task to do ',task.name)
    return (
      <Todo
        key={task.name}
        id={task.name}
        handleCheck={handleCheck}
        checked={task.status}
        handleDelete={handleDelete}
        {...task}
      />
    );
  });

  let thingsDoneElement = done.map(function (task) {
    // console.log('current task done ',task.name)
    return (
      <Todo
        key={task.name}
        id={task.name}
        handleCheck={handleCheck}
        checked={task.status}
        handleDelete={handleDelete}
        {...task}
        
      />
    );
  });

  return (
    <div className="max-w-5xl flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold text-blue-700">Things to do</h1>
        {todoList.length < 1 ? <span className="text-blue-500">No todos here!</span> : todoListElement}
      </div>
      <div className="flex flex-col gap-5">
        <button
          className="border rounded-2xl px-3 py-1 bg-yellow-500 text-white font-semibold self-start"
          onClick={handleAdd}
        >
          + Add a todo
        </button>
        {show && (
          <div className="w-full border-2 border-yellow-500 rounded-md bg-white">
          <form className="flex flex-col gap-5 w-1/2 mx-7 my-5" onSubmit={handleSubmit}>
            <h1 className="font-semibold text-xl text-yellow-500">Create a todo</h1>
            <input
              type="text"
              className="border rounded py-2 indent-3 text-blue-700"
              onChange={handleChange}
              value={todo.name}
              name="name"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="border rounded-md px-3 py-1 bg-yellow-500 text-white font-semibold"
              >
                Submit
              </button>
              <button
                type="button"
                className="border-2 border-yellow-500 rounded-md px-3 py-1 text-yellow-500 font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold text-blue-700">Things done</h1>
        {done.length ? thingsDoneElement : <span className="text-blue-500">Nothings done yet!</span>}
      </div>
    </div>
  );
}
export default TodoList;
