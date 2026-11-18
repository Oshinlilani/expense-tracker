

export default function Login() {


  return (
    <>
     <form>
      <h2>Login</h2>

      <input type="name" value={e.target.value} placeholder="write your name" />
      <input type="email" value={e.target.value} placeholder="write your email"/>

      <button type="submit">Submit</button>
     </form>
    </>
  )
}