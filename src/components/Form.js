import React, { Component } from "react"
import { Link } from "react-router-dom";


class Form extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            nombre: "",
            cantidad: "",
            precio: ""
        }
        this.state = {
            nombre: "",
            cantidad: "",
            precio: ""
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    handleChangeInput(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        //console.log(name, value)
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3 mb-5">
                <form action="" onSubmit={this.onFormSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h4>Añadir producto</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <input type="text" name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChangeInput}
                                    placeholder="nombre"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="cantidad"
                                    value={this.state.cantidad}
                                    onChange={this.handleChangeInput}
                                    placeholder="cantidad"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="precio"
                                    value={this.state.precio}
                                    onChange={this.handleChangeInput}
                                    placeholder="precio"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Enviar</button>
                                <Link to="/" className="float-right">Volver</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form