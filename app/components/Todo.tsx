import TodoItem from "@/app/components/TodoItem";
import type { TodoItemData } from "@/app/types/todo";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Todo() {
  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo: TodoItemData = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>My To Do</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter your task"
          placeholderTextColor="#999"
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>add task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
        style={styles.list}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    paddingRight: 100,
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#4CAF50",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "lowercase",
  },
  list: {
    flex: 1,
  },
});
