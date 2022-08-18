import { render } from '@testing-library/react';

import InspireBankLib from './inspire-bank-lib';

describe('InspireBankLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InspireBankLib />);
    expect(baseElement).toBeTruthy();
  });
});
