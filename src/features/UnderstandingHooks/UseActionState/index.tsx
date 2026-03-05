import { startTransition, useActionState } from "react";
import AddTask from "../UseReducer/AddTask";
import TaskList from "../UseReducer/TaskList";

interface Task {
  id: number;
  text: string;
  done: boolean;
}
interface Action {
  type: string;
  id?: number;
  text?: string;
  task?: Task;
  taskId?: number;
}
let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

const tasksReducer = async (state: Task[], action: Action): Promise<Task[]> => {
  switch (action.type) {
    case "added": {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate async delay
      return [
        ...state,
        {
          id: action.id!,
          text: action.text!,
          done: false,
        },
      ];
    }
    case "changed": {
      return state.map((task) => {
        if (task.id === action?.task?.id) {
          return action.task!;
        } else {
          return task;
        }
      });
    }
    case "deleted": {
      return state.filter((task) => task.id !== action.taskId);
    }
    default: {
      return state;
    }
  }
};

export default function UseActionState() {
  const [tasks, dispatch, isPending] = useActionState(
    tasksReducer,
    initialTasks,
  );
  console.log("isPending:", isPending);

  function handleAddTask(text: string) {
    startTransition(() => {
      dispatch({
        type: "added",
        id: nextId++,
        text,
      });
    });

    
  }

  function handleChangeTask(task: { id: number; text: string; done: boolean }) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      taskId: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
