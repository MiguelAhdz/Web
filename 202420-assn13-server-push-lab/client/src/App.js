import React, { useState, useEffect } from "react";
import "./App.css";
const BaseURL = "http://localhost:8000";

function App() {
  console.log("rendering app...");
  const [pressureData, setPressureData] = useState();

  console.log(pressureData);

  useEffect(() => {

    (async () => {
      console.log("Effect..");
      const response = await fetch(BaseURL + "/valves");
      const initial = await response.json();

      setPressureData(initial);

      const eventSource = new EventSource(BaseURL + "/valves-push");


      console.log("...event string started");
      eventSource.onmessage = (evt) => {
        const data = JSON.parse(evt.data);

        setPressureData(data);
        console.log(evt);
      };
    })();

  },[]);


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Valve</th>
            <th>Pressure</th>
          </tr>
        </thead>
        <tbody>
        {pressureData && pressureData.map(valve =>
            <tr key = {valve.id}>
              <td>{valve.name}</td>
              <td className="danger">{valve.pressure}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
}
export default App