import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import TaskUI from '../components/TaskUI';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    is_starred: boolean;
    created_at: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newTask, setNewTask] = useState('');

    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const userId = session?.user?.id;
            if (!userId) return;
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });
                if (error) {
                    setError(error.message);
                } else {
                    setTasks(data || []);
                }
            } catch {
                setError('Failed to load tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [session]);

    async function handleSignOut(e: React.FormEvent) {
        e.preventDefault();
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    async function addTask(e: React.FormEvent) {
        e.preventDefault();
        if (!newTask.trim()) return;

        const { data, error } = await supabase
            .from('tasks')
            .insert({ title: newTask, user_id: session?.user?.id })
            .select('*').order('created_at', { ascending: false });
        if (error) {
            setError(error.message);
        } else if (data) {
            setNewTask('');
            setTasks([data[0], ...tasks]);
        }
    }

    async function toggleComplete(id: string, currentCompleted: boolean) {
        const { error } = await supabase.from('tasks').update({ is_completed: !currentCompleted }).eq('id', id);
        if (error) {
            setError(error.message);
        } else {
            setTasks(tasks.map((task) => task.id === id ? { ...task, is_completed: !currentCompleted } : task));
        }
    }

    async function toggleStar(id: string, currentStarred: boolean) {
        const { error } = await supabase.from('tasks').update({ is_starred: !currentStarred }).eq('id', id);
        if (error) {
            setError(error.message);
        } else {
            setTasks(tasks.map((task) => task.id === id ? { ...task, is_starred: !currentStarred } : task));
        }
    }

    async function deleteTask(id: string) {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (error) {
            setError(error.message);
        } else {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center uppercase tracking-widest animate-pulse">
                INITIALIZING_BUFFER...
            </div>
        );
    } else if (error) {
        return (
            <div className="min-h-screen bg-black text-red-500 font-mono flex items-center justify-center p-8 text-center uppercase border-4 border-red-500 m-4">
                CRITICAL_FAILURE: {error}
            </div>
        );
    }

    return (
        <TaskUI
            tasks={tasks}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
            toggleComplete={toggleComplete}
            toggleStar={toggleStar}
            deleteTask={deleteTask}
            handleSignOut={handleSignOut}
            error={error}
            session={session}
        />
    );
}