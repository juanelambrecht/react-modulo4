import React, { Component } from "react";
import "./Estudiante.css";

export default class FormEstudiante extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        curso: "",
      },
      resultado: "",
      cursos: [],
    };
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.form.nombre);
    console.log(this.state.form.apellido);
    console.log(this.state.form);
    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        curso: this.state.form.curso,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
          });
          return;
        }
        this.setState({
          resultado: "Estudiante creado con éxito!",
        });
      });
  }

  componentDidMount() {
    fetch("http://localhost:1234/localidades")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          cursos: json.localidades,
        });
      });
  }

  render() {
    return (
      <div>
        <form>
          <select name="curso" onChange={this.handleChange}>
            {this.state.cursos.map((l) => (
              <option value={l.id}>{l.curso}</option>
            ))}
          </select>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              onChange={this.handleChange}
              value={this.state.form.nombre}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              onChange={this.handleChange}
              value={this.state.form.apellido}
            />
          </label>

          <button onClick={this.handleSubmit} type="submit">
            Enviar
          </button>
        </form>
        <p>{this.state.resultado}</p>
      </div>
    );
  }
}
