import React, { Component } from 'react';
import {Route} from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom'
import './App.css';
import IncorporationForm from './ProductsForm.js';
import EditProduct from './EditProductForm.js';

class HomePage extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.state = {
                referrer: null,
                componentToRender: null,
                listOfProducts: [],
                product_id: null
            };
    }
	
	 deleteProduct(id) {
		 fetch('/api/inventory/delete-product-by-id/' + id, {
		      method: 'DELETE'
		    }).then(
		    		() => this.setState({listOfProducts: this.state.listOfProducts.filter((product) => product._id !== id)})
				    ,(error) => console.log(error));
	  }
	
	 componentDidMount() {
		 fetch('/api/inventory/fetch-all-products/', {
		      method: 'GET'
		    }).then(response => response.json()).then(
		    		(jsonData) => this.setState({listOfProducts: jsonData})
                    ,(error) => console.log(error));
	  }
	
	renderRedirect = (path, id) => {
		this.setState({referrer: path});
        this.setState({product_id: id});
	  }
	
	render(){
		const {referrer} = this.state;
        if (referrer) return (<BrowserRouter><div>
        <Route  exact path="/about" component={ IncorporationForm }/>
        <Route exact
          path='/edit'
          render={(props) => <EditProduct {...props} productId={this.state.product_id} />}
        />
        <Redirect to={referrer} />
        </div>
        </BrowserRouter>)
        
        var content;
        if(this.state.listOfProducts){
	        
        	content = this.state.listOfProducts.map((product, i) => 
        	       (
        	    		  <tr key={product._id.toString()}>
        	    		   <td>{product.product_name}</td>
        	    		   <td><button type="button" className="small" onClick={() => this.renderRedirect('/edit', product._id)}>edit</button></td>
        	    		   <td><button type="button" className="small" onClick={() => this.deleteProduct(product._id)}>&times;</button></td>
        	    		</tr>
        	      )
        	    );
        }
	  return (
		  
	      <div>
	      <table>
	      <thead>
	      <tr>
	      <th>Product Name</th>
	      <th>Edit</th>
	      <th>Delete</th>
	       </tr>
	      </thead>
	      <tbody>
	      { content }
	      </tbody>
	      </table>
	      <br/>
	      <button onClick={() => this.renderRedirect('/about', null)}>Add New Product</button>
	      </div>
	  );
	}
}

export default HomePage;
