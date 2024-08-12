import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

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
  rareFilter: 'todas',
  trunfoFilter: false,
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
    const minimumLength = 10;

    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo } = this.state;

    const savedCard = {
      id: (new Date()).getTime(),
      cardName,
      cardImage: cardImage.length < minimumLength ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : cardImage,
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

  filterByRarity = ({ target }) => {
    const { value } = target;
    const { savedCards } = this.state;
    if (value === 'todas') return this.setState({ savedCards });
    const filteredByRarity = savedCards
      .filter((card) => card.cardRare === value);
    this.setState({ savedCards: filteredByRarity });
  }

  filterByTrunfo = () => {
    this.setState((prevState) => ({
      trunfoFilter: !prevState.trunfoFilter,
    }), () => {
      const { trunfoFilter, savedCards } = this.state;
      if (trunfoFilter) {
        const filteredByTrunfo = savedCards
          .filter((card) => card.cardTrunfo === true);
        this.setState({ savedCards: filteredByTrunfo });
      }
    });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo,
      isSaveButtonDisabled, savedCards, rareFilter, trunfoFilter } = this.state;

    return (
      <>
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

        <div className="filter-form-container">
          <p>FILTRO</p>
          <label htmlFor="name-filter">
            Carta:
            <input
              type="text"
              data-testid="name-filter"
              onChange={ this.filterByName }
              id="name-filter"
              disabled={ trunfoFilter }
              className="filter-input"
            />
          </label>

          <label htmlFor="rare-filter">
            Raridade da carta:
            <select
              data-testid="rare-filter"
              id="rare-filter"
              name="rareFilter"
              value={ rareFilter }
              disabled={ trunfoFilter }
              onChange={ this.filterByRarity }
              className="filter-input"
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>

          <label htmlFor="trunfo-filter">
            Super Trunfo
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              id="trunfo-filter"
              name="trunfoFilter"
              onChange={ this.filterByTrunfo }
              className="filter-input"
            />
          </label>
        </div>

        <div className="saved-cards-container">
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

      </>
    );
  }
}

export default App;
