import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import DoctoresEspecialidad from './DoctoresEspecialidad';

export default class HomeComponent extends Component {

    selectidHospital = React.createRef();

    urlDoctores = Global.urlApiDoctores;

    state = {
        Hospital: [],
        idHospital: 0
    };

    loadHospital = () => {
        let request = 'webresources/Hospital';

        axios.get(this.urlDoctores + request)
            .then((response) => {
                console.log('Leyendo hospitales');

                this.setState({
                    hospitales: response.data
                });
            })
            .catch((error) => {
                console.error('Error al cargar los hospitales:', error);
            });
    };

    componentDidMount = () => {
        this.loadHospital();
    };

    buscarDoctores = (event) => {
        event.preventDefault();

        let id = this.selectidHospital.current.value;

        this.setState({
            idHospital: id
        });
    };

    render() {
        return (
            <div>
                <h1>Hospitales</h1>

                <form onSubmit={this.buscarDoctores}>
                    <label>Selecciona hospital: </label>

                    <select ref={this.selectIdHospital}>
                        {this.state.Hospital.map((hosp, index) => {
                            return (
                                <option
                                    key={index}
                                    value={hosp.numero}
                                >
                                    {hosp.nombre}
                                </option>
                            );
                        })}
                    </select>

                    <button type="submit">
                        Buscar doctores
                    </button>
                </form>

                {this.state.idHospital != 0 && 
                (<DoctoresEspecialidad
                  idHospital={this.state.idHospital}/>)}
            </div>
        );
    }
}
