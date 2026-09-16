import app from "./app";

import updateOverdueLoans from "./modules/loan/loan.scheduler";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  updateOverdueLoans();
});
