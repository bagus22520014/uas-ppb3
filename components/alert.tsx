import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

type AlertProps = {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({
  visible,
  message,
  type = "info",
  onClose,
}) => {
  const backgroundColor =
    type === "success"
      ? Colors.alert.success
      : type === "error"
      ? Colors.alert.error
      : type === "warning"
      ? Colors.alert.warning
      : Colors.alert.info;

  const icon =
    type === "success"
      ? "checkmark-circle"
      : type === "error"
      ? "close-circle"
      : type === "warning"
      ? "warning"
      : "information-circle";

  const buttonText =
    type === "success"
      ? "Continue"
      : type === "error"
      ? "Try again"
      : type === "warning"
      ? "Be careful"
      : "OK";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, { backgroundColor }]}>
          <Ionicons name={icon} size={48} color="#fff" style={styles.icon} />
          <Text style={styles.alertMessage}>{message}</Text>
          <Pressable style={styles.alertButton} onPress={onClose}>
            <Text style={styles.alertButtonText}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: 320,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  alertMessage: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  alertButton: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  alertButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Alert;
