import { FC } from 'react';
import { Button } from '../components/button';
import { Link } from '../components/link';

/**
 * Home page component.
 */
export const HomePage: FC = () => (
  <div>
    <p>Hello World</p>
    <Button variant="error" outline>Im a fucking button</Button>
    <Link to="/link" variant="error">Test link</Link>
  </div>
);
