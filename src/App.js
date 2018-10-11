import React, { PureComponent } from "react";
import Button from "./components/ui/Button";

class App extends PureComponent {
	render() {
		return (
			<div className="App">
				<p>Hello World!</p>
				<Button />
			</div>
		);
	}
}

export default App;
