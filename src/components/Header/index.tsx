import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <span>Home</span>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <span>Posts</span>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
