import { JETBLACK_THEME } from "../styles/themes";

// WIP
// TODO: MAKE IT LOOK LIKE A REAL TERMINAL

interface TaskUIProps {
    tasks: any[];
    newTask: string;
    setNewTask: (val: string) => void;
    addTask: (e: React.FormEvent) => void;
    toggleComplete: (id: string, status: boolean) => void;
    toggleStar: (id: string, status: boolean) => void;
    deleteTask: (id: string) => void;
    handleSignOut: (e: React.FormEvent) => void;
    error: string | null;
    session: any;
}

export default function TaskUI({ tasks, newTask, setNewTask, addTask, toggleComplete, toggleStar, deleteTask, handleSignOut, error, session }: TaskUIProps) {
    const themeStyles = {
        '--color-brand-bg': JETBLACK_THEME.colors.background,
        '--color-brand-card': JETBLACK_THEME.colors.card,
        '--color-brand-border': JETBLACK_THEME.colors.border,
        '--color-silver-bright': JETBLACK_THEME.colors.silver.bright,
        '--color-silver-mid': JETBLACK_THEME.colors.silver.mid,
        '--color-silver-dark': JETBLACK_THEME.colors.silver.dark,
        '--color-success': JETBLACK_THEME.colors.success,
        '--color-error': JETBLACK_THEME.colors.error,
        '--scanline-opacity': JETBLACK_THEME.opacity.scanline,
        '--border-heavy': JETBLACK_THEME.borders.heavy,
        '--border-standard': JETBLACK_THEME.borders.standard,
    } as React.CSSProperties;
    return (
        <div
            style={themeStyles}
            className="min-h-screen bg-brand-bg text-white font-mono p-4 md:p-8 relative overflow-hidden selection:bg-silver-bright selection:text-black">
            <div
                className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]"
                style={{ opacity: JETBLACK_THEME.opacity.scanline }}
            ></div>
            <div
                style={{ borderWidth: JETBLACK_THEME.borders.heavy }}
                className="max-w-2xl mx-auto border-brand-border bg-brand-bg/95 backdrop-blur-sm relative py-8 px-6 md:px-10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <header className="mb-12 space-y-2 border-b-2 border-brand-border pb-6">
                    <h1 className="text-3xl font-bold tracking-tighter uppercase italic select-none">
                        {'>'} TASKS.EXE
                    </h1>
                    <p className="text-silver-mid text-xs uppercase tracking-widest opacity-80">
                        Status: ACTIVE // User: {session?.user.email} // Kernel: 0.1.0
                    </p>
                </header>
                <form onSubmit={addTask} className="mb-12 flex items-center gap-4 group">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-mid text-sm">$</span>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="INITIALIZE NEW TASK..."
                            className="w-full bg-brand-card border-2 border-brand-border py-3 pl-8 pr-4 text-sm focus:outline-none focus:border-silver-mid transition-colors placeholder:text-silver-dark uppercase"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-silver-bright text-black px-6 py-3 text-sm font-bold uppercase transition-all hover:bg-white active:scale-95 shadow-[4px_4px_0px_var(--color-brand-border)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        Execute
                    </button>
                </form>
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <div className="text-silver-dark text-center py-10 uppercase italic text-sm tracking-widest border border-dashed border-brand-border">
                            No active tasks in buffer.
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="group flex items-center justify-between gap-4 p-4 border border-brand-border hover:border-silver-dark transition-all duration-200 bg-brand-card/50">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <button
                                        onClick={() => toggleComplete(task.id, task.is_completed)}
                                        className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${task.is_completed
                                            ? 'bg-silver-bright border-silver-bright text-black'
                                            : 'border-brand-border hover:border-silver-mid text-transparent'
                                            }`}>✓
                                    </button>
                                    <div className="flex flex-col min-w-0">
                                        <span className={`text-sm md:text-base uppercase tracking-tight transition-all truncate ${task.is_completed
                                            ? 'text-silver-dark line-through decoration-2'
                                            : 'text-silver-bright font-bold'
                                            }`}>
                                            {task.title}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleStar(task.id, task.is_starred)}
                                        className={`p-1.5 transition-all ${task.is_starred
                                            ? 'text-silver-bright'
                                            : 'text-silver-dark hover:text-silver-mid'
                                            }`}
                                        style={task.is_starred ? { filter: 'drop-shadow(0 0 8px #F5F5F7)' } : {}}
                                        title="Star Task">
                                        <span className="text-lg leading-none">{task.is_starred ? '★' : '☆'}</span>
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-[10px] uppercase font-bold text-error border border-error/30 px-2 py-1 opacity-0 group-hover:opacity-100 hover:bg-error/10 transition-all duration-200"
                                        style={{ opacity: JETBLACK_THEME.opacity.purge }}>
                                        [PURGE]
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    <div>
                        <p
                            onClick={handleSignOut}
                            className="hover:cursor-pointer border inline-block px-4 py-3 mt-4">Sign Out
                        </p>
                    </div>
                </div>
                {error && (
                    <div className="mt-8 p-3 border border-error text-error text-[10px] uppercase tracking-tighter bg-error/10 animate-pulse">
                        CRITICAL_ERROR: {error}
                    </div>
                )}
            </div>
        </div>
    );
}
