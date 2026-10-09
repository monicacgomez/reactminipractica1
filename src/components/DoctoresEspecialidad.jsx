import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
 
export default class DoctoresEspecialidad extends Component {
    selectidHospital = React.createRef();
    urlDoctores = Global.urlApiDoctores;
    urlHospital = Global.urlApiHospital;
    buscarDoctores = (event) => {
        event.preventDefault();
        
        let idHospital = this.selectidHospital.current.value;
        let request = "api/doctores/doctoresespecialidad/" + idHospital;
        axios.get(this.urlDoctores + request).then((response) => {
            console.log("Leyendo los doctores");
            this.setState({
                doctores: response.data
            })
        })
    }
    
    loadHospital = () => {
        let request = "webresources/Hospital"
        axios.get(this.urlHospital + request).then((response) => {
            console.log("Leyendo Hospital")
            this.setState({
                Hospital: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadHospital();
    }

    state = {
        doctores: [],
        Hospital: []
    }

  render() {
    return (
      <div>
        <h1> Api Doctores Hospital </h1>
        <form onSubmit={this.buscardoctores}>
            <label> Selecciona Hospital: </label>
            <select ref={this.selectIdHospital}>
                {
                    this.state.departamentos.map((hosp, index) => {
                        return <option key={index} value={hosp.numero} > {hosp.nombre} </option>
                    })
                }
            </select>
            <button type = "submit">
                Buscar doctores
            </button>
        </form>
        <ul>
            {
                this.state.doctores.map((doc, index) => {
                    return (<li key={index}>
                        {doc.apellido}, Salario: {doc.salario}
                    </li>)
                })
            }
        </ul>
      </div>
    )
  }
}