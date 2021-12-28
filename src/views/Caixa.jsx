import React, { useState } from "react";
import { Button } from "../components/button/Button";
import Nav from '../components/Nav'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './Caixa.scss'

export default function Caixa() {
  const schema = yup.object().shape({
    name: yup.string().min(1, "campo obrigatório").required(),
  });

  const {
    register,
    //handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [formValues, setFormValues] = useState([{ pedido: "", data: "", hora: "", cliente: "", bairro: "", entregador: "", situacao: "", valor_total: "" }])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { pedido: "", data: "", hora: "", cliente: "", bairro: "", entregador: "", situacao: "", valor_total: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  }
  return (
    <div id="caixa">
      <div className="component-nav">
        <Nav />
      </div>
      <h2>Caixa</h2>

      <div className="cash-flow">
        <Button onClick={() => addFormFields()} color="turquoise">Novo registro</Button>

        {/* Pedido, Data, Hora, Cliente, Bairro, Entregador, Situação, Valor total */}
        {formValues.length > 0 ?
          <>
            <form onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Bairro</th>
                    <th>Entregador</th>
                    <th>Situação</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                {formValues.map((element, index) => {
                  return (

                    <tbody key={index}>
                      <tr>
                        <td><input type="text" name="pedido" value={element.pedido || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="data" value={element.data || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="hora" value={element.hora || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="cliente" value={element.cliente || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="bairro" value={element.bairro || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="entregador" value={element.entregador || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="situacao" value={element.situacao || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><input type="text" name="valor_total" value={element.valor_total || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remover</button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
            </form>
            <button className="button submit" type="submit" onClick={handleSubmit}>Salvar</button>
          </>
          : ""}
      </div>
    </div>
  )
}
