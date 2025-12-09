import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Shopping Portal</h1>
      </header>
      <main>
        <ProductList />
      </main>
      <footer>
        <p>&copy; 2025 | My Shopping Portal</p>
      </footer>
    </div>
  );
}

export default App;
