import React from 'react';
import {Route} from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom'
import './App.css';
import HomePage from './App.js';

class IncorporationForm extends React.Component {
	  constructor() {
	    super();
	    this.state = {
	      name: '',
	      products: [{ product_name: '' }],
	      submitStatus: ''
	    };
	  }

	  renderRedirect = (path, id) => {
			this.setState({referrer: path});
		  }

	  handleProductNameChange = (idx) => (evt) => {
	    const newProducts = this.state.products.map((product, sidx) => {
	      if (idx !== sidx) return product;
	      return { ...product, product_name: evt.target.value };
	    });

	    this.setState({ products: newProducts });
	  }

	  handleSubmit =  e => {
            e.preventDefault();
            var status;
		    fetch('/api/inventory/save-product/', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({ products: this.state.products })
            }).then((response) => {status = response.ok;  return response.text()}, error => console.log('error occurred while saving product ' + error)
            ).then((responseText) => {
                    if(status)
                        this.setState({submitStatus: 'Data Submitted Successfully', products: [{ product_name: '' }]})
                    else{
                        console.log('An error occurred while saving ' + responseText)
                    }
                }
                    );
		  }

	  handleAddProduct = () => {
	    this.setState({
	    	products: this.state.products.concat([{ product_name: '' }])
	    });
	  }

	  handleRemoveProduct = (idx) => () => {
	    this.setState({
	    	products: this.state.products.filter((s, sidx) => idx !== sidx)
	    });
	  }

	  render() {
		  const {referrer} = this.state;
	        if (referrer) return (<BrowserRouter><div>
	        <Route exact path="/" component={ HomePage }/>
	        <Redirect to={referrer} />
	        </div>
	        </BrowserRouter>)
		  return (
	      <form onSubmit={this.handleSubmit}>
	        {/* ... */}
	        <h3 className="alignCentre">{this.state.submitStatus}</h3>
	        <h4>Products</h4>

	        {this.state.products.map((product, idx) => (
	          <div className="shareholder" key={idx}>
	            <input
	              type="text"
	              placeholder={`Product #${idx + 1}`}
	              value={product.product_name}
	              onChange={this.handleProductNameChange(idx)}
	            />
	            <button type="button" onClick={this.handleRemoveProduct(idx)} className="small">-</button>
	          </div>
	        ))}
	        <button type="button" onClick={this.handleAddProduct} className="small">Add Product</button><button className="small alignRight" onClick={() => this.renderRedirect('/', null)}>Back</button>
	        <button>Submit</button>
	        
	      </form>
	    )
	  }
	}

export default IncorporationForm;