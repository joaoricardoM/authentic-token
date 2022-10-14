
import { tokenService } from '../src/services/auth/tokenService';

function AuthPageSSR(props) {

  return (
    <div>
      <h1>
        Auth Page Server Side Render
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>  
    </div>
  )
}

export default AuthPageSSR;

export async function getServerSideProps(ctx) {
  const token = tokenService.get(ctx)
  console.log(token)
  return {
    props: {
      token: token
    },
  }
}

