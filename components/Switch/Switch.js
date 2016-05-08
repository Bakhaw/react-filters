import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import assign from 'object-assign';

import getStyles from './Switch.styles';

export default class Switch extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.value !== this.props.value;
  }

  handleClick () {
    this.props.onChange({
      name: this.props.name,
      value: !this.props.value
    });
  }

  render () {
    const {
      name,
      label,
      labelPosition,
      value,
      style,
      theme,
      disabled
    } = this.props;

    const mainClass = classNames('rf', 'rf-switch', name, {
      'rf-disabled': disabled,
      'rf-on': value,
      'rf-off' : !value
    });

    const labelClass = classNames('rf-switch-label', {
      before: labelPosition === 'before',
      after: labelPosition === 'after'
    });

    const s = getStyles(style, theme);

    const wrapperStyle = !value ? s.wrapper : assign({}, s.wrapper, s.wrapperOn);
    const btnStyle = !value ? s.btn : assign({}, s.btn, s.btnOn);

    return (
      <div onClick={!disabled && this.handleClick} className={mainClass} style={s.main}>
        <div className={labelClass} style={s.label}>{label}</div>
        <div className='rf-switch-wrapper' style={wrapperStyle}>
          <div className='rf-switch-btn' style={btnStyle}></div>
        </div>
      </div>
    );
  }
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object,
  theme: PropTypes.object,
  value: PropTypes.bool
};

function noop () {
}

Switch.defaultProps = {
  value: false,
  onChange: noop,
  labelPosition: 'before',
  disabled: false,
  style:{},
  theme: {
    width: 40,
    height: 22,
    padding: 2,
    onColor: '#40DC40',
    offColor: 'red',
    btnColor: 'white'
  }
};
