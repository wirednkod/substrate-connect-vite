import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { createScClient, WellKnownChain } from "connectest";

function App() {
  const [some, setSome] = useState<string>("")

  useEffect(() => {
    const start = async () => {
      const scClient = createScClient();
      const westendChain = await scClient.addWellKnownChain(
        WellKnownChain.westend2,
        function jsonRpcCallback(response: string) {
          setSome(response)
        }
      );
      westendChain.sendJsonRpc(
        '{"jsonrpc":"2.0","id":"1","method":"chainHead_unstable_follow","params":[true]}',
      );
    }
    start();
  }, [])

  console.log('stome', some.length)

  return (
    <div className="App">
        <h3>Westend latest<br />RPC response</h3>
        <p className="text">{some}</p>
    </div>
  )
}

export default App
