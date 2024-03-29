import { Component } from "react";
import styles from "./styles.module.css";
import "react-phone-number-input/style.css";
import shortid from "shortid";
import Notiflix from "notiflix";
import PropTypes from "prop-types";
import { TiUserAddOutline } from "react-icons/ti";
import PhoneInput from "react-phone-number-input";

Notiflix.Notify.init({
    position: "center-top",
    width: "400px",
    fontSize: "18px",
});

class Form extends Component {
    state = {
        name: "",
        number: "",
        isDisabled: false,
    };

    reset = () => {
        this.setState({ name: "", number: "", id: "" });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const contact = {
            id: shortid.generate(),
            name: this.state.name,
            number: this.state.number,
        };
        if (this.state.name.length === 0)
            return Notiflix.Notify.failure(
                "Enter valid name / Введите корректное имя",
            );
        if (this.state.number.length !== 13)
            return Notiflix.Notify.failure(
                "Enter valid number / Введите корректный номер",
            );
        this.props.addContact(contact);
        this.reset();
    };

    handleChange = (e) => {
        const { name, value } = e.currentTarget;

        this.setState({ isDisabled: false, [name]: value });
        // console.log(this.props.contacts);
        const contactFinder = this.props.contacts.find(
            (contact) =>
                contact.name.toLowerCase() === value.toLowerCase() ||
                contact.number === value,
        );
        if (contactFinder) {
            this.setState({ isDisabled: true });
            Notiflix.Notify.warning(
                `${value} is already in contacts / уже есть в списке ваших контактов.`,
            );
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        placeholder="John Brown"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e)}
                    />
                </label>

                <label>
                    Number:
                    <PhoneInput
                        type="tel"
                        name="number"
                        // defaultCountry=""
                        placeholder="+380 12 345 6789"
                        initialValueFormat="national"
                        className={styles.phoneInputCountry}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        value={this.state.number}
                        onChange={(number) => this.setState({ number })}
                    />
                </label>

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={this.state.isDisabled}
                >
                    add contact
                    <TiUserAddOutline size={20} className={styles.icon} />
                </button>
            </form>
        );
    }
}

Form.propTypes = {
    addContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }),
    ),
};

export default Form;
