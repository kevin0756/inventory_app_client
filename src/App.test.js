import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IncorporationForm from './ProductsForm';
import EditProduct from './EditProductForm';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import  Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
describe('Component: App', () => {
it('should match its snapshot', () => {
	const tree = renderer.create(
		      <App />
		     ).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Component: IncorporationForm', () => {
	it('should match its snapshot', () => {
		const tree = renderer.create(
			      <IncorporationForm />
			     ).toJSON();

			expect(tree).toMatchSnapshot();
	});
	
	it('should submit form values on submit', () => {
		const component = shallow(<IncorporationForm />);
	    const preventDefault = jest.fn();
	    component.find('input').simulate('change', { target: {
	        value: 'New Product' }
	  });
	    
	    component.find('form').simulate('submit', { preventDefault });
	    expect(toJson(component)).toMatchSnapshot();
	expect(preventDefault).toBeCalled();
	});

});

describe('Component: ', () => {
	it('should match its snapshot', () => {
		const tree = renderer.create(
			      <EditProduct />
			     ).toJSON();

			expect(tree).toMatchSnapshot();
	});
	
	it('it should submit form values', () => {
		const component = shallow(<EditProduct />);
	    const preventDefault = jest.fn();
	    component.find('input').simulate('change', { target: {
	        value: 'sample' }
	  });
	    
	    component.find('form').simulate('submit', { preventDefault });
	    expect(toJson(component)).toMatchSnapshot();
	expect(preventDefault).toBeCalled();
	});
});
