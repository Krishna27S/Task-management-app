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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </Layout>
  );
}