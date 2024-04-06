// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import { FieldLabel } from "@swc-react/field-label";
import { Textfield } from "@swc-react/textfield";
import React from "react";
import "./App.css";

const App = ({ addOnUISdk, sandboxProxy }) => {
    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
			<div className="container">
				<FieldLabel for="latex" size="m">
					LaTeX
				</FieldLabel>
				<Textfield id="latex" size="m" placeholder="Enter LaTeX equation">
				</Textfield>
			</div>
        </Theme>
    );
};

export default App;
