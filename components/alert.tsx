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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, { backgroundColor }]}>
          <Text style={styles.alertMessage}>{message}</Text>
          <Pressable style={styles.alertButton} onPress={onClose}>
            <Text style={styles.alertButtonText}>OK</Text>
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
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  alertMessage: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  alertButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  alertButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Alert;
