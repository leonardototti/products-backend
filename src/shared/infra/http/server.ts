import app from "./app";

const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`Back-end rodando em localhost:${port}! 🚀`);
});
