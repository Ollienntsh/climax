import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'jest-emotion';

enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer());
