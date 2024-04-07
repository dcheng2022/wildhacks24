// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/slider/sync/sp-slider.js';


// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import { FieldLabel } from "@swc-react/field-label";
import { Textfield } from "@swc-react/textfield";
import { Slider } from "@swc-react/slider";
import React, {useState} from "react";
import Katex from "katex";
import "./App.css";

import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

const App = ({ addOnUISdk, sandboxProxy }) => {
    
	async function generateImage() {
		try {
			const blob = await fetch("https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg").then((response) => response.blob());
			const { document } = addOnUISdk.app;
			document.addImage(blob);
		} catch (error) {
			console.log("Failed to add generated image");
		}
	};

    function previewKatex () {
        const mathprev = document.getElementById("mathpreview");
		const latexInputField = document.getElementById("latex");
		const latexExpression = latexInputField.value;
        Katex.render(latexExpression, mathprev, {
            throwOnError: false,
            output: "mathml",
            displayMode: true
        });
    }


    function previewCanvas () {
        const mathprev = document.getElementById("mathpreview");
        const canvasprev = document.getElementById("canvaspreview");

        html2canvas(mathprev).then(function(canvas) {
            const newCanvas = document.createElement('canvas');
            canvasprev.appendChild(newCanvas);
            const ctx = newCanvas.getContext('2d');
            ctx.drawImage(canvas,0,0);
        })
    }

    function previewBlob () {
        const mathprev = document.getElementById("mathpreview");
        domtoimage.toBlob(mathprev, {height: 2*mathprev.clientHeight, width: 2*mathprev.clientWidth}).then(function (blob) {
            const { document } = addOnUISdk.app;
			document.addImage(blob);
        });
    }


    let [sliderValue, setSliderValue] = useState(50);
    
    function handleSliderChange (event) {
        const mathprev = document.getElementById("mathpreview");
        setSliderValue(event.target.value);
        mathprev.style.fontSize = event.target.value + "px";

    }
    

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
			<div className="container" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false">
				<FieldLabel for="latex" size="l">
					LaTeX
				</FieldLabel>
				<Textfield id="latex" size="m" placeholder="Enter LaTeX expression" grows multiline>
				</Textfield>
			</div>

            <div className="container" id="mathpreview">
            </div>
            <div className="container" id="canvaspreview">
            </div>
            <div className="container">
                <Button onClick={previewKatex} size="l">
                    Preview HTML
                </Button>
            </div>
            <div className="container">
                <Button onClick={previewCanvas} size="l">
                    Preview Canvas
                </Button>
            </div>
            <div className="container">
                <Button onClick={previewBlob} size="l">
                    Preview blob
                </Button>
            </div>
			<div className="container">
				<Slider value = {sliderValue} min={10} max={100} editable label="Font Size" onInput={handleSliderChange} />
			</div>
            <div className="container">
                <Button variant="primary" onClick={generateImage} size="l">
                    Add to design
                </Button>
            </div>
        </Theme>
    );
};

export default App;
