import React, { Component } from "react"
import NavBar from "../components/globals/Navbar"
import firebase from "firebase"

class Carrito extends Component {
    state={
        listCarrito: this.props.listCarrito
    }
    render() {
        let dataCarrito = this.state.listCarrito.map((product, i) => {
            return (
                <div className="card col-md-4 mt-4 text-center" key={product.id}>
                    <div className="card-header">
                        <h5>{product.nombre}</h5>
                        <span className="badge badge-pill badge-danger">${product.precio}</span>
                    </div>
                    <div className="card-body">
                        <p>Cantidad en Stock: <b>{product.cantidad}</b></p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger btn-sm" onClick={()=>this.props.removeProductCarrito(product.id)}>
                            Borrar
                        </button>
                        <button className="btn btn-success btn-sm m-1" onClick={()=>this.props.sendToCarrito(product)}>
                            Comprar
                        </button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <NavBar/>
                <div className="row">
                    {dataCarrito}
                </div>
            </div>
        )
    }
}


export default Carrito