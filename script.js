document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-calc"); // Buttons from DOM
    const display = document.querySelector(".display"); // Display from DOM
    const history = document.querySelector(".history-container"); // History Container from DOM
    const buttonResetHistory = document.getElementById('clear-history')

    // Add new history item to DOM
    function addHistory(formula, result) {
        history.insertAdjacentHTML('beforeend',
            `<div class="history-item">
                    <div class="fw-bold text-wrap">
                        <p>${formula} = ${result}</p>
                    </div>
                </div>`
        );
    }

    // Calculate formula
    function calculate() {
        try {
            // Change , for . to avoid calculation issues
            let formula = display.textContent.replace(",", ".")
            let result = eval(formula)
            addHistory(formula, result)

            // Execute the formula
            display.textContent = eval(result);
        } catch {
            // Catch if there is an error with the formula
            display.textContent = "Error";
        }
    }

    buttonResetHistory.addEventListener("click", function () {
        resetHistory()
    })

    // Clear history
    function resetHistory() {
        history.innerHTML = ''
    }

    const handleButtonClick = (button) => {
        // Add event listener to buttons
        button.addEventListener("click", function () {
            let value = this.textContent; // Get button value

            switch (value) {
                // Calculate
                case '=':
                    calculate()
                    break;
                // Restart Formula
                case 'AC':
                    display.textContent = "0";
                    break;
                // Formula or Key
                default:
                    if (display.textContent === "0") {
                        display.textContent = value;
                    } else {
                        display.textContent += value;
                    }
                    break;
            }
        });
    }

    // Loop buttons
    buttons.forEach(handleButtonClick);
});

