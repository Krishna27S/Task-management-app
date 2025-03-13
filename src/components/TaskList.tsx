import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskFilters from './TaskFilters';
import Link from 'next/link';
import { Task } from '../types/task';

const TaskCard = ({ task }: { task: Task }) => {
  const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
      case 'HIGH':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: 'text-red-500'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: 'text-yellow-500'
        };
      case 'LOW':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: 'text-green-500'
        };
    }
  };

  const getStatusStyles = (status: Task['status']) => {
    switch (status) {
      case 'TODO':
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: 'text-gray-500'
        };
      case 'IN_PROGRESS':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: 'text-blue-500'
        };
      case 'COMPLETED':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: 'text-green-500'
        };
    }
  };

  const priorityStyles = getPriorityStyles(task.priority);
  const statusStyles = getStatusStyles(task.status);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <Link href={`/${task._id}`}>
        <div className="p-6 cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                {task.title}
              </h3>
              <p className="mt-2 text-gray-600 line-clamp-2 text-sm">
                {task.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityStyles.bg} ${priorityStyles.text} border ${priorityStyles.border}`}>
              <svg className={`w-3 h-3 mr-1 ${priorityStyles.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {task.priority}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles.bg} ${statusStyles.text} border ${statusStyles.border}`}>
              <svg className={`w-3 h-3 mr-1 ${statusStyles.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {task.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
    <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
    <p className="mt-2 text-sm text-gray-500">
      Get started by creating a new task or adjust your filters.
    </p>
    <div className="mt-6">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Create New Task
      </button>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-12 bg-red-50 rounded-lg">
    <svg
      className="mx-auto h-12 w-12 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <h3 className="mt-4 text-lg font-medium text-red-800">Error</h3>
    <p className="mt-2 text-sm text-red-600">{message}</p>
  </div>
);

const TaskList = () => {
  const { filteredItems: tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const handleSearch = (searchTerm: string) => {
    // Search is handled through Redux filters
    console.log('Searching for:', searchTerm);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TaskFilters onSearch={handleSearch} />
      </div>
      
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;