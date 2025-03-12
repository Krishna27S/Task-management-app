import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
