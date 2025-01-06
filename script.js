document.getElementById("solve-btn").addEventListener("click", function () {
    const equationInput = document.getElementById("equation").value.trim();
    const initialValue = parseFloat(document.getElementById("initial-value").value);
    const yValue = parseFloat(document.getElementById("y-t").value);
    const time = parseFloat(document.getElementById("time").value);
    const resultsTable = document.getElementById("results-table").getElementsByTagName("tbody")[0];
    const solutionsSection = document.getElementById("solutions");

    // Check if inputs are valid
    if (!equationInput || isNaN(initialValue) || isNaN(yValue) || isNaN(time)) {
        alert("Please enter valid values for equation, initial value, y(t) value, and time.");
        return;
    }

    // Calculate k using the given inputs
    const calculatedK = Math.log(yValue / initialValue) / time;
    const type = calculatedK > 0 ? "Growth" : "Decay";

    // Display the solution steps
    solutionsSection.innerHTML = `
        <h3>Solution Steps:</h3>
        <p><b>Formula Used:</b> y(t) = y(0) * e^(kt)</p>
        <p><b>Given:</b><br>
        y(0) = ${initialValue}<br>
        y(t) = ${yValue}<br>
        t = ${time}</p>
        <p><b>Step 1:</b> Rearrange the formula to solve for k: <br>
        k = ln(y(t) / y(0)) / t</p>
        <p><b>Step 2:</b> Substitute the values:<br>
        k = ln(${yValue} / ${initialValue}) / ${time}</p>
        <p><b>Step 3:</b> Calculate k:<br>
        k = ${calculatedK.toFixed(4)}</p>
    `;

    // Add the results to the table
    const newRow = resultsTable.insertRow();
    const cellIndex = newRow.insertCell(0);
    const cellEquation = newRow.insertCell(1);
    const cellType = newRow.insertCell(2);
    const cellRate = newRow.insertCell(3);

    cellIndex.textContent = resultsTable.rows.length; // Row index
    cellEquation.textContent = equationInput; // Original equation
    cellType.textContent = type; // Growth or Decay
    cellRate.textContent = calculatedK.toFixed(4); // Calculated rate constant k

    // Add click event to rows to show history
    newRow.addEventListener("click", function () {
        solutionsSection.innerHTML = `
            <h3>History:</h3>
            <p><b>Equation:</b> ${equationInput}</p>
            <p><b>Type:</b> ${type}</p>
            <p><b>Rate (k):</b> ${calculatedK.toFixed(4)}</p>
            <p><b>Solution Steps:</b><br>
            Formula Used: y(t) = y(0) * e^(kt)<br>
            Given: y(0) = ${initialValue}, y(t) = ${yValue}, t = ${time}<br>
            Step 1: Rearrange the formula to solve for k: k = ln(y(t) / y(0)) / t<br>
            Step 2: Substitute values: k = ln(${yValue} / ${initialValue}) / ${time}<br>
            Step 3: Calculate k: k = ${calculatedK.toFixed(4)}
            </p>
        `;
    });
});
