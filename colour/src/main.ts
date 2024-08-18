import { startSimpleKit, setSKRoot } from "../../simplekit";
import { SKContainer } from "../../simplekit/widget";

import { TopPanel } from "./topPanel";
import { MidPanel } from "./midPanel";
import { makeColumnRowLayout } from "./fillColumn";
import { SwatchList } from "./swatchList";
import { BottumPanelPanel } from "./bottumPanel";
import { SwatchModel } from "./swatchModel";

const root = new SKContainer();
root.id = "root";
root.width = 575;
root.height = 450;
root.fill = "whitesmoke";
root.layoutMethod = makeColumnRowLayout();

const model = new SwatchModel();


root.addChild(new TopPanel(model));
root.addChild(new MidPanel(model));
root.addChild(new SwatchList(model));
root.addChild(new BottumPanelPanel(model));


setSKRoot(root);

startSimpleKit();