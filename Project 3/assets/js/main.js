// *DARK LIGHT THEME*

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic ( if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We Obtain the current theme that the interface has by validating the dark-theme class
// basically we check wheather the current theme is dark or light
// and icon is moon or sun?
const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme)
		? "ri-sun-line  "
		: "ri-moon-line";

// we Validate if the user previously chose a topic
// it is like a cookie for theme selected previously
if (selectedTheme) {
	// if the validate is fulfilled, we ask what the issue was to know if we actiivated or deactivated the dark mode

	document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
		darkTheme
	);
	themeButton.classList[selectedIcon === "ri-sun-line" ? "add" : "remove"](
		iconTheme
	);
}

// Activate/Deactivate the Theme manually with the Button
themeButton.addEventListener("click", () => {
	// Add or remove the Dark/icon Theme
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);

	// We save the theme and the current icon that the user choose
	localStorage.setItem("selected-theme", getCurrentTheme());
	localStorage.setItem("selectedIcon", getCurrentIcon());
});

/*
if we have to calculate 85*2 which is equal to 170
so the first getHistory() function will take the number as well as operator
*/

function getHistory() {
	// console.log(document.querySelector('.upper-value').innerHTML);   // 85*
	return document.querySelector(".upper-value").innerHTML;
}

function printHistory(num) {
	document.querySelector(".upper-value").innerHTML = num;
	// console.log(num);		// 85* is printed on the upper side(class=upper-value) of the calculator
}

function getOutput() {
	// console.log(document.querySelector('.lower-value').innerHTML);	// this function get's previous value in the lower side before any Event.
	return document.querySelector(".lower-value").innerHTML;
}

function printOutput(num) {
	if (num == "") {
		document.querySelector(".lower-value").innerHTML = num;
	} else {
		document.querySelector(".lower-value").innerHTML =
			getFormattedNumber(num);
	}
}

function getFormattedNumber(num) {
	if (num == "") {
		return "";
	}
	let n = Number(num);
	let value = n.toLocaleString("en-IN"); 	// returns a string with a representation of a number
											// i.e. India uses thousands/lakh/crore separators
											// console.log(number.toLocaleString("en-IN")); → 1,23,456.789
	return value;
}

function reverseNumberFormat(num) {
	return Number(num.replace(/,/g, "")); // if we have comma in the value eg: "1,00,121" "12,002,245",etc
	//  then those comma would be replaced with the Empty String and then type casted into Number DataType.
	// replace ( /"," ~ this comma is a regex expression , /g ~ meaning change all the occurences , "" ~ meaning change all the expression with empty space)
}

let operator = document.getElementsByClassName("operator");
// console.log(operator.length);	//8 operators those are clear,backspace,percent,division,multiplication,subtraction, addition and equal's to.

for (let i = 0; i < operator.length; i++) {
	// for every operator a Event Listener is created and checked wheather one of them is clicked
	operator[i].addEventListener("click", function () {
		// for every i'th operator their respective id goes from the following if else conditions

		// this.id gives the current html element id button we selected from the calculator
		// eg: for operator[0] we get <button class="operator" id="clear">C</button
		if (this.id == "clear") {
			// if this.id meaning operator[i].id == "clear" that clear button has been clicked.

			// below functions will clear all the data from the upper-value and lower value class.
			printHistory("");
			printOutput("");
		} else if (this.id == "backspace") {
			// if this.id meaning operator[i].id == "backspace" that backspace button has been clicked.
			let output = reverseNumberFormat(getOutput()).toString();

			console.log(output);

			// if  output is not empty
			if (output) {
				output = output.substring(0, output.length - 1); // this removes the last character of the string "output"
				// in short substring method gives back the substring of the object which is used to invoke it. from start index to end index(end index excluded)
				// lower-value has 2001 then output="2001" therefore substring(0,output.length-1) will give "200" which means "1" i.e. output.length is removed.
				printOutput(output);
			}
			// if output is empty.
		} else {
			let output = getOutput(); // Get the content of the lower value display (current input or result).
			let history = getHistory(); // Get the content of the upper value display (history of calculations).

			if (output == "" && history != "") {
				// Check if the output is empty and there's something in the history.
				if (isNaN(history[history.length - 1])) {
					// Check if the last character in the history is not a number (isNaN checks for "Not-a-Number").
					history = history.substring(0, history.length - 1);
					// Remove the last character from the history (typically an operator) to allow for a new one.
				}
			}

			if (output != "" || history != "") {
				// Check if either the output or history is not empty (there's some content to work with).

				output = output == "" ? output : reverseNumberFormat(output);
				// If the output is not empty, format it properly (remove commas if present).

				history = history + output;
				// Append the formatted output to the history (this is building the calculation history).

				if (this.id == "=") {
					// If the clicked button is "=", it means the user wants to calculate the result.
					let result = eval(history); // Evaluate the entire history as a mathematical expression.
					printOutput(result); // Display the result in the lower display.
					printHistory(""); // Clear the upper display (history) for the next calculation.
				} else if (this.id == "%") {
					// If the clicked button is "%," it means the user wants to calculate a percentage.
					let n = reverseNumberFormat(getOutput()); // Get the current lower display value as a numeric value.
					let percent = n / 100; // Calculate the percentage.
					printOutput(percent.toFixed(4)); // Display the percentage with four decimal places.
				} else {
					// For other operator buttons (+, -, *, /), append them to the history for further calculations.
					history = history + this.id;
					printHistory(history); // Update the upper display with the modified history.
					printOutput(""); // Clear the lower display for the next input.
				}
			}
		}
	});
}

let number = document.getElementsByClassName("number");
// Select all HTML elements with the class "number" (these are the number buttons).

for (let i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function () {
		// Add a click event listener to each number button.

		let output = reverseNumberFormat(getOutput());
		// Get the current content of the lower value display (the current input or result), and remove commas.

		if (output != NaN) {
			// Check if the content of the lower display is a valid number (not NaN, which stands for "Not-a-Number").

			output = output + this.id;
			// Concatenate the clicked number (retrieved from the button's "id" attribute) to the current input.

			printOutput(output);
			// Update the lower value display with the new input, which now includes the clicked number.
		}
	});

	let output = number[i];
}
