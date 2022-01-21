import React, { useState, useEffect } from "react";
import { Button } from "../components/button/Button";
import Nav from '../components/Nav'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './Caixa.scss'
import APIService from "../services/api";
import { toast } from "react-toastify";

export default function Caixa() {
  const schema = yup.object().shape({
    pedido: yup.string().min(1, "campo obrigatório").required(),
  });

  const {
    register,
    handleSubmit,
    //reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [caixa, setCaixa] = useState([])
  const [qtPedido, setQtPedido] = useState("")

  useEffect(() => {
    const showCashFlow = async () => {
      const { fluxo_caixa, quantidade_pedido } = await APIService.exibirCaixa()
      setCaixa(fluxo_caixa)
      setQtPedido(quantidade_pedido)
    }
    showCashFlow()
    // var date = new Date();
    // var day = date.getDate();
    // var month = date.getMonth() + 1;
    // var year = date.getFullYear();

    // if (month < 10) month = "0" + month;
    // if (day < 10) day = "0" + day;

    // var today = year + "-" + month + "-" + day;

    // document.getElementById("startdateId").value = today;
  }, [])

  const [formValues, setFormValues] = useState([{ pedido: "", datas: "", hora: "", nome_cliente: "", nome_pizza: "", bairro: "", entregador: "", situacao: "", valor: "" }])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { pedido: "", datas: "", hora: "", nome_cliente: "", nome_pizza: "", bairro: "", entregador: "", situacao: "", valor: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  // let handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(JSON.stringify(formValues));
  // }

  async function cashSave(data) {
    try {
      // await APIService.salvarCaixa(data)
      // setFormValues(prevState => [...prevState, data])
      // toast.success("caixa salvo com sucesso")
      // console.log("caixa", data)
      //console.log("aaa", formValues)
      console.log("bbb", data)

    } catch (e) {
      console.log("Ocorreu ao salvar caixa", e)
      toast.error("Erro ao salvar caixa")
    }
  }
  return (
    <div id="caixa">
      <div className="component-nav">
        <Nav />
      </div>
      <h2>Caixa</h2>
      <h3>Número de pedidos: {qtPedido}</h3>
      {console.log("aaa", caixa)}

      <div className="cash-flow">
        <Button onClick={() => addFormFields()} color="turquoise">Novo registro</Button>

        {/* Pedido, Data, Hora, Cliente, Bairro, Entregador, Situação, Valor */}
        {formValues.length > 0 ?
          <>
            <form onSubmit={handleSubmit(cashSave)}>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Pizza</th>
                    <th>Bairro</th>
                    <th>Entregador</th>
                    <th>Situação</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                {formValues.map((element, index) => {
                  return (

                    <tbody key={index}>
                      <tr>
                        <td><input type="text" id="pedido" name="pedido" size={7} onChange={(e) => handleChange(index, e)}  {...register("pedido", { required: true })} />  {errors.pedido && <p>Campo Obrigatório</p>}</td>
                        <td><input type="date" id="datas" name="datas" size={8} onChange={(e) => handleChange(index, e)}  {...register("datas", { required: true })} style={{ "width": "137px" }} /></td>
                        <td><input type="time" name="hora" size={5} value={element.hora || ""} onChange={(e) => handleChange(index, e)} {...register("hora", { required: true })} /></td>
                        <td><input type="text" name="nome_cliente" value={element.nome_cliente || ""} onChange={(e) => handleChange(index, e)} {...register("nome_cliente", { required: true })} /></td>
                        <td><input type="text" name="nome_pizza" value={element.nome_pizza || ""} onChange={(e) => handleChange(index, e)} {...register("nome_pizza", { required: true })} /></td>
                        <td><input type="text" name="bairro" value={element.bairro || ""} onChange={(e) => handleChange(index, e)} {...register("bairro", { required: true })} /></td>
                        <td><input type="text" id="entregador" name="entregador" size={8} onChange={(e) => handleChange(index, e)} {...register("entregador", { required: true })} /></td>
                        <td>
                          <select
                            id="situacao"
                            name="situacao"
                            defaultValue=""
                            required
                            onChange={(e) => handleChange(index, e)}
                            {...register("situacao", { required: true })}
                          >
                            <option value="" disabled>Selecione</option>
                            <option value="pago">PAGO</option>
                            <option value="pendente">PENDENTE</option>
                          </select>
                        </td>
                        <td><input type="number" step="0.010" name="valor" size={7} value={element.valor || ""} onChange={(e) => handleChange(index, e)} /></td>
                        <td><button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remover</button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
              <input className="close_cash" type="submit" value="Salvar" />
            </form>
          </>
          : ""}
      </div>
    </div>
  )
}
