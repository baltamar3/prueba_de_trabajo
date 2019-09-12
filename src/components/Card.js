import React, { Component } from "react"
//import { tasks } from "../data/task";

class Card extends Component {
    constructor(props) {
        super(props)        
    }

    render() {
        let product = this.props.productData.map((product, i) => {
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
                        <button className="btn btn-danger btn-sm" onClick={()=>this.props.removeProduct(product.id)}>
                            Borrar
                        </button>
                        <button className="btn btn-success btn-sm m-1" onClick={()=>this.props.sendToCarrito(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            )
        })

        return (
            <div className="row">
                {product}
            </div>
        )
    }
}

export default Card