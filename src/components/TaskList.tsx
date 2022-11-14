import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

const randomNumber = () => Math.ceil(Math.random() * 99999);

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [isShowingInvalidMsg, setIsShowingInvalidMsg] = useState(false);

	function showInvalidNameMessage() {
		setTimeout(() => {
			setIsShowingInvalidMsg((showing) => !showing);
		}, 3000);
		setIsShowingInvalidMsg((showing) => !showing);
	}

	function handleCreateNewTask() {
		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
		if (newTaskTitle) {
			let taskNumber = randomNumber();
			const newTask: Task = {
				title: newTaskTitle,
				id: taskNumber,
				isComplete: false,
			};
			setTasks((actualTasks) => [...actualTasks, newTask]);
			setNewTaskTitle("");
		} else {
			showInvalidNameMessage();
		}
	}

	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
		const toggledTasks = tasks.map((task) =>
			task.id == id
				? {
						...task,
						isComplete: !task.isComplete,
				  }
				: task
		);
		setTasks(toggledTasks);
	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID
		const removedTasks = tasks.filter((task) => task.id != id);

		setTasks(removedTasks);
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					{isShowingInvalidMsg && (
						<p className="invalid-message">nome inválido</p>
					)}
					<input
						type="text"
						placeholder="Adicionar novo todo"
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button
						type="submit"
						data-testid="add-task-button"
						onClick={handleCreateNewTask}
					>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div
								className={task.isComplete ? "completed" : ""}
								data-testid="task"
							>
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() => handleToggleTaskCompletion(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button
								type="button"
								data-testid="remove-task-button"
								onClick={() => handleRemoveTask(task.id)}
							>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
