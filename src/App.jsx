import { Routes, Route, A } from "@solidjs/router";

import { Game } from "./components";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Log in</h1>
            <A href="/home">Play game</A>
          </div>
        }
      />
      <Route path="/home" component={Game} />
    </Routes>
  );
}

export default App;
