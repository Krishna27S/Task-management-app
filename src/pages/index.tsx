import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Layout from '../components/Layout';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Task Management</h1>
        <TaskForm />
        <div className="mt-8">
          <TaskList />
        </div>
      </div>
    </Layout>
  );
}