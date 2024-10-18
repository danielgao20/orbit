import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteCard from '../components/NoteCard';

interface Note {
  id: string;
  text: string;
  category: string;
}

const categories = [
  { label: 'Fact', value: 'fact' },
  { label: 'Quote', value: 'quote' },
  { label: 'Date', value: 'date' },
];

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addNote = () => {
    if (newNote.trim() && category) {
      const note: Note = { id: Date.now().toString(), text: newNote, category };
      setNotes([...notes, note]);
      setNewNote('');
      setCategory(null);
      setModalVisible(false); // Close modal after adding note
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header Title */}
      <Text style={styles.title}>Orbit</Text>

      {/* Note List */}
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteCard
            note={item.text}
            category={item.category}
            onDelete={() => deleteNote(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Add Note Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal for Adding New Note */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Note</Text>

            <TextInput
              style={styles.input}
              placeholder="Write your note..."
              value={newNote}
              onChangeText={setNewNote}
            />

            <Dropdown
              style={styles.dropdown}
              data={categories}
              labelField="label"
              valueField="value"
              placeholder="Select a category"
              value={category}
              onChange={(item) => setCategory(item.value)}
            />

            <TouchableOpacity onPress={addNote} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingVertical: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#6200ee',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6200ee',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
