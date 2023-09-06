export async function apiSignIn(licenceKey, machine){

      let res = await fetch("http://localhost:3005/login",
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            licenceKey,
            machine
          })

      }).then((data) => data.json())

      return res
}

export async function apiSignOut(licenceKey, machine){
  let res = await fetch("http://localhost:3005/logout",
    {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        licenceKey,
        machine
      })
  }).then((data) => data.json())
  return res
}

export async function apiCheckKeyMachineValid(licenceKey, machine){

      let res = await fetch(`http://localhost:3005/checkKeyMachineAllowed/${licenceKey}/${machine}`).then((data) => data.json())

      return res
  }
