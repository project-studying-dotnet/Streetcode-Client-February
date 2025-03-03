import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PartnersBlockComponent from '@/features/MainPage/PartnersBlockMain/PartnersBlockMain.component';

jest.mock('@/features/AdditionalPages/PartnersPage/PartnersBlock/PartnersBlock.component', () => () => <div>Mocked PartnersBlock</div>);
jest.mock('@/features/MainPage/Heading/Heading.component', () => ({ blockName }: { blockName: string }) => <div>Mocked Heading: {blockName}</div>);

describe('PartnersBlockComponent', () => {
    test('renders the PartnersBlock component', () => {
        render(<PartnersBlockComponent />);
        expect(screen.getByText('Mocked PartnersBlock')).toBeInTheDocument();
    });

    test('renders the Heading component with correct blockName', () => {
        render(<PartnersBlockComponent />);
        expect(screen.getByText('Mocked Heading: Наші партнери')).toBeInTheDocument();
    });

    test('renders without crashing', () => {
        const { container } = render(<PartnersBlockComponent />);
        expect(container).toBeInTheDocument();
    });
});