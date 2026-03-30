function alertWelcome(){
    alert("Welcome to the React Training!");
}

function WelcomeFromComponents() {
  return (
    <>
    <button onClick={alertWelcome}>Click Me!</button>
    </>
  )
}

export default WelcomeFromComponents;