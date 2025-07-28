import Row from './Row';
import Heading from './Heading';
import Calendar from './Calendar';
import ExchangeRate from '../features/settings/ExchangeRate';

function Header({ title }) {
  return (
    <Row type="horizontal" className="text-dark-grey">
      <Row className="flex-wrap">
        <Calendar />

        <ExchangeRate />
      </Row>

      <Heading as="h1">{title}</Heading>
    </Row>
  );
}

export default Header;
