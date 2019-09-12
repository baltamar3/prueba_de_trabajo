import React from 'react';
import { Route, Switch, withRouter, Link } from "react-router-dom";

//components
import Card from './components/Card.js';
import Navbar from './components/globals/Navbar.js';
import Form from "./components/Form.js"
import Home from "./pages/Home.jsx"
import Carrito from "./pages/Carrito.jsx"

//config
import { DBConfi } from "./config/config.js"

//data
//import { product } from "./data/task";
import firebase from "firebase"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            listCarrito: []
        }

        this.app = firebase.initializeApp(DBConfi)
        this.databaseServices = this.app.database()
        this.colletion = this.databaseServices.ref().child("product")
        this.carrito = this.databaseServices.ref().child("carrito")


        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.removeProductCarrito = this.removeProductCarrito.bind(this)
        this.sendToCarrito = this.sendToCarrito.bind(this)
    }

    componentDidMount() {
        let { product } = this.state
        this.colletion.on("child_added", snap => {
            product.push({
                id: snap.key,
                nombre: snap.val().nombre,
                cantidad: snap.val().cantidad,
                precio: snap.val().precio
            })
            this.setState({ product })
        })

        this.colletion.on("child_removed", snap => {
            for (let index = 0; index < product.length; index++) {
                if (product[index].id === snap.key) {
                    product.splice(index, 1)
                }
            }
            this.setState({ product })
        })

    }



    handleSubmit(product) {
        /*this.setState({
            product:[...this.state.product, task]
        })*/
        this.colletion.push().set({
            nombre: product.nombre,
            cantidad: product.cantidad,
            precio: product.precio
        })
        this.props.history.push("/")
    }

    sendToCarrito(product) {
        let { listCarrito } = this.state
        this.carrito.push().set({
            nombre: product.nombre,
            cantidad: product.cantidad,
            precio: product.precio
        })
        alert("Añadido al carrito")
        this.carrito.on("child_added", snap => {
            listCarrito.push({
                id: snap.key,
                nombre: snap.val().nombre,
                cantidad: snap.val().cantidad,
                precio: snap.val().precio
            })
            this.setState({ listCarrito })
        })
    }

    removeProduct(id) {
        if (window.confirm("Estas seguro de eliminar?")) {
            this.colletion.child(id).remove()
        }
    }

    removeProductCarrito(id) {
        if (window.confirm("Estas seguro de eliminar?")) {
            this.carrito.child(id).remove()
        }
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact render={() => 
                        <Home>
                            <Navbar title="Aplicación de productos" productLength={this.state.product.length} />
                            <div className="container">
                                <div className="jumbotron">
                                    <h1 className="text-success">Lista de productos</h1>
                                    <hr />
                                    <Link to="/add" className="btn btn-success">Nuevo</Link>
                                    <Card productData={this.state.product} removeProduct={this.removeProduct} sendToCarrito={this.sendToCarrito}/>
                                </div>
                            </div>
                        </Home>}>
                    </Route>
                    <Route path="/carrito" exact render={() =>
                        <Carrito listCarrito={this.state.listCarrito} removeProductCarrito={this.removeProductCarrito}/>}>
                    </Route>
                    <Route path="/add" exact render={() =>
                        <Form handleSubmit={this.handleSubmit} />}>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
