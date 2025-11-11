import {useState,useEffect} from 'react';
import "./Todo.css";
import Button from '../Button/Button.tsx';

interface Task{
    description: string;
    deadline: string;
    status: string;
}

export default function Todo(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const [newTask, setNewTask] = useState<Task>({
        description: '',
        deadline: '',
        status: 'Not started',
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() =>{
        fetch('/data/list.json')
        .then(response => response.json())
        .then((data: Task[]) => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    const handleAddTask = () => {
        if(!newTask.description || !newTask.deadline){
            alert("Fill in all the blanks.");
            return;
        }
        setTasks([...tasks, newTask]);
        setNewTask({description:'', deadline: '', status: 'Not Started'});
        setShowForm(false);
    };

    const handleAddClick = () => {
        setShowForm(true);
    };

    const handleCancel= () => {
        setNewTask({description: '', deadline: '', status: 'Not Started'});
        setShowForm(false);
    };

    const handleDelete = (index:number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleEdit = (index:number) => {
        setEditingIndex(index);
        setEditedTask({...tasks[index]})    
    };

    const handleSaveEditing = () => {
        if(editingIndex === null || !editedTask ) return;
        const newTasks = [...tasks];
        newTasks[editingIndex] = editedTask;
        setTasks(newTasks);
        setEditingIndex(null);
        setEditedTask(null);
    };   

    const handleChange = (field:keyof Task, value:string) =>{
        if(!editedTask) return;
        setEditedTask({...editedTask, [field]: value});
    };


    if(loading) return <div>Loading...</div>;
    
    return(
        <div className='todo-wrap'>


            {/* FORM OF A NEW TASK */}
            <div className={`add-task ${showForm ? 'visible': ''}`}>
                <input
                    type='text'
                    placeholder='Description'
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <input
                    type='date'
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <select 
                    value={newTask.status} 
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}>
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Done</option>
                    <option>Overdue</option>
                </select>
                <div className='form-btns'>
                    <Button name='save' onClick={handleAddTask}/>
                    <Button name='cancel' onClick={handleCancel} />
                </div>
            </div>
            {!showForm && (
            <div className='add-btn'>
                <Button name='add' onClick={handleAddClick}/>
            </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task:Task, index:number) => (       
                        <tr key={index}>
                            <td>
                                {editingIndex === index? (
                                    <input 
                                        type = "text"
                                        value = {editedTask?.description || ''}
                                        onChange = {(e) => handleChange('description', e.target.value)}
                                    />
                                ):(
                                    task.description
                                )}
                            </td>
                            <td>
                                {editingIndex === index? (
                                    <input
                                        type = "date"
                                        value = {editedTask?.deadline || ''}
                                        onChange = {(e) => handleChange('deadline', e.target.value)}
                                    />
                                ) : (
                                    task.deadline
                                )}
                            </td>
                            <td>
                                {editingIndex === index? (
                                    <select
                                        value = {editedTask?.status || ''}
                                        onChange = {(e) => handleChange('status', e.target.value)}
                                    >
                                        <option>Not Started</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                        <option>Overdue</option>
                                    </select>
                                ) : (
                                    task.status
                                )}
                            </td>
                            <td>
                                {editingIndex === index? (
                                    <>
                                        <Button name = "save" onClick={handleSaveEditing}/>
                                        <Button name = "cancel" onClick={() => setEditingIndex(null)}/>
                                    </>
                                ):(
                                    <>
                                        <Button name = 'delete' onClick={() => handleDelete(index)}/>
                                        <Button name = 'edit' onClick={() => handleEdit(index)}/>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}