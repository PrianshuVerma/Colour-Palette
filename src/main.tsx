import { render } from "preact";
import "./style.css";

import Toolbar from "./toolbar";
import Display from "./display";
import Form from "./form";
import SwatchList from "./swatchList";
import StatusBar from "./statusBar";

const app = document.querySelector("div#app");
if (!app) throw new Error("no app div");

export default function App() {
  return (
    <>
      <Toolbar />

      <div id="displayScreen">
        <div id="editor">
          <Display />
          <Form />
        </div>
        <SwatchList />
      </div>

      <StatusBar />
    </>
  );
}

render(<App />, app);
