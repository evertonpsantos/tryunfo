import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, cardType, deleteCard } = this.props;

    return (
      <div className="card-container">
        <div className="card">
          <p data-testid="name-card">{ cardName }</p>
          <img
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
            className="card-img"
          />
          <p data-testid="description-card">{ cardDescription }</p>
          <p data-testid="attr1-card">{ cardAttr1 }</p>
          <p data-testid="attr2-card">{ cardAttr2 }</p>
          <p data-testid="attr3-card">{ cardAttr3 }</p>
          <p data-testid="rare-card">{ cardRare }</p>
          { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
          { cardType === 'card' && (
            <button
              type="button"
              data-testid="delete-button"
              onClick={ deleteCard }
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  cardType: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Card;
