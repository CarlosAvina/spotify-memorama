import { Routes, Route } from "@solidjs/router";

import { Login, Game } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" component={Login} />
      <Route path="/home" component={Game} />
    </Routes>
  );
}

export default App;
