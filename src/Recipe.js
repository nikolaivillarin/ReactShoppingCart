import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addShipping, subShipping  } from "./components/actions/cartActions";

class Recipe extends Component {
    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping()
        } else {
            this.props.subtractShipping()
        }
    }

    componentWillUnmount() {
        if (this.refs.shipping.checked) {
            this.props.subtractShipping()
        }
    }

    render () {
        return (
            <div className="container">
                <ul className="collection">
                   <li className="collection-item">
                       <label>
                           <input type="checkbox" ref="shipping" onChange={this.handleChecked} />
                           <span>Shipping(+6$)</span>
                       </label>
                   </li>
                   <li className="collection-item">
                    <b>Total: {this.props.total} $</b>
                   </li>
                   <li className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                   </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch(addShipping()) },
        subtractShipping: () => { dispatch(subShipping()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)