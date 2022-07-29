import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  savedCards: [],
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { cardName, cardDescription, cardImage, cardRare,
        cardAttr1, cardAttr2, cardAttr3 } = this.state;

      const maxPoints = 210;
      const maxAttribute = 90;
      const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

      if (!cardName
        || !cardDescription
        || !cardImage
        || !cardRare
        || sum > maxPoints
        || cardAttr1 > maxAttribute
        || cardAttr2 > maxAttribute
        || cardAttr3 > maxAttribute
        || cardAttr1 < 0
        || cardAttr2 < 0
        || cardAttr3 < 0) {
        return this.setState({ isSaveButtonDisabled: true });
      }
      this.setState({ isSaveButtonDisabled: false });
    });
  }

  // Como criar ids unicas: https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo } = this.state;

    const savedCard = {
      id: (new Date()).getTime(),
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, savedCard],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: cardTrunfo,
      isSaveButtonDisabled: true,
    }));
  }

  deleteCard = (id) => {
    const { savedCards } = this.state;
    const deletedList = savedCards
      .filter((card) => card.id !== id);
    this.setState({ savedCards: [...deletedList] }, () => {
      const trunfoCheck = savedCards.some((card) => card.cardTrunfo === true);
      if (trunfoCheck) {
        this.setState({
          hasTrunfo: false,
        });
      }
    });
  };

  filterByName = ({ target }) => {
    const { value } = target;
    const { savedCards } = this.state;
    const filteredByNameArray = savedCards
      .filter((card) => card.cardName.includes(value));
    this.setState({ savedCards: filteredByNameArray });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo,
      isSaveButtonDisabled, savedCards } = this.state;

    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          cardType="preview"
          deleteCard={ this.deleteCard }
        />
        <p>Cartas: </p>
        <input type="text" data-testid="name-filter" onChange={ this.filterByName } />
        { savedCards.map((card, index) => (<Card
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
          cardType="card"
          deleteCard={ () => this.deleteCard(card.id) }
          key={ index }
        />)) }
      </div>
    );
  }
}

export default App;
