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
import { Switch } from "@swc-react/switch"
import React, {useState} from "react";
import Katex from "katex";
import "./App.css";

import domtoimage from 'dom-to-image-more';

const App = ({ addOnUISdk, sandboxProxy }) => {
    let [sliderValue, setSliderValue] = useState(1);
    let [displayStyle, setDisplayStyle] = useState(true);

    function previewKatex () {
        const mathprev = document.getElementById("mathpreview");
		const latexInputField = document.getElementById("latex");
		const latexExpression = latexInputField.value;
        Katex.render(latexExpression, mathprev, {
            throwOnError: false,
            output: "html",
            displayMode: displayStyle
        });
        updateFontSize(mathprev,2);
    }

    function updateFontSize (mathprev,n) {
        let new_width = mathprev.scrollWidth;
        let width = mathprev.clientWidth;

        let style = window.getComputedStyle(mathprev);
        let fontSize = parseFloat(style.fontSize);
        let new_fontSize = width/new_width * fontSize;
        

        if (new_fontSize==fontSize && n>0) {
            mathprev.style.fontSize="100px";
            updateFontSize(mathprev,n-1);
        } else {
            mathprev.style.fontSize=new_fontSize+"px";
        }
    }


    
    function handleSliderChange (event) {
        const mathprev = document.getElementById("mathpreview");
        setSliderValue(event.target.value);
        //mathprev.style.fontSize = event.target.value + "px";

    }
    
	function generateImage() {
		try {
            const mathprev = document.getElementById("mathpreview");
            let mathprevstyle = window.getComputedStyle(mathprev);
            let fontSize = parseFloat(mathprevstyle.fontSize);
            const katexprev = mathprev.getElementsByClassName("katex")[0];
            mathprev.style.fontSize=fontSize*sliderValue+"px";
            let scrollWidth = katexprev.scrollWidth;
            let scrollHeight = katexprev.scrollHeight;
            katexprev.style.display="none";
            domtoimage.toBlob(katexprev, {width: scrollWidth, height: scrollHeight, style: {display: 'block'}}).then(function (blob) {
                const { document } = addOnUISdk.app;
                document.addImage(blob);
                mathprev.style.fontSize=fontSize+"px";
            }).then( () => {previewKatex()});
		} catch (error) {
			console.log("Failed to add generated image");
		}
	};

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
            <div className="container">
                <Button onClick={previewKatex} size="l">
                    Preview
                </Button>
            </div>
            <div className="container">
                <Switch checked={displayStyle} onInput={(e) => setDisplayStyle(!displayStyle)} size='m'>Render in display style</Switch>
            </div>
			<div className="container">
				<Slider value = {sliderValue} min={1} max={10} step = "0.1" label="Scale" onInput={handleSliderChange} />
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
