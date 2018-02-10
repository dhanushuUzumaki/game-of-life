import React from 'react';
import PropTypes from 'prop-types';

const extractStateFromProps = (props) => {
  const { value } = props;
  return {
    value
  };
};

class Input extends React.Component {
  constructor (props) {
    super(props);
    this.state = extractStateFromProps(props);
    this.onChange = e => this._onChange(e.target.value);
    this.getValue = () => this._getValue();
  }

  componentWillReceiveProps (nextProps) {
    this.setState(extractStateFromProps(nextProps));
  }

  _getValue () {
    return this.state.value;
  }

  _onChange (value) {
    this.setState({
      value
    });
  }

  render () {
    const { type, placeholder, identifier, label, title } = this.props;
    return (
      <div className="input-container">
        {label && <div className="input-label">{label}</div>}
        <input
          className="input"
          type={type}
          value={this.state.value}
          placeholder={placeholder}
          name={identifier}
          title={title}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  placeholder: PropTypes.string,
  identifier: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string
};

export default Input;
