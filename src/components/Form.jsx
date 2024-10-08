import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Form extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick, hasTrunfo } = this.props;

    return (
      <div className="form-container">
        <form className="form-main">
          <label htmlFor="name-input">
            Nome da carta:
            <input
              type="text"
              data-testid="name-input"
              id="name-input"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
              className="form-input"
            />
          </label>

          <label htmlFor="description-input">
            Descrição da carta:
            <textarea
              data-testid="description-input"
              id="description-input"
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
              className="form-input"
              cols="50"
              rows="3"
            />
          </label>

          <label htmlFor="attr1-input">
            Atributo 1:
            <input
              type="number"
              data-testid="attr1-input"
              id="attr1-input"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              className="form-input"
            />
          </label>

          <label htmlFor="attr2-input">
            Atributo 2:
            <input
              type="number"
              data-testid="attr2-input"
              id="attr2-input"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              className="form-input"
            />
          </label>

          <label htmlFor="attr3-input">
            Atributo 3:
            <input
              type="number"
              data-testid="attr3-input"
              id="attr3-input"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              className="form-input"
            />
          </label>

          <label htmlFor="image-input">
            Imagem da carta:
            <input
              ype="text"
              data-testid="image-input"
              id="image-input"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
              className="form-input"
            />
          </label>

          <label htmlFor="rare-input">
            Raridade da carta:
            <select
              data-testid="rare-input"
              id="rare-input"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
              className="form-input"
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>

          { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
            <label htmlFor="trunfo-input">
              Super Trunfo?
              <input
                type="checkbox"
                data-testid="trunfo-input"
                id="trunfo-input"
                name="cardTrunfo"
                checked={ cardTrunfo }
                onChange={ onInputChange }
                className="form-input"
              />
            </label>
          )}

          <button
            type="submit"
            data-testid="save-button"
            id="save-button"
            name="isSaveButtonDisabled"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

Form.defaultProps = {
  hasTrunfo: false,
};

export default Form;
