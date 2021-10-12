import Dexie from "dexie";

// Create indexedDB with schema name myToDos and table name tasks
const db = new Dexie("myToDos");
db.version(1).stores({ tasks: "++id,name,due_date,done" });

db.open().catch(function (e) {
  console.error("Open failed: " + e);
});

/**
 * Add new task to indexedDB
 * @param {Object} taskInput - Input json containing name and due date
 */
db.addTask = async (taskInput) => {
  await db.tasks.add({
    ...taskInput,
    due_date: taskInput.due_date.format("MMMM D YYYY"),
  });
};

/**
 * Remove task from indexedDB
 * @param {Number} id - id of task to be removed
 */
db.removeItemFromDb = async (id) => {
  await db.tasks.delete(id);
};

/**
 * Update task status
 * @param {Number} id - id of task to be marked/unmarked done
 * @param {Object} event - marked/unmarked value
 */
db.markAsDone = async (id, event) => {
  if (event.target.checked) {
    await db.tasks.update(id, { done: 1 });
  } else {
    await db.tasks.update(id, { done: 0 });
  }
};

export default db;
