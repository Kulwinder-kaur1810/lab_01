import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox, Button, IconButton, Card } from "react-native-paper";

export default function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: "due" }]);
    setTaskTitle(""); // Clear input
  };

  // Function to toggle task status
  const toggleStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "due" ? "done" : "due" } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      {/* Task Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button mode="contained" onPress={addTask} disabled={taskTitle.trim() === ""}>
          Add Task
        </Button>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <View style={styles.taskRow}>
              <TouchableOpacity onPress={() => toggleStatus(item.id)} style={styles.checkbox}>
                <Checkbox status={item.status === "done" ? "checked" : "unchecked"} />
              </TouchableOpacity>
              <Text style={item.status === "done" ? styles.taskDone : styles.taskText}>
                {item.title}
              </Text>
              <IconButton icon="delete" onPress={() => deleteTask(item.id)} />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "cream",
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "boldblack",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,

  },
  taskCard: {
    marginVertical: 5,
    padding: 10,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskDone: {
    flex: 1,
    fontSize: 20,
    textDecorationLine: "line-through",
    color: "black",
    backgroundColor: "lightgrey"
  },
});