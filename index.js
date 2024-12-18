import config from "./config/index.js";
import connectDB from "./config/db.js";

import app from "./app.js";

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});


// import config from "./config/index.js";
// import connectDB from "./config/db.js";

// import app from "./app.js";

// connectDB();

// const port = process.env.PORT || 4000;


// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });


