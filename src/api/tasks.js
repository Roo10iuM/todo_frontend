import request from "./request";

export async function getTasks() {
  return request('/tasks');
}

export async function saveTasks(tasks) {
  return request('/tasks', {
    method: 'POST',
    body: tasks,
  });
}
