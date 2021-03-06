import React from "react";

import Home from "../src/views/Home";
import Cadastro from "../src/views/Cadastro";
import Caixa from "../src/views/Caixa";
import Cardapio from "../src/views/Cardapio";
import Nav from "../src//views/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Router>
      <div id="route">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/caixa" component={Caixa} />
          <Route path="/cardapio" component={Cardapio} />
        </Switch>
      </div>
    </Router>
  );
}
