import type { TodoItemProps } from "@/app/types/todo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            autoFocus
            onSubmitEditing={handleSave}
          />
          <TouchableOpacity onPress={handleSave}>
            <Ionicons name="checkmark" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={[styles.text, todo.completed && styles.completedText]}>
            {todo.text}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onToggle(todo.id)}
            >
              <Ionicons
                name={"checkmark-circle"}
                size={20}
                color={todo.completed ? "#4CAF50" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.actionButton}
            >
              <Ionicons name="pencil" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(todo.id)}
              style={styles.actionButton}
            >
              <Ionicons name="trash-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 8,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#4CAF50",
  },
  editContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    marginRight: 8,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 8,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
});
