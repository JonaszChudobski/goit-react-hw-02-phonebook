import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, number } = this.state;
    const id = nanoid();
    if (this.state.contacts.find(value => value.name === name)) {
      alert(`${name} already exists in contacts.`);
    } else {
      this.setState({
        contacts: [...this.state.contacts, { name, number, id }],
      });
    }
    form.reset();
  };

  handleFiltering = (arr, query) => {
    let filtered = arr.filter(el =>
      el.name.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  };

  handleDeleting = e => {
    const nameToDelete = e.target.id;
    this.setState({
      contacts: this.state.contacts.filter(name => name.id !== nameToDelete),
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={this.handleFiltering(
            this.state.contacts,
            this.state.filter
          )}
          handleDeleting={this.handleDeleting}
        />
      </div>
    );
  }
}
