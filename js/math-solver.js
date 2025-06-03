function solveMath() {
  const input = document.getElementById("mathInput").value.trim();
  const output = document.getElementById("solution");

  if (!input) {
    output.textContent = "Please enter a math expression.";
    return;
  }

  try {
    // Solve equation if '=' is included
    if (input.includes("=")) {
      const [lhs, rhs] = input.split("=");
      const solution = math.solve(lhs + " - (" + rhs + ")", 'x'); // solving for x by default
      output.textContent = `x = ${solution.length ? solution[0] : 'No solution found.'}`;
    } else {
      // Evaluate standard expression
      const result = math.evaluate(input);
      output.textContent = `Result: ${result}`;
    }
  } catch (error) {
    output.textContent = `❌ Error: ${error.message}`;
  }
}
