import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NoteCardProps {
  note: string;
  category: string;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, category, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.noteContent}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.noteText}>{note}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  noteContent: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 16,
    justifyContent: 'center',
  },
});

export default NoteCard;
