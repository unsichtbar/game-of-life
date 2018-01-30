import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

class Container extends React.Component {
  state = {
    dim: 25,
    rows: 20,
    cols: 20,
    fps: 10
  };
  changeRows = rows => {
    this.setState({ rows });
  };
  changeColumns = cols => {
    this.setState({ cols });
  };
  render() {
    return (
      <Fragment>
        <RowColumnPicker
          {...this.state}
          changeRows={this.changeRows}
          changeColumns={this.changeColumns}
        />
        <App {...this.state} />
      </Fragment>
    );
  }
}
class RowColumnPicker extends React.Component {
  render() {
    return (
      <form>
        <label>Columns:</label>
        <input
          value={this.props.cols}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            this.props.changeColumns(Number(value));
          }}
        />
        <label>Rows:</label>
        <input
          value={this.props.rows}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            this.props.changeRows(Number(value));
          }}
        />
      </form>
    );
  }
}
ReactDOM.render(<Container />, document.getElementById("root"));
registerServiceWorker();