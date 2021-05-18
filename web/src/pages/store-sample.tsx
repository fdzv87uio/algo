import { useObserver } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { StoreContext } from '../../state/StoreProvider'

export default function Index(): JSX.Element {
  return (
    <>
      <SampleStringsHeader />
      <SampleStringsList />
      <SampleStringsForm />
    </>
  )
}

function SampleStringsList(): JSX.Element {
  const store = useContext(StoreContext)
  return useObserver(() => (
    <ul>
      {store.sampleStringList.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  ))
}

const SampleStringsHeader = () => {
  const store = React.useContext(StoreContext)
  return useObserver(() => <h1>Count: {store.sampleStringsCount}</h1>)
}

const SampleStringsForm = () => {
  const store = React.useContext(StoreContext)
  const [newString, setNewString] = React.useState('')

  return (
    <form
      onSubmit={(e) => {
        store.addNewString(newString)
        setNewString('')
        e.preventDefault()
      }}
    >
      <input
        type="text"
        value={newString}
        onChange={(e) => {
          setNewString(e.target.value)
        }}
      />
      <button type="submit">Add</button>
    </form>
  )
}
