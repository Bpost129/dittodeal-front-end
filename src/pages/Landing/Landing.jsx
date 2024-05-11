// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>Hello {user ? user.name : 'friend'}!</h1>
      <h1>{user ? '' : 'Log In to view and create listings.'}</h1>
    </main>
  )
}

export default Landing
