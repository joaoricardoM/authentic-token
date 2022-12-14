import { withSession } from '../src/services/auth/session'

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

//Decorator pattern
export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.session
    }
  }
})

// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authService.getSession(ctx)
//     return {
//       props: {
//         session,
//       },
//     }
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/error=401'
//       }
//     }
//   }
// }

