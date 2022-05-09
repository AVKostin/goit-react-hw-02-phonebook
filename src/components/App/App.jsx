import { Component } from 'react';
import styles from './styles.module.css';
import { FaJournalWhills } from 'react-icons/fa';
import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+38 095 459 1256' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38 095 443 8912' },
      { id: 'id-3', name: 'Eden Clements', number: '+38 095 645 1779' },
      { id: 'id-4', name: 'Annie Copeland', number: '+38 095 227 9126' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts)
      this.setState({
        contacts: parseContacts,
      });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }


  toAddContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onFilterInput = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  onDeleteContact = e => {
    const elemToRemove = e.currentTarget.parentNode.id;
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== elemToRemove),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.h1}>
           <FaJournalWhills size={28} className={styles.icon} />Phonebook
        </h1>
        <Form addContact={this.toAddContact} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter onInput={this.onFilterInput} />
        <Contacts
          contacts={contacts}
          filter={filter}
          filteredContacts={this.onFilteredContacts}
          deleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
