import React from 'react';

class Form extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <form>
        <label htmlFor="name-input">
          Nome da carta:
          <input type="text" data-testid="name-input" id="name-input" />
        </label>

        <label htmlFor="description-input">
          Descrição da carta:
          <textarea data-testid="description-input" id="description-input" />
        </label>

        <label htmlFor="attr1-input">
          Atributo 1:
          <input type="number" data-testid="attr1-input" id="attr1-input" />
        </label>

        <label htmlFor="attr2-input">
          Atributo 2:
          <input type="number" data-testid="attr2-input" id="attr2-input" />
        </label>

        <label htmlFor="attr3-input">
          Atributo 3:
          <input type="number" data-testid="attr3-input" id="attr3-input" />
        </label>

        <label htmlFor="image-input">
          Imagem da carta:
          <input type="text" data-testid="image-input" id="image-input" />
        </label>

        <label htmlFor="rare-input">
          Raridade da carta:
          <select data-testid="rare-input" id="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfo-input">
          <input type="checkbox" data-testid="trunfo-input" id="trunfo-input" />
        </label>

        <button type="submit" data-testid="save-button" id="save-button">Salvar</button>

      </form>
    );
  }
}

export default Form;
