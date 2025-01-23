import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await addNote(note.title, note.description, note.tag);
      setNote({ title: '', description: '', tag: '' });
      props.showAlert("Note Added Successfully", "success");
    } catch (error) {
      props.showAlert("Error adding note", "danger");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form className="container my-4">
          <div className="form-group my-3">
            <label htmlFor="title">Title </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              minLength={5}
              required
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
              required
              minLength={5}
              id="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">#Tags</label>
            <input
              type="text"
              className="form-control"
              name="tag"
              placeholder="Enter Tags"
              id="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
